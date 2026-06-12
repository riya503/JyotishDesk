import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

export default function Navbar({ onMenuToggle }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : { name: 'Astrologer' };

  return (
    <header className="h-16 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-[#2A2A2A] px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Mobile Drawer Trigger & Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="p-1 rounded-lg text-[#9CA3AF] hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-[#1A1A1A] md:hidden focus:outline-none"
        >
          <Menu className="w-5.5 h-5.5" />
        </button>
        <span className="hidden sm:inline-block text-xs font-semibold text-gray-500 dark:text-gray-400 font-mono tracking-wider bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded px-2.5 py-1">
          {currentDate}
        </span>
      </div>

      {/* Notifications & User Menu */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-[#9CA3AF] hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-lg transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
        </button>
        
        {/* User Card */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-[#2A2A2A]">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</span>
            <span className="text-[10px] font-semibold text-[#8B5CF6] uppercase tracking-wider">Chief Astrologer</span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] font-bold">
            <User className="w-4.5 h-4.5" />
          </div>
        </div>
      </div>
    </header>
  );
}
