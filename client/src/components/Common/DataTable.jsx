import React, { useState } from 'react';

export default function DataTable({ 
  columns, 
  data, 
  onRowClick,
  emptyMessage = "No items found." 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // Basic Mock Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2A] rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-[#2A2A2A] text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 font-medium">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr 
                  key={row.id || rowIdx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`hover:bg-gray-100 dark:bg-[#1A1A1A]/50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4.5 whitespace-nowrap">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-[#2A2A2A] bg-gray-100 dark:bg-[#1A1A1A]/30 text-xs text-gray-500 dark:text-gray-400">
          <div>
            Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(startIndex + itemsPerPage, data.length)}
            </span>{" "}
            of <span className="font-semibold text-gray-900 dark:text-white">{data.length}</span> entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-gray-900 dark:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 dark:bg-[#2A2A2A] transition-all"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-[#2A2A2A] rounded-lg text-gray-900 dark:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-200 dark:bg-[#2A2A2A] transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
