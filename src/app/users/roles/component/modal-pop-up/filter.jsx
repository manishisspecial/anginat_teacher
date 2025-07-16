'use client';

import React, { useState } from 'react';
import Modal from '@/components/reusableComponents/Modal/Modal';
import Input from '@/components/reusableComponents/InputField/inputField';
import Button from '@/components/reusableComponents/buttons/Button';

export const  LeadingIcon = () => {
    return (
        <span className="text-blue-600 group-hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 17C4 16.5938 4.3125 16.25 4.75 16.25H6.59375C6.90625 15.25 7.875 14.5 9 14.5C10.0938 14.5 11.0625 15.25 11.375 16.25H19.25C19.6562 16.25 20 16.5938 20 17C20 17.4375 19.6562 17.75 19.25 17.75H11.375C11.0625 18.7812 10.0938 19.5 9 19.5C7.875 19.5 6.90625 18.7812 6.59375 17.75H4.75C4.3125 17.75 4 17.4375 4 17ZM10 17C10 16.4688 9.53125 16 9 16C8.4375 16 8 16.4688 8 17C8 17.5625 8.4375 18 9 18C9.53125 18 10 17.5625 10 17ZM15 9.5C16.0938 9.5 17.0625 10.25 17.375 11.25H19.25C19.6562 11.25 20 11.5938 20 12C20 12.4375 19.6562 12.75 19.25 12.75H17.375C17.0625 13.7812 16.0938 14.5 15 14.5C13.875 14.5 12.9062 13.7812 12.5938 12.75H4.75C4.3125 12.75 4 12.4375 4 12C4 11.5938 4.3125 11.25 4.75 11.25H12.5938C12.9062 10.25 13.875 9.5 15 9.5ZM16 12C16 11.4688 15.5312 11 15 11C14.4375 11 14 11.4688 14 12C14 12.5625 14.4375 13 15 13C15.5312 13 16 12.5625 16 12ZM19.25 6.25C19.6562 6.25 20 6.59375 20 17C20 7.4375 19.6562 7.75 19.25 7.75H12.375C12.0625 8.78125 11.0938 9.5 10 9.5C8.875 9.5 7.90625 8.78125 7.59375 7.75H4.75C4.3125 7.75 4 7.4375 4 7C4 6.59375 4.3125 6.25 4.75 6.25H7.59375C7.90625 5.25 8.875 4.5 10 4.5C11.0938 4.5 12.0625 5.25 12.375 6.25H19.25ZM9 7C9 7.5625 9.4375 8 10 8C10.5312 8 11 7.5625 11 7C11 6.46875 10.5312 6 10 6C9.4375 6 9 6.46875 9 7Z" fill="currentColor" />
            </svg>
        </span>
    )
}


/**
 * Simple Filter Modal Component
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Function to call when modal should close
 * @param {function} onApply - Function to call when Apply button is clicked
 * @param {function} onCancel - Function to call when Cancel button is clicked
 */
const FilterModal = ({ 
  isOpen, 
  onClose, 
  onApply = () => {}, 
  onCancel = () => {}
}) => {
  const [filters, setFilters] = useState({
    class: '',
    subject: '',
    year: ''
  });

  // Options for dropdowns
  const classOptions = [
    { label: 'Class 1', value: 'class1' },
    { label: 'Class 2', value: 'class2' },
    { label: 'Class 3', value: 'class3' },
    { label: 'Class 4', value: 'class4' },
    { label: 'Class 5', value: 'class5' },
    { label: 'Class 6', value: 'class6' },
    { label: 'Class 7', value: 'class7' },
    { label: 'Class 8', value: 'class8' },
    { label: 'Class 9', value: 'class9' },
    { label: 'Class 10', value: 'class10' }
  ];

  const subjectOptions = [
    { label: 'Mathematics', value: 'mathematics' },
    { label: 'Science', value: 'science' },
    { label: 'English', value: 'english' },
    { label: 'History', value: 'history' },
    { label: 'Geography', value: 'geography' },
    { label: 'Physics', value: 'physics' },
    { label: 'Chemistry', value: 'chemistry' },
    { label: 'Biology', value: 'biology' }
  ];

  const yearOptions = [
    { label: '2024', value: '2024' },
    { label: '2023', value: '2023' },
    { label: '2022', value: '2022' },
    { label: '2021', value: '2021' },
    { label: '2020', value: '2020' }
  ];

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  return (
    <Modal
      title="Filters"
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-lg"
    >
      <div className="space-y-6">
        {/* Filter Fields */}
        <div className="space-y-4">
          {/* Class Filter */}
          <Input
            label="Class"
            placeholder="Select"
            actionType="dropdown"
            options={classOptions}
            showLabel={true}
            showSupportingText={false}
            className="w-full"
            fullWidth={true}
            onSelect={(option) => setFilters(prev => ({ ...prev, class: option.value }))}
          />

          {/* Subject Filter */}
          <Input
            label="Subject"
            placeholder="Select"
            actionType="dropdown"
            options={subjectOptions}
            showLabel={true}
            showSupportingText={false}
            className="w-full"
            fullWidth={true}
            onSelect={(option) => setFilters(prev => ({ ...prev, subject: option.value }))}
          />

          {/* Year Filter */}
          <Input
            label="Year"
            placeholder="Select"
            actionType="dropdown"
            options={yearOptions}
            showLabel={true}
            showSupportingText={false}
            className="w-full"
            fullWidth={true}
            onSelect={(option) => setFilters(prev => ({ ...prev, year: option.value }))}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            text="Apply"
            type="Primary"
            size="Default"
            onClick={handleApply}
            className="flex-1"
            fullWidth={true}
          />

          <Button
            text="Cancel"
            type="Secondary"
            size="Default"
            onClick={handleCancel}
            className="flex-1"
            fullWidth={true}
          />
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;