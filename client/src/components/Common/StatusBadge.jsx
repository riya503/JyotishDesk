import React from 'react';

export default function StatusBadge({ status }) {
  const normalized = (status || '').toLowerCase().trim();

  const styles = {
    // Consultation statuses
    completed: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20',
    scheduled: 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/20',
    
    // Followup/Remedy statuses
    pending: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
    suggested: 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/20',
    'follow-up pending': 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
    
    // Fallback
    default: 'text-gray-600 dark:text-gray-400 bg-gray-800/40 border-gray-800'
  };

  const selectedClass = styles[normalized] || styles.default;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${selectedClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {status}
    </span>
  );
}
