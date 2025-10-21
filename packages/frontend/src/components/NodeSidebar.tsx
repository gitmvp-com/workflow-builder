import React from 'react';
import './NodeSidebar.css';

interface NodeSidebarProps {
  onAddNode: (type: string, label: string) => void;
}

const nodeDefinitions = [
  { type: 'manualTrigger', label: '▶️ Manual Trigger', description: 'Start workflow manually' },
  { type: 'httpRequest', label: '🌐 HTTP Request', description: 'Make HTTP requests' },
  { type: 'setData', label: '📝 Set Data', description: 'Transform data' },
];

export const NodeSidebar: React.FC<NodeSidebarProps> = ({ onAddNode }) => {
  return (
    <div className="node-sidebar">
      <h2>Nodes</h2>
      <div className="node-list">
        {nodeDefinitions.map((node) => (
          <div
            key={node.type}
            className="node-item"
            onClick={() => onAddNode(node.type, node.label)}
          >
            <div className="node-label">{node.label}</div>
            <div className="node-description">{node.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
