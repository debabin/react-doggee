import React from 'react';

import { AddYourPetsStep, FillLoginDataStep, FillProfileDataStep } from './wizard/steps';

export const RegistrationPage: React.FC = () => {
  const [registrationData, setRegistrationData] = React.useState<{
    fillProfileData: $TSFixMe;
    addPetsData: $TSFixMe;
  }>({
    fillProfileData: { name: '', registrationAddress: '', birthDate: new Date() },
    addPetsData: [{ id: 1, dogName: '', dogWeight: '', breed: null, dogBirthday: new Date() }]
  });

  const [step, setStep] = React.useState<
    'fillLoginData' | 'fillProfileData' | 'addPetsData' | 'check'
  >('addPetsData');

  console.log('step', step);
  console.log('registrationData', registrationData);

  return (
    <>
      {step === 'fillLoginData' && (
        <FillLoginDataStep nextStep={() => setStep('fillProfileData')} />
      )}
      {step === 'fillProfileData' && (
        <FillProfileDataStep
          initialData={registrationData.fillProfileData}
          nextStep={(fillProfileData: $TSFixMe) => {
            setRegistrationData({ ...registrationData, fillProfileData });
            setStep('addPetsData');
          }}
        />
      )}
      {step === 'addPetsData' && (
        <AddYourPetsStep
          initialData={registrationData.addPetsData}
          nextStep={(addPetsData: $TSFixMe) => {
            setRegistrationData({ ...registrationData, addPetsData });
            setStep('check');
          }}
          backStep={(addPetsData: $TSFixMe) => {
            setRegistrationData({ ...registrationData, addPetsData });
            setStep('fillProfileData');
          }}
        />
      )}
    </>
  );
};
