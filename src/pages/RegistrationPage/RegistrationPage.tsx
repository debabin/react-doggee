import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@utils/constants';
import { useStore } from '@utils/contextes';

import {
  AddYourPetsStep,
  CheckDataStep,
  FillLoginDataStep,
  FillProfileDataStep
} from './wizard/steps';

const defaultAddPetsData = [
  {
    id: 1,
    dogName: '',
    dogWeight: '',
    breed: null,
    dogBirthday: new Date().getTime()
  }
];

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { setStore } = useStore();

  const [registrationData, setRegistrationData] = React.useState<{
    fillProfileData: FillProfileData;
    addPetsData: AddPetsData;
  }>({
    fillProfileData: { name: '', registrationAddress: '', birthDate: new Date().getTime() },
    addPetsData: defaultAddPetsData
  });

  const [step, setStep] = React.useState<
    'fillLoginData' | 'fillProfileData' | 'addPetsData' | 'checkData'
  >('fillLoginData');

  const skipStep = React.useCallback(() => {
    navigate(ROUTES.MAIN);
    setStore({ service: { isLogined: true } });
  }, [setStore]);

  return (
    <>
      {step === 'fillLoginData' && (
        <FillLoginDataStep nextStep={() => setStep('fillProfileData')} />
      )}
      {step === 'fillProfileData' && (
        <FillProfileDataStep
          initialData={registrationData.fillProfileData}
          skipStep={skipStep}
          nextStep={(fillProfileData: $TSFixMe) => {
            setRegistrationData({ ...registrationData, fillProfileData });
            setStep('addPetsData');
          }}
        />
      )}
      {step === 'addPetsData' && (
        <AddYourPetsStep
          initialData={registrationData.addPetsData}
          skipStep={skipStep}
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
          backStep={() => {
            if (!registrationData.addPetsData.length) {
              setRegistrationData({
                ...registrationData,
                addPetsData: defaultAddPetsData
              });
            }

            setStep('addPetsData');
          }}
        />
      )}
    </>
  );
};
