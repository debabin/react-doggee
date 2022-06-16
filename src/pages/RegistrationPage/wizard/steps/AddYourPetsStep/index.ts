import { getComponentForPlatform } from '@utils/helpers';

import { AddYourPetsStep as AddYourPetsStepDesktop } from './desktop/AddYourPetsStep';
import { AddYourPetsStep as AddYourPetsStepMobile } from './mobile/AddYourPetsStep';

export const AddYourPetsStep = getComponentForPlatform({
  mobileComponent: AddYourPetsStepMobile,
  desktopCompoennt: AddYourPetsStepDesktop
});
