import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, XCircle, AlertTriangle, Shield, Zap } from 'lucide-react';

const PasswordChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const strength = password ? checkPasswordStrength(password) : { score: 0, level: 'Very Weak', color: 'text-red-400', checks: [] };

  const checkPasswordStrength = (pwd) => {
    let score = 0;
    const checks = [];

    if (pwd.length >= 8) {
      score += 20;
      checks.push({ text: 'At least 8 characters', passed: true });
    } else {
      checks.push({ text: 'At least 8 characters', passed: false });
    }

    if (/[A-Z]/.test(pwd)) {
      score += 20;
      checks.push({ text: 'Contains uppercase letter', passed: true });
    } else {
      checks.push({ text: 'Contains uppercase letter', passed: false });
    }

    if (/[a-z]/.test(pwd)) {
      score += 15;
      checks.push({ text: 'Contains lowercase letter', passed: true });
    } else {
      checks.push({ text: 'Contains lowercase letter', passed: false });
    }

    if (/\d/.test(pwd)) {
      score += 20;
      checks.push({ text: 'Contains number', passed: true });
    } else {
      checks.push({ text: 'Contains number', passed: false });
    }

    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) {
      score += 15;
      checks.push({ text: 'Contains special character', passed: true });
    } else {
      checks.push({ text: 'Contains special character', passed: false });
    }

    const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein', 'welcome', 'monkey', '123456789', 'password1'];
    if (commonPasswords.includes(pwd.toLowerCase())) {
      score = Math.max(0, score - 40);
      checks.push({ text: 'Not a common password', passed: false });
    } else {
      checks.push({ text: 'Not a common password', passed: true });
    }

    if (/(.)\1{2,}/.test(pwd) || /123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/.test(pwd.toLowerCase())) {
      score = Math.max(0, score - 20);
      checks.push({ text: 'No sequential characters', passed: false });
    } else {
      checks.push({ text: 'No sequential characters', passed: true });
    }

    if (pwd.length >= 12) {
      score += 10;
    }

    let level, color;
    if (score >= 90) {
      level = 'Very Strong';
      color = 'text-green-400';
    } else if (score >= 70) {
      level = 'Strong';
      color = 'text-green-400';
    } else if (score >= 50) {
      level = 'Medium';
      color = 'text-yellow-400';
    } else if (score >= 30) {
      level = 'Weak';
      color = 'text-orange-400';
    } else {
      level = 'Very Weak';
      color = 'text-red-400';
    }

    return { score: Math.min(100, score), level, color, checks };
  };



  const getStrengthBarColor = (score) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    if (score >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(14,165,233,0.14),transparent_30%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.1),transparent_40%)] pointer-events-none" />

      <nav className="relative z-10 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center shadow-xl">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Zoderise</p>
                <h1 className="text-lg font-semibold text-white">Password Command Center</h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
              <Link to="/study" className="hover:text-white transition">Study</Link>
              <Link to="/quiz" className="hover:text-white transition">Quiz</Link>
              <Link to="/python" className="hover:text-white transition">Python Lab</Link>
              <Link to="/kali" className="hover:text-white transition">Kali Tools</Link>
              <Link to="/phishing" className="hover:text-white transition">Phishing</Link>
              <Link to="/password-checker" className="text-cyan-300 font-medium">Password</Link>
              <Link to="/upgrade" className="hover:text-white transition">Upgrade</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 xl:grid-cols-[1.4fr_1fr]"
        >
          <section className="space-y-8">
            <div className="rounded-[32px] border border-slate-800/70 bg-slate-900/80 backdrop-blur-2xl p-8 shadow-2xl shadow-slate-950/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Security Insight</p>
                  <h2 className="text-4xl font-semibold text-white">Password Risk Analysis</h2>
                  <p className="mt-2 text-slate-400 max-w-2xl">Evaluate password strength instantly, identify weak patterns, and follow secure recommendations for a hardened account posture.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950/70 border border-slate-800/70 p-5">
                    <p className="text-sm text-slate-400">Current Score</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{strength.score}/100</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/70 border border-slate-800/70 p-5">
                    <p className="text-sm text-slate-400">Security Rating</p>
                    <p className={`mt-3 text-3xl font-semibold ${strength.color}`}>{strength.level}</p>
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-950/70 border border-slate-800/70 p-5">
                  <p className="text-sm text-slate-400 mb-3">Password Input</p>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Type a password to inspect..."
                      className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 py-4 px-5 pr-14 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {password && (
                  <div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl bg-slate-950/70 border border-slate-800/70 p-5"
                  >
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-400">Strength bar</p>
                        <div className="mt-3 w-full rounded-full bg-slate-800 h-3 overflow-hidden">
                          <div
                            className={`h-3 rounded-full transition-all duration-300 ${getStrengthBarColor(strength.score)}`}
                            style={{ width: `${strength.score}%` }}
                          />
                        </div>
                      </div>
                      <span className={`text-sm font-semibold ${strength.color}`}>{strength.level}</span>
                    </div>

                    <div className="grid gap-3">
                      {strength.checks.map((check, index) => (
                        <div key={index} className="flex items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/80 px-4 py-3">
                          {check.passed ? (
                            <CheckCircle className="h-5 w-5 text-emerald-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-amber-400" />
                          )}
                          <span className={check.passed ? 'text-slate-100' : 'text-slate-400'}>{check.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid gap-4 xl:grid-cols-3"
            >
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800/70 p-6 shadow-xl shadow-slate-950/20">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm text-slate-400">Entropy Focus</p>
                </div>
                <p className="text-white text-sm">Prioritize longer passphrases with varied character sets to maximize entropy and slow attackers.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800/70 p-6 shadow-xl shadow-slate-950/20">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm text-slate-400">Reuse Avoidance</p>
                </div>
                <p className="text-white text-sm">Never reuse passwords across services. A single breach can compromise multiple accounts.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 border border-slate-800/70 p-6 shadow-xl shadow-slate-950/20">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <p className="text-sm text-slate-400">Common Pattern Scan</p>
                </div>
                <p className="text-white text-sm">Avoid sequential strings, known weak phrases, and context-based patterns like birthdays or names.</p>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-[32px] border border-slate-800/70 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Quick Security Brief</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Strengthen your account perimeter</h3>
              <p className="mt-3 text-slate-400 text-sm leading-6">
                Use this checker as the first line of defense. Combine secure passwords with multi-factor authentication and a trusted password manager.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-slate-950/70 border border-slate-800/70 p-4">
                  <p className="text-slate-400 text-sm">Recommended baseline</p>
                  <p className="mt-2 text-white text-lg font-semibold">12+ chars • mixed charset • unique</p>
                </div>
                <div className="rounded-3xl bg-slate-950/70 border border-slate-800/70 p-4">
                  <p className="text-slate-400 text-sm">Tip</p>
                  <p className="mt-2 text-white text-lg font-semibold">Use a passphrase you can remember, not a password you can guess.</p>
                </div>
              </div>
            </div>

            <div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-[32px] border border-slate-800/70 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <h4 className="text-lg font-semibold text-white">Security Reminder</h4>
              </div>
              <p className="text-slate-400 text-sm leading-6">
                Do not use this tool for live credential entry on untrusted machines. Always validate the environment before testing sensitive secrets.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PasswordChecker;

