import React from 'react';
import { useRouter } from 'next/navigation';
import Table from '@/components/reusableComponents/Table/table/Table';
import { staffData, tableHeaders } from './mockData/mockData';

const StaffListComponent = () => {
  const router = useRouter();

  // Action Links component
  const ActionLinks = ({ id }) => (
    <div className="flex items-center">
      <span 
        className="text-blue-600 text-sm font-normal font-['Arial'] leading-normal cursor-pointer hover:underline"
        onClick={(e) => {
          e.stopPropagation();            
          router.push(`/users/staff/edit-staff/${id}`)
        }}
      >
        Edit
      </span>
    </div>
  );

  // Transform data for table
  const tableData = staffData.map(staff => ({
    id: staff.id,
    contents: [
      staff.id,
      staff.name,
      staff.designation,
      staff.phone,
      staff.email,
      staff.dateOfJoining,
      <ActionLinks key={staff.id} id={staff.id} />
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
    console.log(`Pagination changed: Page ${currentPage}, Items per page: ${itemsPerPage}`);
  };

  return (
    <div className="w-full">
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
  );
};

export default StaffListComponent;