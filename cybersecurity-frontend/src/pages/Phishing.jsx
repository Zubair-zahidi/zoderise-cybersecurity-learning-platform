import { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle, Search, Shield } from 'lucide-react';

const Phishing = () => {
  const [emailContent, setEmailContent] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeEmail = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const result = analyzePhishingIndicators(emailContent);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const analyzePhishingIndicators = (content) => {
    const indicators = [];
    let score = 0;
    const maxScore = 100;

    // Check for suspicious sender patterns
    if (content.toLowerCase().includes('urgent') || content.toLowerCase().includes('immediate action')) {
      indicators.push({
        type: 'warning',
        title: 'Urgency Language',
        description: 'Email creates false sense of urgency to pressure quick action',
        severity: 'high'
      });
      score += 20;
    }

    // Check for suspicious links
    const linkRegex = /https?:\/\/[^\s]+/g;
    const links = content.match(linkRegex) || [];
    const suspiciousLinks = links.filter(link => 
      link.includes('bit.ly') || 
      link.includes('tinyurl') || 
      link.includes('goo.gl') ||
      link.includes('suspicious-domain')
    );

    if (suspiciousLinks.length > 0) {
      indicators.push({
        type: 'danger',
        title: 'Suspicious Links',
        description: `Found ${suspiciousLinks.length} potentially malicious link(s)`,
        severity: 'high'
      });
      score += 25;
    }

    // Check for generic greetings
    if (content.toLowerCase().includes('dear user') || 
        content.toLowerCase().includes('hello customer') ||
        content.toLowerCase().includes('valued customer')) {
      indicators.push({
        type: 'warning',
        title: 'Generic Greeting',
        description: 'Uses impersonal greeting instead of your name',
        severity: 'medium'
      });
      score += 10;
    }

    // Check for password requests
    if (content.toLowerCase().includes('password') && 
        (content.toLowerCase().includes('verify') || 
         content.toLowerCase().includes('update') ||
         content.toLowerCase().includes('confirm'))) {
      indicators.push({
        type: 'danger',
        title: 'Password Request',
        description: 'Asks for password verification or update',
        severity: 'high'
      });
      score += 30;
    }

    // Check for attachment requests
    if (content.toLowerCase().includes('attachment') || 
        content.toLowerCase().includes('.exe') ||
        content.toLowerCase().includes('.zip')) {
      indicators.push({
        type: 'warning',
        title: 'Suspicious Attachments',
        description: 'May contain malware or executable files',
        severity: 'medium'
      });
      score += 15;
    }

    // Check for poor grammar
    const grammarIssues = (content.match(/[^\w\s]/g) || []).length;
    if (grammarIssues > content.split(' ').length * 0.1) {
      indicators.push({
        type: 'info',
        title: 'Grammar Check',
        description: 'Review for unusual punctuation or formatting',
        severity: 'low'
      });
      score += 5;
    }

    const riskLevel = score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low';
    
    return {
      score,
      riskLevel,
      indicators,
      summary: score >= 70 
        ? 'High risk of phishing. Do not click links or provide information.'
        : score >= 40 
        ? 'Medium risk. Verify sender and content before taking action.'
        : 'Low risk, but always stay vigilant.'
    };
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  const getIndicatorIcon = (type) => {
    switch (type) {
      case 'danger': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info': return <Shield className="w-5 h-5 text-blue-400" />;
      default: return <CheckCircle className="w-5 h-5 text-green-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-8 h-8 text-cyan-400" />
          <h1 className="text-3xl font-bold text-white">Phishing Simulator</h1>
        </div>
        <p className="text-slate-400 mb-8">Analyze suspicious emails for phishing indicators and learn to spot scams</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Email Input */}
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Email Content</h2>
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Paste the suspicious email content here..."
                className="w-full h-64 bg-slate-950 border border-slate-700 rounded-lg p-4 text-white resize-none focus:border-cyan-500 focus:outline-none"
              />
              <button
                onClick={analyzeEmail}
                disabled={!emailContent.trim() || isAnalyzing}
                className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Analyze Email
                  </>
                )}
              </button>
            </div>

            {/* Sample Emails */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Sample Emails</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setEmailContent(`Subject: Urgent: Your Account Has Been Suspended

Dear Valued Customer,

Your account has been temporarily suspended due to suspicious activity. To restore access immediately, please click the link below and verify your identity:

https://secure-bank-login.com/verify?user=12345

If you do not verify within 24 hours, your account will be permanently closed.

Best regards,
Bank Security Team`)}
                  className="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition text-slate-300 text-sm"
                >
                  Bank Account Suspension Scam
                </button>
                <button
                  onClick={() => setEmailContent(`Subject: Your Package Delivery Update

Hello John,

Your package is ready for delivery. Please confirm your delivery address and payment method by clicking here:

http://amazon-delivery-update.com/track/ABC123

Thank you for shopping with us!

Amazon Delivery Team`)}
                  className="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition text-slate-300 text-sm"
                >
                  Fake Package Delivery
                </button>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="space-y-4">
            {analysis ? (
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`text-2xl font-bold ${getRiskColor(analysis.riskLevel)}`}>
                    {analysis.score}/100
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${getRiskColor(analysis.riskLevel)}`}>
                      {analysis.riskLevel.toUpperCase()} RISK
                    </div>
                    <div className="text-slate-400 text-xs">Phishing Score</div>
                  </div>
                </div>

                <p className="text-slate-300 mb-6">{analysis.summary}</p>

                <div className="space-y-3">
                  <h3 className="text-white font-semibold">Detected Indicators:</h3>
                  {analysis.indicators.length > 0 ? (
                    analysis.indicators.map((indicator, index) => (
                      <div key={index} className="flex gap-3 p-3 bg-slate-800 rounded-lg">
                        {getIndicatorIcon(indicator.type)}
                        <div>
                          <div className="text-white font-medium text-sm">{indicator.title}</div>
                          <div className="text-slate-400 text-xs">{indicator.description}</div>
                          <div className={`text-xs mt-1 ${
                            indicator.severity === 'high' ? 'text-red-400' :
                            indicator.severity === 'medium' ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            Severity: {indicator.severity}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
                      <p className="text-slate-400">No suspicious indicators detected</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
                <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-slate-400">Paste an email and click "Analyze Email" to check for phishing indicators</p>
              </div>
            )}

            {/* Educational Tips */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Phishing Prevention Tips</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Verify sender email addresses carefully</li>
                <li>• Hover over links before clicking (don't click suspicious ones)</li>
                <li>• Never provide passwords or personal info via email</li>
                <li>• Look for poor grammar and urgent language</li>
                <li>• Use antivirus software with email scanning</li>
                <li>• Enable two-factor authentication</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phishing;