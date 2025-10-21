import React from 'react';
import { Handle, Position } from 'reactflow';
import './CustomNode.css';

export const CustomNode: React.FC<any> = ({ data }) => {
  return (
    <div className="custom-node">
      <Handle type="target" position={Position.Top} />
      <div className="node-content">
        <div className="node-header">{data.label}</div>
        {data.url && (
          <div className="node-detail">
            <small>{data.url}</small>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
