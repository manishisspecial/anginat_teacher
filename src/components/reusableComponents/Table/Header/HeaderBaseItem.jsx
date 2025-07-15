import React from 'react';

/**
 * HeaderBaseItem component that handles different sizes with responsive width behavior
 * 
 * @param {Object} props - Component props
 * @param {('XL'|'L'|'M'|'S')} [props.size='M'] - Size variant
 * @param {string} [props.type='Standard'] - Type of the item
 * @param {React.ReactNode} [props.children] - Content to display
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {number} [props.minWidth=120] - Minimum width in pixels before truncation
 * @returns {React.ReactElement} The HeaderBaseItem component
 */
const HeaderBaseItem = ({ 
  size = 'M', 
  type = 'Standard', 
  children, 
  className = "",
  minWidth = 120
}) => {
  // Set appropriate height class based on size
  const heightClass = 
    size === 'XL' ? 'h-16' :  // 64px (h-16)
    size === 'L' ? 'h-12' :   // 48px (h-12)
    size === 'M' ? 'h-10' :   // 40px (h-10)
    size === 'S' ? 'h-8' : 'h-10'; // 32px (h-8), default to M
  
  // Adjust padding based on size
  const paddingClass = 
    size === 'XL' ? 'p-4' :
    size === 'L' ? 'p-3' :
    size === 'M' ? 'px-4 py-2' :
    size === 'S' ? 'px-3 py-2' : 'px-4 py-2'; // default to M
  
  // Adjust text styling based on size
  const textClass = 
    size === 'XL' ? 'text-sm' :
    size === 'L' ? 'text-sm' :
    size === 'M' ? 'text-xs' :
    size === 'S' ? 'text-xs' : 'text-sm'; // default to M
  
  // Bold font weight for header items
  const fontWeightClass = 'font-bold';
  
  return (
    <div 
      className={`max-w-full ${heightClass} Type-${type} bg-white flex items-center ${className}`}
      style={{
        minWidth: `${minWidth}px`,  // Set minimum width before content truncation
        overflow: 'hidden',         // Hide content that exceeds the width
        flexShrink: 1,              // Allow shrinking
        flexGrow: 1,                // Allow growing
        flexBasis: 0,               // Equal width distribution
      }}
    >
      <div className={`w-full ${paddingClass}`}>
        <div className={`text-neutral-900 ${textClass} ${fontWeightClass} font-['Arial'] leading-normal truncate`}>
          {children || "Content"}
        </div>
      </div>
    </div>
  );
};

export default HeaderBaseItem;