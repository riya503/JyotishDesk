import React from 'react';

export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false,
  className = '',
  icon = null
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0B0B]';
  
  const variants = {
    primary: 'bg-[#8B5CF6] hover:bg-[#7c4dff] text-gray-900 dark:text-white focus:ring-[#8B5CF6]',
    secondary: 'bg-gray-100 dark:bg-[#1A1A1A] hover:bg-gray-200 dark:bg-[#2A2A2A] text-gray-900 dark:text-white border border-gray-200 dark:border-[#2A2A2A] focus:ring-gray-600',
    danger: 'bg-[#EF4444] hover:bg-[#dc2626] text-gray-900 dark:text-white focus:ring-[#EF4444]',
    ghost: 'hover:bg-gray-100 dark:bg-[#1A1A1A] text-[#9CA3AF] hover:text-gray-900 dark:text-white focus:ring-gray-800'
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${selectedVariant} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </button>
  );
}
