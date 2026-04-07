import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0c0d12] text-[#f8fafc]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,168,204,0.16),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(45,106,79,0.14),transparent_22%)]" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="glass-panel rounded-[32px] border border-[#2d2d35] bg-[#0f121d]/90 p-8 shadow-panel backdrop-blur-xl">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.32em] text-[#94a3b8]">Secure login</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">Access your cyber operations workspace</h1>
                <p className="mt-4 max-w-2xl text-sm text-[#cbd5e1]">Sign in to continue your training, manage tasks, and monitor your security score in a professional environment.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="rounded-[20px] border border-[#7f1d1d] bg-[#3f1d1d]/10 px-4 py-3 text-sm text-[#fca5a5]">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-[#cbd5e1] mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-3xl border border-[#2d2d35] bg-[#111118] py-3 pl-12 pr-4 text-white placeholder:text-[#64748b] focus:border-[#00a8cc] focus:outline-none focus:ring-2 focus:ring-[#00a8cc]/20"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#cbd5e1] mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-3xl border border-[#2d2d35] bg-[#111118] py-3 pl-12 pr-4 text-white placeholder:text-[#64748b] focus:border-[#00a8cc] focus:outline-none focus:ring-2 focus:ring-[#00a8cc]/20"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-3xl bg-[#00a8cc] px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:bg-[#08aacd] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#94a3b8]">
                New user?{' '}
                <Link to="/register" className="font-semibold text-[#7dd3fc] transition hover:text-[#a5f3fc]">
                  Create account
                </Link>
              </p>
            </div>

            <div className="glass-panel rounded-[32px] border border-[#2d2a35] bg-[#111118] p-8 shadow-panel backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.32em] text-[#94a3b8]">Developer</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Zubair Zahidi</h2>
              <p className="mt-3 text-sm text-[#cbd5e1]">Crafted for serious learning and realistic cybersecurity workflows.</p>

              <div className="mt-8 space-y-4">
                <StatItem label="Designed for" value="C1-level English content" />
                <StatItem label="Platform" value="Professional SOC-style UI" />
                <StatItem label="Experience" value="Secure training, tasks, and simulations" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value }) => (
  <div className="rounded-3xl border border-[#212a35] bg-[#0d111a] p-4">
    <p className="text-xs uppercase tracking-[0.28em] text-[#94a3b8]">{label}</p>
    <p className="mt-2 text-sm font-semibold text-white">{value}</p>
  </div>
);

export default Login;
