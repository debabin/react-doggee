import { getComponentForPlatform } from '@utils/helpers';

import { FillLoginDataStep as FillLoginDataStepDesktop } from './desktop/FillLoginDataStep';
import { FillLoginDataStep as FillLoginDataStepMobile } from './mobile/FillLoginDataStep';

export const FillLoginDataStep = getComponentForPlatform({
  mobileComponent: FillLoginDataStepMobile,
  desktopCompoennt: FillLoginDataStepDesktop
});
