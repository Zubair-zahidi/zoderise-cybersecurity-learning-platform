import { create } from 'zustand';
import axios from '../utils/axios';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { user } = response.data;
      set({ user, isAuthenticated: true, loading: false });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      set({ error: message, loading: false });
      return { success: false, message };
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/auth/register', { name, email, password });
      const { user } = response.data;
      set({ user, isAuthenticated: true, loading: false });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      set({ error: message, loading: false });
      return { success: false, message };
    }
  },

  logout: async () => {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
    set({ user: null, isAuthenticated: false, error: null });
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('/auth/me');
      const { user } = response.data;
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, loading: false });
    }
  },
}));