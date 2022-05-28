import React from 'react';

import { StoreContext } from './StoreContext';

export const useStore = () => {
  const { setStore, ...store } = React.useContext(StoreContext);

  return { ...store, setStore };
};
