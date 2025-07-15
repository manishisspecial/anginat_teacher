'use client';
import React from 'react';
import Alert11 from './Alert11';
import Button from '../buttons/Button';
import StateIcon from '../Icon/StateIcon';
import CloseButton from '../Icon/CloseButton';

const getCloseButtonColor = (state, theme) => {
  if (theme === 'solid') {
    if (state === 'warning') return 'black';
    if (state === 'error' || state === 'success') return 'white';
  } else if(theme === 'light'){
    if (state === 'error' || state === 'success' || state === 'warning') return 'black';
  }
  return 'black';                       
};

const AlertExample = () => (
  <>
 

<Alert11
  state="warning"
  theme="light"
  message="Placeholder message"
  icon={<StateIcon state='Warning' variant='outlined' strokeColor="#197A00" />}
  // action={<CloseButton color={getCloseButtonColor('warning', 'light')} />}
  textColor="#000000"   
/>
<br />
<Alert11
  state="warning"
  theme="solid"
  message="Placeholder message"
  icon={<StateIcon state='Warning' variant='outlined' strokeColor="#000000" />}
  // action={<CloseButton color={getCloseButtonColor('warning', 'light')} />}
  textColor="#000000"   
/>
<br />
<Alert11
  state="error"
  theme="solid"
  message="Placeholder message"
  icon={<StateIcon state='Error' variant='outlined' strokeColor="white" />}
  action={<Button type='tertiary' size='compact'  state='default'>Button</Button>}
  textColor="#000000"   
/>
   
  </>
);  

export default AlertExample;