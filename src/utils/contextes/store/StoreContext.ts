import React from 'react';

export interface Store {
  user?: User;
  service: Service;
}

export interface StoreContextProps {
  store: Store;
  setStore: React.Dispatch<React.SetStateAction<Store>>;
}

export const StoreContext = React.createContext<StoreContextProps>({
  store: {
    service: { isLogined: false }
  },
  setStore: () => {}
});
