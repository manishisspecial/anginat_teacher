import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import HeaderBaseItem from './HeaderBaseItem';

/**
 * @typedef {Object} HeaderRowProps
 * @property {'Normal' | 'Expandable' | 'Checkbox' | 'ExpandableCheckbox' | 'CheckboxExpandable'} [type='Normal'] - Row type that determines functionality
 * @property {Array<React.ReactNode>} [headers=['Header', 'Header', 'Header', 'Header', 'Header', 'Header', 'Header', 'Header']] - Array of content for each cell
 * @property {'XL' | 'L' | 'M' | 'S'} [size='XL'] - Size of the row (affects height and padding)
 * @property {boolean} [initialExpanded=false] - Whether row starts expanded (for Expandable types)
 * @property {boolean} [initialChecked=false] - Whether checkbox starts checked (for Checkbox types)
 * @property {Function} [onExpandToggle=null] - Callback function when expand state changes
 * @property {Function} [onCheckToggle=null] - Callback function when checkbox state changes
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
    console.log(`HeaderRow CheckboxCell clicked, state: ${state}`);
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
    <div className={`${heightClass} bg-white flex-shrink-0 w-10 flex items-center`}>
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
    console.log(`HeaderRow ExpandableCell clicked, expanded: ${expanded}`);
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
    <div className={`${heightClass} bg-white flex-shrink-0 w-12 flex items-center`}>
      {/* Empty space for alignment */}
    </div>
  );
};

/**
 * HeaderRow component for tables with expandable and checkbox functionality
 * 
 * @param {HeaderRowProps} props - Component props
 * @returns {React.ReactElement} The HeaderRow component
 */
const HeaderRow = ({ 
  type = 'Normal', 
  headers = ['Header', 'Header', 'Header', 'Header', 'Header', 'Header', 'Header', 'Header'],
  size = 'XL',
  initialExpanded = false,
  initialChecked = false,
  onExpandToggle = null,
  onCheckToggle = null,
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
    console.log(`HeaderRow: Toggling expand from ${expanded} to ${newExpandedState}`);
    
    if (onExpandToggle) {
      onExpandToggle(newExpandedState);
    } else {
      setExpandedState(newExpandedState);
    }
  };
  
  const handleCheckToggle = () => {
    if (!hasCheckbox) return; // Don't toggle if no checkbox
    
    const newCheckedState = !isChecked;
    console.log(`HeaderRow: Toggling check from ${isChecked} to ${newCheckedState}`);
    
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
    <div 
      className={`w-full border-b border-neutral-200 ${className}`}
      style={{ position: 'relative' }}
    >
      <div 
        className={`w-full flex ${heightClass}`}
      >
        {renderPrefixCells().map((cell, index) => (
          <React.Fragment key={`prefix-${index}`}>{cell}</React.Fragment>
        ))}
        
        {headers.map((header, index) => (
          <HeaderBaseItem key={index} size={size} type="Standard" className="flex-1">
            {header}
          </HeaderBaseItem>
        ))}
      </div>
    </div>
  );
};

export default HeaderRow;