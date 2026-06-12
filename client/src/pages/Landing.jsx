import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, Users, CalendarClock, Activity, ArrowRight,
  ShieldCheck, LayoutDashboard, BrainCircuit, Play, CheckCircle2,
  TrendingUp, Star
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-900 dark:text-white font-sans selection:bg-[#8B5CF6]/30 overflow-x-hidden">
      
      {/* 1. Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="bg-[#8B5CF6] p-1.5 rounded-lg">
              <Sparkles className="w-5 h-5 text-gray-900 dark:text-white" />
            </div>
            <span className="font-bold text-lg tracking-wide text-gray-900 dark:text-white">JyotishDesk</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        
        {/* 2. Hero Section */}
        <section className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/20 blur-[120px] rounded-full pointer-events-none -z-10" />

          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 text-xs font-medium text-gray-700 dark:text-gray-300">
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
              Introducing AI-Powered Insights
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 mb-6 leading-tight max-w-4xl mx-auto">
              Manage Astrology Consultations Smarter with AI
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Client Management, AI Consultation Summaries, Follow-up Automation and Business Insights — all in one beautifully designed platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Start for free <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-900 dark:text-white font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" /> Watch Demo
              </button>
            </div>
          </motion.div>
        </section>

        {/* 6. Dashboard Preview (CSS Mock) */}
        <section className="max-w-6xl mx-auto px-6 mt-20 md:mt-32 relative">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-gray-50 dark:bg-[#0B0B0B] shadow-[0_0_80px_rgba(139,92,246,0.15)] overflow-hidden relative"
          >
            <div className="h-12 border-b border-white/10 bg-white dark:bg-[#121212] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="mx-auto w-64 h-6 rounded-md bg-gray-100 dark:bg-[#1A1A1A] border border-white/5" />
            </div>
            <div className="flex">
              <div className="w-48 hidden md:flex border-r border-white/10 p-4 flex-col gap-3 min-h-[400px]">
                <div className="h-8 rounded bg-[#8B5CF6]/20 border-l-2 border-[#8B5CF6] w-full" />
                <div className="h-8 rounded bg-gray-100 dark:bg-[#1A1A1A] w-full" />
                <div className="h-8 rounded bg-gray-100 dark:bg-[#1A1A1A] w-full" />
              </div>
              <div className="flex-1 p-8 bg-gradient-to-b from-[#0B0B0B] to-[#050505]">
                <div className="flex justify-between items-center mb-8">
                  <div className="w-32 h-6 bg-white/10 rounded" />
                  <div className="w-24 h-8 bg-[#8B5CF6]/20 rounded-lg" />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="h-24 bg-white dark:bg-[#121212] border border-white/5 rounded-xl p-4 flex flex-col justify-end">
                    <div className="w-12 h-8 bg-white/10 rounded mb-2" />
                    <div className="w-24 h-3 bg-white/5 rounded" />
                  </div>
                  <div className="h-24 bg-white dark:bg-[#121212] border border-white/5 rounded-xl p-4 flex flex-col justify-end">
                    <div className="w-12 h-8 bg-white/10 rounded mb-2" />
                    <div className="w-24 h-3 bg-white/5 rounded" />
                  </div>
                  <div className="h-24 bg-white dark:bg-[#121212] border border-white/5 rounded-xl p-4 flex flex-col justify-end">
                    <div className="w-12 h-8 bg-white/10 rounded mb-2" />
                    <div className="w-24 h-3 bg-white/5 rounded" />
                  </div>
                </div>
                <div className="h-32 border border-white/5 bg-white dark:bg-[#121212] rounded-xl relative overflow-hidden">
                  <div className="absolute top-4 left-4 w-48 h-4 bg-white/10 rounded" />
                  <div className="absolute top-12 left-4 w-3/4 h-2 bg-white/5 rounded" />
                  <div className="absolute top-16 left-4 w-1/2 h-2 bg-white/5 rounded" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Overlay gradient fade at bottom to blend with next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
          </motion.div>
        </section>

        {/* 3. Features Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for the Modern Astrologer</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Everything you need to scale your practice, impress your clients, and automate your workflow.</p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                { title: 'Client Management', desc: 'Securely store birth details, charts, and consultation history.', icon: Users },
                { title: 'AI Summaries', desc: 'Auto-generate structured summaries from your raw consultation notes.', icon: BrainCircuit },
                { title: 'Automated Follow-ups', desc: 'Never lose track. Send timely email check-ins automatically.', icon: CalendarClock },
                { title: 'Remedy Tracking', desc: 'Track prescribed remedies and their progress seamlessly.', icon: ShieldCheck },
                { title: 'Business Insights', desc: 'Get AI-driven strategy recommendations to grow your earnings.', icon: TrendingUp },
                { title: 'Centralized Dashboard', desc: 'A beautiful bird\'s-eye view of your entire astrology practice.', icon: LayoutDashboard }
              ].map((f, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeIn}
                  className="bg-gray-50 dark:bg-[#0B0B0B] border border-white/5 p-8 rounded-2xl hover:bg-white dark:bg-[#121212] transition-colors group cursor-default"
                >
                  <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <f.icon className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 5. AI Intelligence Showcase */}
        <section className="py-20 border-y border-white/5 bg-gray-50 dark:bg-[#0B0B0B]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 mb-6 text-xs font-semibold text-[#8B5CF6]">
                  Gemini Integration
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Your intelligent<br/>digital assistant.</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                  Stop wasting hours typing up notes and crafting emails. Our AI Intelligence Layer transforms rough bullet points into professional summaries instantly.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Instant Professional Formatting
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Auto-drafted Follow-up Messages
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Strategic Practice Growth Insights
                  </li>
                </ul>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="bg-white dark:bg-[#121212] border border-white/5 p-6 rounded-2xl opacity-50 grayscale hover:grayscale-0 transition-all">
                    <h4 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-4 tracking-wide uppercase">Without AI</h4>
                    <div className="space-y-3">
                      <div className="h-2 w-3/4 bg-red-500/20 rounded" />
                      <div className="h-2 w-1/2 bg-red-500/20 rounded" />
                      <div className="h-2 w-5/6 bg-red-500/20 rounded" />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">"Took 20 mins to format..."</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#1A1A1A] to-[#121212] border border-[#8B5CF6]/30 p-6 rounded-2xl relative overflow-hidden shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Sparkles className="w-24 h-24 text-[#8B5CF6]" />
                    </div>
                    <h4 className="text-sm font-bold text-[#8B5CF6] mb-4 tracking-wide uppercase">With AI</h4>
                    <div className="space-y-3 relative z-10">
                      <div className="h-2 w-full bg-white/20 rounded" />
                      <div className="h-2 w-4/5 bg-white/20 rounded" />
                      <div className="h-2 w-full bg-white/20 rounded" />
                      <p className="text-xs text-gray-900 dark:text-white mt-4 font-medium">"Generated in 2 seconds."</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. How It Works (Timeline) */}
        <section className="py-32">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">The JyotishDesk Workflow</h2>
            
            <div className="relative border-l border-white/10 ml-4 md:ml-0 md:border-l-0">
              {[
                { step: "1", title: "Add Client Profile", desc: "Log birth details (DOB, TOB, POB) and categories securely." },
                { step: "2", title: "Create Consultation", desc: "Write rough notes during the session. Let AI format them later." },
                { step: "3", title: "Generate AI Summary", desc: "Instantly create a structured, professional summary with one click." },
                { step: "4", title: "Schedule Follow-up", desc: "Set a reminder. We'll automatically draft a personalized outreach email." },
                { step: "5", title: "Grow Your Practice", desc: "View AI Insights on your dashboard to see what's working best." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1 }}
                  className="mb-12 relative pl-8 md:pl-0 md:flex md:items-center md:justify-between md:odd:flex-row-reverse group"
                >
                  {/* Desktop Center Line Dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-[#121212] border-2 border-[#8B5CF6] items-center justify-center z-10 text-xs font-bold text-[#8B5CF6]">
                    {item.step}
                  </div>
                  {/* Mobile Left Dot */}
                  <div className="md:hidden absolute -left-4 top-0 w-8 h-8 rounded-full bg-white dark:bg-[#121212] border-2 border-[#8B5CF6] flex items-center justify-center z-10 text-xs font-bold text-[#8B5CF6]">
                    {item.step}
                  </div>

                  <div className="md:w-[45%] bg-gray-50 dark:bg-[#0B0B0B] border border-white/5 p-6 rounded-2xl group-hover:border-[#8B5CF6]/30 transition-colors">
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                  </div>
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              ))}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l border-white/10" />
            </div>
          </div>
        </section>

        {/* 7. Statistics Section */}
        <section className="py-20 border-y border-white/5 bg-gradient-to-r from-[#050505] via-[#121212] to-[#050505]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <div className="text-5xl font-extrabold text-gray-900 dark:text-white mb-2">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest font-semibold">Consultations Logged</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div className="text-5xl font-extrabold text-gray-900 dark:text-white mb-2">150+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest font-semibold">Happy Astrologers</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <div className="text-5xl font-extrabold text-[#8B5CF6] mb-2">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest font-semibold">Admin Time Saved</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 8. Testimonials */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">Loved by Top Astrologers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Acharya Rajesh", quote: "The AI summary feature is magic. It turns my quick shorthand into beautiful client reports." },
                { name: "Pandit Sharma", quote: "Automated email follow-ups have increased my repeat client rate by 40%." },
                { name: "Dr. Ananya (Vedic Astrologer)", quote: "Finally, a CRM that actually looks good and feels modern. The dark mode is super easy on the eyes." }
              ].map((t, i) => (
                <div key={i} className="bg-gray-50 dark:bg-[#0B0B0B] border border-white/5 p-8 rounded-2xl relative">
                  <div className="flex gap-1 mb-6 text-[#8B5CF6]">
                    <Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" /><Star className="fill-current w-4 h-4" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400">
                      {t.name.charAt(0)}
                    </div>
                    <div className="text-sm font-semibold">{t.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Call To Action */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#8B5CF6]/20 to-[#050505] border border-[#8B5CF6]/30 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/20 blur-[100px] rounded-full" />
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 relative z-10">Ready to Modernize Your Practice?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto relative z-10">Join the waitlist or start your free trial today. Experience the future of astrology client management.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <button onClick={() => navigate('/signup')} className="px-8 py-3.5 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
                Create Free Account
              </button>
              <button onClick={() => navigate('/login')} className="px-8 py-3.5 rounded-full border border-white/20 text-gray-900 dark:text-white font-bold hover:bg-white/10 transition-colors">
                Login
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* 10. Footer */}
      <footer className="border-t border-white/5 bg-[#050505] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
            <span className="font-bold text-lg text-gray-900 dark:text-white">JyotishDesk CRM</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="hover:text-gray-900 dark:text-white cursor-pointer transition-colors">Features</span>
            <span className="hover:text-gray-900 dark:text-white cursor-pointer transition-colors">Pricing</span>
            <span className="hover:text-gray-900 dark:text-white cursor-pointer transition-colors">Contact</span>
            <span className="hover:text-gray-900 dark:text-white cursor-pointer transition-colors">Privacy</span>
          </div>
          <div className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} JyotishDesk. All rights reserved.
          </div>
        </div>
      </footer>
      
    </div>
  );
}
