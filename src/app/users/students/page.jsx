"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/reusableComponents/buttons/Button';
import Input from '@/components/reusableComponents/InputField/inputField';
import StudentMaterialSwapComponent from './components/StudentMaterialSwapComponent';

const StudentsPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleExport = () => {
    // Export logic here
    alert('Export students feature coming soon!');
  };

  const handleAddStudent = () => {
    // Add student logic here
    router.push('/users/students/add-students');
  };

  // Handle search input changes
  const handleSearchChange = (value) => {
    setSearchTerm(value);
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
    </div>
  );

  return (
    <PageLayout rightContent={rightContent}>
      <div className="w-full">
        {/* Students List Section */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          {/* Header with title and controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Students List</h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <button 
                onClick={handleFilterClick}
                className="px-3 md:px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <LeadingIcon />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <Input
                showLabel={false}
                placeholder="Search"
                inputType="default"
                id="search-students"
                className="w-full sm:w-[320px]"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth={true}
                showSupportingText={false}
                actionType="text"
              />
            </div>
          </div>

          {/* Table Content with better mobile handling */}
          <div className="w-full">
            <StudentMaterialSwapComponent />
          </div>
        </div>
      </div>

      {/* Filter Modal will be added here later */}
    </PageLayout>
  );
};

export default StudentsPage; 