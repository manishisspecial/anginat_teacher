"use client";
import React, { useState } from 'react';
import Table from '../table/Table';

// Example custom components you can use in the table
const ActionButton = ({ label, variant = 'primary', onClick, size = 'sm' }) => {
  const baseClasses = "rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500",
  };
  
  return (
    <button 
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const StatusBadge = ({ status }) => {
  const statusClasses = {
    active: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    inactive: "bg-red-100 text-red-800 border-red-200",
    draft: "bg-gray-100 text-gray-800 border-gray-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusClasses[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const UserProfile = ({ name, email, avatar }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{name}</span>
        <span className="text-xs text-gray-500">{email}</span>
      </div>
    </div>
  );
};

const PriorityLabel = ({ priority }) => {
  const priorityClasses = {
    high: "bg-red-500 text-white",
    medium: "bg-yellow-500 text-white", 
    low: "bg-green-500 text-white",
  };
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-bold ${priorityClasses[priority]}`}>
      {priority.toUpperCase()}
    </span>
  );
};

const ActionGroup = ({ onEdit, onDelete, onView }) => {
  return (
    <div className="flex space-x-2">
      <ActionButton 
        label="Edit" 
        variant="secondary" 
        size="sm"
        onClick={onEdit}
      />
      <ActionButton 
        label="View" 
        variant="primary" 
        size="sm"
        onClick={onView}
      />
      <ActionButton 
        label="Delete" 
        variant="danger" 
        size="sm"
        onClick={onDelete}
      />
    </div>
  );
};

const ProgressBar = ({ percentage, color = 'blue' }) => {
  const colorClasses = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-600"
  };
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${colorClasses[color]}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

/**
 * Enhanced Table Example demonstrating rows with different components:
 * - Buttons, badges, user profiles, links, and progress bars
 * - Different row types with expandable content and checkboxes
 * 
 * @returns {React.ReactElement} EnhancedTableExample component
 */
const EnhancedTableExample = () => {
  const [notifications, setNotifications] = useState([]);

  // Define table headers
  const headers = ['User', 'Project', 'Priority', 'Progress', 'Status', 'Actions'];
  
  // Sample data for the table showcasing different components
  // No need for useMemo anymore - Table component handles state preservation
  const tableData = [
    {
      id: 1,
      contents: [
        <UserProfile key="user1" name="John Doe" email="john@company.com" />,
        'Website Redesign',
        <PriorityLabel key="priority1" priority="high" />,
        <div key="progress1" className="w-full">
          <ProgressBar percentage={85} color="green" />
          <span className="text-xs text-gray-500 mt-1">85%</span>
        </div>,
        <StatusBadge key="status1" status="active" />,
        <ActionGroup 
          key="actions1"
          onEdit={() => alert('Edit John Doe')}
          onView={() => alert('View John Doe')}
          onDelete={() => alert('Delete John Doe')}
        />
      ],
      isExpandable: true,
      hasCheckbox: true,
      expandedContent: (
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2">Project Details:</h4>
          <p className="mb-2"><strong>Description:</strong> Complete redesign of company website with modern UI/UX</p>
          <p className="mb-2"><strong>Start Date:</strong> 2024-01-15</p>
          <p className="mb-2"><strong>Deadline:</strong> 2024-06-30</p>
          <p><strong>Team:</strong> 5 developers, 2 designers</p>
        </div>
      )
    },
    {
      id: 2,
      contents: [
        <UserProfile key="user2" name="Jane Smith" email="jane@company.com" />,
        'Mobile App Development',
        <PriorityLabel key="priority2" priority="medium" />,
        <div key="progress2" className="w-full">
          <ProgressBar percentage={45} color="blue" />
          <span className="text-xs text-gray-500 mt-1">45%</span>
        </div>,
        <StatusBadge key="status2" status="pending" />,
        <div key="actions2" className="flex space-x-2">
          <ActionButton 
            label="Approve" 
            variant="success" 
            size="sm"
            onClick={() => alert('Approved Jane Smith project')}
          />
          <ActionButton 
            label="Review" 
            variant="warning" 
            size="sm"
            onClick={() => alert('Review Jane Smith project')}
          />
        </div>
      ],
      isExpandable: true,
      hasCheckbox: true,
      expandedContent: (
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold mb-2">Pending Approval:</h4>
          <p className="mb-2">This project is waiting for management approval</p>
          <div className="flex space-x-2 mt-3">
            <ActionButton label="Approve Now" variant="success" />
            <ActionButton label="Request Changes" variant="secondary" />
          </div>
        </div>
      )
    },
    {
      id: 3,
      contents: [
        <UserProfile key="user3" name="Mike Johnson" email="mike@company.com" />,
        'API Integration',
        <PriorityLabel key="priority3" priority="low" />,
        <div key="progress3" className="w-full">
          <ProgressBar percentage={100} color="green" />
          <span className="text-xs text-gray-500 mt-1">Completed</span>
        </div>,
        <StatusBadge key="status3" status="completed" />,
        <a 
          key="link3"
          href="https://github.com/project" 
          className="text-blue-600 hover:text-blue-800 underline text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Code
        </a>
      ],
      isExpandable: false,
      hasCheckbox: false
    },
    {
      id: 4,
      contents: [
        <UserProfile key="user4" name="Sarah Wilson" email="sarah@company.com" />,
        'Database Migration',
        <PriorityLabel key="priority4" priority="high" />,
        <div key="progress4" className="w-full">
          <ProgressBar percentage={25} color="red" />
          <span className="text-xs text-gray-500 mt-1">25%</span>
        </div>,
        <StatusBadge key="status4" status="draft" />,
        <ActionButton 
          key="action4"
          label="Start Project" 
          variant="primary" 
          onClick={() => alert('Starting Database Migration')}
        />
      ],
      isExpandable: true,
      hasCheckbox: true,
      expandedContent: (
        <div className="p-4 bg-red-50 rounded-lg">
          <h4 className="font-semibold mb-2">High Priority Alert:</h4>
          <p className="mb-2">This project needs immediate attention due to upcoming system changes</p>
          <p className="mb-2"><strong>Risk Level:</strong> High</p>
          <p><strong>Dependencies:</strong> Backend API, User Authentication</p>
        </div>
      )
    }
  ]; // Empty dependency array ensures tableData is created only once

  // Event handlers
  const handleRowExpandToggle = (rowId, isExpanded) => {
    console.log(`Row ${rowId} expanded state: ${isExpanded}`);
    setNotifications(prev => [...prev, `Row ${rowId} ${isExpanded ? 'expanded' : 'collapsed'}`]);
  };

  const handleRowCheckToggle = (rowId, isChecked) => {
    console.log(`Row ${rowId} checked state: ${isChecked}`);
    setNotifications(prev => [...prev, `Row ${rowId} ${isChecked ? 'selected' : 'deselected'}`]);
  };

  const handleHeaderCheckToggle = (isChecked) => {
    console.log(`Header checkbox state: ${isChecked}`);
    setNotifications(prev => [...prev, `${isChecked ? 'All rows selected' : 'All rows deselected'}`]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Enhanced Table Example</h2>
        <p className="mb-4 text-gray-600">
          This example demonstrates a feature-rich table with various React components:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-1 text-sm text-gray-600">
          <li>User profiles with avatars and contact information</li>
          <li>Interactive buttons with different variants and actions</li>
          <li>Status badges and priority labels</li>
          <li>Progress bars with completion percentages</li>
          <li>Action groups with multiple buttons</li>
          <li>External links and navigation elements</li>
          <li>Expandable content with detailed information</li>
          <li>Checkbox functionality for row selection</li>
        </ul>
      </div>

      {/* Notifications area */}
      {notifications.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Recent Actions:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            {notifications.slice(-3).map((notification, index) => (
              <li key={index}>• {notification}</li>
            ))}
          </ul>
          <button 
            onClick={() => setNotifications([])}
            className="text-xs text-blue-600 hover:text-blue-800 mt-2"
          >
            Clear notifications
          </button>
        </div>
      )}

      {/* The actual table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <Table 
          headers={headers}
          data={tableData}
          onRowExpandToggle={handleRowExpandToggle}
          onRowCheckToggle={handleRowCheckToggle}
          onHeaderCheckToggle={handleHeaderCheckToggle}
          size="L"
          className="bg-white"
        />
      </div>

      {/* Usage instructions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Usage Instructions:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Click the chevron icons to expand/collapse rows with additional details</li>
          <li>• Use checkboxes to select individual rows or all rows via the header</li>
          <li>• Click action buttons to trigger different operations</li>
          <li>• External links will open in new tabs</li>
          <li>• All interactions are logged to the console and shown in notifications</li>
        </ul>
      </div>
    </div>
  );
};

export default EnhancedTableExample;