import { useState } from 'react';
import { Terminal, Search, Cpu, Wifi, Globe, Shield, Database, Eye } from 'lucide-react';

const Kali = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = {
    reconnaissance: { icon: Eye, label: 'Reconnaissance', color: 'text-blue-400' },
    scanning: { icon: Search, label: 'Scanning', color: 'text-green-400' },
    exploitation: { icon: Shield, label: 'Exploitation', color: 'text-red-400' },
    wireless: { icon: Wifi, label: 'Wireless', color: 'text-purple-400' },
    web: { icon: Globe, label: 'Web Applications', color: 'text-cyan-400' },
    forensics: { icon: Database, label: 'Forensics', color: 'text-yellow-400' },
    system: { icon: Cpu, label: 'System', color: 'text-pink-400' }
  };

  const tools = [
    {
      name: "Nmap",
      category: "scanning",
      description: "Network discovery, port scanning, and service/version detection",
      commands: [
        "nmap -sV -O target.com  # Service and OS detection",
        "nmap -p- target.com     # Scan all ports",
        "nmap -A target.com      # Aggressive scan with scripts",
        "nmap -sS target.com     # SYN scan (stealth)"
      ],
      tips: "Use -T4 for faster scanning, --script for NSE scripts"
    },
    {
      name: "Metasploit Framework",
      category: "exploitation",
      description: "Comprehensive exploitation framework with thousands of exploits",
      commands: [
        "msfconsole              # Start Metasploit console",
        "search eternalblue      # Search for exploits",
        "use exploit/windows/smb/ms17_010_eternalblue",
        "show options           # Show required parameters",
        "exploit                # Run the exploit"
      ],
      tips: "Update with 'msfupdate', use 'db_nmap' for integrated scanning"
    },
    {
      name: "Burp Suite",
      category: "web",
      description: "Web vulnerability scanner and proxy for intercepting HTTP traffic",
      commands: [
        "burpsuite              # Start Burp Suite GUI",
        "burpsuite --headless   # Run in headless mode",
        "# Configure proxy in browser: 127.0.0.1:8080"
      ],
      tips: "Use Intruder for automated attacks, Repeater for manual testing"
    },
    {
      name: "Wireshark",
      category: "reconnaissance",
      description: "Network protocol analyzer for capturing and inspecting packets",
      commands: [
        "wireshark              # Start GUI",
        "tshark -i eth0 -w capture.pcap  # Command line capture",
        "tshark -r capture.pcap -Y 'http'  # Filter HTTP traffic"
      ],
      tips: "Use display filters like 'ip.src == 192.168.1.1'"
    },
    {
      name: "Aircrack-ng",
      category: "wireless",
      description: "Suite of tools for wireless network auditing and penetration testing",
      commands: [
        "airmon-ng start wlan0  # Enable monitor mode",
        "airodump-ng mon0       # Scan for networks",
        "airodump-ng -c 6 --bssid XX:XX:XX:XX:XX:XX -w capture mon0",
        "aircrack-ng -w wordlist.txt capture-01.cap"
      ],
      tips: "Requires compatible wireless adapter in monitor mode"
    },
    {
      name: "John the Ripper",
      category: "system",
      description: "Fast password cracker supporting multiple hash types",
      commands: [
        "john hash.txt          # Crack with default wordlist",
        "john --wordlist=rockyou.txt hash.txt",
        "john --format=md5 hash.txt",
        "john --show hash.txt   # Show cracked passwords"
      ],
      tips: "Use --fork for multi-core cracking, unshadow for passwd files"
    },
    {
      name: "Hydra",
      category: "system",
      description: "Fast network logon cracker supporting multiple protocols",
      commands: [
        "hydra -l admin -P passwords.txt ssh://target.com",
        "hydra -L users.txt -P pass.txt ftp://target.com",
        "hydra -l user -p pass http-post-form '/login:username=^USER^&password=^PASS^:Invalid'"
      ],
      tips: "Use -t for parallel connections, -V for verbose output"
    },
    {
      name: "Sqlmap",
      category: "web",
      description: "Automatic SQL injection and database takeover tool",
      commands: [
        "sqlmap -u 'http://target.com/vuln?id=1' --dbs",
        "sqlmap -u URL --dump-all  # Dump all databases",
        "sqlmap -u URL --os-shell  # Get OS shell",
        "sqlmap -u URL --batch     # Non-interactive mode"
      ],
      tips: "Use --level=5 --risk=3 for aggressive testing"
    },
    {
      name: "Nikto",
      category: "web",
      description: "Web server scanner for detecting vulnerabilities and misconfigurations",
      commands: [
        "nikto -h target.com     # Basic scan",
        "nikto -h target.com -p 80,443  # Specific ports",
        "nikto -h target.com -Tuning x  # XSS vulnerabilities only"
      ],
      tips: "Use -Format htm for HTML reports, -evasion for IDS evasion"
    },
    {
      name: "Volatility",
      category: "forensics",
      description: "Memory forensics framework for analyzing RAM dumps",
      commands: [
        "volatility -f memdump.raw imageinfo",
        "volatility -f memdump.raw --profile=Win7SP1x64 pslist",
        "volatility -f memdump.raw --profile=Win7SP1x64 hivelist",
        "volatility -f memdump.raw --profile=Win7SP1x64 hashdump"
      ],
      tips: "First run imageinfo to determine the correct profile"
    },
    {
      name: "Autopsy",
      category: "forensics",
      description: "Digital forensics platform for analyzing disk images",
      commands: [
        "autopsy                 # Start GUI",
        "# Or use command line tools:",
        "tsk_recover -a image.dd recovered/",
        "fls -r image.dd         # List files"
      ],
      tips: "Supports multiple file systems and carving"
    },
    {
      name: "GDB",
      category: "system",
      description: "GNU debugger for reverse engineering and exploit development",
      commands: [
        "gdb ./binary           # Start debugging",
        "break main             # Set breakpoint",
        "run                    # Execute program",
        "disassemble main       # Show assembly",
        "info registers         # Show register values"
      ],
      tips: "Use 'peda' or 'gef' plugins for enhanced features"
    },
    {
      name: "Radare2",
      category: "system",
      description: "Reverse engineering framework for binary analysis",
      commands: [
        "r2 binary              # Open binary",
        "aaa                    # Analyze all",
        "pdf @ main             # Disassemble main function",
        "iz                     # List strings",
        "V                     # Visual mode"
      ],
      tips: "Powerful for malware analysis and exploit development"
    }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
                         tool.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Terminal className="w-8 h-8 text-cyan-400" />
          <h1 className="text-3xl font-bold text-white">Kali Linux Tools</h1>
        </div>
        <p className="text-slate-400 mb-8">Essential cybersecurity tools and commands for penetration testing</p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-white"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              activeCategory === 'all'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Tools
          </button>
          {Object.entries(categories).map(([key, cat]) => {
            const Icon = cat.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition flex items-center gap-1 ${
                  activeCategory === key
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon className="w-3 h-3" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => {
            const Icon = categories[tool.category]?.icon || Terminal;
            const color = categories[tool.category]?.color || 'text-cyan-400';
            
            return (
              <div key={index} className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-cyan-500/30 transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${color}`} />
                    <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full bg-slate-800 ${color}`}>
                    {categories[tool.category]?.label}
                  </span>
                </div>
                
                <p className="text-slate-400 text-sm mb-4">{tool.description}</p>
                
                <div className="space-y-2 mb-4">
                  <h4 className="text-white font-medium text-sm">Common Commands:</h4>
                  {tool.commands.map((cmd, cmdIndex) => (
                    <code key={cmdIndex} className="block bg-slate-950 p-2 rounded text-xs text-cyan-400 font-mono">
                      {cmd}
                    </code>
                  ))}
                </div>
                
                <div className="bg-slate-800 rounded-lg p-3">
                  <h4 className="text-white font-medium text-sm mb-1">💡 Tip:</h4>
                  <p className="text-slate-300 text-xs">{tool.tips}</p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Terminal className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No tools found matching your criteria</p>
          </div>
        )}

        {/* Getting Started */}
        <div className="mt-12 bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Getting Started with Kali</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-medium mb-2">Installation</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Download from <a href="https://www.kali.org" className="text-cyan-400 hover:underline">kali.org</a></li>
                <li>• Use VirtualBox/VMware for virtual machine</li>
                <li>• Boot from USB for live environment</li>
                <li>• Default credentials: kali/kali</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-2">Best Practices</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Always work in a lab environment</li>
                <li>• Get written permission before testing</li>
                <li>• Keep tools updated: <code className="bg-slate-800 px-1 rounded">apt update && apt upgrade</code></li>
                <li>• Document your findings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kali;