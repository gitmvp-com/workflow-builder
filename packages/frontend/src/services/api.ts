import axios from 'axios';

const API_BASE_URL = '/api';

export async function executeWorkflow(workflow: any) {
  const response = await axios.post(`${API_BASE_URL}/workflows/execute`, workflow);
  return response.data.result;
}
