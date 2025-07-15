'use client';

import React from 'react';
import Toast from './Toast';
import StateIcon from '../Icon/StateIcon';
import CloseButton from '../Icon/CloseButton';

const ToastExample = () => {
  const handleClose = () => {
    console.log('Toast closed');
  };

  const getCloseButtonColor = (state, theme) => {
    if (theme === 'solid') {
      if (state === 'warning') return 'black';
      if (state === 'error' || state === 'success') return 'white';
    }
    // Default color for other cases
    return 'black';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <br />
      <Toast
        state="warning"
        heading="Heading"
        description="This is an error toast notification with description."
        showDescription={true}
        closeButton={<CloseButton  color={getCloseButtonColor('warning', 'light')} />}
        icon={<StateIcon state="Error" variant="outlined" strokeColor="black" />}
        textcolor="black"
      />

    
    </div>
  );
};

export default ToastExample; 