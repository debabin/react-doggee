import React from 'react';

import { AddYourPetsStep, FillLoginDataStep, FillProfileDataStep } from './wizard/steps';

export const RegistrationPage: React.FC = () => {
  const [step, setStep] = React.useState<
    'fillLoginData' | 'fillProfileData' | 'addPetsData' | 'check'
  >('addPetsData');

  return (
    <>
      {step === 'fillLoginData' && (
        <FillLoginDataStep nextStep={() => setStep('fillProfileData')} />
      )}
      {step === 'fillProfileData' && (
        <FillProfileDataStep nextStep={() => setStep('addPetsData')} />
      )}
      {step === 'addPetsData' && (
        <AddYourPetsStep
          nextStep={() => setStep('check')}
          backStep={() => setStep('fillProfileData')}
        />
      )}
    </>
  );
};
