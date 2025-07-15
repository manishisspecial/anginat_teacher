"use client"
import React, { useState } from 'react';
import Modal from './Modal';
import Input from '../InputField/inputField';
import Button from '../buttons/Button'; 
/**
 * Example component demonstrating the usage of Modal component
 * Shows a form for adding fees type inside a modal
 */
const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    feesType: '',
    feesGroup: '',
    status: ''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
  };
  return (
    <div className="p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add Fees Type
      </button>
      <Modal
        title="Add Fees Type"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="ID"
            value={formData.id}
            onChange={(e) => handleInputChange({ target: { name: 'id', value: e.target.value } })}
            placeholder="Enter id"
            inputType="default"
            id="user-id"
          />
          <Input
            label="Fees Type"
            value={formData.feesType}
            onChange={(e) => handleInputChange({ target: { name: 'feesType', value: e.target.value } })}
            placeholder="Select"
            inputType="select"
            options={[
              { value: 'type1', label: 'Type 1' },
              { value: 'type2', label: 'Type 2' },
              { value: 'type3', label: 'Type 3' }
            ]}
            id="fees-type"
          />
          <Input
            label="Fees Group"
            value={formData.feesGroup}
            onChange={(e) => handleInputChange({ target: { name: 'feesGroup', value: e.target.value } })}
            placeholder="Select"
            inputType="select"
            options={[
              { value: 'group1', label: 'Group 1' },
              { value: 'group2', label: 'Group 2' },
              { value: 'group3', label: 'Group 3' }
            ]}
            id="fees-group"
          />
          <Input
            label="Status"
            value={formData.status}
            onChange={(e) => handleInputChange({ target: { name: 'status', value: e.target.value } })}
            placeholder="Select"
            inputType="date"
            id="status"
          />
          <Button type="Primary" state="Default" text=" Add Fees Type" />
        </form>
      </Modal>
    </div>
  );
};
export default ModalExample;