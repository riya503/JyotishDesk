import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import PageHeader from '../components/Common/PageHeader';
import StatCard from '../components/Common/StatCard';
import aiService from '../services/aiService';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await aiService.getDashboardMetrics();
        setMetrics(data);
      } catch (err) {
        console.error('Error loading dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  const COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE', '#F5F3FF'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8B5CF6]"></div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
        Failed to load dashboard metrics. Ensure backend server is running.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader 
        title="Dashboard" 
        description="Welcome back, Pandit Ji. Here is your astrology operations summary for today."
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          title="Total Clients" 
          value={metrics.totalClients} 
          icon={Users} 
          trend="+12% this month" 
          trendType="up"
        />
        <StatCard 
          title="Total Consultations" 
          value={metrics.totalConsultations} 
          icon={FileText} 
          trend="+28 this week" 
          trendType="up"
        />
        <StatCard 
          title="Pending Followups" 
          value={metrics.pendingFollowups} 
          icon={Clock} 
          trend="-4 vs yesterday" 
          trendType="down"
        />
        <StatCard 
          title="Today's Followups" 
          value={metrics.todaysFollowups} 
          icon={AlertCircle} 
          trend="Immediate" 
          trendType="neutral"
        />
      </div>

      {/* Charts & Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category Split Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Consultation Issue Categories</h3>
          </div>
          <div className="h-64 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.categoryStats} layout="vertical" margin={{ left: 10, right: 10, top: 0, bottom: 0 }}>
                <XAxis type="number" stroke="#9CA3AF" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#9CA3AF" fontSize={10} axisLine={false} tickLine={false} width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#2A2A2A', borderRadius: '8px', color: '#FFF' }}
                  itemStyle={{ color: '#8B5CF6' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                  {metrics.categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Operational Insights Sidebar */}
        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">AI Assistant Insights</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              {metrics.aiInsights.map((insight) => (
                <div 
                  key={insight.id} 
                  className="p-4 bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] hover:border-[#8B5CF6]/20 transition-all rounded-lg"
                >
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></span>
                    {insight.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 bg-gray-100 dark:bg-[#1A1A1A] hover:bg-gray-200 dark:bg-[#2A2A2A] border border-gray-200 dark:border-[#2A2A2A] text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-white rounded-lg transition-all font-medium">
            View Analysis Hub
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Recent CRM Activity</h3>
        <div className="flex flex-col divide-y divide-[#2A2A2A]">
          {metrics.recentActivities.map((act) => (
            <div key={act.id} className="py-4.5 flex justify-between items-center text-sm first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#8B5CF6]/30 border border-[#8B5CF6]"></div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">{act.action}</span>
                  <span className="text-gray-500 dark:text-gray-400 mx-1.5">•</span>
                  <span className="text-gray-600 dark:text-gray-400">{act.target}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
