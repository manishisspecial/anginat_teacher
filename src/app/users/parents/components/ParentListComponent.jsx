import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Table from '@/components/reusableComponents/Table/table/Table';
import { parentsData, tableHeaders } from './mockData/mockData';

const ParentListComponent = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState([]);

  // Action Links component
  const ActionLinks = ({ id }) => (
    <div className="flex items-center">
      <span 
        className="text-blue-600 text-sm font-normal font-['Arial'] leading-normal cursor-pointer hover:underline"
        onClick={(e) => {
          e.stopPropagation();            
          router.push(`/users/parents/view-parents/${id}`)
        }}
      >
        View
      </span>
    </div>
  );

  // Pagination logic
  const totalItems = parentsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = parentsData.slice(startIndex, endIndex);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(currentData.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedItems([]); // Clear selection when page changes
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
    setSelectedItems([]); // Clear selection
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  // Mobile card component
  const MobileParentCard = ({ parent }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium text-gray-900">{parent.name}</div>
          <div className="text-sm text-gray-500">ID: {parent.id}</div>
        </div>
        <input
          type="checkbox"
          checked={selectedItems.includes(parent.id)}
          onChange={() => handleSelectItem(parent.id)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
        <div>
          <span className="text-gray-500">Occupation:</span>
          <span className="ml-2 text-gray-900">{parent.occupation}</span>
        </div>
        <div>
          <span className="text-gray-500">Phone:</span>
          <span className="ml-2 text-gray-900">{parent.phone}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Email:</span>
          <span className="ml-2 text-gray-900">{parent.email}</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Child:</span>
          <span className="ml-2 text-gray-900">{parent.childName}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        <button
          onClick={() => router.push(`/users/parents/view-parents/${parent.id}`)}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          View
        </button>
      </div>
    </div>
  );

  // Helper for mobile page numbers
  function getMobilePageNumbers(currentPage, totalPages) {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  }

  // Mobile pagination component
  const MobilePagination = () => {
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    return (
      <div className="mt-6">
        {/* Parent Cards */}
        <div className="space-y-3">
          {currentData.map((parent) => (
            <MobileParentCard key={parent.id} parent={parent} />
          ))}
        </div>

        {/* Mobile Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div className="text-sm text-gray-500">
            {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} items
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            
            <div className="flex gap-1">
              {getMobilePageNumbers(currentPage, totalPages).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-sm rounded ${
                    page === currentPage 
                      ? 'bg-blue-600 text-white' 
                      : 'border border-gray-300 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Transform data for table
  const tableData = currentData.map(parent => ({
    id: parent.id,
    contents: [
      parent.id,
      parent.name,
      parent.occupation,
      parent.phone,
      parent.email,
      parent.childName,
      <ActionLinks key={parent.id} id={parent.id} />
    ],
    isExpandable: false,
    hasCheckbox: true,
    expanded: false,
    checked: selectedItems.includes(parent.id)
  }));

  const handleRowCheckToggle = (rowId, isChecked) => {
    handleSelectItem(rowId);
  };

  const handleHeaderCheckToggle = (isChecked) => {
    handleSelectAll(isChecked);
  };

  const handlePaginationChange = (currentPage, itemsPerPage) => {
    setCurrentPage(currentPage);
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div className="w-full">
      {/* Desktop Table - Hidden on mobile */}
      <div className="hidden md:block">
        <Table
          headers={tableHeaders}
          data={tableData}
          onRowCheckToggle={handleRowCheckToggle}
          onHeaderCheckToggle={handleHeaderCheckToggle}
          onPaginationChange={handlePaginationChange}
          size="XL"
          className="bg-white"
          showPagination={true}
          defaultItemsPerPage={10}
        />
      </div>

      {/* Mobile Cards - Visible only on mobile */}
      <div className="md:hidden">
        <MobilePagination />
      </div>
    </div>
  );
};

export default ParentListComponent;