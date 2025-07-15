import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import BodyBaseItem from './BodyBaseItem';

/**
 * @typedef {Object} BodyRowProps
 * @property {'Normal' | 'Expandable' | 'Checkbox' | 'ExpandableCheckbox' | 'CheckboxExpandable'} [type='Normal'] - Row type that determines functionality
 * @property {Array<React.ReactNode>} [contents=['Content', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content']] - Array of content for each cell (can be text, buttons, links, or any React components)
 * @property {'XL' | 'L' | 'M' | 'S'} [size='M'] - Size of the row (affects height and padding)
 * @property {boolean} [initialExpanded=false] - Whether row starts expanded (for Expandable types)
 * @property {boolean} [initialChecked=false] - Whether checkbox starts checked (for Checkbox types)
 * @property {Function} [onExpandToggle=null] - Callback function when expand state changes
 * @property {Function} [onCheckToggle=null] - Callback function when checkbox state changes
 * @property {React.ReactNode} [expandedContent=null] - Custom content to show when row is expanded
 * @property {string} [className=""] - Additional CSS classes to apply to the row
 * @property {boolean} [showExpandableSpace=false] - Whether to show space for expandable icon even if not expandable
 * @property {boolean} [showCheckboxSpace=false] - Whether to show space for checkbox even if no checkbox
 * @property {boolean} [isExpandable=true] - Whether this row can be expanded (for Expandable types)
 * @property {boolean} [hasCheckbox=true] - Whether this row has a checkbox (for Checkbox types)
 */

// CheckboxCell component to handle different checkbox states
const CheckboxCell = ({ state = 'Unchecked', onToggle, size = 'M' }) => {
  // Set appropriate height class based on size
  const heightClass = 
    size === 'XL' ? 'h-16' :
    size === 'L' ? 'h-12' :
    size === 'M' ? 'h-10' :
    size === 'S' ? 'h-8' : 'h-10';

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`CheckboxCell clicked, state: ${state}`);
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <div className={`${heightClass} flex-shrink-0 w-10 flex items-center`}>
      <div className="h-full flex items-center px-4">
        <div className="flex justify-center items-center cursor-pointer" onClick={handleClick}>
          {state === 'Checked' ? (
            <div className="bg-blue-600 rounded-sm flex justify-center items-center overflow-hidden w-4 h-4">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
          ) : (
            <div className="w-4 h-4 rounded-sm border-2 border-zinc-800" />
          )}
        </div>
      </div>
    </div>
  );
};

// EmptyCheckboxCell component - placeholder to maintain alignment
const EmptyCheckboxCell = ({ size = 'M' }) => {
  const heightClass = 
    size === 'XL' ? 'h-16' :
    size === 'L' ? 'h-12' :
    size === 'M' ? 'h-10' :
    size === 'S' ? 'h-8' : 'h-10';

  return (
    <div className={`${heightClass} flex-shrink-0 w-10 flex items-center`}>
      {/* Empty space for alignment */}
    </div>
  );
};

// ExpandableCell component to handle expandable icon
const ExpandableCell = ({ expanded = false, onToggle, size = 'M' }) => {
  // Set appropriate height class based on size
  const heightClass = 
    size === 'XL' ? 'h-16' :
    size === 'L' ? 'h-12' :
    size === 'M' ? 'h-10' :
    size === 'S' ? 'h-8' : 'h-10';

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`ExpandableCell clicked, expanded: ${expanded}`);
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <div className={`${heightClass} flex-shrink-0 w-12 flex items-center`}>
      <div className="h-full flex items-center px-4 cursor-pointer" onClick={handleClick}>
        <ChevronRight 
          className={`w-4 h-4 text-zinc-800 transition-transform ${expanded ? 'rotate-90' : ''}`} 
        />
      </div>
    </div>
  );
};

// EmptyExpandableCell component - placeholder to maintain alignment
const EmptyExpandableCell = ({ size = 'M' }) => {
  const heightClass = 
    size === 'XL' ? 'h-16' :
    size === 'L' ? 'h-12' :
    size === 'M' ? 'h-10' :
    size === 'S' ? 'h-8' : 'h-10';

  return (
    <div className={`${heightClass} flex-shrink-0 w-12 flex items-center`}>
      {/* Empty space for alignment */}
    </div>
  );
};

// ExpandedContent component to show when row is expanded
const ExpandedContent = ({ expandedContent, size }) => {
  // Match the size styling from BodyBaseItems for consistency
  const paddingClass = 
    size === 'XL' ? 'p-4' :
    size === 'L' ? 'p-4' :
    size === 'M' ? 'p-3' :
    size === 'S' ? 'p-2' : 'p-3';

  // If custom content is provided, render it with proper padding
  if (expandedContent) {
    return (
      <div 
        data-expanded-content="true" 
        className="w-full bg-white"
      >
        <div className={`flex-1 self-stretch ${paddingClass} pl-12 flex flex-col justify-start items-start gap-4`}>
          {expandedContent}
        </div>
      </div>
    );
  }

  // Default expanded content if no custom content is provided
  return (
    <div 
      data-expanded-content="true" 
      data-text="true" 
      className="w-full bg-white"
    > 
      <div className={`flex-1 self-stretch ${paddingClass} pl-12 flex flex-col justify-start items-start gap-4`}> 
        <div className="self-stretch justify-start text-neutral-900 text-sm font-normal leading-normal">
          Expandable table content
        </div> 
        <div className="self-stretch p-1 bg-sky-100 rounded border border-neutral-200 inline-flex justify-start items-center gap-2"> 
          <div className="w-4 h-4 relative bg-blend-multiply bg-white overflow-hidden"> 
            <div className="w-2.5 h-2.5 left-[2.98px] top-[3px] absolute bg-blue-600" /> 
          </div> 
          <div className="flex-1 justify-start text-blue-600 text-xs font-normal leading-none">
            Default expanded content
          </div> 
        </div> 
      </div> 
    </div>
  );
};

/**
 * BodyRow component for tables with expandable and checkbox functionality
 * 
 * @param {BodyRowProps} props - Component props
 * @returns {React.ReactElement} The BodyRow component
 */
const BodyRow = ({ 
  type = 'Normal', 
  contents = ['Content', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content', 'Content'],
  size = 'M',
  initialExpanded = false,
  initialChecked = false,
  onExpandToggle = null,
  onCheckToggle = null,
  expandedContent = null,
  className = "",
  showExpandableSpace = false,
  showCheckboxSpace = false,
  isExpandable = true,
  hasCheckbox = true,
}) => {
  const [expandedState, setExpandedState] = useState(initialExpanded);
  const [checkedState, setCheckedState] = useState(initialChecked);
  
  // Sync internal state with prop changes
  React.useEffect(() => {
    setExpandedState(initialExpanded);
  }, [initialExpanded]);
  
  React.useEffect(() => {
    setCheckedState(initialChecked);
  }, [initialChecked]);
  
  // Use controlled state if callback is provided, otherwise use internal state
  const expanded = onExpandToggle !== null ? initialExpanded : expandedState;
  const isChecked = onCheckToggle !== null ? initialChecked : checkedState;
  
  const handleExpandToggle = () => {
    if (!isExpandable) return; // Don't toggle if not expandable
    
    const newExpandedState = !expanded;
    console.log(`BodyRow ${type}: Toggling expand from ${expanded} to ${newExpandedState}`);
    
    if (onExpandToggle) {
      onExpandToggle(newExpandedState);
    } else {
      setExpandedState(newExpandedState);
    }
  };
  
  const handleCheckToggle = () => {
    if (!hasCheckbox) return; // Don't toggle if no checkbox
    
    const newCheckedState = !isChecked;
    console.log(`BodyRow ${type}: Toggling check from ${isChecked} to ${newCheckedState}`);
    
    if (onCheckToggle) {
      onCheckToggle(newCheckedState);
    } else {
      setCheckedState(newCheckedState);
    }
  };
  
  // Set row height
  const heightClass = 
    size === 'XL' ? 'h-16' :
    size === 'L' ? 'h-12' :
    size === 'M' ? 'h-10' :
    size === 'S' ? 'h-8' : 'h-10';
  
  const shouldShowExpandableCell = type.includes('Expandable') || showExpandableSpace;
  const shouldShowCheckboxCell = type.includes('Checkbox') || showCheckboxSpace;
  
  const renderPrefixCells = () => {
    const cells = [];
    
    // For expandable cell or its empty placeholder
    if (shouldShowExpandableCell) {
      if (type.includes('Expandable') && isExpandable) {
        cells.push(
          <ExpandableCell 
            key="expandable" 
            expanded={expanded} 
            onToggle={handleExpandToggle}
            size={size}
          />
        );
      } else {
        cells.push(
          <EmptyExpandableCell 
            key="expandable-placeholder" 
            size={size} 
          />
        );
      }
    }
    
    // For checkbox cell or its empty placeholder
    if (shouldShowCheckboxCell) {
      if (type.includes('Checkbox') && hasCheckbox) {
        const checkState = type.includes('Checked') || isChecked ? 'Checked' : 'Unchecked';
        cells.push(
          <CheckboxCell 
            key="checkbox" 
            state={checkState} 
            onToggle={handleCheckToggle}
            size={size}
          />
        );
      } else {
        cells.push(
          <EmptyCheckboxCell 
            key="checkbox-placeholder" 
            size={size}
          />
        );
      }
    }
    
    return cells;
  };

  return (
    <div className="flex flex-col">
      <div 
        className={`w-full flex ${heightClass} ${className}`}
        style={{ 
          position: 'relative',
          zIndex: 2
        }}
      >
        {renderPrefixCells().map((cell, index) => (
          <React.Fragment key={`prefix-${index}`}>{cell}</React.Fragment>
        ))}
        
        {contents.map((content, index) => (
          <BodyBaseItem 
            key={index} 
            size={size} 
            type="Standard" 
            className="flex-1"
          >
            {content}
          </BodyBaseItem>
        ))}
      </div>
      
      {/* Show expanded content when expanded */}
      {expanded && type.includes('Expandable') && isExpandable && (
        <div 
          className="relative w-full" 
          style={{ zIndex: 1 }}
        >
          <ExpandedContent expandedContent={expandedContent} size={size} />
        </div>
      )}
    </div>
  );
};

export default BodyRow;