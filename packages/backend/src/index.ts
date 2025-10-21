import express from 'express';
import cors from 'cors';
import { workflowRouter } from './routes/workflow.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/workflows', workflowRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Workflow Builder API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
