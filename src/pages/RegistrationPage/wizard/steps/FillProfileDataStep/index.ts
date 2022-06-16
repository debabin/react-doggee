import { getComponentForPlatform } from '@utils/helpers';

import { FillProfileDataStep as FillProfileDataStepDesktop } from './desktop/FillProfileDataStep';
import { FillProfileDataStep as FillProfileDataStepMobile } from './mobile/FillProfileDataStep';

export const FillProfileDataStep = getComponentForPlatform({
  mobileComponent: FillProfileDataStepMobile,
  desktopCompoennt: FillProfileDataStepDesktop
});
