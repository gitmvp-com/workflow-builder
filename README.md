# Workflow Builder

![Workflow Builder](https://img.shields.io/badge/workflow-automation-blue)

A simplified MVP version of n8n - A visual workflow automation tool that allows you to create and execute simple workflows.

## Features

- 🎨 **Visual Workflow Editor**: Drag-and-drop interface to build workflows
- 🔗 **Basic Nodes**: Manual trigger, HTTP requests, and data transformation
- ⚡ **Real-time Execution**: Execute workflows and see results instantly
- 🎯 **Simple & Clean**: Focused on core workflow automation features

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers (frontend + backend)
pnpm dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Running Individually

```bash
# Start only backend
pnpm dev:backend

# Start only frontend
pnpm dev:frontend
```

## Project Structure

```
workflow-builder/
├── packages/
│   ├── backend/          # Express server for workflow execution
│   └── frontend/         # React UI for workflow building
├── package.json
└── pnpm-workspace.yaml
```

## Available Nodes

1. **Manual Trigger** - Start workflow manually
2. **HTTP Request** - Make HTTP requests to external APIs
3. **Set Data** - Transform and set data in the workflow

## Tech Stack

- **Frontend**: React, TypeScript, Vite, React Flow (for visual workflow)
- **Backend**: Node.js, Express, TypeScript
- **Package Manager**: pnpm (monorepo)

## Usage

1. Open the workflow editor in your browser
2. Drag nodes from the sidebar to the canvas
3. Connect nodes by dragging from output to input
4. Configure each node with required parameters
5. Click "Execute Workflow" to run

## License

MIT

## Acknowledgments

Inspired by [n8n](https://github.com/n8n-io/n8n) - the powerful workflow automation platform.
