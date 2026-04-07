import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCreditStore } from '../store/creditStore';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { credits, fetchCredits } = useCreditStore();

  useEffect(() => {
    fetchCredits();
  }, []);

  // Rest of component uses user?.name, credits, etc.
};
export default Dashboard;

