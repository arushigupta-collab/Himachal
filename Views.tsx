
import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Select, TextArea, Card, Badge, Accordion } from './UI';
import { User, Grievance, GrievanceStatus, TimelineEvent, UserRole, ChatbotData } from '../types';
import { MOCK_GRIEVANCES, DISTRICTS, CATEGORIES } from '../constants';

// --- FAQ Section ---
export const FAQSection: React.FC = () => {
  const faqs = [
    {
      title: "How do I file a grievance?",
      content: "You can file a grievance by clicking on the 'File a Grievance' button on the home page or your dashboard. You will need to provide a subject, category, district, location, and a detailed description of the issue. You can also upload relevant photos or documents."
    },
    {
      title: "What documents can I upload with my grievance?",
      content: "You can upload images (JPG, PNG) and PDF documents that support your complaint. This helps authorities understand the issue better."
    },
    {
      title: "How long does it usually take to resolve a grievance?",
      content: "The resolution time varies depending on the complexity of the issue and the department involved. However, most grievances are reviewed within 7 days, and you will receive updates at every stage."
    },
    {
      title: "How can I track the status of my grievance?",
      content: "Once logged in, you can view the status of all your submitted complaints in the 'Track Status' or 'Dashboard' section. You will see a timeline of actions taken."
    },
    {
      title: "Can I edit or reopen a grievance after submitting?",
      content: "You cannot edit a grievance once submitted to ensure the integrity of the record. However, if you are not satisfied with the resolution, you can add a reply requesting to reopen the case, or file a new grievance linking to the previous ID."
    },
    {
      title: "Is my personal information secure on this portal?",
      content: "Yes, your personal information is secure. We only share necessary details with the concerned department for the purpose of resolving your grievance. You can also choose to file anonymously if you prefer."
    }
  ];

  return (
    <div className="bg-gray-50 py-16" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gov-dark mb-8">Frequently Asked Questions</h2>
        <Accordion items={faqs} />
      </div>
    </div>
  );
};

// --- Home View ---
export const HomeView: React.FC<{ onFileGrievance: () => void; onTrack: () => void }> = ({ onFileGrievance, onTrack }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-gov-blue text-white overflow-hidden">
        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Text Content - Aligned Left */}
            <div className="w-full md:w-1/2 text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                Jan Sunwai, <br />
                Jan Samadhan
              </h1>
              <p className="text-xl mb-8 text-blue-100 max-w-lg drop-shadow-md leading-relaxed">
                The official Grievance Portal for the citizens of Himachal Pradesh.
                Transparent, Efficient, and Accountable Governance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" size="lg" onClick={onFileGrievance}>
                  File a Grievance
                </Button>
                {/* Note: Tracking now typically redirects to login if not authenticated, managed by parent */}
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-gov-blue" onClick={onTrack}>
                  Track Status
                </Button>
              </div>
            </div>

            {/* Image Content - Aligned Right */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-end mt-8 md:mt-0">
              <img
                src="https://i.ibb.co/tTdNfDGY/anurag.jpg"
                alt="Sh. Anurag Singh Thakur – Minister of Youth Affairs & Sports"
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-xl shadow-lg"
                loading="lazy"
              />
              <div className="mt-4 text-center md:text-right">
                <p className="text-white font-bold text-lg leading-none text-shadow">Sh. Anurag Singh Thakur</p>
                <p className="text-xs text-blue-100 font-semibold uppercase tracking-wider mt-1">Minister of Youth Affairs & Sports</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-30 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white -mt-8 rounded-t-xl shadow-lg md:bg-transparent md:shadow-none md:mt-0">
        <Card className="text-center py-8 border-t-4 border-gov-accent">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-bold mb-2">Register Grievance</h3>
          <p className="text-gray-600 mb-4">Lodge your complaint easily with our step-by-step process.</p>
        </Card>
        <Card className="text-center py-8 border-t-4 border-gov-success">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2">Track Status</h3>
          <p className="text-gray-600 mb-4">Get real-time updates on the progress of your resolution.</p>
        </Card>
        <Card className="text-center py-8 border-t-4 border-gov-blue">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="text-xl font-bold mb-2">Redressal</h3>
          <p className="text-gray-600 mb-4">Timely resolution by designated Nodal Officers.</p>
        </Card>
      </div>

      {/* FAQ Section Integration */}
      <FAQSection />
    </div>
  );
};

// --- Citizen Dashboard ---
export const CitizenDashboard: React.FC<{ 
  user: User; 
  onNavigate: (view: 'file-grievance' | 'track' | 'grievance-details', data?: any) => void 
}> = ({ user, onNavigate }) => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0, reopened: 0 });

  useEffect(() => {
    const key = `hp_grievances_${user.mobile}`;
    const localGrievances = JSON.parse(localStorage.getItem(key) || "[]");
    const allGrievances = [...localGrievances, ...MOCK_GRIEVANCES];
    
    // Sort by date descending
    allGrievances.sort((a: Grievance, b: Grievance) => 
      new Date(b.dateFiled).getTime() - new Date(a.dateFiled).getTime()
    );
    
    setGrievances(allGrievances);

    // Calculate stats
    const statsCalc = allGrievances.reduce((acc: any, g: Grievance) => {
      acc.total++;
      if ([GrievanceStatus.RESOLVED, GrievanceStatus.CLOSED].includes(g.status as GrievanceStatus)) {
        acc.resolved++;
      } else if (g.status === GrievanceStatus.REOPENED) {
        acc.reopened++;
      } else {
        acc.open++;
      }
      return acc;
    }, { total: 0, open: 0, resolved: 0, reopened: 0 });

    setStats(statsCalc);
  }, [user.mobile]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case GrievanceStatus.SUBMITTED: return <Badge type="info">Submitted</Badge>;
      case GrievanceStatus.UNDER_REVIEW: return <Badge type="warning">Under Review</Badge>;
      case GrievanceStatus.CLOSED: return <Badge type="success">Closed</Badge>;
      default: return <Badge type="info">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-lg shadow-sm border-l-4 border-gov-blue p-6 mb-8">
        <h1 className="text-2xl font-bold text-gov-dark mb-1">Welcome back, {user.name}</h1>
        <p className="text-gray-600">Here is a snapshot of your grievance activity.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-t-4 border-blue-500 text-center py-6">
          <h3 className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Total Grievances</h3>
          <p className="text-3xl font-bold text-gov-dark">{stats.total}</p>
        </Card>
        <Card className="border-t-4 border-yellow-500 text-center py-6">
          <h3 className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Open / In Progress</h3>
          <p className="text-3xl font-bold text-gov-dark">{stats.open}</p>
        </Card>
        <Card className="border-t-4 border-green-500 text-center py-6">
          <h3 className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Resolved</h3>
          <p className="text-3xl font-bold text-gov-dark">{stats.resolved}</p>
        </Card>
        <Card className="border-t-4 border-red-500 text-center py-6">
          <h3 className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Reopened</h3>
          <p className="text-3xl font-bold text-gov-dark">{stats.reopened}</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gov-dark mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => onNavigate('file-grievance')}>+ File New Grievance</Button>
          <Button variant="outline" onClick={() => onNavigate('track')}>View All Grievances</Button>
        </div>
      </div>

      {/* Recent Grievances */}
      <div>
        <h2 className="text-lg font-bold text-gov-dark mb-4">Recent Activity</h2>
        {grievances.length === 0 ? (
          <Card className="text-center py-10 bg-gray-50 border-dashed border-2 border-gray-300">
            <p className="text-gray-500 mb-4">You have not filed any grievances yet.</p>
            <Button variant="primary" onClick={() => onNavigate('file-grievance')}>File Your First Grievance</Button>
          </Card>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grievance ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Filed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {grievances.slice(0, 5).map(g => (
                    <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gov-blue">{g.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate" title={g.subject}>{g.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(g.dateFiled).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(g.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          className="text-gov-blue hover:text-blue-800 font-medium"
                          onClick={() => onNavigate('grievance-details', g)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {grievances.length > 5 && (
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right">
                <button className="text-sm text-gov-blue hover:underline" onClick={() => onNavigate('track')}>View all records &rarr;</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Chatbot Assistant ---
interface ChatMessage {
  sender: 'bot' | 'user';
  text?: string;
  isOptions?: boolean;
  options?: { label: string; action: () => void }[];
}

export const ChatbotAssistant: React.FC<{ 
  user: User | null; 
  onNavigate: (view: 'file-grievance' | 'track', data?: any) => void;
  onLogin: () => void;
}> = ({ user, onNavigate, onLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [mode, setMode] = useState<'MENU' | 'UPDATES' | 'FILE' | 'QNA'>('MENU');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // Reset chat when opened
  useEffect(() => {
    if (isOpen) {
      resetToMainMenu();
    }
  }, [isOpen]);

  const resetToMainMenu = () => {
    setMode('MENU');
    setMessages([
      { sender: 'bot', text: 'Namaste! I am HP Assist. How can I help you today?' },
      { 
        sender: 'bot', 
        isOptions: true, 
        options: [
          { label: 'Get updates on my filed grievances', action: () => handleOptionSelected('UPDATES') },
          { label: 'File a new grievance', action: () => handleOptionSelected('FILE') },
          { label: 'Other questions about this portal', action: () => handleOptionSelected('QNA') }
        ] 
      }
    ]);
  };

  const handleOptionSelected = (selectedMode: 'UPDATES' | 'FILE' | 'QNA') => {
    setMode(selectedMode);
    
    // Add user selection to chat history
    let label = '';
    if (selectedMode === 'UPDATES') label = 'Get updates on my grievances';
    if (selectedMode === 'FILE') label = 'File a new grievance';
    if (selectedMode === 'QNA') label = 'Other questions';
    
    setMessages(prev => [...prev, { sender: 'user', text: label }]);

    if (selectedMode === 'UPDATES') {
      handleUpdatesFlow();
    } else if (selectedMode === 'FILE') {
      handleFileFlow();
    } else if (selectedMode === 'QNA') {
      handleQnAFlow();
    }
  };

  const handleUpdatesFlow = () => {
    if (!user) {
      // Logged Out
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { sender: 'bot', text: 'You are not logged in. I can only show limited recent grievance data without login.' },
          { sender: 'bot', text: 'Demo Grievance 1: Road repair pending in Shimla – Status: In Progress' },
          { sender: 'bot', text: 'Demo Grievance 2: Water Supply Issue in Mandi – Status: Resolved' },
          { sender: 'bot', text: 'To view all your grievances and real data, please log in first.' },
          { 
            sender: 'bot', 
            isOptions: true, 
            options: [
              { label: 'Login to view all grievances', action: () => { setIsOpen(false); onLogin(); } },
              { label: 'Back to main options', action: resetToMainMenu }
            ] 
          }
        ]);
      }, 500);
    } else {
      // Logged In
      const key = `hp_grievances_${user.mobile}`;
      const localGrievances = JSON.parse(localStorage.getItem(key) || "[]");
      const allGrievances = [...localGrievances, ...MOCK_GRIEVANCES];
      const total = allGrievances.length;
      const inProgress = allGrievances.filter((g: any) => g.status === GrievanceStatus.IN_PROGRESS || g.status === GrievanceStatus.UNDER_REVIEW).length;
      const resolved = allGrievances.filter((g: any) => g.status === GrievanceStatus.RESOLVED || g.status === GrievanceStatus.CLOSED).length;
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          { sender: 'bot', text: `You have ${total} total grievances filed.` },
          { sender: 'bot', text: `${inProgress} are In Progress/Review, ${resolved} are Resolved.` },
        ]);

        if (allGrievances.length > 0) {
           const recent = allGrievances.slice(0, 3).map((g: any) => `ID: ${g.id}, ${g.subject.substring(0, 20)}... (${g.status})`).join('\n');
           setMessages(prev => [...prev, { sender: 'bot', text: "Recent:\n" + recent }]);
        }

        setMessages(prev => [
          ...prev, 
          { 
            sender: 'bot', 
            isOptions: true, 
            options: [
              { label: 'Open My Grievances', action: () => { setIsOpen(false); onNavigate('track'); } },
              { label: 'Back to main options', action: resetToMainMenu }
            ] 
          }
        ]);
      }, 500);
    }
  };

  const handleFileFlow = () => {
    if (!user) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: 'To file a new grievance, you need to log in first.' },
          { 
             sender: 'bot', 
             isOptions: true, 
             options: [
               { label: 'Login / Register now', action: () => { setIsOpen(false); onLogin(); } },
               { label: 'Back to main options', action: resetToMainMenu }
             ] 
          }
        ]);
      }, 500);
    } else {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: 'Great, let us file a new grievance.' },
          { 
             sender: 'bot', 
             isOptions: true, 
             options: [
               { label: 'Open Grievance Form', action: () => { setIsOpen(false); onNavigate('file-grievance'); } },
               { label: 'Back to main options', action: resetToMainMenu }
             ] 
          }
        ]);
      }, 500);
    }
  };

  const handleQnAFlow = () => {
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'You can ask me questions about how to use this portal (e.g., how to file, documents needed, tracking).' },
        { sender: 'bot', text: 'Go ahead, type your question below.' }
      ]);
    }, 500);
  };

  const handleSendInput = () => {
    if (!input.trim() || mode !== 'QNA') return;
    
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    const txt = input.toLowerCase();
    setInput('');

    setTimeout(() => {
      let reply = "I didn't quite understand that. Please ask about filing, tracking, or documents.";
      
      if (txt.includes('file') || txt.includes('filing')) {
        reply = "To file a grievance: 1. Login to the portal. 2. Click on 'File Grievance' in the dashboard. 3. Fill in the details and submit.";
      } else if (txt.includes('track') || txt.includes('status')) {
        reply = "To track a grievance: Go to your Dashboard and click 'View All Grievances'. You can see the realtime status there.";
      } else if (txt.includes('document') || txt.includes('photo') || txt.includes('upload')) {
        reply = "You can upload JPG, PNG images or PDF documents. Please ensure files are clear and relevant to your complaint.";
      } else if (txt.includes('secure') || txt.includes('data') || txt.includes('privacy')) {
        reply = "Your data is completely secure. We only share details with the assigned Nodal Officer for resolving the issue.";
      }

      setMessages(prev => [
        ...prev, 
        { sender: 'bot', text: reply },
        { 
          sender: 'bot', 
          isOptions: true, 
          options: [
            { label: 'Back to main options', action: resetToMainMenu }
          ] 
        }
      ]);
    }, 500);
  };

  return (
    <>
      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-gov-blue text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2 group"
            aria-label="Open Chatbot Assistant"
          >
            <span className="hidden group-hover:inline-block font-medium pr-1 whitespace-nowrap">Need help? Ask HP Assist</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </button>
        )}
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all max-h-[600px] h-[80vh]">
          {/* Header */}
          <div className="bg-gov-blue text-white p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
               <h3 className="font-bold">HP Assist</h3>
            </div>
            <div className="flex gap-2">
              {mode !== 'MENU' && (
                <button onClick={resetToMainMenu} className="text-xs bg-blue-800 hover:bg-blue-900 px-2 py-1 rounded">
                  Main Menu
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-200 text-lg">&times;</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.text && (
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm mb-1 ${
                    msg.sender === 'user' 
                      ? 'bg-gov-blue text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm whitespace-pre-line'
                  }`}>
                    {msg.text}
                  </div>
                )}
                
                {msg.isOptions && msg.options && (
                  <div className="flex flex-col gap-2 mt-1 w-full max-w-[85%]">
                    {msg.options.map((opt, optIdx) => (
                      <button 
                        key={optIdx}
                        onClick={opt.action}
                        className="bg-white border border-gov-blue text-gov-blue hover:bg-blue-50 text-sm font-medium py-2 px-3 rounded-lg text-left shadow-sm transition-colors"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t shrink-0">
             <div className="flex gap-2 relative">
                <input
                  className="flex-grow border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-gov-blue outline-none disabled:bg-gray-100 disabled:text-gray-400"
                  placeholder={mode === 'QNA' ? "Type your question..." : "Select an option above"}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendInput()}
                  disabled={mode !== 'QNA'}
                />
                <button 
                  onClick={handleSendInput} 
                  disabled={mode !== 'QNA' || !input.trim()}
                  className="bg-gov-blue text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- Auth Wizard ---
export const AuthWizard: React.FC<{ onAuthenticated: (user: User) => void }> = ({ onAuthenticated }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOTP = () => {
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleVerifyOTP = () => {
    if (otp === '1234') {
      // Mock authentication
      const user: User = {
        id: `USER-${mobile}`,
        name: "Citizen User", // In a real app, fetch name from profile
        role: UserRole.CITIZEN,
        mobile: mobile
      };
      onAuthenticated(user);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleDemoLogin = () => {
    const groUser: User = {
      id: 'GRO-001',
      name: 'Rajesh Kumar',
      role: UserRole.GRO,
      mobile: '9999999999'
    };
    onAuthenticated(groUser);
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-6 text-center text-gov-blue">Login to Grievance Portal</h2>
      
      {step === 1 ? (
        <>
          <Input 
            label="Mobile Number" 
            placeholder="Enter 10-digit mobile number" 
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
            maxLength={10}
            error={error}
          />
          <Button fullWidth onClick={handleSendOTP} className="mt-2">Get OTP</Button>
          
          <div className="mt-6 text-center pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">For Testing Purposes:</p>
            <button onClick={handleDemoLogin} className="text-xs text-gov-blue underline">
              (Demo Only) Login as Nodal Officer
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4 bg-blue-50 p-3 rounded text-sm text-blue-800">
            OTP sent to {mobile}. Use <strong>1234</strong> for testing.
          </div>
          <Input 
            label="Enter OTP" 
            placeholder="X X X X" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={4}
            error={error}
          />
          <Button fullWidth onClick={handleVerifyOTP} className="mt-2">Verify & Login</Button>
          <button 
            onClick={() => setStep(1)} 
            className="w-full text-center mt-4 text-sm text-gray-500 hover:text-gov-blue"
          >
            Change Mobile Number
          </button>
        </>
      )}
    </div>
  );
};

// --- File Grievance View ---
export const FileGrievanceView: React.FC<{ onSubmit: (data: any) => void; initialData?: ChatbotData }> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    district: '',
    location: '',
    description: '',
    isAnonymized: false,
    files: null as FileList | null
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        subject: initialData.subject || prev.subject,
        description: initialData.description || prev.description,
        category: initialData.category || prev.category,
        district: initialData.district || prev.district
      }));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gov-dark">File a New Grievance</h2>
      {initialData && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-6 text-sm flex items-center gap-2">
          <span>✨ Form pre-filled from HP Assist chat. Please review and add location details.</span>
        </div>
      )}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Grievance Subject" 
            placeholder="Brief title of your complaint" 
            required
            value={formData.subject}
            onChange={e => setFormData({...formData, subject: e.target.value})}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select 
              label="Grievance Category" 
              options={CATEGORIES}
              placeholder="Select Category"
              required
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            />
            <Select 
              label="District" 
              options={DISTRICTS} 
              placeholder="Select District"
              required
              value={formData.district}
              onChange={e => setFormData({...formData, district: e.target.value})}
            />
          </div>

          <Input 
            label="Specific Location / Address" 
            placeholder="Ward number, Village, Landmark..." 
            required
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
          />

          <TextArea 
            label="Detailed Description" 
            placeholder="Please describe your issue in detail..." 
            rows={5}
            required
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Attach Photos/Documents (Optional)</label>
            <input 
              type="file" 
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-gov-blue hover:file:bg-blue-100"
              onChange={e => setFormData({...formData, files: e.target.files})}
            />
          </div>

          <div className="flex items-center gap-2 py-2">
            <input 
              type="checkbox" 
              id="anon" 
              checked={formData.isAnonymized}
              onChange={e => setFormData({...formData, isAnonymized: e.target.checked})}
              className="w-4 h-4 text-gov-blue rounded focus:ring-gov-blue"
            />
            <label htmlFor="anon" className="text-sm text-gray-700">File this grievance anonymously</label>
          </div>

          <div className="pt-4">
            <Button type="submit" fullWidth size="lg">Submit Grievance</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

// --- Track Grievance View ---
export const TrackGrievanceView: React.FC<{ 
  user: User; 
  onViewDetails: (g: Grievance) => void;
  onBackToDashboard: () => void;
}> = ({ user, onViewDetails, onBackToDashboard }) => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);

  useEffect(() => {
    // Load user's local grievances
    const key = `hp_grievances_${user.mobile}`;
    const localGrievances = JSON.parse(localStorage.getItem(key) || "[]");
    
    // Combine with Mock data for demonstration purposes
    // In a real app, this would be an API call fetching by user ID
    const allGrievances = [...localGrievances, ...MOCK_GRIEVANCES];
    
    // Sort by date descending
    allGrievances.sort((a: Grievance, b: Grievance) => 
      new Date(b.dateFiled).getTime() - new Date(a.dateFiled).getTime()
    );
    
    setGrievances(allGrievances);
  }, [user.mobile]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case GrievanceStatus.SUBMITTED: return 'info';
      case GrievanceStatus.UNDER_REVIEW: return 'warning';
      case GrievanceStatus.CLOSED: return 'success';
      default: return 'info';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
         <Button variant="ghost" className="pl-0 text-gray-600 hover:text-gov-blue" onClick={onBackToDashboard}>
            &larr; Back to Dashboard
         </Button>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gov-dark">My Grievances</h2>
      
      {grievances.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No grievances found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {grievances.map(g => (
            <Card key={g.id} onClick={() => onViewDetails(g)} className="cursor-pointer hover:border-gov-blue transition-all">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">{g.id}</span>
                    <span className="text-xs text-gray-500">{new Date(g.dateFiled).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gov-dark">{g.subject}</h3>
                </div>
                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
                   <Badge type={getStatusColor(g.status)}>{g.status}</Badge>
                   <span className="text-gov-blue text-sm font-medium">View Details &rarr;</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Grievance Details View ---
export const GrievanceDetailsView: React.FC<{ 
  grievance: Grievance; 
  onBack: () => void;
  onReply: (msg: string) => void;
}> = ({ grievance, onBack, onReply }) => {
  const [replyText, setReplyText] = useState('');

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    onReply(replyText);
    setReplyText('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4 pl-0">
        &larr; Back to List
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gov-dark mb-1">{grievance.subject}</h1>
                <p className="text-sm text-gray-500">Filed on {new Date(grievance.dateFiled).toLocaleDateString()} • ID: {grievance.id}</p>
              </div>
              <Badge type={
                grievance.status === GrievanceStatus.CLOSED ? 'success' : 
                grievance.status === GrievanceStatus.UNDER_REVIEW ? 'warning' : 'info'
              }>
                {grievance.status}
              </Badge>
            </div>

            {/* Dynamic Status Details */}
            {grievance.status === GrievanceStatus.UNDER_REVIEW && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <h4 className="text-sm font-bold text-yellow-800 uppercase mb-1">Current Status</h4>
                <p className="text-sm text-yellow-900">Your grievance is currently under review.</p>
                {grievance.assignedOfficer && (
                  <div className="mt-2 pt-2 border-t border-yellow-200">
                    <p className="text-xs font-semibold text-yellow-800">Assigned Nodal Officer:</p>
                    <p className="text-sm font-medium text-gov-dark">{grievance.assignedOfficer}</p>
                  </div>
                )}
              </div>
            )}

            {grievance.status === GrievanceStatus.CLOSED && (
               <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <h4 className="text-sm font-bold text-green-800 uppercase mb-1">Case Closed</h4>
                {grievance.resolution && (
                   <div className="mb-3">
                     <p className="text-xs font-semibold text-green-800">Final Resolution:</p>
                     <p className="text-sm text-gray-800 italic">"{grievance.resolution}"</p>
                   </div>
                )}
                {grievance.closingOfficer && (
                  <div className="pt-2 border-t border-green-200">
                    <p className="text-xs font-semibold text-green-800">Closed By Nodal Officer:</p>
                    <p className="text-sm font-medium text-gov-dark">{grievance.closingOfficer}</p>
                  </div>
                )}
              </div>
            )}

            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap mb-4">{grievance.description}</p>
              
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-semibold">District:</span> {grievance.district}</div>
                <div><span className="font-semibold">Category:</span> {grievance.category}</div>
                <div><span className="font-semibold">Location:</span> {grievance.location}</div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-4">Discussion & Updates</h3>
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
              {grievance.replies.length === 0 ? (
                <p className="text-gray-500 text-sm text-center italic">No remarks yet.</p>
              ) : (
                grievance.replies.map((reply, idx) => (
                  <div key={idx} className={`p-3 rounded ${reply.author === 'You' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'}`}>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span className="font-bold">{reply.author}</span>
                      <span>{new Date(reply.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-800">{reply.message}</p>
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <input 
                className="flex-grow border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-gov-blue outline-none"
                placeholder="Add a remark or query..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
              />
              <Button size="sm" onClick={handleSendReply} disabled={grievance.status === GrievanceStatus.CLOSED}>Send</Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Timeline</h3>
            <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
              {grievance.timeline.map((event, idx) => (
                <div key={idx} className="relative pl-6">
                  <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${
                    event.status === 'completed' ? 'bg-gov-success border-gov-success' : 
                    event.status === 'current' ? 'bg-white border-gov-accent' : 'bg-gray-200 border-gray-300'
                  }`}></span>
                  <p className="font-medium text-sm">{event.label}</p>
                  <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- GRO Dashboard (Placeholder) ---
export const GRODashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Nodal Officer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-blue-500">
           <h3 className="text-gray-500 text-sm">Total Grievances</h3>
           <p className="text-2xl font-bold">142</p>
        </Card>
        <Card className="border-l-4 border-yellow-500">
           <h3 className="text-gray-500 text-sm">Pending</h3>
           <p className="text-2xl font-bold">28</p>
        </Card>
        <Card className="border-l-4 border-green-500">
           <h3 className="text-gray-500 text-sm">Resolved</h3>
           <p className="text-2xl font-bold">114</p>
        </Card>
      </div>
      <Card>
        <p className="text-center text-gray-500 py-10">Select a grievance to view details and take action.</p>
      </Card>
    </div>
  );
};
