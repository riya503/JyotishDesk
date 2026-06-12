import api from './api';

const aiService = {
  async getDashboardMetrics() {
    const res = await api.get('/api/ai/dashboard');
    return res.data;
  },

  async getClientInsights(clientId) {
    const res = await api.get(`/api/ai/client/${clientId}`);
    return res.data;
  },

  async generateFollowupMessage(clientId) {
    const res = await api.post('/api/ai/generate-followup', { clientId });
    return res.data.message;
  }
};

export default aiService;
