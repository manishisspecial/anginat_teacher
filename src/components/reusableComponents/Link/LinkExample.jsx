'use client';

import React from 'react';
import Link from './link';

const LinkExample = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link 
          text="View Details" 
          type="Text link"
          variant="Trailing"
          size="Default"
          icon={true}
          onClick={() => console.log('Link clicked')}
        />
      </div>
    </div>
  );
};

export default LinkExample; 