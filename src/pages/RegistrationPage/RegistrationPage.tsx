import React from 'react';

import {
  AddYourPetsStep,
  CheckDataStep,
  FillLoginDataStep,
  FillProfileDataStep
} from './wizard/steps';

export const RegistrationPage: React.FC = () => {
  const [registrationData, setRegistrationData] = React.useState<{
    fillProfileData: FillProfileData;
    addPetsData: AddPetsData;
  }>({
    fillProfileData: { name: '', registrationAddress: '', birthDate: new Date().getTime() },
    addPetsData: [
      { id: 1, dogName: '', dogWeight: '', breed: null, dogBirthday: new Date().getTime() }
    ]
  });

  const [step, setStep] = React.useState<
    'fillLoginData' | 'fillProfileData' | 'addPetsData' | 'checkData'
  >('fillLoginData');

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
          nextStep={(addPetsData) => {
            setRegistrationData({ ...registrationData, addPetsData });
            setStep('checkData');
          }}
          backStep={(addPetsData) => {
            setRegistrationData({ ...registrationData, addPetsData });
            setStep('fillProfileData');
          }}
        />
      )}
      {step === 'checkData' && (
        <CheckDataStep
          initialData={registrationData}
          chooseStep={(step: 'fillProfileData' | 'addPetsData') => setStep(step)}
          backStep={() => setStep('addPetsData')}
        />
      )}
    </>
  );
};
