import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

/**
 * Pagination Component
 * @param {Object} props
 * @param {number} [props.currentPage=1] - Current active page (1-based)
 * @param {number} [props.totalItems=100] - Total number of items
 * @param {number} [props.itemsPerPage=12] - Items to show per page
 * @param {Function} [props.onPageChange] - Callback when page changes (page) => {}
 * @param {Function} [props.onItemsPerPageChange] - Callback when items per page changes (itemsPerPage) => {}
 * @param {string} [props.className=""] - Additional CSS classes
 */
const Pagination = ({
  currentPage = 1,
  totalItems = 100,
  itemsPerPage = 12,
  onPageChange = () => {},
  onItemsPerPageChange = () => {},
  className = ""
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const itemsPerPageOptions = [12, 24, 50, 100];
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex pagination logic
      if (currentPage <= 3) {
        // Show 1,2,3,4,5,...,last
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show 1,...,last-4,last-3,last-2,last-1,last
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show 1,...,current-1,current,current+1,...,last
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleItemsPerPageSelect = (newItemsPerPage) => {
    onItemsPerPageChange(newItemsPerPage);
    setShowDropdown(false);
  };

  const pageNumbers = getPageNumbers();

  // Don't render if no items
  if (totalItems === 0) return null;

  return (
    <div 
      className={`w-full flex justify-between items-center mt-4 ${className}`}
      data-numbers="True" 
      data-size="M"
    >
      {/* Items count - Left side */}
      <div className="flex justify-start items-center px-4 py-2">
        <div className="text-zinc-800 text-sm font-normal font-['Arial'] leading-normal">
          {startItem} – {endItem} of {totalItems} items
        </div>
      </div>

      {/* Pagination controls - Center */}
      <div 
        className="flex justify-center items-center gap-1"
        data-numbers="true" 
        data-overflow="true" 
        data-size="M"
      >
        {/* Previous button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`w-10 h-10 p-2 rounded-lg border border-neutral-200 flex justify-center items-center transition-colors ${
            currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
          }`}
          data-state={currentPage === 1 ? "Disabled" : "Default"}
          data-type="Arrow Left"
        >
          <ChevronLeft className={`w-4 h-4 ${currentPage === 1 ? 'text-zinc-600' : 'text-zinc-600'}`} />
        </button>

        {/* Page numbers */}
        <div className="flex justify-center items-center">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  data-state="Default"
                  data-type="Number"
                >
                  <div className="text-blue-600 text-xs font-normal font-['Arial'] leading-none">
                    ...
                  </div>
                </div>
              );
            }

            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-50 text-blue-600'
                }`}
                data-state={isActive ? "Active" : "Default"}
                data-type="Number"
              >
                <div className="text-xs font-normal font-['Arial'] leading-none">
                  {page}
                </div>
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 p-2 rounded-lg border border-neutral-200 flex justify-center items-center transition-colors ${
            currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
          }`}
          data-state={currentPage === totalPages ? "Disabled" : "Default"}
          data-type="Arrow Right"
        >
          <ChevronRight className={`w-4 h-4 ${currentPage === totalPages ? 'text-zinc-600' : 'text-blue-600'}`} />
        </button>
      </div>

      {/* Items per page selector - Right side */}
      <div className="flex justify-end items-center relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="px-4 py-2 rounded-lg border border-zinc-300 flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer bg-white"
        >
          <div className="text-neutral-900 text-sm font-normal font-['Arial'] leading-normal">
            {itemsPerPage}
          </div>
          <ChevronDown className="w-4 h-4 text-neutral-900" />
        </button>

        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute top-full right-0 mt-1 bg-white rounded-lg border border-zinc-300 shadow-lg z-50 min-w-[80px]">
            {itemsPerPageOptions.map((option, index) => (
              <button
                key={option}
                onClick={() => handleItemsPerPageSelect(option)}
                className={`w-full px-4 py-2 text-left text-sm font-normal font-['Arial'] text-neutral-900 hover:bg-gray-50 transition-colors cursor-pointer border-none ${
                  option === itemsPerPage ? 'bg-blue-50' : ''
                } ${
                  index === 0 ? 'rounded-t-lg' : ''
                } ${
                  index === itemsPerPageOptions.length - 1 ? 'rounded-b-lg' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default Pagination;