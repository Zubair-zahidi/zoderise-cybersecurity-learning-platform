import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { User, Mail, Lock } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register, loading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-[#f8fafc] flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_rgba(0,168,204,0.16),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(45,106,79,0.14),transparent_22%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl"
      >
        <div className="glass-panel border border-[#2d2d35] shadow-panel rounded-[32px] overflow-hidden">
          <div className="bg-[#111118] border-b border-[#2d2d35] px-8 py-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#0f172a] text-[#00a8cc] shadow-sm">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-[#94a3b8]">Create account</p>
                <h1 className="mt-3 text-3xl font-semibold text-white">Join the security network</h1>
                <p className="mt-2 text-sm text-[#cbd5e1] max-w-xl">Register to track your training, earn credits, and unlock advanced cybersecurity challenges.</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-[20px] border border-[#7f1d1d] bg-[#3f1d1d]/10 px-4 py-3 text-sm text-[#fca5a5]">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-[#cbd5e1] mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-3xl border border-[#2d2d35] bg-[#111118] py-3 pl-12 pr-4 text-white placeholder:text-[#64748b] focus:border-[#00a8cc] focus:outline-none focus:ring-2 focus:ring-[#00a8cc]/20"
                    placeholder="Zubair Zahidi"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Create a secure password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-3xl bg-[#00a8cc] px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:bg-[#08aacd] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#94a3b8]">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#7dd3fc] transition hover:text-[#a5f3fc]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
