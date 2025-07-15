'use client';

import React, { useState } from 'react';

const Link = ({
  text = "Link",
  type = "Default",
  variant = "Trailing",
  size = "Default",
  icon = true,
  onClick,
}) => {
  // State to track hover and focus
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // State-specific styling
  const stateStyles = {
    Default: {
      color: '#0364F3',
    },
    Hover: {
      color: '#0240A1',
    },
    Focused: {
      color: '#0240A1',
    },
    Disabled: {
      color: '#A1A1AA',
    }
  };

  // Determine the current visual state
  const currentState = (() => {
    if (isFocused) return "Focused";
    if (isHovered) return "Hover";
    return "Default";
  })();

  // Get current state styling
  const styles = stateStyles[currentState];

  // Container styles
  const containerStyles = {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '2px',
    cursor: 'pointer',
    // outline: isFocused ? '2px solid #0364F3' : 'none',
    outlineOffset: '2px',
    borderRadius: '2px',
    padding: '2px',
  };

  // Text styles
  const textStyles = {
    textAlign: 'center',
    color: styles.color,
    fontSize: '16px',
    fontFamily: 'Arial',
    fontWeight: '450',
    lineHeight: '24px',
  };

  // Arrow icon component
  const ArrowIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: styles.color }}
    >
      <path
        d="M3.33331 8H12.6666"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 3.33337L12.6667 8.00004L8 12.6667"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={containerStyles}
      data-type={type}
      data-variant={variant}
      data-size={size}
      data-icon={icon}
    >
      <span style={textStyles}>{text}</span>
      {icon && variant === "Trailing" && <ArrowIcon />}
    </div>
  );
};

export default Link;