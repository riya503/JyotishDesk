import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Sparkles, ExternalLink } from 'lucide-react';
import PageHeader from '../components/Common/PageHeader';
import Button from '../components/Common/Button';
import StatusBadge from '../components/Common/StatusBadge';
import consultationService from '../services/consultationService';

export default function Consultations() {
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const data = await consultationService.getConsultations();
        setConsultations(data);
      } catch (error) {
        console.error("Error fetching consultations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConsultations();
  }, []);

  const filteredConsultations = consultations.filter(con => 
    filterCategory === 'All' || con.category === filterCategory
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Consultation History" 
        description="Review past astrological analysis sessions and generated AI summaries."
      />

      {/* Filter Toolbar */}
      <div className="flex items-center gap-3 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-4 self-start">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Filter Category:</span>
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] text-gray-900 dark:text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#8B5CF6] cursor-pointer"
        >
          <option value="All">All Categories</option>
          <option value="Career">Career</option>
          <option value="Marriage">Marriage</option>
          <option value="Finance">Finance</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Consultations List Grid */}
      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="text-center py-12 text-sm text-gray-500 dark:text-gray-400 border border-dashed border-gray-200 dark:border-[#2A2A2A] rounded-xl bg-white dark:bg-[#121212]/40">
            Loading consultations...
          </div>
        ) : filteredConsultations.length > 0 ? (
          filteredConsultations.map((con) => (
            <div 
              key={con.id} 
              className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6 flex flex-col gap-5 hover:border-[#8B5CF6]/20 transition-all duration-300"
            >
              {/* Header metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200 dark:border-[#2A2A2A]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 
                      onClick={() => navigate(`/dashboard/clients/${con.clientId}`)}
                      className="text-base font-bold text-gray-900 dark:text-white hover:text-[#8B5CF6] transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      {con.clientName}
                      <ExternalLink className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                    </h3>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(con.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] text-gray-700 dark:text-gray-300">
                    {con.category}
                  </span>
                  <StatusBadge status={con.status} />
                </div>
              </div>

              {/* Consultation Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Session Notes</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{con.notes}</p>
                </div>
                
                <div className="bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-[#8B5CF6] uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI-Generated Summary
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 leading-relaxed font-sans">{con.aiSummary}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-sm text-gray-500 dark:text-gray-400 border border-dashed border-gray-200 dark:border-[#2A2A2A] rounded-xl bg-white dark:bg-[#121212]/40">
            No consultations logged under this category.
          </div>
        )}
      </div>
    </div>
  );
}
