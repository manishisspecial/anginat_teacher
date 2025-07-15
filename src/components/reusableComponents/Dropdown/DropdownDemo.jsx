"use client"
import { React,useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';

/**
 * Demo component showcasing different dropdown implementations
 * @component
 * @returns {JSX.Element} DropdownDemo component
 * @example
 * <DropdownDemo />
 */
const DropdownDemo = () => {
  const [selectedItems, setSelectedItems] = useState({
    format: '',
    category: '',
    priority: '',
    status: ''
  });

  /**
   * Handle dropdown item selection
   * @function
   * @param {string} type - Type of dropdown (format, category, etc.)
   * @param {string} item - Selected item
   */
  const handleSelection = (type, item) => {
    setSelectedItems(prev => ({
      ...prev,
      [type]: item
    }));
    console.log(`${type} selected:`, item);
  };

  /**
   * Clear all selections
   * @function
   */
  const clearSelections = () => {
    setSelectedItems({
      format: '',
      category: '',
      priority: '',
      status: ''
    });
  };

  // Sample dropdown data
  const dropdownData = {
    formats: [
      'JSON Format',
      'XML Format', 
      'CSV Format',
      'YAML Format',
      'Plain Text',
      'Markdown',
      'HTML'
    ],
    categories: [
      'Technology',
      'Business',
      'Education', 
      'Healthcare',
      'Finance',
      'Entertainment',
      'Sports'
    ],
    priorities: [
      'High Priority',
      'Medium Priority',
      'Low Priority',
      'Critical',
      'Normal'
    ],
    statuses: [
      'Active',
      'Inactive',
      'Pending',
      'Completed',
      'In Progress',
      'Cancelled'
    ]
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Next.js Dropdown Components Demo
          </h1>
          <p className="text-gray-600 text-lg">
            Interactive dropdown components with submenus
          </p>
        </div>

        {/* Dropdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Format Dropdown */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Format Selection
            </h2>
            <Dropdown
              title="Select Format"
              items={dropdownData.formats}
              onItemSelect={(item) => handleSelection('format', item)}
              className="w-full"
            />
            {selectedItems.format && (
              <p className="mt-3 text-sm text-blue-600 font-medium">
                Selected: {selectedItems.format}
              </p>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Category Selection
            </h2>
            <Dropdown
              title="Choose Category"
              items={dropdownData.categories}
              onItemSelect={(item) => handleSelection('category', item)}
              className="w-full"
            />
            {selectedItems.category && (
              <p className="mt-3 text-sm text-green-600 font-medium">
                Selected: {selectedItems.category}
              </p>
            )}
          </div>

          {/* Priority Dropdown */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
              Priority Level
            </h2>
            <Dropdown
              title="Set Priority"
              items={dropdownData.priorities}
              onItemSelect={(item) => handleSelection('priority', item)}
              className="w-full"
            />
            {selectedItems.priority && (
              <p className="mt-3 text-sm text-orange-600 font-medium">
                Selected: {selectedItems.priority}
              </p>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
              Status
            </h2>
            <Dropdown
              title="Select Status"
              items={dropdownData.statuses}
              onItemSelect={(item) => handleSelection('status', item)}
              className="w-full"
            />
            {selectedItems.status && (
              <p className="mt-3 text-sm text-purple-600 font-medium">
                Selected: {selectedItems.status}
              </p>
            )}
          </div>
        </div>

        {/* Selected Items Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Selection Summary
            </h2>
            <button
              onClick={clearSelections}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(selectedItems).map(([key, value]) => (
              <div key={key} className="border border-gray-200 rounded-md p-3">
                <h3 className="font-medium text-gray-700 capitalize mb-1">
                  {key}:
                </h3>
                <p className="text-gray-600 text-sm">
                  {value || 'Not selected'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Disabled Dropdown Example */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Disabled Dropdown Example
          </h2>
          <Dropdown
            title="Disabled Dropdown"
            items={['Item 1', 'Item 2', 'Item 3']}
            onItemSelect={() => {}}
            disabled={true}
            className="mb-4"
          />
          <p className="text-gray-600 text-sm">
            This dropdown is disabled and cannot be interacted with.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DropdownDemo;