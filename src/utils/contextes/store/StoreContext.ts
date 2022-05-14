import React from 'react';

export interface Store {
  user?: User;
}

export interface StoreContextProps {
  user?: Store['user'];
  setStore: React.Dispatch<React.SetStateAction<Store>>;
}

export const StoreContext = React.createContext<StoreContextProps>({ setStore: () => {} });
