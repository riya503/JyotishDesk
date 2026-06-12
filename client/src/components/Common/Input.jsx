import React from 'react';

export default function Input({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  required = false,
  className = '',
  helperText = '',
  rows = 4
}) {
  const isTextArea = type === 'textarea';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="text-xs font-semibold text-[#9CA3AF]">
          {label} {required && <span className="text-[#EF4444]">*</span>}
        </label>
      )}
      
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] text-gray-900 dark:text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] placeholder:text-gray-600 transition-all resize-none"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] text-gray-900 dark:text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] placeholder:text-gray-600 transition-all"
        />
      )}
      
      {error && <span className="text-xs text-[#EF4444]">{error}</span>}
      {!error && helperText && <span className="text-xs text-gray-500 dark:text-gray-400">{helperText}</span>}
    </div>
  );
}
