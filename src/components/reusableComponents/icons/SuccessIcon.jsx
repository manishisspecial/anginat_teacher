import React from 'react';
import PropTypes from 'prop-types';

/**
 * SuccessIcon component for banners and alerts
 * @param {Object} props - Component props
 * @param {string} [props.color='#197A00'] - Color of the icon
 * @returns {React.ReactElement}
 */
const SuccessIcon = ({ color = '#197A00' }) => {
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
        d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM8.799 16.4725L3.799 11.4725C3.3265 11 3.3265 10.2125 3.799 9.74C4.2715 9.2675 5.059 9.2675 5.5315 9.74L9.625 13.8335L16.4685 7.0275C16.941 6.555 17.7285 6.555 18.201 7.0275C18.6735 7.5 18.6735 8.2875 18.201 8.76L10.451 16.4725C9.9785 16.945 9.2715 16.945 8.799 16.4725Z" 
        fill={color}
      />
    </svg>
  );
};

SuccessIcon.propTypes = {
  color: PropTypes.string
};

export default SuccessIcon; 