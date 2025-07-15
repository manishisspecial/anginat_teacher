import React from 'react';
import PropTypes from 'prop-types';

const Alert21 = ({ color = '#151515', width = '24px', height = '24px' }) => {
  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '16.02px',
          height: '14px',
          left: '3.97px',
          top: '5px',
          position: 'absolute',
          background: color,
        }}
      />
    </div>
  );
};

Alert21.propTypes = {
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Alert21; 