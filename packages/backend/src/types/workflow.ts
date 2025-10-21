export interface WorkflowNode {
  id: string;
  type: string;
  data: NodeData;
  position: { x: number; y: number };
}

export interface NodeData {
  label?: string;
  url?: string;
  method?: string;
  value?: any;
  [key: string]: any;
}

export interface Workflow {
  nodes: WorkflowNode[];
  connections: Record<string, string[]>;
}
