import { getComponentForPlatform } from '@utils/helpers';

import { CheckDataStep as CheckDataStepDesktop } from './desktop/CheckDataStep';
import { CheckDataStep as CheckDataStepMobile } from './mobile/CheckDataStep';

export const CheckDataStep = getComponentForPlatform({
  mobileComponent: CheckDataStepMobile,
  desktopCompoennt: CheckDataStepDesktop
});
