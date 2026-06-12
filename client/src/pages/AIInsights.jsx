import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Award, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import PageHeader from '../components/Common/PageHeader';
import aiService from '../services/aiService';

export default function AIInsights() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await aiService.getDashboardMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching AI Dashboard Metrics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const trendData = [
    { month: 'Jan', consultations: 42 },
    { month: 'Feb', consultations: 56 },
    { month: 'Mar', consultations: 48 },
    { month: 'Apr', consultations: 70 },
    { month: 'May', consultations: 85 },
    { month: 'Jun', consultations: metrics ? metrics.totalConsultations : 92 }
  ];

  const PIE_COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE', '#F5F3FF'];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="AI Intelligence Hub" 
        description="Advanced client profiling, remedy effectiveness tracking, and consultation patterns."
      />

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {loading ? (
          <>
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6 h-80 animate-pulse flex items-center justify-center text-gray-500 dark:text-gray-400">Loading AI Trends...</div>
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6 h-80 animate-pulse flex items-center justify-center text-gray-500 dark:text-gray-400">Loading Categories...</div>
          </>
        ) : metrics ? (
          <>
            {/* Monthly Consultation Trends Area Chart */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6 flex flex-col">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-6">Consultation Velocity (6 Months)</h3>
              <div className="h-64 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorConsults" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                    <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} tickLine={false} />
                    <YAxis stroke="#9CA3AF" fontSize={10} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', borderRadius: '8px', color: '#FFF' }}
                      itemStyle={{ color: '#8B5CF6' }}
                    />
                    <Area type="monotone" dataKey="consultations" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorConsults)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Categories Distribution Pie Chart */}
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6 flex flex-col">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-6">Problem Categories Share</h3>
              <div className="h-64 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={metrics.categoryStats || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {(metrics.categoryStats || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', borderRadius: '8px', color: '#FFF' }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconSize={8}
                      iconType="circle"
                      wrapperStyle={{ fontSize: '11px', color: '#9CA3AF' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        ) : (
          <div className="col-span-2 text-center text-gray-500 dark:text-gray-400 py-12">No data available</div>
        )}

      </div>

      {/* AI Business Insights Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {loading ? (
          <>
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-5 h-40 animate-pulse"></div>
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-5 h-40 animate-pulse"></div>
            <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-5 h-40 animate-pulse"></div>
          </>
        ) : metrics && metrics.aiInsights ? (
          metrics.aiInsights.map((insight, idx) => {
            const icons = [Brain, Award, ShieldAlert];
            const colors = [
              { bg: 'bg-[#8B5CF6]/10', border: 'border-[#8B5CF6]/20', text: 'text-[#8B5CF6]' },
              { bg: 'bg-[#22C55E]/10', border: 'border-[#22C55E]/20', text: 'text-[#22C55E]' },
              { bg: 'bg-[#EF4444]/10', border: 'border-[#EF4444]/20', text: 'text-[#EF4444]' },
            ];
            const Icon = icons[idx % icons.length];
            const color = colors[idx % colors.length];

            return (
              <div key={insight.id || idx} className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-5 hover:border-[#8B5CF6]/20 transition-all flex flex-col">
                <div className={`p-2.5 ${color.bg} border ${color.border} rounded-lg ${color.text} w-fit mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{insight.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 dark:text-gray-400 text-sm col-span-3 text-center py-6">No insights available.</div>
        )}

      </div>

    </div>
  );
}
