import React from 'react';

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend = '', 
  trendType = 'neutral' 
}) {
  const trendColors = {
    up: 'text-[#22C55E] bg-[#22C55E]/10',
    down: 'text-[#EF4444] bg-[#EF4444]/10',
    neutral: 'text-gray-600 dark:text-gray-400 bg-gray-800/40'
  };

  return (
    <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6 flex flex-col justify-between hover:border-[#8B5CF6]/30 transition-all duration-300">
      <div className="flex items-start justify-between">
        <span className="text-sm font-semibold text-[#9CA3AF]">{title}</span>
        {Icon && (
          <div className="p-2 bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-[#8B5CF6]">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-2.5">
        <span className="text-3xl font-bold text-[#FFFFFF] tracking-tight">{value}</span>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trendColors[trendType]}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
