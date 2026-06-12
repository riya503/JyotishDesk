import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useTheme } from '../../context/ThemeContext';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CalendarClock, 
  Sparkles, 
  Settings, 
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Clients', path: '/dashboard/clients', icon: Users },
    { name: 'Consultations', path: '/dashboard/consultations', icon: FileText },
    { name: 'Follow-ups', path: '/dashboard/followups', icon: CalendarClock },
    { name: 'AI Insights', path: '/dashboard/insights', icon: Sparkles },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-[#121212] border-r border-gray-200 dark:border-[#2A2A2A] flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static`}>
        <div>
          {/* Logo Brand Header */}
          <div className="h-16 border-b border-gray-200 dark:border-[#2A2A2A] px-6 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span className="font-bold text-gray-900 dark:text-white text-lg tracking-wide">JyotishDesk</span>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border-l-2 border-[#8B5CF6]' 
                      : 'text-[#9CA3AF] hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-[#1A1A1A]'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-[#2A2A2A] flex flex-col gap-2">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-gray-100 dark:bg-[#1A1A1A] transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-yellow-400" />}
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
            <span className="text-xs">{theme === 'dark' ? '🌙' : '☀️'}</span>
          </button>
          
          <button 
            onClick={() => {
              authService.logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-red-400 hover:bg-red-500/5 transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
