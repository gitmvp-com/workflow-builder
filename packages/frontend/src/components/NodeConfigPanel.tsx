import React, { useState, useEffect } from 'react';
import { Node } from 'reactflow';
import './NodeConfigPanel.css';

interface NodeConfigPanelProps {
  node: Node;
  onClose: () => void;
  onUpdate: (data: any) => void;
}

export const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({
  node,
  onClose,
  onUpdate,
}) => {
  const [url, setUrl] = useState(node.data.url || '');
  const [method, setMethod] = useState(node.data.method || 'GET');
  const [value, setValue] = useState(
    node.data.value ? JSON.stringify(node.data.value, null, 2) : '{}'
  );

  useEffect(() => {
    setUrl(node.data.url || '');
    setMethod(node.data.method || 'GET');
    setValue(
      node.data.value ? JSON.stringify(node.data.value, null, 2) : '{}'
    );
  }, [node]);

  const handleSave = () => {
    const updates: any = {};

    if (node.data.nodeType === 'httpRequest') {
      updates.url = url;
      updates.method = method;
    } else if (node.data.nodeType === 'setData') {
      try {
        updates.value = JSON.parse(value);
      } catch (e) {
        alert('Invalid JSON format');
        return;
      }
    }

    onUpdate(updates);
    onClose();
  };

  return (
    <div className="node-config-panel">
      <div className="panel-header">
        <h3>Configure Node</h3>
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="panel-content">
        <div className="config-field">
          <label>Node Type:</label>
          <div className="field-value">{node.data.nodeType}</div>
        </div>

        {node.data.nodeType === 'httpRequest' && (
          <>
            <div className="config-field">
              <label>URL:</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/data"
              />
            </div>
            <div className="config-field">
              <label>Method:</label>
              <select value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </>
        )}

        {node.data.nodeType === 'setData' && (
          <div className="config-field">
            <label>Data (JSON):</label>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={10}
              placeholder='{"key": "value"}'
            />
          </div>
        )}

        {node.data.nodeType === 'manualTrigger' && (
          <div className="info-message">
            This node starts the workflow manually. No configuration needed.
          </div>
        )}
      </div>

      <div className="panel-footer">
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
