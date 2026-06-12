import React from 'react';
import Button from './Button';

export default function EmptyState({
  title,
  description,
  icon: Icon,
  actionLabel,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-gray-200 dark:border-[#2A2A2A] rounded-xl bg-white dark:bg-[#121212]/40 min-h-[300px]">
      {Icon && (
        <div className="p-4 bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-full text-[#8B5CF6] mb-4">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
