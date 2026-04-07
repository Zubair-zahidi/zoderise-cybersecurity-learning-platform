import { create } from 'zustand';
import axios from '../utils/axios';

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,

  fetchDailyTasks: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('/tasks/daily');
      set({ tasks: response.data.tasks, loading: false });
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      set({ loading: false });
    }
  },

  completeTask: async (taskId) => {
    try {
      const response = await axios.post(`/tasks/complete/${taskId}`);
      // Refresh tasks to update status
      await get().fetchDailyTasks();
      return response.data;
    } catch (error) {
      console.error('Complete task error:', error);
      return null;
    }
  },

  claimReward: async (userTaskId) => {
    try {
      const response = await axios.post(`/tasks/claim/${userTaskId}`);
      await get().fetchDailyTasks(); // refresh
      return response.data;
    } catch (error) {
      console.error('Claim reward error:', error);
      return null;
    }
  },
}));