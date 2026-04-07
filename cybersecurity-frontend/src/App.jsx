import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Study from './pages/Study';
import Quiz from './pages/Quiz';
import Python from './pages/Python';
import Kali from './pages/Kali';
import Phishing from './pages/Phishing';
import PasswordChecker from './pages/PasswordChecker';
import Upgrade from './pages/Upgrade';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="relative min-h-screen bg-primary text-text">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,168,204,0.16),transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(45,106,79,0.14),transparent_22%)]" />
      <div className="relative z-10">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/study" element={<ProtectedRoute><Study /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/python" element={<ProtectedRoute><Python /></ProtectedRoute>} />
          <Route path="/kali" element={<ProtectedRoute><Kali /></ProtectedRoute>} />
          <Route path="/phishing" element={<ProtectedRoute><Phishing /></ProtectedRoute>} />
          <Route path="/password-checker" element={<ProtectedRoute><PasswordChecker /></ProtectedRoute>} />
          <Route path="/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;