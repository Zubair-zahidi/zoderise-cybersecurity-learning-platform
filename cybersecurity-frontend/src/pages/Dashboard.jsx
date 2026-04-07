import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCreditStore } from '../store/creditStore';
import { useTaskStore } from '../store/taskStore';
import { Shield, Lock, Award, TrendingUp, Activity, Target, BookOpen, CheckCircle, Clock, Gift, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const { credits, fetchCredits } = useCreditStore();
  const { tasks, fetchDailyTasks, completeTask, claimReward } = useTaskStore();
  const [riskScore, setRiskScore] = useState(42);
  const [completedModules, setCompletedModules] = useState(3);

  useEffect(() => {
    fetchCredits();
    fetchDailyTasks();
  }, []);

  const handleCompleteTask = async (taskId) => {
    await completeTask(taskId);
  };

  const handleClaimReward = async (userTaskId) => {
    await claimReward(userTaskId);
    await fetchCredits();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,168,204,0.1),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(45,106,79,0.08),transparent_50%)] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Zoderise</h1>
                <p className="text-xs text-slate-400">Professional Cybersecurity Platform</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Link to="/dashboard" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">Dashboard</Link>
              <Link to="/study" className="text-slate-300 hover:text-white transition-colors">Study</Link>
              <Link to="/quiz" className="text-slate-300 hover:text-white transition-colors">Quiz</Link>
              <Link to="/python" className="text-slate-300 hover:text-white transition-colors">Python Lab</Link>
              <Link to="/kali" className="text-slate-300 hover:text-white transition-colors">Kali Tools</Link>
              <Link to="/phishing" className="text-slate-300 hover:text-white transition-colors">Phishing</Link>
              <Link to="/password-checker" className="text-slate-300 hover:text-white transition-colors">Password</Link>
              <Link to="/upgrade" className="text-slate-300 hover:text-white transition-colors">Upgrade</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-orange-400 hover:text-orange-300 transition-colors font-medium">Admin</Link>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2">
                <Award className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-slate-300">Credits:</span>
                <span className="text-cyan-400 font-mono font-semibold">{credits}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-300 text-sm">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full" />
            <h1 className="text-3xl font-bold text-white">Security Operations Center</h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl">
            Monitor your security posture, complete operational tasks, and advance your cybersecurity expertise in a professional environment.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Risk Score</p>
                <p className="text-3xl font-bold text-white mt-2">{riskScore}%</p>
              </div>
              <div className="h-10 w-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${riskScore}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">Complete tasks to reduce risk</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Professional Tier</p>
                <p className="text-lg font-semibold text-white mt-2">
                  {user?.plan === 'thunder' ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Lock className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Activity Points</p>
                <p className="text-3xl font-bold text-white mt-2">{credits}</p>
              </div>
              <div className="h-10 w-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Award className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wide">Modules Completed</p>
                <p className="text-3xl font-bold text-white mt-2">{completedModules} / 100</p>
              </div>
              <div className="h-10 w-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Tasks and Modules */}
          <div className="xl:col-span-2 space-y-8">
            {/* Daily Tasks Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Target className="h-4 w-4 text-cyan-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Daily Operational Tasks</h2>
                <span className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-sm">
                  {tasks.length} active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task) => (
                  <div key={task._id} className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-4 hover:border-slate-600/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white font-medium text-sm">{task.title}</h3>
                      {task.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-slate-500" />
                      )}
                    </div>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{task.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-400 text-sm font-medium">+{task.rewardCredits} credits</span>
                      {!task.completed ? (
                        <button
                          onClick={() => handleCompleteTask(task._id)}
                          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
                        >
                          Complete
                        </button>
                      ) : !task.claimed ? (
                        <button
                          onClick={() => handleClaimReward(task.userTaskId)}
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2"
                        >
                          <Gift className="h-3 w-3" />
                          Claim
                        </button>
                      ) : (
                        <span className="text-slate-500 text-sm">Claimed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Training Modules Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Activity className="h-4 w-4 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Training Modules</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ModuleCard to="/study" title="Security Library" description="100+ topics covering OWASP, cryptography, network hardening" icon={BookOpen} />
                <ModuleCard to="/quiz" title="Assessments" description="Quizzes with instant feedback and credit rewards" icon={Award} />
                <ModuleCard to="/password-checker" title="Password Auditor" description="Analyze password strength and entropy" icon={Shield} />
                <ModuleCard to="/phishing" title="Phishing Simulator" description="Realistic email attack scenarios" icon={Lock} />
                <ModuleCard to="/python" title="Python Security Lab" description="Write scripts for threat analysis" icon={Activity} />
                <ModuleCard to="/upgrade" title="Professional Tier" description="Unlock advanced features and full risk reduction" icon={Target} highlight />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Activity */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Settings className="h-4 w-4 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              </div>

              <div className="space-y-4">
                <ActivityItem event="Completed 'Password Security 101'" time="2h ago" />
                <ActivityItem event="Earned 15 credits from Phishing Basics quiz" time="Yesterday" />
                <ActivityItem event="Started Python for Security: Lesson 1" time="2d ago" />
                <ActivityItem event="Accessed Kali Tools environment" time="3d ago" />
                <ActivityItem event="Updated security profile" time="1w ago" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
              <div className="space-y-3">
                <StatusItem label="Risk Assessment" status="Active" color="green" />
                <StatusItem label="Training Progress" status="On Track" color="blue" />
                <StatusItem label="Credit System" status="Operational" color="green" />
                <StatusItem label="Admin Panel" status={user?.role === 'admin' ? 'Available' : 'Restricted'} color={user?.role === 'admin' ? 'orange' : 'gray'} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModuleCard = ({ to, title, description, icon: Icon, highlight }) => (
  <Link to={to}>
    <div className={`bg-slate-900/50 border rounded-lg p-4 transition-all duration-200 hover:border-slate-600/50 hover:bg-slate-800/50 cursor-pointer group ${highlight ? 'border-cyan-500/40 bg-cyan-500/5' : 'border-slate-700/30'}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${highlight ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-700/50 text-slate-400 group-hover:text-slate-300'}`}>
          <Icon className="h-4 w-4" />
        </div>
        <h4 className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">{title}</h4>
      </div>
      <p className="text-slate-400 text-xs leading-relaxed">{description}</p>
    </div>
  </Link>
);

const ActivityItem = ({ event, time }) => (
  <div className="flex justify-between items-center py-3 border-b border-slate-700/30 last:border-0">
    <span className="text-slate-300 text-sm">{event}</span>
    <span className="text-slate-500 text-xs">{time}</span>
  </div>
);

const StatusItem = ({ label, status, color }) => {
  const colorClasses = {
    green: 'bg-green-500/20 text-green-400',
    blue: 'bg-blue-500/20 text-blue-400',
    orange: 'bg-orange-500/20 text-orange-400',
    gray: 'bg-gray-500/20 text-gray-400'
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className={`px-2 py-1 rounded text-xs font-medium ${colorClasses[color]}`}>
        {status}
      </span>
    </div>
  );
};

export default Dashboard;