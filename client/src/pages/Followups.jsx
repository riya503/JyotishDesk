import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarClock, 
  User, 
  Copy, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import PageHeader from '../components/Common/PageHeader';
import Button from '../components/Common/Button';
import StatusBadge from '../components/Common/StatusBadge';
import followupService from '../services/followupService';
import toast from 'react-hot-toast';

export default function Followups() {
  const navigate = useNavigate();
  const [followups, setFollowups] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowups = async () => {
      try {
        const data = await followupService.getFollowups();
        setFollowups(data);
        if (data.length > 0) {
          setSelectedId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching followups:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowups();
  }, []);

  const selectedFollowup = followups.find(f => f.id === selectedId);

  const handleCopy = () => {
    if (selectedFollowup) {
      navigator.clipboard.writeText(selectedFollowup.aiMessage);
      setCopied(true);
      toast.success('Message copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendEmail = async () => {
    setEmailStatus('sending');
    try {
      await followupService.sendReminderEmail(selectedId);
      setEmailStatus('sent');
      setFollowups(prev => prev.map(f => f.id === selectedId ? { ...f, emailSent: true } : f));
      toast.success('Reminder email sent successfully!');
      setTimeout(() => setEmailStatus(''), 3000);
    } catch (error) {
      console.error("Error updating email status:", error);
      toast.error(error.response?.data?.error || 'Failed to send reminder email.');
      setEmailStatus('');
    }
  };

  const handleComplete = async () => {
    try {
      await followupService.updateFollowup(selectedId, { status: 'Completed' });
      setFollowups(prev => prev.map(f => f.id === selectedId ? { ...f, status: 'Completed' } : f));
    } catch (error) {
      console.error("Error marking followup as completed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <PageHeader 
        title="Follow-up Dashboard" 
        description="Manage client check-ins, generate outreach messages, and automate notifications."
      />

      {/* Main Dual-Panel Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch flex-1">
        
        {/* Left Panel: Follow-up Queue */}
        <div className="lg:col-span-1 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl overflow-hidden flex flex-col max-h-[600px]">
          <div className="px-5 py-4 border-b border-gray-200 dark:border-[#2A2A2A] bg-gray-100 dark:bg-[#1A1A1A]/30">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Pending Outreach Queue</h3>
          </div>
          
          <div className="overflow-y-auto flex-1 divide-y divide-[#2A2A2A]">
            {loading ? (
              <div className="p-6 text-center text-xs text-gray-500 dark:text-gray-400">Loading follow-ups...</div>
            ) : followups.map((f) => {
              const isOverdue = new Date(f.dueDate) < new Date() && f.status === 'Pending';
              return (
                <div 
                  key={f.id}
                  onClick={() => setSelectedId(f.id)}
                  className={`p-4 flex flex-col gap-2 hover:bg-gray-100 dark:bg-[#1A1A1A]/30 transition-all cursor-pointer ${selectedId === f.id ? 'bg-gray-100 dark:bg-[#1A1A1A]/60 border-l-2 border-[#8B5CF6]' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{f.clientName}</h4>
                    <StatusBadge status={f.status} />
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <CalendarClock className="w-3.5 h-3.5" />
                      {f.dueDate}
                    </span>
                    {isOverdue && (
                      <span className="text-[#EF4444] font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Overdue
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            {!loading && followups.length === 0 && (
              <div className="p-6 text-center text-xs text-gray-500 dark:text-gray-400">No pending follow-ups.</div>
            )}
          </div>
        </div>

        {/* Right Panel: Outreach Message Detail / Editor */}
        <div className="lg:col-span-2 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6 flex flex-col justify-between max-h-[600px]">
          {selectedFollowup ? (
            <div className="flex flex-col gap-6 h-full justify-between">
              
              {/* Header profile details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-200 dark:border-[#2A2A2A]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 
                      onClick={() => navigate(`/dashboard/clients/${selectedFollowup.clientId}`)}
                      className="text-base font-bold text-gray-900 dark:text-white hover:text-[#8B5CF6] cursor-pointer flex items-center gap-1.5 transition-colors"
                    >
                      {selectedFollowup.clientName}
                      <ExternalLink className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Due Date: {selectedFollowup.dueDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {selectedFollowup.emailSent && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]">
                      Email Sent
                    </span>
                  )}
                  <StatusBadge status={selectedFollowup.status} />
                </div>
              </div>

              {/* Message display panel */}
              <div className="flex-1 flex flex-col gap-3 my-4">
                <h4 className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wide flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  AI-Generated Follow-up Message
                </h4>
                
                <div className="flex-1 bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-5 text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed whitespace-pre-wrap select-all focus:outline-none focus:border-[#8B5CF6] overflow-y-auto">
                  {selectedFollowup.aiMessage}
                </div>
              </div>

              {/* Actions row */}
              <div className="flex flex-wrap justify-between items-center gap-4 pt-5 border-t border-gray-200 dark:border-[#2A2A2A]">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="secondary" 
                    onClick={handleCopy}
                    icon={<Copy className="w-4 h-4" />}
                  >
                    {copied ? 'Copied!' : 'Copy Template'}
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    onClick={handleSendEmail}
                    disabled={emailStatus === 'sending' || selectedFollowup.status === 'Completed'}
                    icon={<Send className="w-4 h-4" />}
                  >
                    {emailStatus === 'sending' && 'Sending...'}
                    {emailStatus === 'sent' && 'Sent Successfully!'}
                    {emailStatus === '' && 'Send Reminder Email'}
                  </Button>
                </div>
                
                {selectedFollowup.status === 'Pending' && (
                  <Button 
                    onClick={handleComplete}
                    icon={<CheckCircle2 className="w-4.5 h-4.5" />}
                  >
                    Mark as Completed
                  </Button>
                )}
              </div>

            </div>
          ) : (
            <div className="text-center py-24 text-sm text-gray-500 dark:text-gray-400">
              Select a follow-up check-in from the list.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
