import React from 'react';

import { isMobile } from './isMobile';

interface GetComponentForPlatformParams {
  mobileComponent: React.FC<any>;
  desktopCompoennt: React.FC<any>;
}

export const getComponentForPlatform = ({
  mobileComponent,
  desktopCompoennt
}: GetComponentForPlatformParams) => {
  if (isMobile) return mobileComponent;
  return desktopCompoennt;
};
