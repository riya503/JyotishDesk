import api from './api';

const followupService = {
  async getFollowups() {
    const res = await api.get('/api/followups');
    return res.data;
  },

  async createFollowup(followupData) {
    const res = await api.post('/api/followups', followupData);
    return res.data;
  },

  async updateFollowup(id, followupData) {
    const res = await api.put(`/api/followups/${id}`, followupData);
    return res.data;
  },

  async deleteFollowup(id) {
    const res = await api.delete(`/api/followups/${id}`);
    return res.data;
  },

  async sendReminderEmail(id) {
    const res = await api.post(`/api/followups/${id}/send-reminder`);
    return res.data;
  }
};

export default followupService;
