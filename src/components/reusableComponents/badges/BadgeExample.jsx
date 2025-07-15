'use client';

import React from 'react';
import Badge from './Badge11';

const BadgeExample = () => {
  return (
    <div className="p-8 flex flex-col gap-8">
      <h1 className="text-xl font-bold">Badge Examples</h1>

      <Badge
        size="Default"
        themes="Error"
        type="Solid"
        variant="Leading Icon"
        text="badge"
      />

    </div>
  );
};

export default BadgeExample; 