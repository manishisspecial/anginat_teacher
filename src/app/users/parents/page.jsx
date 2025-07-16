"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/reusableComponents/buttons/Button';
import Card from '@/components/reusableComponents/Card/Card7';
import Input from '@/components/reusableComponents/InputField/inputField';
import ParentListComponent from './components/ParentListComponent';

const ParentsPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleExport = () => {
    // Export logic here
    alert('Export parents feature coming soon!');
  };

  const handleAddParent = () => {
    // Add parent logic here
    router.push('/users/parents/add-parents');
  };

  // Handle search input changes
  const handleSearchChange = (value) => {
    console.log("Search input changed:", value);
    // Add your search logic here
  };

  // Handle filter click
  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  const LeadingIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const rightContent = (
    <div className="flex gap-2">
      <Button
        text="Export"
        type="Secondary"
        onClick={handleExport}
        disabled={isSubmitting}
      />
      <Button
        text="Add Parent"
        type="Primary"
        onClick={handleAddParent}
        disabled={isSubmitting}
      />
    </div>
  );

  return (
    <PageLayout rightContent={rightContent}>
      <Card
        title="Parents List"
        showDescription={false}
        swapContent1={<ParentListComponent />}
        showPrimaryButton={true}
        primaryButtonComponent={  
          <Button
            text="Filter"
            type="Secondary"
            size="Compact"
            variant="Leading"
            leadingIcon={<LeadingIcon />}
            onClick={handleFilterClick}
          />
        }
        showSecondaryButton={true}
        secondaryButtonComponent={
          <Input
            showLabel={false}
            placeholder="Search Parents"
            inputType="default"
            id="search-parents"
            className="w-[320px]"
            onChange={handleSearchChange}
            fullWidth={true}
            showSupportingText={false}
            actionType="text"
          />
        }
      />

      {/* Filter Modal will be added here later */}
    </PageLayout>
  );
};

export default ParentsPage;