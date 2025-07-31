import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Table from '@/components/reusableComponents/Table/table/Table';
import { classesData, tableHeaders } from './mockData/mockData';
import EditRolesModal from './modal-pop-up/editroles';
import Badge from '@/components/reusableComponents/badges/Badge11';

const StatusBadge = ({ status }) => {
  const getBadgeProps = (statusType) => {
    const badgeConfig = {
      'Active': {
        themes: 'Success',
        type: 'Solid',
        size: 'Compact'
      },
      'Inactive': {
        themes: 'Error',
        type: 'Solid',
        size: 'Compact'
      },
      'Upcoming': {
        themes: 'Primary',
        type: 'Solid',
        size: 'Compact'
      }
    };
    return badgeConfig[statusType] || badgeConfig['Active'];
  };
  const badgeProps = getBadgeProps(status);
  return (
    <Badge 
      {...badgeProps}
      text={status}
      variant="Default"
    />
  );
};

const RolesComponent = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Action Links component
  const ActionLinks = ({ id }) => (
    <div className="flex items-center">
      <span 
        className="text-blue-600 text-sm font-normal font-['Arial'] leading-normal cursor-pointer hover:underline"
        onClick={(e) => {
          e.stopPropagation();            
          // router.push(`/academic/classes/edit/${id}`)
          setOpenModal('editroles');
        }}
      >
        Edit
      </span>
    </div>
  );

  // Transform data for table
  const tableData = classesData.map(cls => ({
    id: cls.id,
    contents: [
      cls.id, 
      cls.type,
      <StatusBadge key={cls.id} status={cls.status} />,
      <ActionLinks key={cls.id} id={cls.id} />
    ],
    isExpandable: false,
    hasCheckbox: true,
    expanded: false,
    checked: false
  }));

  const handleRowCheckToggle = (rowId, isChecked) => {
    console.log(`Row ${rowId}: ${isChecked ? 'checked' : 'unchecked'}`);
  };

  const handleHeaderCheckToggle = (isChecked) => {
    console.log(`Header: ${isChecked ? 'all selected' : 'all deselected'}`);
  };

  const handlePaginationChange = (currentPage, itemsPerPage) => {
    setCurrentPage(currentPage);
    setItemsPerPage(itemsPerPage);
    console.log(`Pagination changed: Page ${currentPage}, Items per page: ${itemsPerPage}`);
  };

  // Mobile card component
  const MobileRoleCard = ({ role }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="font-medium text-gray-900">{role.type}</span>
        </div>
        <span className="text-blue-600 text-sm cursor-pointer hover:underline"
              onClick={() => setOpenModal('editroles')}>
          Edit
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-500">ID:</span>
          <span className="ml-2 text-gray-900">{role.id}</span>
        </div>
        <div>
          <span className="text-gray-500">Status:</span>
          <span className="ml-2">
            <StatusBadge status={role.status} />
          </span>
        </div>
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

  // Pagination for mobile cards
  const MobilePagination = () => {
    const totalPages = Math.ceil(classesData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentRoles = classesData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    return (
      <div className="mt-6">
        {/* Role Cards */}
        <div className="space-y-3">
          {currentRoles.map((role) => (
            <MobileRoleCard key={role.id} role={role} />
          ))}
        </div>

        {/* Mobile Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div className="text-sm text-gray-500">
            {startIndex + 1} - {Math.min(endIndex, classesData.length)} of {classesData.length} items
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

      <EditRolesModal
        isOpen={openModal === 'editroles'}
        onClose={() => setOpenModal(null)}
      />
    </div>
  );
};

export default RolesComponent;