import React from 'react';

/**
 * StateIcon - renders a solid or outlined icon for Error, Warning, or Success state
 * @param {Object} props
 * @param {'Error'|'Warning'|'Success'|'Cross'} props.state - The state to render the icon for
 * @param {'solid'|'outlined'} [props.variant='solid'] - The icon style
 * @param {number} [props.size=32] - The size of the icon container (width & height in px)
 * @param {Object} [props.style] - Additional styles for the wrapper
 * @param {string} [props.strokeColor] - Custom stroke color for outlined variant
 */
const StateIcon = ({ state = 'Error', variant = 'solid', size = 32, style = {}, strokeColor }) => {
  // Icon SVGs and colors
  const icons = {
    Error: {
      solid: (
        <svg width="21.33" height="21.33" viewBox="0 0 24 24" fill="#D41313" xmlns="http://www.w3.org/2000/svg"  style={{ position: 'absolute', left: '5.33px', top: '4.97px' }}>
          <circle cx="12" cy="12" r="10" />
          <rect x="11" y="7" width="2" height="6" fill="#fff" />
          <rect x="11" y="15" width="2" height="2" fill="#fff" />
        </svg>
      ),
      outlined: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor || "#ffffff"} stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert-icon lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      ),
    },
    Warning: {
      solid: (
        <svg width="21.34" height="18.67" viewBox="0 0 24 21" fill="#A84C00" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '5.33px', top: '6.67px' }}>
          <polygon points="12,2 23,21 1,21" />
          <rect x="11" y="8" width="2" height="5" fill="#fff" />
          <rect x="11" y="16" width="2" height="2" fill="#fff" />
        </svg>
      ),
      outlined: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor || "#000000"} stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert-icon lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      ),
    },
    Success: {
      solid: (
        <svg width="21.33" height="21.33" viewBox="0 0 24 24" fill="#197A00" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '5.33px', top: '5.33px' }}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="8,13 11,16 16,9" fill="none" stroke="#fff" strokeWidth="2" />
        </svg>
      ),
      outlined: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor || "currentColor"} stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
      ),
    },
    Cross: {
      solid: (
        <svg width="21.33" height="21.33" viewBox="0 0 24 24" fill="#D41313" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '5.33px', top: '5.33px' }}>
          <circle cx="12" cy="12" r="10" />
          <line x1="9" y1="9" x2="15" y2="15" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="9" x2="9" y2="15" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      outlined: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor || "currentColor"} stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
      ),
    }
  };

  const iconState = icons[state] || icons['Error'];
  const iconVariant = iconState[variant] || iconState['solid'];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {iconVariant}
    </div>
  );
};

export default StateIcon;