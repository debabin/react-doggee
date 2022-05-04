import React from 'react';

import { FillLoginDataStep, FillProfileDataStep } from './wizard/steps';

export const RegistrationPage: React.FC = () => {
  const [step, setStep] = React.useState<'fillLoginData' | 'fillProfileData' | 'pets' | 'check'>(
    'fillLoginData'
  );

  return (
    <>
      {step === 'fillLoginData' && (
        <FillLoginDataStep nextStep={() => setStep('fillProfileData')} />
      )}
      {step === 'fillProfileData' && <FillProfileDataStep nextStep={() => setStep('pets')} />}
    </>
  );
};
