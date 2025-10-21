import { Router } from 'express';
import { executeWorkflow } from '../services/workflowEngine.js';
import type { Workflow } from '../types/workflow.js';

export const workflowRouter = Router();

workflowRouter.post('/execute', async (req, res) => {
  try {
    const workflow: Workflow = req.body;
    
    if (!workflow || !workflow.nodes || !workflow.connections) {
      return res.status(400).json({ 
        error: 'Invalid workflow format' 
      });
    }

    const result = await executeWorkflow(workflow);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Workflow execution error:', error);
    res.status(500).json({ 
      error: 'Workflow execution failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});
