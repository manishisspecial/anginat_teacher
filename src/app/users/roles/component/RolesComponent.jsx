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
      <EditRolesModal
          isOpen={openModal === 'editroles'}
        onClose={() => setOpenModal(null)}
      />
    </div>
  );
};

export default RolesComponent;