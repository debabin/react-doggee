import React from 'react';

import type { Store } from './StoreContext';
import { StoreContext } from './StoreContext';

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [store, setStore] = React.useState<Store>({ service: { isLogined: false } });
  const value = React.useMemo(() => ({ store, setStore }), [store]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
