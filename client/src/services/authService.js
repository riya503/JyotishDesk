import api from './api';

const authService = {
  async login(email, password) {
    const res = await api.post('/api/auth/login', { email, password });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  async register(name, email, password) {
    const res = await api.post('/api/auth/register', { name, email, password });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  async getCurrentUser() {
    const res = await api.get('/api/auth/me');
    return res.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};

export default authService;
