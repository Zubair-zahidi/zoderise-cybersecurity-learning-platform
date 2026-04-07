import { create } from 'zustand';
import axios from '../utils/axios';

export const useCreditStore = create((set, get) => ({
  credits: 0,
  loading: false,

  fetchCredits: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('/credits');
      set({ credits: response.data.credits, loading: false });
    } catch (error) {
      console.error('Failed to fetch credits:', error);
      set({ loading: false });
    }
  },

  spendCredits: async (amount) => {
    try {
      const response = await axios.post('/credits/spend', { amount });
      if (response.data.success) {
        set({ credits: response.data.credits });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Spend credits error:', error);
      return false;
    }
  },
}));