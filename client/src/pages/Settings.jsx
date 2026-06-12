import React, { useState } from 'react';
import { Mail, Shield, Sliders, CheckCircle2, Info } from 'lucide-react';
import PageHeader from '../components/Common/PageHeader';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';

export default function Settings() {
  const [activeSec, setActiveSec] = useState('smtp');
  const [smtpConfig, setSmtpConfig] = useState({
    host: 'smtp.gmail.com',
    port: '587',
    user: 'astrologer.reminders@gmail.com',
    pass: '••••••••••••••••',
    sender: 'JyotishDesk Reminders <no-reply@jyotishdesk.com>'
  });
  const [aiConfig, setAiConfig] = useState({
    temperature: '0.4',
    maxTokens: '500',
    tone: 'Compassionate & Professional'
  });
  const [saveStatus, setSaveStatus] = useState(false);

  const handleSmtpChange = (e) => {
    const { name, value } = e.target;
    setSmtpConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleAiChange = (e) => {
    const { name, value } = e.target;
    setAiConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Settings & Integrations" 
        description="Configure SMTP credentials, adjust Gemini AI prompt configurations, and manage user profile details."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        
        {/* Settings Navigation Column */}
        <div className="md:col-span-1 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-3 flex flex-col gap-1">
          <button
            onClick={() => setActiveSec('smtp')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${activeSec === 'smtp' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:bg-[#1A1A1A] hover:text-gray-900 dark:text-white'}`}
          >
            <Mail className="w-4 h-4" />
            Email Setup
          </button>
          
          <button
            onClick={() => setActiveSec('ai')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${activeSec === 'ai' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:bg-[#1A1A1A] hover:text-gray-900 dark:text-white'}`}
          >
            <Sliders className="w-4 h-4" />
            AI Assistant Settings
          </button>
          
          <button
            onClick={() => setActiveSec('profile')}
            className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${activeSec === 'profile' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:bg-[#1A1A1A] hover:text-gray-900 dark:text-white'}`}
          >
            <Shield className="w-4 h-4" />
            Security & Profile
          </button>
        </div>

        {/* Settings Form Panel Column */}
        <div className="md:col-span-3 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6">
          
          {activeSec === 'smtp' && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Connect Your Email</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Enter your email details to automatically send consultation summaries to your clients.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input 
                  label={<span className="flex items-center gap-1.5">Email Server (Host) <Info className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 cursor-help" title="e.g. smtp.gmail.com for Gmail" /></span>}
                  name="host" 
                  value={smtpConfig.host} 
                  onChange={handleSmtpChange} 
                  required
                />
                <Input 
                  label={<span className="flex items-center gap-1.5">Server Port <Info className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 cursor-help" title="Usually 587 or 465" /></span>}
                  name="port" 
                  value={smtpConfig.port} 
                  onChange={handleSmtpChange} 
                  required
                />
                <Input 
                  label={<span className="flex items-center gap-1.5">Email Address <Info className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 cursor-help" title="The email address you want to send from" /></span>}
                  name="user" 
                  value={smtpConfig.user} 
                  onChange={handleSmtpChange} 
                  required
                />
                <Input 
                  label={<span className="flex items-center gap-1.5">Email Password <Info className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 cursor-help" title="Your password, or an App Password if using Gmail" /></span>}
                  name="pass" 
                  type="password"
                  value={smtpConfig.pass} 
                  onChange={handleSmtpChange} 
                  required
                />
                <div className="md:col-span-2">
                  <Input 
                    label="Sender Address Name" 
                    name="sender" 
                    value={smtpConfig.sender} 
                    onChange={handleSmtpChange} 
                    required
                    helperText="Formated as: Name <email@domain.com>"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-gray-200 dark:border-[#2A2A2A] pt-4 mt-2">
                <div className="flex items-center gap-2 text-xs text-[#22C55E]">
                  {saveStatus && (
                    <>
                      <CheckCircle2 className="w-4.5 h-4.5" />
                      Settings saved successfully.
                    </>
                  )}
                </div>
                <Button type="submit">Save Email Configuration</Button>
              </div>
            </form>
          )}

          {activeSec === 'ai' && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">AI Assistant Settings</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Control how the AI writes summaries and messages for your clients.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#9CA3AF] flex items-center gap-1.5">
                    AI Creativity Level <Info className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 cursor-help" title="Lower is more strict and factual. Higher is more creative." />
                  </label>
                  <select
                    name="temperature"
                    value={aiConfig.temperature}
                    onChange={handleAiChange}
                    className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] text-gray-900 dark:text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8B5CF6]"
                  >
                    <option value="0.2">0.2 - Strict & Literal</option>
                    <option value="0.4">0.4 - Balanced (Recommended)</option>
                    <option value="0.7">0.7 - Creative Outreach</option>
                  </select>
                </div>
                <Input 
                  label={<span className="flex items-center gap-1.5">Summary Length <Info className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 cursor-help" title="Max number of words/tokens the AI should output" /></span>}
                  name="maxTokens" 
                  value={aiConfig.maxTokens} 
                  onChange={handleAiChange} 
                  required
                />
                <div className="md:col-span-2">
                  <Input 
                    label={<span className="flex items-center gap-1.5">AI Writing Tone <Info className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 cursor-help" title="How the AI should sound. e.g. Compassionate, Professional, Direct, Spiritual" /></span>}
                    name="tone" 
                    value={aiConfig.tone} 
                    onChange={handleAiChange} 
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-gray-200 dark:border-[#2A2A2A] pt-4 mt-2">
                <div className="flex items-center gap-2 text-xs text-[#22C55E]">
                  {saveStatus && (
                    <>
                      <CheckCircle2 className="w-4.5 h-4.5" />
                      AI parameters updated.
                    </>
                  )}
                </div>
                <Button type="submit">Save AI Settings</Button>
              </div>
            </form>
          )}

          {activeSec === 'profile' && (
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Astrologer Security Details</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Manage account information, security credentials, and login passwords.</p>
              </div>
              <div className="p-4 border border-gray-200 dark:border-[#2A2A2A] bg-gray-100 dark:bg-[#1A1A1A]/30 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                Security profile adjustments are disabled during mock mode. Account operations require active authentication middlewares.
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
