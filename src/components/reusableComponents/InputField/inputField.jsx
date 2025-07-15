'use client';

import React, { useState, useRef, useEffect } from 'react';

/**
 * Enhanced Input Component with multiple action types
 * 
 * @param {Object} props
 * @param {string} props.actionType - Type of input action ('text', 'dropdown', 'date') (default: "text")
 * @param {Array} props.options - Options array for dropdown (default: [])
 * @param {boolean} props.isMulti - Enable multiple selections for dropdown (default: false)
 * @param {string} props.label - Label text displayed above the input (default: "Label")
 * @param {string} props.placeholder - Placeholder text for the input field (default: "Placeholder text")
 * @param {string} props.supportingText - Additional text shown below the input (default: "Supporting text")
 * @param {string} props.value - Initial value of the input field (default: "")
 * @param {string} props.size - Size variant of the input ('small', 'medium', 'large') (default: "large")
 * @param {boolean} props.showLabel - Whether to show the label above the input (default: true)
 * @param {boolean} props.showSupportingText - Whether to show supporting text below the input (default: true)
 * @param {boolean} props.showLeftIcon - Whether to show an icon on the left side of the input (default: true)
 * @param {boolean} props.showRightIcon - Whether to show an icon on the right side of the input (default: true)
 * @param {React.ReactNode} props.leftIcon - Custom icon component to display on the left (default: null)
 * @param {React.ReactNode} props.rightIcon - Custom icon component to display on the right (default: null)
 * @param {string} props.theme - Color theme for the input (default: "black")
 * @param {function} props.onChange - Callback function when input value changes (default: noop)
 * @param {function} props.onSelect - Callback function for dropdown selection (default: noop)
 * @param {string} props.type - Input type (e.g., 'text', 'password', 'email') (default: "text")
 * @param {boolean} props.disabled - Whether the input is disabled (default: false)
 * @param {boolean} props.error - Whether the input has an error state (default: false)
 * @param {string} props.errorText - Text to display when in error state (default: "Supporting text")
 * @param {string} props.className - Additional CSS classes for the container (default: "")
 * @param {boolean} props.fullWidth - Whether the input should use full width (default: false)
 * @param {boolean} props.resizable - Whether the input should be resizable (converts to textarea) (default: false)
 * @param {string} props.minHeight - Minimum height for resizable input (default: "auto")
 * @returns {React.ReactElement} Rendered input field component
 */
const Input = ({
  // Action type
  actionType = "text", // 'text', 'dropdown', 'date'
  options = [], // For dropdown
  isMulti = false, // Enable multiple selections
  
  // Field properties
  label = "Label",
  placeholder = "Placeholder text",
  supportingText = "Supporting text",
  value = "",
  size = "large", // 'small', 'medium', 'large'
  
  // Optional elements
  showLabel = true,
  showSupportingText = false,
  showLeftIcon = false,
  showRightIcon = false,
  
  // Custom icons
  leftIcon = null,
  rightIcon = null,
  
  // Theme options
  // theme = "black", // 'black', 'blue', etc.
  
  // Additional props
  onChange = () => {},
  onSelect = () => {}, // For dropdown selection
  type = "text",
  disabled = false,
  error = false,
  errorText = "Supporting text",
  className = "",
  fullWidth = false, // Explicit prop for full width
  resizable = false, // Whether input should be resizable (textarea)
  minHeight = "auto", // Minimum height for resizable input
}) => {
  const [inputState, setInputState] = useState("enabled"); // enabled, focused, hovered, empty
  const [inputValue, setInputValue] = useState(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]); // For multi-select
  
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  
  // Check if className contains width-related classes
  const hasWidthClass = className.includes('w-') || fullWidth;
  
  // Size mapping without width if className includes a width class
  const sizeClasses = {
    small: hasWidthClass ? "p-1 text-xs" : "w-48 p-1 text-xs",
    medium: hasWidthClass ? "p-1.5 text-sm" : "w-64 p-1.5 text-sm",
    large: hasWidthClass ? "p-2 text-sm" : "w-72 p-2 text-sm",
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        if (inputValue === "" && !selectedOption) {
          setInputState("empty");
        } else {
          setInputState("enabled");
        }
      }
    };
    
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isDropdownOpen, inputValue, selectedOption]);
  
  // State styling
  const getStateStyles = () => {
    if (disabled) return "bg-neutral-200 outline-neutral-200 cursor-not-allowed";
    if (error) return "bg-white outline-red-600";
    
    switch(inputState) {
      case "focused":
        return "bg-white outline-blue-600";
      case "hovered":
        return "bg-sky-100 outline-zinc-300";
      case "empty":
        return "bg-white outline-zinc-300";
      case "enabled":
      default:
        return "bg-white outline-zinc-300";
    }
  };

  // Text color based on state
  const getTextColor = () => {
    if (disabled) return "text-zinc-600";
    if (inputState === "empty") return "text-zinc-600";
    return "text-neutral-900";
  };
  
  // Handle states
  const handleFocus = () => {
    if (!disabled) setInputState("focused");
  };
  
  const handleBlur = () => {
    if (disabled) return;
    
    if (inputValue === "" && !selectedOption) {
      setInputState("empty");
    } else {
      setInputState("enabled");
    }
  };
  
  const handleMouseEnter = () => {
    if (disabled || inputState === "focused" || isDropdownOpen) return;
    setInputState("hovered");
  };
  
  const handleMouseLeave = () => {
    if (disabled || inputState === "focused") return;
    
    if (inputValue === "" && !selectedOption) {
      setInputState("empty");
    } else {
      setInputState("enabled");
    }
  };
  
  // Handle input change
  const handleChange = (e) => {
    if (disabled) return;
    
    setInputValue(e.target.value);
    onChange(e.target.value);
  };
  
  // Handle dropdown toggle
  const handleDropdownToggle = () => {
    if (disabled) return;
    const newDropdownState = !isDropdownOpen;
    setIsDropdownOpen(newDropdownState);
    
    // Reset hover state when toggling dropdown
    if (!newDropdownState) {
      if (inputValue === "" && !selectedOption) {
        setInputState("empty");
      } else {
        setInputState("enabled");
      }
    }
  };
  
  // Handle option selection
  const handleOptionSelect = (option) => {
    if (isMulti) {
      const isSelected = selectedOptions.some(
        selected => selected.value === (option.value || option)
      );
      
      let newSelectedOptions;
      if (isSelected) {
        newSelectedOptions = selectedOptions.filter(
          selected => selected.value !== (option.value || option)
        );
      } else {
        newSelectedOptions = [...selectedOptions, {
          value: option.value || option,
          label: option.label || option
        }];
      }
      
      setSelectedOptions(newSelectedOptions);
      onSelect(newSelectedOptions);
      onChange(newSelectedOptions.map(opt => opt.value));
      
      // Keep dropdown open for multi-select
      setIsDropdownOpen(true);
    } else {
      setSelectedOption(option);
      setInputValue(option.label || option);
      setIsDropdownOpen(false);
      onSelect(option);
      onChange(option.value || option);
    }
  };

  // Handle removing selected option
  const handleRemoveOption = (optionToRemove) => {
    if (disabled) return;
    
    const newSelectedOptions = selectedOptions.filter(
      selected => selected.value !== optionToRemove.value
    );
    
    setSelectedOptions(newSelectedOptions);
    onSelect(newSelectedOptions);
    onChange(newSelectedOptions.map(opt => opt.value));
  };
  
  // Handle date change
  const handleDateChange = (e) => {
    if (disabled) return;
    
    setInputValue(e.target.value);
    onChange(e.target.value);
  };
  
  // Default icons
  const DefaultLeftIcon = () => (
    <div className="w-4 h-4 relative overflow-hidden">
      <div className={`w-2.5 h-2.5 left-[3.33px] top-[2.67px] absolute ${disabled ? "bg-zinc-600" : "bg-neutral-900"}`} />
    </div>
  );
  
  const DefaultRightIcon = () => (
    <div className="w-4 h-4 relative overflow-hidden">
      <div className="w-3 h-2 left-[2px] top-[4px] absolute bg-neutral-900 rounded-[1px]" />
    </div>
  );

  // Cross icon for removing tags
  const CrossIcon = ({ onClick }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="w-4 h-4 flex items-center justify-center hover:bg-red-100 rounded-full transition-colors"
      disabled={disabled}
    >
      <svg 
        width="10" 
        height="10" 
        viewBox="0 0 10 10" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-red-500"
      >
        <path 
          d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  // Dropdown arrow icon
  const DropdownArrowIcon = () => (
    <div className="w-4 h-4 flex items-center justify-center">
      <svg 
        width="12" 
        height="12" 
        viewBox="0 0 12 12" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
      >
        <path 
          d="M3 4.5L6 7.5L9 4.5" 
          stroke={disabled ? "#71717a" : "#171717"} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  // Error icon for supporting text
  const ErrorIcon = () => (
    <div className="flex items-center justify-center w-5 h-5">
      <div className="w-3.5 h-3.5 rounded-full bg-red-600 flex items-center justify-center">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 3L3 9M3 3L9 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
  
  // Get appropriate right icon based on action type
  const getRightIcon = () => {
    if (rightIcon) return rightIcon;
    
    switch (actionType) {
      case 'dropdown':
        return <DropdownArrowIcon />;
      default:
        return showRightIcon ? <DefaultRightIcon /> : null;
    }
  };
  
  // Get display value for dropdown
  const getDisplayValue = () => {
    if (actionType === 'dropdown') {
      if (isMulti) {
        if (selectedOptions.length === 0) return "";
        return `${selectedOptions.length} selected`;
      }
      return selectedOption ? (selectedOption.label || selectedOption) : "";
    }
    return inputValue;
  };
  
  return (
    <div className={`inline-flex flex-col justify-start items-start gap-0.5 ${className}`} ref={dropdownRef}>
      {/* Label */}
      {showLabel && (
        <div className="inline-flex justify-start items-start w-full">
          <div className="flex justify-start items-center gap-1">
            <div className="text-center justify-start text-neutral-900 text-base font-normal leading-normal">
              {label}
            </div>
          </div>
        </div>
      )}
      
      {/* Input field */}
      <div 
        className={`${sizeClasses[size]} rounded-lg outline outline-1 outline-offset-[-1px] ${getStateStyles()} inline-flex justify-start items-center gap-1 ${hasWidthClass ? "w-full" : ""} relative`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={actionType === 'dropdown' ? handleDropdownToggle : undefined}
      >
        {/* Left icon - use custom if provided, otherwise default */}
        {showLeftIcon && (
          <div className="flex justify-center items-center ml-2">
            {leftIcon || <DefaultLeftIcon />}
          </div>
        )}
        
        {/* Input */}
        {actionType === 'dropdown' ? (
          <div
            className={`flex-1 bg-transparent border-none outline-none ${getTextColor()} ${disabled ? "cursor-not-allowed" : "cursor-pointer"} py-1`}
            ref={inputRef}
          >
            {getDisplayValue() || placeholder}
          </div>
        ) : actionType === 'date' ? (
          <input
            type="date"
            className={`flex-1 bg-transparent border-none outline-none ${getTextColor()} ${disabled ? "cursor-not-allowed" : ""}`}
            value={inputValue}
            onChange={handleDateChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
          />
        ) : resizable ? (
          <textarea
            className={`flex-1 bg-transparent border-none outline-none ${getTextColor()} ${disabled ? "cursor-not-allowed" : ""} resize-y`}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            style={{ minHeight: minHeight }}
            rows={1}
          />
        ) : (
          <input
            type={type}
            className={`flex-1 bg-transparent border-none outline-none ${getTextColor()} ${disabled ? "cursor-not-allowed" : ""}`}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
          />
        )}
        
        {/* Right icon */}
        {(showRightIcon || actionType === 'dropdown' || actionType === 'date') && (
          <div className="flex justify-center items-center mr-2">
            {getRightIcon()}
          </div>
        )}
        
        {/* Dropdown options */}
        {actionType === 'dropdown' && isDropdownOpen && options.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
            {options.map((option, index) => {
              const isSelected = isMulti && selectedOptions.some(
                selected => selected.value === (option.value || option)
              );
              
              return (
                <div
                  key={index}
                  className={`px-3 py-2 hover:bg-zinc-100 cursor-pointer text-sm text-neutral-900 border-b border-zinc-100 last:border-b-0 ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {isMulti && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      className="mr-2"
                      onChange={() => {}} // Handled by parent div click
                    />
                  )}
                  {option.label || option}
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Multi-select tags */}
      {actionType === 'dropdown' && isMulti && selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 w-full">
          {selectedOptions.map((option, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200"
            >
              <span>{option.label}</span>
              <CrossIcon onClick={() => handleRemoveOption(option)} />
            </div>
          ))}
        </div>
      )}
      
      {/* Supporting text */}
      {showSupportingText && (
        <div className="inline-flex justify-start items-start w-full">
          <div className="flex justify-start items-center gap-0.5">
            {error && <ErrorIcon />}
            <div className={`text-center justify-start ${error ? "text-red-600" : "text-zinc-800"} text-xs leading-none`}>
              {error ? errorText : supportingText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;