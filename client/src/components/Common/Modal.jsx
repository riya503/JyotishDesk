import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const selectedSize = sizes[size] || sizes.md;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Dialog */}
      <div className={`relative w-full ${selectedSize} bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl shadow-premium z-10 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[#2A2A2A]">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
          <Button variant="ghost" onClick={onClose} className="p-1 rounded-lg hover:bg-white/5">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1 text-sm text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
}
