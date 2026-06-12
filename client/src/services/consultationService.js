import api from './api';

const consultationService = {
  async getConsultations() {
    const res = await api.get('/api/consultations');
    return res.data;
  },

  async getConsultationsByClient(clientId) {
    const res = await api.get(`/api/consultations/client/${clientId}`);
    return res.data;
  },

  async createConsultation(conData) {
    const res = await api.post('/api/consultations', conData);
    return res.data;
  },

  async updateConsultation(id, conData) {
    const res = await api.put(`/api/consultations/${id}`, conData);
    return res.data;
  },

  async updateRemedyStatus(consultationId, remedyId, status) {
    const res = await api.put(`/api/consultations/${consultationId}/remedy/${remedyId}`, { status });
    return res.data;
  },

  async deleteConsultation(id) {
    const res = await api.delete(`/api/consultations/${id}`);
    return res.data;
  },

  async sendSummaryEmail(id) {
    const res = await api.post(`/api/consultations/${id}/send-summary`);
    return res.data;
  }
};

export default consultationService;
