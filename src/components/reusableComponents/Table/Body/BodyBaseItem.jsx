import React from 'react';

/**
 * BodyBaseItem component that handles different sizes with responsive width behavior
 * and supports any type of React component (buttons, links, custom components, text, etc.)
 * 
 * @param {Object} props - Component props
 * @param {('XL'|'L'|'M'|'S')} [props.size='M'] - Size variant
 * @param {string} [props.type='Standard'] - Type of the item
 * @param {React.ReactNode} [props.children] - Any React component, text, or content to display
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {number} [props.minWidth=120] - Minimum width in pixels before truncation
 * @param {('left'|'center'|'right')} [props.align='left'] - Content alignment
 * @param {boolean} [props.truncateText=true] - Whether to truncate text content (disable for components)
 * @returns {React.ReactElement} The BodyBaseItem component
 */
const BodyBaseItem = ({ 
  size = 'M', 
  type = 'Standard', 
  children, 
  className = "",
  minWidth = 120,
  align = 'left',
  truncateText = true
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
  
  // Adjust text styling based on size (only applies to text content)
  const textClass = 
    size === 'XL' ? 'text-sm' :
    size === 'L' ? 'text-sm' :
    size === 'M' ? 'text-xs' :
    size === 'S' ? 'text-xs' : 'text-sm'; // default to M
  
  // Normal font weight for content items (vs bold for headers)
  const fontWeightClass = 'font-normal';
  
  // Alignment classes
  const alignmentClass = 
    align === 'center' ? 'justify-center items-center' :
    align === 'right' ? 'justify-end items-center' :
    'justify-start items-center'; // default to left
  
  // Check if children is a string/text content or a React component
  const isTextContent = typeof children === 'string' || typeof children === 'number';
  
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
      <div className={`w-full ${paddingClass} flex ${alignmentClass}`}>
        {isTextContent ? (
          // Render text content with styling and optional truncation
          <div className={`text-neutral-900 ${textClass} ${fontWeightClass} font-['Arial'] leading-normal ${truncateText ? 'truncate' : ''}`}>
            {children || "Content"}
          </div>
        ) : (
          // Render any React component as-is (buttons, links, custom components, etc.)
          <div className="flex items-center justify-inherit w-full">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyBaseItem;