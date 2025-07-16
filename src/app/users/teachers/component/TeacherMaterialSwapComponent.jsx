import React from 'react';
import { useRouter } from 'next/navigation';
import Table from '@/components/reusableComponents/Table/table/Table';
import Badge from '@/components/reusableComponents/badges/Badge11';
import { studentsData, tableHeaders } from './mockData/mockData';

const TeacherMaterialSwapComponent = () => {
  const router = useRouter();

  // Action Links component - Changed to View for teachers
  const ActionLinks = ({ id }) => (
    <div className="flex items-center">
      <span 
        className="text-blue-600 text-sm font-normal font-['Arial'] leading-normal cursor-pointer hover:underline"
        onClick={(e) => {
          e.stopPropagation();            
          router.push(`/users/teachers/view-teachers/${id}`)
        }}
      >
        View
      </span>
    </div>
  );

  // Transform data for table
  const tableData = studentsData.map(student => ({
    id: student.id,
    contents: [
      student.admissionNo,
      student.rollNo,
      student.name,
      student.class,
      student.section,
      student.gender,
      student.dateOfJoining,
      student.dob,
      <ActionLinks key={student.id} id={student.id} />
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

export default TeacherMaterialSwapComponent;