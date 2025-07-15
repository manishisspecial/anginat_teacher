import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorIcon component for banners and alerts
 * @param {Object} props - Component props
 * @param {string} [props.color='#D41313'] - Color of the icon
 * @returns {React.ReactElement}
 */
const ErrorIcon = ({ color = '#D41313' }) => {
  return (
    <svg 
      width="22" 
      height="22" 
      viewBox="0 0 22 22" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM11 12.375C10.2375 12.375 9.625 11.7625 9.625 11V6.875C9.625 6.1125 10.2375 5.5 11 5.5C11.7625 5.5 12.375 6.1125 12.375 6.875V11C12.375 11.7625 11.7625 12.375 11 12.375ZM12.375 16.5H9.625V13.75H12.375V16.5Z" 
        fill={color}
      />
    </svg>
  );
};

ErrorIcon.propTypes = {
  color: PropTypes.string
};

export default ErrorIcon; 