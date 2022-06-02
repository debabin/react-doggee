import React from 'react';

import { useStore } from '@utils/contextes';

export const MainPage: React.FC = () => {
  const { user } = useStore();

  return <div>{user?.username}</div>;
};
