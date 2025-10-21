import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { NodeSidebar } from './components/NodeSidebar';
import { NodeConfigPanel } from './components/NodeConfigPanel';
import { CustomNode } from './components/CustomNode';
import { executeWorkflow } from './services/api';
import './App.css';

const nodeTypes = {
  custom: CustomNode,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [executing, setExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (type: string, label: string) => {
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type: 'custom',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label, nodeType: type },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onNodeClick = (_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const updateNodeData = (nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
  };

  const handleExecute = async () => {
    setExecuting(true);
    setExecutionResult(null);

    try {
      // Convert React Flow format to backend format
      const workflow = {
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.data.nodeType,
          data: node.data,
          position: node.position,
        })),
        connections: edges.reduce((acc, edge) => {
          if (!acc[edge.source]) acc[edge.source] = [];
          acc[edge.source].push(edge.target);
          return acc;
        }, {} as Record<string, string[]>),
      };

      const result = await executeWorkflow(workflow);
      setExecutionResult(result);
    } catch (error) {
      console.error('Execution error:', error);
      setExecutionResult({ error: 'Execution failed' });
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>⚡ Workflow Builder</h1>
        <button
          className="execute-button"
          onClick={handleExecute}
          disabled={executing || nodes.length === 0}
        >
          {executing ? '⏳ Executing...' : '▶️ Execute Workflow'}
        </button>
      </header>

      <div className="main-content">
        <NodeSidebar onAddNode={addNode} />

        <div className="flow-container">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>

          {executionResult && (
            <div className="execution-result">
              <h3>Execution Result</h3>
              <pre>{JSON.stringify(executionResult, null, 2)}</pre>
            </div>
          )}
        </div>

        {selectedNode && (
          <NodeConfigPanel
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
            onUpdate={(data) => updateNodeData(selectedNode.id, data)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
