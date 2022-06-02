import React from 'react';

import { Store, StoreContext } from './StoreContext';

export const useStore = () => {
  const storeContext = React.useContext(StoreContext);
  console.log('@@storeContext', storeContext);

  return {
    ...storeContext.store,
    setStore: (data: Partial<Store>) => {
      storeContext.setStore({ ...storeContext.store, ...data });
    }
  };
};
