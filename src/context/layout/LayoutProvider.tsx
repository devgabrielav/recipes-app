import React, { ReactNode, useState } from 'react';
import initialValue from './initialValue';
import { layoutContext } from './layoutContext';

export default function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayout] = useState(initialValue);
  return (
    <layoutContext.Provider value={ [layout, setLayout] }>
      {children}
    </layoutContext.Provider>
  );
}
