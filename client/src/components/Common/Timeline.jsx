import React from 'react';
import StatusBadge from './StatusBadge';

import { Send, Download } from 'lucide-react';
import Button from './Button';

export default function Timeline({ items, onSendSummary, sendingSummaryId, onDownloadPdf }) {
  return (
    <div className="relative border-l border-gray-200 dark:border-[#2A2A2A] ml-4.5 pl-6 flex flex-col gap-8">
      {items.map((item, idx) => (
        <div key={item.id || idx} className="relative">
          {/* Node Dot Indicator */}
          <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-[#121212] border-2 border-[#8B5CF6] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/40"></div>
          </div>
          
          {/* Timeline Node Content Card */}
          <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl p-5 hover:border-[#8B5CF6]/20 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-gray-200 dark:border-[#2A2A2A]/60">
              <div>
                <span className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wider">{item.category} Consultation</span>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">Logged by Astrologer</h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                {item.status && <StatusBadge status={item.status} />}
              </div>
            </div>
            
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Raw Notes</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1.5 leading-relaxed">{item.notes}</p>
              </div>
              {item.aiSummary && (
                <div className="bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 rounded-lg p-3.5">
                  <h5 className="text-xs font-semibold text-[#8B5CF6] uppercase tracking-wide flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    AI Consultation Summary
                  </h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1.5 leading-relaxed font-sans">{item.aiSummary}</p>
                  {(onSendSummary || onDownloadPdf) && (
                    <div className="mt-3 flex justify-end gap-2">
                      {onDownloadPdf && (
                        <Button
                          variant="secondary"
                          onClick={() => onDownloadPdf(item)}
                          icon={<Download className="w-3.5 h-3.5" />}
                          className="!text-xs !py-1.5 !px-3"
                        >
                          Download PDF
                        </Button>
                      )}
                      {onSendSummary && (
                        <Button
                          variant="secondary"
                          onClick={() => onSendSummary(item.id)}
                          disabled={sendingSummaryId === item.id}
                          icon={<Send className="w-3.5 h-3.5" />}
                          className="!text-xs !py-1.5 !px-3"
                        >
                          {sendingSummaryId === item.id ? 'Sending...' : 'Send Consultation Summary'}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
