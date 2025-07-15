"use client";

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar component with customizable styling and functionality
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.placeholder - Placeholder text for the search input
 * @param {string} props.value - Controlled value of the search input
 * @param {function} props.onChange - Callback function when input value changes
 * @param {function} props.onSearch - Callback function when search is triggered
 * @param {function} props.onClear - Callback function when clear button is clicked
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether the search bar is disabled
 * @param {boolean} props.showSearchIcon - Whether to show the search icon
 * @param {boolean} props.showClearButton - Whether to show the clear button when there's text
 * @param {string} props.size - Size variant ('sm', 'md', 'lg')
 * @param {boolean} props.autoFocus - Whether to auto-focus the input on mount
 * @param {number} props.debounceMs - Debounce delay in milliseconds for onSearch callback
 * @param {string} props.width - Custom width (e.g., 'w-full', 'w-96', '300px', '100%')
 * @param {string} props.height - Custom height (e.g., 'h-10', 'h-12', '40px', '3rem')
 * @param {string} props.maxWidth - Custom max-width (e.g., 'max-w-md', 'max-w-lg', '500px')
 * @param {string} props.minWidth - Custom min-width (e.g., 'min-w-64', 'min-w-80', '200px')
 * @returns {JSX.Element} SearchBar component
 * @example
 * <SearchBar
 *   placeholder="Search..."
 *   onSearch={(query) => console.log('Searching for:', query)}
 *   showClearButton={true}
 *   width="w-96"
 *   height="h-12"
 * />
 */
const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  onClear,
  className = "",
  disabled = false,
  showSearchIcon = true,
  showClearButton = true,
  size = "md",
  autoFocus = false,
  debounceMs = 300,
  width = "w-full",
  height = "",
  maxWidth = "",
  minWidth = ""
}) => {
  const [internalValue, setInternalValue] = useState(value || "");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Use controlled or uncontrolled mode
  const isControlled = value !== undefined;
  const inputValue = isControlled ? value : internalValue;

  /**
   * Handle input value changes
   * @function
   * @param {Event} event - Input change event
   */
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(event);
    }

    // Debounced search callback
    if (onSearch && debounceMs > 0) {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onSearch(newValue);
      }, debounceMs);
    } else if (onSearch) {
      onSearch(newValue);
    }
  };

  /**
   * Handle search action (Enter key or search icon click)
   * @function
   */
  const handleSearch = () => {
    if (onSearch) {
      clearTimeout(debounceRef.current);
      onSearch(inputValue);
    }
  };

  /**
   * Handle clear button click
   * @function
   */
  const handleClear = () => {
    const newValue = "";
    
    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onClear) {
      onClear();
    }

    if (onChange) {
      const syntheticEvent = {
        target: { value: newValue }
      };
      onChange(syntheticEvent);
    }

    if (onSearch) {
      clearTimeout(debounceRef.current);
      onSearch(newValue);
    }

    // Focus back to input after clearing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  /**
   * Handle keyboard events
   * @function
   * @param {KeyboardEvent} event - Keyboard event
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
    if (event.key === 'Escape') {
      if (inputValue) {
        handleClear();
      } else {
        inputRef.current?.blur();
      }
    }
  };

  /**
   * Handle input focus
   * @function
   */
  const handleFocus = () => {
    setIsFocused(true);
  };

  /**
   * Handle input blur
   * @function
   */
  const handleBlur = () => {
    setIsFocused(false);
  };

  // Auto-focus effect
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Size variants
  const sizeClasses = {
    sm: 'px-2 py-2 text-xs',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  // Build dimension classes
  const getDimensionClasses = () => {
    let classes = [];
    
    // Handle width - support both Tailwind classes and CSS values
    if (width) {
      if (width.startsWith('w-') || width.includes('width')) {
        classes.push(width);
      } else {
        // Custom CSS value
        classes.push(`[width:${width}]`);
      }
    }
    
    // Handle height - support both Tailwind classes and CSS values
    if (height) {
      if (height.startsWith('h-') || height.includes('height')) {
        classes.push(height);
      } else {
        // Custom CSS value
        classes.push(`[height:${height}]`);
      }
    }
    
    // Handle max-width
    if (maxWidth) {
      if (maxWidth.startsWith('max-w-') || maxWidth.includes('max-width')) {
        classes.push(maxWidth);
      } else {
        classes.push(`[max-width:${maxWidth}]`);
      }
    }
    
    // Handle min-width
    if (minWidth) {
      if (minWidth.startsWith('min-w-') || minWidth.includes('min-width')) {
        classes.push(minWidth);
      } else {
        classes.push(`[min-width:${minWidth}]`);
      }
    }
    
    return classes.join(' ');
  };

  const dimensionClasses = getDimensionClasses();

  return (
    <div className={`relative ${dimensionClasses} ${className}`}>
      <div
        className={`relative flex items-center bg-white rounded-full border transition-all duration-200 ${height ? 'h-full' : ''} ${
          disabled
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
            : isFocused
            ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        {/* Search Icon */}
        {showSearchIcon && (
          <div
            className={`absolute left-0 flex items-center justify-center ${
              size === 'sm' ? 'pl-3' : size === 'lg' ? 'pl-5' : 'pl-4'
            }`}
          >
            <Search
              className={`${iconSizes[size]} ${
                disabled ? 'text-gray-300' : 'text-gray-400'
              } cursor-pointer hover:text-gray-600 transition-colors`}
              onClick={!disabled ? handleSearch : undefined}
            />
          </div>
        )}

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full h-full bg-transparent border-none outline-none placeholder-gray-400 ${
            !height ? sizeClasses[size] : 'px-4'
          } ${showSearchIcon ? (size === 'sm' ? 'pl-10' : size === 'lg' ? 'pl-12' : 'pl-11') : ''} ${
            showClearButton && inputValue ? (size === 'sm' ? 'pr-10' : size === 'lg' ? 'pr-12' : 'pr-11') : ''
          } ${disabled ? 'cursor-not-allowed text-gray-400' : 'text-gray-700'}`}
          aria-label="Search input"
        />

        {/* Clear Button */}
        {showClearButton && inputValue && !disabled && (
          <div
            className={`absolute right-0 flex items-center justify-center ${
              size === 'sm' ? 'pr-3' : size === 'lg' ? 'pr-5' : 'pr-4'
            }`}
          >
            <button
              type="button"
              onClick={handleClear}
              className={`${iconSizes[size]} text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 p-1`}
              aria-label="Clear search"
            >
              <X className="w-full h-full" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;