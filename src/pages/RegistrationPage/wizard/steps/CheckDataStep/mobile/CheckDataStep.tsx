import React from 'react';

import { Spacing } from '@common';
import { Button } from '@common/buttons';
import { IntlText, useIntl } from '@features';
import { formatDate } from '@utils/helpers';

import { RegistrationWizardContainerMobile } from '../../../RegistrationWizardContainer';
import { DataCard } from '../components/DataCard/DataCard';
import { DataItem } from '../components/DataCard/DataItem/DataItem';
import { DontWorry } from '../components/DontWorry/DontWorry';

interface CheckDataStepProps {
  initialData: {
    fillProfileData: FillProfileData;
    addPetsData: AddPetsData;
  };
  backStep: () => void;
  chooseStep: (step: 'fillProfileData' | 'addPetsData') => void;
}

export const CheckDataStep: React.FC<CheckDataStepProps> = ({
  initialData,
  backStep,
  chooseStep
}) => {
  const intl = useIntl();

  return (
    <RegistrationWizardContainerMobile
      activeStep={3}
      form={{
        title: <IntlText path='page.registration.step.checkDataStep.title' />,
        backButton: (
          <div aria-hidden onClick={() => backStep()}>
            <IntlText path='button.goNextStep' />
          </div>
        ),
        content: (
          <>
            <DataCard
              title={intl.translateMessage('page.registration.step.checkDataStep.card.profile')}
              onEdit={() => chooseStep('fillProfileData')}
            >
              <DataItem label='Name' data={initialData.fillProfileData.name} />
              <DataItem label='Location' data={initialData.fillProfileData.registrationAddress} />
              <DataItem
                label='Birthdate'
                data={formatDate(new Date(initialData.fillProfileData.birthDate), 'DD MMM YYYY')}
              />
            </DataCard>

            <Spacing spacing={15} />

            <DataCard
              title={intl.translateMessage('page.registration.step.checkDataStep.card.pets')}
              onEdit={() => chooseStep('addPetsData')}
            >
              {initialData.addPetsData.map((pet: Pet) => {
                const petYears = new Date().getFullYear() - new Date(pet.dogBirthday).getFullYear();
                const petBreedName = pet.breed && pet.breed.name;
                const petBirthday = !!petYears && ` ${petYears} y.o.`;
                const petWeight = pet.dogWeight && ` , ${pet.dogWeight} kg`;

                const petData = `${petBreedName}${petBirthday}${petWeight}`;

                return <DataItem label={pet.dogName} data={petData} />;
              })}
            </DataCard>

            <Spacing spacing={15} />
            <DontWorry />
            <Spacing spacing={15} />

            <Button type='submit'>
              <IntlText path='button.done' />
            </Button>
          </>
        )
      }}
    />
  );
};
