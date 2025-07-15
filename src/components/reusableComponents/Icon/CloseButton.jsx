'use client';

import React from 'react';

/**
 * CloseButton component for use in alert actions, wraps a close (X) icon with button styling and accessibility.
 * @param {Object} props
 * @param {function} [props.onClick] - Click handler for the button
 * @param {string} [props.ariaLabel="Close"] - Accessibility label
 * @param {string} [props.color="#141414"] - The color of the icon
 * @param {number} [props.size=24] - The size of the icon
 * @returns {JSX.Element}
 */
const CloseButton = ({ onClick, ariaLabel = 'Close', color = '#141414', size = 24, ...props }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    style={{
      background: 'none',
      border: 'none',
      padding: 0,
      margin: 0,
      cursor: 'pointer',
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transition: 'background 0.2s',
    }}
    {...props}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  </button>
);

export default CloseButton; 