import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search..." 
}) {
  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
        <Search className="h-4 w-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] text-gray-900 dark:text-white rounded-lg pl-9 pr-4 py-2 text-sm placeholder:text-gray-500 dark:text-gray-400 focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
      />
    </div>
  );
}
