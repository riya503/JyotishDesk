import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0B0B0B] text-gray-900 dark:text-white overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main App Page Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Content Outlet scroll area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
