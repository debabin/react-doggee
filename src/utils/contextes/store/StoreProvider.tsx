import React from 'react';

import type { Store, StoreContextProps } from './StoreContext';
import { StoreContext } from './StoreContext';

interface StoreProviderProps extends Omit<StoreContextProps, 'setStore'> {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ user, children }) => {
  const [store, setStore] = React.useState<Store>({ user });
  const value = React.useMemo(() => ({ ...store, setStore }), [store]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
