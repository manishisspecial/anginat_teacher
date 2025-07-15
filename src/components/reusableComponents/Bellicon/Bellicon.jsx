"use client"
/**
 * @fileoverview Bell Icon Component for Next.js applications
 * @author Your Name
 * @version 1.0.0
 */

import React from 'react';

/**
 * Bell Icon Component
 * 
 * A customizable bell icon component with notification dot support.
 * Perfect for notification systems, alerts, and user interfaces.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} [props.size=24] - Size of the icon in pixels
 * @param {string} [props.color='currentColor'] - Color of the bell icon
 * @param {boolean} [props.hasNotification=false] - Whether to show notification dot
 * @param {string} [props.notificationColor='#ef4444'] - Color of the notification dot
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler function
 * @param {string} [props.ariaLabel='Bell notification'] - Accessibility label
 * @param {Object} [props.style] - Additional inline styles
 * 
 * @returns {JSX.Element} Bell icon component
 * 
 * @example
 * // Basic usage
 * <BellIcon />
 * 
 * @example
 * // With notification dot
 * <BellIcon hasNotification={true} />
 * 
 * @example
 * // Custom size and color
 * <BellIcon size={32} color="#3b82f6" />
 * 
 * @example
 * // With click handler
 * <BellIcon 
 *   hasNotification={true}
 *   onClick={() => console.log('Bell clicked!')}
 *   className="hover:opacity-75 cursor-pointer"
 * />
 */
const BellIcon = ({
  size = 24,
  color = 'currentColor',
  hasNotification = false,
  notificationColor = '#ef4444',
  className = '',
  onClick,
  ariaLabel = 'Bell notification',
  style = {},
  ...rest
}) => {
  /**
   * Handle click events
   * @param {Event} event - Click event
   */
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div
      className={` relative flex inline-flex items-center justify-center ${className}`}
      style={style}
      onClick={handleClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      {...rest}
    >
      {/* Bell SVG Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Notification Dot */}
      {hasNotification && (
        <span
          className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full"
          style={{ backgroundColor: notificationColor }}
          aria-label="New notification"
        >
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: notificationColor }}
          />
          <span
            className="relative inline-flex rounded-full h-3 w-3"
            style={{ backgroundColor: notificationColor }}
          />
        </span>
      )}
    </div>
  );
};

/**
 * @typedef {Object} BellIconProps
 * @property {number} [size=24] - Size of the icon in pixels
 * @property {string} [color='currentColor'] - Color of the bell icon
 * @property {boolean} [hasNotification=false] - Whether to show notification dot
 * @property {string} [notificationColor='#ef4444'] - Color of the notification dot
 * @property {string} [className=''] - Additional CSS classes
 * @property {Function} [onClick] - Click handler function
 * @property {string} [ariaLabel='Bell notification'] - Accessibility label
 * @property {Object} [style] - Additional inline styles
 */

export default BellIcon;

/**
 * Usage Examples:
 * 
 * import BellIcon from './components/BellIcon';
 * 
 * // In your component:
 * function Header() {
 *   return (
 *     <div className="flex items-center space-x-4">
 *       <BellIcon />
 *       <BellIcon hasNotification={true} />
 *       <BellIcon 
 *         size={28} 
 *         color="#6366f1" 
 *         hasNotification={true}
 *         onClick={() => alert('Notifications clicked!')}
 *       />
 *     </div>
 *   );
 * }
 */