"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Dropdown component with submenu functionality
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.title - Main dropdown title text
 * @param {Array<string>} props.items - Array of submenu items
 * @param {function} props.onItemSelect - Callback function when item is selected
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether the dropdown is disabled
 * @param {string} props.textSize - Tailwind text size class (e.g., "text-sm", "text-lg","text-xs")
 * @param {number} props.iconSize - Size (in px) for the ChevronDown icon
 * @param {boolean} props.hideIcon - If true, hides the dropdown icon and shows only the title
 * @returns {JSX.Element} Dropdown component
 * @example
 * <Dropdown
 *   title="Select Format"
 *   items={['JSON', 'XML', 'CSV']}
 *   onItemSelect={(item) => console.log(item)}
 *   textSize="text-lg"
 *   iconSize={24}
 *   hideIcon={true}
 * />
 */
const Dropdown = ({ 
  title = "Select Option", 
  items = [], 
  onItemSelect = () => {}, 
  className = "",
  disabled = false,
  textSize = "text-base",
  iconSize = 16,
  hideIcon = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  };

  const handleItemSelect = (item) => {
    onItemSelect(item);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className={`relative inline-block ${className}`}
    >
      {/* Main Dropdown Button */}
      <button
        onClick={toggleDropdown}
        disabled={disabled}
        className={`flex items-center py-2 rounded-md shadow-sm transition-colors duration-200 ${textSize} ${
          disabled 
            ? 'bg-gray-100 text-gray-700 font-medium cursor-not-allowed' 
            : 'bg-white text-gray-700 font-medium hover:bg-gray-50'
        }`}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-disabled={disabled}
      >
        <span>{title}</span>
        {!hideIcon && (
          <ChevronDown 
            className={`ml-1 transition-transform duration-200 ${
              disabled ? 'text-gray-300' : 'text-gray-500'
            } ${isOpen ? 'rotate-180' : ''}`}
            size={iconSize}
          />
        )}
      </button>

      {/* Submenu */}
      {isOpen && !disabled && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg animate-fadeIn">
          <div className="py-1 max-h-60 overflow-y-auto">
            {items.length > 0 ? (
              items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemSelect(item)}
                  className={`block w-full px-4 py-2 text-left font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 transition-colors duration-150 ${textSize}`}
                  role="menuitem"
                  tabIndex={0}
                >
                  {item}
                </button>
              ))
            ) : (
              <div className={`px-4 py-2 text-gray-500 text-sm ${textSize}`}>
                No items available
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dropdown;
