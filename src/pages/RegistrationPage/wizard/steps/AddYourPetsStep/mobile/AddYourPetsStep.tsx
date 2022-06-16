import React from 'react';

import { Spacing } from '@common';
import { Button } from '@common/buttons';
import { IntlText } from '@features';

import { RegistrationWizardContainerMobile } from '../../../RegistrationWizardContainer';
import { PetForm } from '../components/PetForm/PetForm';
import { PetList } from '../components/PetList/PetList';
import { useAddYourPetsStep } from '../hooks/useAddYourPetsStep';

export const AddYourPetsStep: React.FC<AddYourPetsStepProps> = ({
  initialData,
  nextStep,
  backStep,
  skipStep
}) => {
  const { state, functions } = useAddYourPetsStep({ initialData, nextStep });

  return (
    <RegistrationWizardContainerMobile
      activeStep={2}
      form={{
        title: <IntlText path='page.registration.step.addYourPetsStep.title' />,
        backButton: (
          <div aria-hidden onClick={() => backStep(state.pets)}>
            <IntlText path='button.goNextStep' />
          </div>
        ),
        content: (
          <>
            <PetList
              isSubmited={state.isSumbited}
              pets={state.pets}
              errors={state.petErrors}
              selectedPetId={state.selectedPetId}
              onSelect={functions.selectPet}
              onAdd={functions.addPet}
              onDelete={functions.deletePet}
            />
            <Spacing spacing={15} />
            <PetForm
              onChange={functions.onChangePet}
              isLoading={state.loading}
              pet={state.pets.find((pet) => pet.id === state.selectedPetId)!}
              petErrors={state.petErrors}
            />
            <Button type='submit' isLoading={state.loading} onClick={functions.onSubmit}>
              <IntlText path='button.next' />
            </Button>
          </>
        ),
        footer: (
          <div role='link' tabIndex={0} aria-hidden onClick={skipStep}>
            <IntlText path='page.registration.skipAndFillInLater' />
          </div>
        )
      }}
    />
  );
};
