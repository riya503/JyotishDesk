import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  Sparkles, 
  Plus,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import PageHeader from '../components/Common/PageHeader';
import Button from '../components/Common/Button';
import Timeline from '../components/Common/Timeline';
import StatusBadge from '../components/Common/StatusBadge';
import Modal from '../components/Common/Modal';
import Input from '../components/Common/Input';
import clientService from '../services/clientService';
import consultationService from '../services/consultationService';
import followupService from '../services/followupService';
import aiService from '../services/aiService';
import toast from 'react-hot-toast';

export default function ClientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('consultations');

  const [client, setClient] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [followups, setFollowups] = useState([]);
  const [remedies, setRemedies] = useState([]);
  const [insights, setInsights] = useState([]);
  const [insightsLoading, setInsightsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sendingSummaryId, setSendingSummaryId] = useState(null);

  const [generatingPdfId, setGeneratingPdfId] = useState(null);
  const [selectedConForPdf, setSelectedConForPdf] = useState(null);
  const pdfTemplateRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const clientData = await clientService.getClientById(id);
        setClient(clientData);

        const consData = await consultationService.getConsultationsByClient(id);
        setConsultations(consData);
        
        const fupData = await followupService.getFollowups();
        const clientFups = fupData.filter(f => f.clientId === id);
        setFollowups(clientFups);
        
        const clientRems = consData.flatMap(con => (con.remedies || []).map(r => ({ ...r, consultationId: con.id })));
        setRemedies(clientRems);
      } catch (error) {
        console.error("Error fetching client profile data:", error);
      } finally {
        setLoading(false);
      }
      
      try {
        setInsightsLoading(true);
        const aiInsightsData = await aiService.getClientInsights(id);
        setInsights(aiInsightsData);
      } catch (error) {
        console.error("Error fetching AI insights:", error);
        setInsights(["AI Insights temporarily unavailable."]);
      } finally {
        setInsightsLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  // Consultation Modal States
  const [conModalOpen, setConModalOpen] = useState(false);
  const [newCon, setNewCon] = useState({
    category: 'Career',
    notes: '',
    remedyName: '',
    remedyType: 'Gemstone',
    remedyDescription: ''
  });

  // Follow-up Modal States
  const [followModalOpen, setFollowModalOpen] = useState(false);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [newFollow, setNewFollow] = useState({
    dueDate: '',
    aiMessage: ''
  });

  const handleGenerateMessage = async () => {
    setIsGeneratingMessage(true);
    try {
      const generatedMsg = await aiService.generateFollowupMessage(client.id);
      setNewFollow(prev => ({ ...prev, aiMessage: generatedMsg }));
    } catch (error) {
      console.error("Error generating message:", error);
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(newFollow.aiMessage);
    toast.success('Message copied to clipboard!');
  };

  const handleSendSummary = async (consultationId) => {
    setSendingSummaryId(consultationId);
    try {
      await consultationService.sendSummaryEmail(consultationId);
      toast.success('Consultation summary sent to client!');
    } catch (error) {
      console.error("Error sending summary:", error);
      toast.error(error.response?.data?.error || 'Failed to send summary.');
    } finally {
      setSendingSummaryId(null);
    }
  };

  const handleDownloadPdf = async (consultation) => {
    setGeneratingPdfId(consultation.id);
    setSelectedConForPdf(consultation);

    setTimeout(async () => {
      try {
        const element = pdfTemplateRef.current;
        if (!element) return;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${client.name.replace(/\s+/g, '_')}_Consultation_Report.pdf`);
        
        toast.success('PDF Downloaded successfully!');
      } catch (error) {
        console.error('Error generating PDF:', error);
        toast.error('Failed to generate PDF.');
      } finally {
        setGeneratingPdfId(null);
        setSelectedConForPdf(null);
      }
    }, 100);
  };

  const handleConInputChange = (e) => {
    const { name, value } = e.target;
    setNewCon(prev => ({ ...prev, [name]: value }));
  };

  const handleAddConsultation = async (e) => {
    e.preventDefault();
    
    const newRemediesList = [];
    if (newCon.remedyName) {
      newRemediesList.push({
        type: newCon.remedyType,
        name: newCon.remedyName,
        description: newCon.remedyDescription,
        status: 'Suggested'
      });
    }

    const conData = {
      clientId: client.id,
      clientName: client.name,
      category: newCon.category,
      notes: newCon.notes,
      remedies: newRemediesList
    };

    try {
      const addedSession = await consultationService.createConsultation(conData);
      setConsultations(prev => [addedSession, ...prev]);
      if (addedSession.remedies && addedSession.remedies.length > 0) {
        setRemedies(prev => [...prev, ...addedSession.remedies.map(r => ({ ...r, consultationId: addedSession.id }))]);
      }
      setConModalOpen(false);
      setNewCon({
        category: 'Career',
        notes: '',
        remedyName: '',
        remedyType: 'Gemstone',
        remedyDescription: ''
      });
    } catch (error) {
      console.error("Error creating consultation:", error);
    }
  };

  const handleAddFollowup = async (e) => {
    e.preventDefault();
    const followupData = {
      clientId: client.id,
      clientName: client.name,
      dueDate: newFollow.dueDate,
      aiMessage: newFollow.aiMessage
    };
    try {
      const addedFollowup = await followupService.createFollowup(followupData);
      setFollowups(prev => [addedFollowup, ...prev]);
      setFollowModalOpen(false);
      setNewFollow({ dueDate: '', aiMessage: '' });
    } catch (error) {
      console.error("Error creating followup:", error);
    }
  };

  const toggleRemedyStatus = async (consultationId, remedyId, currentStatus) => {
    const statusCycle = {
      Suggested: 'Follow-up Pending',
      'Follow-up Pending': 'Completed',
      Completed: 'Suggested'
    };
    const newStatus = statusCycle[currentStatus];
    try {
      await consultationService.updateRemedyStatus(consultationId, remedyId, newStatus);
      setRemedies(prev => 
        prev.map(r => r.id === remedyId ? { ...r, status: newStatus } : r)
      );
    } catch (error) {
      console.error("Error updating remedy status:", error);
    }
  };

  if (loading) return <div className="text-gray-900 dark:text-white p-6">Loading profile...</div>;
  if (!client) return <div className="text-gray-900 dark:text-white p-6">Client not found.</div>;

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Navigation header */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/dashboard/clients')}
          className="p-2 bg-white dark:bg-[#121212] hover:bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Back to Clients Directory
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Client Demographics & AI Insights */}
        <div className="flex flex-col gap-6">
          
          {/* Main Info Card */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6 flex flex-col gap-6">
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-200 dark:border-[#2A2A2A]">
              <div className="w-16 h-16 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] text-xl font-bold mb-4">
                {client.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{client.name}</h2>
              <span className="mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20">
                {client.problemCategory} Consultation
              </span>
            </div>

            {/* Demographics Details */}
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Date of Birth</div>
                  <div className="font-semibold">{client.dob}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Time of Birth</div>
                  <div className="font-semibold">{client.tob}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Place of Birth</div>
                  <div className="font-semibold">{client.pob}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 pt-4 border-t border-gray-200 dark:border-[#2A2A2A]">
                <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Phone</div>
                  <div className="font-semibold">{client.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Email</div>
                  <div className="font-semibold">{client.email || 'No Email Logged'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Client Insights Panel */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4.5 h-4.5 text-[#8B5CF6]" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">AI Kundli Insights</h3>
            </div>
            <div className="flex flex-col gap-3">
              {insightsLoading ? (
                <>
                  <div className="h-10 bg-gray-100 dark:bg-[#1A1A1A] animate-pulse rounded-lg border border-gray-200 dark:border-[#2A2A2A]"></div>
                  <div className="h-10 bg-gray-100 dark:bg-[#1A1A1A] animate-pulse rounded-lg border border-gray-200 dark:border-[#2A2A2A]"></div>
                  <div className="h-10 bg-gray-100 dark:bg-[#1A1A1A] animate-pulse rounded-lg border border-gray-200 dark:border-[#2A2A2A]"></div>
                </>
              ) : (
                insights.map((ins, index) => (
                  <div key={index} className="p-3 bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-xs text-gray-600 dark:text-gray-400 leading-relaxed flex items-start gap-2">
                    <span className="text-[#8B5CF6] mt-0.5">•</span>
                    <span>{ins}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Side: Navigation Tabs, Timelines, Remedies */}
        <div className="lg:col-span-2 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl overflow-hidden flex flex-col min-h-[500px]">
          
          {/* Tab selectors */}
          <div className="flex border-b border-gray-200 dark:border-[#2A2A2A] bg-gray-100 dark:bg-[#1A1A1A]/40">
            <button 
              onClick={() => setActiveTab('consultations')}
              className={`px-6 py-4.5 text-xs font-semibold border-b-2 uppercase tracking-wider transition-all ${activeTab === 'consultations' ? 'border-[#8B5CF6] text-gray-900 dark:text-white bg-white dark:bg-[#121212]' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white'}`}
            >
              Consultations ({consultations.length})
            </button>
            <button 
              onClick={() => setActiveTab('remedies')}
              className={`px-6 py-4.5 text-xs font-semibold border-b-2 uppercase tracking-wider transition-all ${activeTab === 'remedies' ? 'border-[#8B5CF6] text-gray-900 dark:text-white bg-white dark:bg-[#121212]' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white'}`}
            >
              Remedies ({remedies.length})
            </button>
            <button 
              onClick={() => setActiveTab('followups')}
              className={`px-6 py-4.5 text-xs font-semibold border-b-2 uppercase tracking-wider transition-all ${activeTab === 'followups' ? 'border-[#8B5CF6] text-gray-900 dark:text-white bg-white dark:bg-[#121212]' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white'}`}
            >
              Follow-ups ({followups.length})
            </button>
          </div>

          {/* Tab Panels */}
          <div className="p-6 flex-1 flex flex-col">
            
            {/* Consultations List Panel */}
            {activeTab === 'consultations' && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Consultation Logs</h3>
                  <Button 
                    variant="secondary" 
                    onClick={() => setConModalOpen(true)}
                    icon={<Plus className="w-4 h-4" />}
                  >
                    Add Log
                  </Button>
                </div>
                {consultations.length > 0 ? (
                  <Timeline 
                    items={consultations} 
                    onSendSummary={handleSendSummary}
                    sendingSummaryId={sendingSummaryId}
                    onDownloadPdf={handleDownloadPdf}
                  />
                ) : (
                  <div className="text-center text-sm py-12 text-gray-500 dark:text-gray-400">No consultations logged.</div>
                )}
              </div>
            )}

            {/* Remedies Checklist Panel */}
            {activeTab === 'remedies' && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Suggested Remedies</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Click status badge to toggle remedy progress.</p>
                  </div>
                </div>
                {remedies.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {remedies.map((rem) => (
                      <div key={rem.id} className="p-4 bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-xl flex items-center justify-between gap-4">
                        <div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 uppercase">
                            {rem.type}
                          </span>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mt-1.5">{rem.name}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{rem.description}</p>
                        </div>
                        <button 
                          onClick={() => toggleRemedyStatus(rem.consultationId, rem.id, rem.status)}
                          className="focus:outline-none transition-transform active:scale-95"
                        >
                          <StatusBadge status={rem.status} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-sm py-12 text-gray-500 dark:text-gray-400">No remedies currently prescribed. Add inside consultations.</div>
                )}
              </div>
            )}

            {/* Follow-ups Panel */}
            {activeTab === 'followups' && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Outreach Reminders</h3>
                  <Button 
                    variant="secondary" 
                    onClick={() => setFollowModalOpen(true)}
                    icon={<Plus className="w-4 h-4" />}
                  >
                    Schedule Follow-up
                  </Button>
                </div>
                {followups.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {followups.map((f) => (
                      <div key={f.id} className="p-4 bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-xl flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold flex items-center gap-1.5">
                              Due Date: <span className="text-gray-900 dark:text-white">{f.dueDate}</span>
                            </span>
                          </div>
                          <StatusBadge status={f.status} />
                        </div>
                        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-lg p-3 text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-mono flex items-start gap-2.5">
                          <MessageSquare className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                          <span>{f.aiMessage}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-sm py-12 text-gray-500 dark:text-gray-400">No scheduled followups yet.</div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Add Consultation Log Modal */}
      <Modal
        isOpen={conModalOpen}
        onClose={() => setConModalOpen(false)}
        title={`New Consultation Log - ${client.name}`}
        size="lg"
      >
        <form onSubmit={handleAddConsultation} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#9CA3AF]">Consultation Category</label>
            <select
              name="category"
              value={newCon.category}
              onChange={handleConInputChange}
              className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] text-gray-900 dark:text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8B5CF6]"
            >
              <option value="Career">Career</option>
              <option value="Marriage">Marriage</option>
              <option value="Finance">Finance</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <Input 
            label="Consultation Notes (Raw)"
            name="notes"
            type="textarea"
            placeholder="Write planetary findings, problems shared, and general observations..."
            value={newCon.notes}
            onChange={handleConInputChange}
            required
          />

          {/* Prescribed Remedy Section inside Consultation Form */}
          <div className="border-t border-gray-200 dark:border-[#2A2A2A] pt-4 mt-2">
            <h4 className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wider mb-4">Prescribe Remedy (Optional)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#9CA3AF]">Remedy Type</label>
                <select
                  name="remedyType"
                  value={newCon.remedyType}
                  onChange={handleConInputChange}
                  className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] text-gray-900 dark:text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8B5CF6]"
                >
                  <option value="Gemstone">Gemstone</option>
                  <option value="Rudraksha">Rudraksha</option>
                  <option value="Mantra">Mantra</option>
                  <option value="Pooja">Pooja</option>
                  <option value="Crystal">Crystal</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <Input 
                label="Remedy Name"
                name="remedyName"
                value={newCon.remedyName}
                onChange={handleConInputChange}
                placeholder="e.g. Emerald (Panna)"
              />
              <div className="md:col-span-2">
                <Input 
                  label="Instructions / Description"
                  name="remedyDescription"
                  value={newCon.remedyDescription}
                  onChange={handleConInputChange}
                  placeholder="e.g. 5.25 carat set in gold ring, wear on middle finger on Wednesday morning."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-[#2A2A2A] pt-4 mt-2">
            <Button variant="secondary" onClick={() => setConModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Complete Session & Save Log
            </Button>
          </div>
        </form>
      </Modal>

      {/* Schedule Follow-up Modal */}
      <Modal
        isOpen={followModalOpen}
        onClose={() => setFollowModalOpen(false)}
        title="Schedule Follow-up Outreach"
      >
        <form onSubmit={handleAddFollowup} className="flex flex-col gap-5">
          <Input 
            label="Due Date"
            name="dueDate"
            type="date"
            value={newFollow.dueDate}
            onChange={(e) => setNewFollow(prev => ({ ...prev, dueDate: e.target.value }))}
            required
          />
          <div className="flex flex-col gap-1.5 relative">
            <Input 
              label="AI Message Draft (Optional)"
              name="aiMessage"
              type="textarea"
              placeholder="AI will generate this outreach message automatically. Write custom message if preferred."
              value={newFollow.aiMessage}
              onChange={(e) => setNewFollow(prev => ({ ...prev, aiMessage: e.target.value }))}
            />
            <div className="flex justify-between items-center mt-1">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={handleGenerateMessage}
                disabled={isGeneratingMessage}
                icon={<Sparkles className="w-3.5 h-3.5" />}
              >
                {isGeneratingMessage ? 'Generating...' : 'Generate AI Message'}
              </Button>
              {newFollow.aiMessage && (
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={handleCopyMessage}
                >
                  Copy Text
                </Button>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 border-t border-gray-200 dark:border-[#2A2A2A] pt-4">
            <Button variant="secondary" onClick={() => setFollowModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Follow-up Schedule
            </Button>
          </div>
        </form>
      </Modal>

      {/* Hidden PDF Template */}
      {selectedConForPdf && (
        <div 
          ref={pdfTemplateRef}
          style={{
            position: 'absolute',
            left: '-9999px',
            top: 0,
            width: '800px',
            padding: '40px',
            backgroundColor: '#ffffff',
            color: '#000000',
            fontFamily: 'sans-serif'
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: '2px solid #8B5CF6', paddingBottom: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#121212', margin: 0 }}>JyotishDesk</h1>
              <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>AI-Powered Astrology CRM</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#8B5CF6', margin: 0 }}>Consultation Report</h2>
              <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>Date: {new Date(selectedConForPdf.date).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Client Info */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #eaeaea', paddingBottom: '8px', marginBottom: '12px' }}>Client Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
              <div><strong>Name:</strong> {client.name}</div>
              <div><strong>Problem Category:</strong> {selectedConForPdf.category}</div>
              <div><strong>DOB:</strong> {client.dob}</div>
              <div><strong>Phone:</strong> {client.phone}</div>
            </div>
          </div>

          {/* AI Summary */}
          {selectedConForPdf.aiSummary && (
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #eaeaea', paddingBottom: '8px', marginBottom: '12px' }}>AI Consultation Summary</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{selectedConForPdf.aiSummary}</p>
            </div>
          )}

          {/* Remedies */}
          {selectedConForPdf.remedies && selectedConForPdf.remedies.length > 0 && (
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', borderBottom: '1px solid #eaeaea', paddingBottom: '8px', marginBottom: '12px' }}>Prescribed Remedies</h3>
              <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {selectedConForPdf.remedies.map((rem, i) => (
                  <li key={i} style={{ marginBottom: '8px' }}>
                    <strong>{rem.name} ({rem.type}):</strong> {rem.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #eaeaea', textAlign: 'center', fontSize: '12px', color: '#888' }}>
            This is an electronically generated consultation report. May the stars guide you!
          </div>
        </div>
      )}

    </div>
  );
}
