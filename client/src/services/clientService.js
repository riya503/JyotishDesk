import api from './api';

const clientService = {
  async getClients() {
    const res = await api.get('/api/clients');
    return res.data;
  },

  async getClientById(id) {
    const res = await api.get(`/api/clients/${id}`);
    return res.data;
  },

  async createClient(clientData) {
    const res = await api.post('/api/clients', clientData);
    return res.data;
  },

  async updateClient(id, clientData) {
    const res = await api.put(`/api/clients/${id}`, clientData);
    return res.data;
  },

  async deleteClient(id) {
    const res = await api.delete(`/api/clients/${id}`);
    return res.data;
  }
};

export default clientService;
