import axios from 'axios';
import type { Workflow, WorkflowNode, NodeData } from '../types/workflow.js';

export async function executeWorkflow(workflow: Workflow) {
  const { nodes, connections } = workflow;
  const executionResults: Record<string, any> = {};
  
  // Find the trigger node (Manual Trigger)
  const triggerNode = nodes.find(node => node.type === 'manualTrigger');
  if (!triggerNode) {
    throw new Error('No trigger node found in workflow');
  }

  // Execute nodes in order based on connections
  const executedNodes = new Set<string>();
  await executeNode(triggerNode, nodes, connections, executionResults, executedNodes);
  
  return executionResults;
}

async function executeNode(
  node: WorkflowNode,
  allNodes: WorkflowNode[],
  connections: Record<string, string[]>,
  results: Record<string, any>,
  executed: Set<string>
) {
  if (executed.has(node.id)) return;
  
  console.log(`Executing node: ${node.id} (${node.type})`);
  
  // Execute the current node
  const nodeResult = await executeNodeLogic(node, results);
  results[node.id] = nodeResult;
  executed.add(node.id);
  
  // Find and execute connected nodes
  const connectedNodeIds = connections[node.id] || [];
  for (const targetId of connectedNodeIds) {
    const targetNode = allNodes.find(n => n.id === targetId);
    if (targetNode) {
      await executeNode(targetNode, allNodes, connections, results, executed);
    }
  }
}

async function executeNodeLogic(node: WorkflowNode, previousResults: Record<string, any>) {
  switch (node.type) {
    case 'manualTrigger':
      return { 
        triggered: true, 
        timestamp: new Date().toISOString() 
      };
    
    case 'httpRequest':
      return await executeHttpRequest(node.data);
    
    case 'setData':
      return executeSetData(node.data, previousResults);
    
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}

async function executeHttpRequest(data: NodeData) {
  const { url, method = 'GET' } = data;
  
  if (!url) {
    throw new Error('URL is required for HTTP Request node');
  }

  try {
    const response = await axios({
      url,
      method: method as any,
      timeout: 10000
    });
    
    return {
      status: response.status,
      data: response.data,
      headers: response.headers
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: error.message,
        status: error.response?.status
      };
    }
    throw error;
  }
}

function executeSetData(data: NodeData, previousResults: Record<string, any>) {
  const { value } = data;
  
  // Simple data transformation - in a real implementation, 
  // this would support expressions and access to previous node data
  return {
    value: value || {},
    previousResults: Object.keys(previousResults)
  };
}
