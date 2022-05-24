import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IntlText, useIntl, useMutation } from '@features';

import { useStore } from '@utils/contextes';
import { changeUser } from '@utils/api';

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer';
import { PetList } from './PetList/PetList';
import { PetForm } from './PetForm/PetForm';

interface AddYourPetsStepProps {
  initialData: $TSFixMe[];
  nextStep: (addPetsData: Pet[]) => void;
  backStep: (addPetsData: Pet[]) => void;
}

export const AddYourPetsStep: React.FC<AddYourPetsStepProps> = ({
  initialData,
  nextStep,
  backStep
}) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const [pets, setPets] = React.useState(initialData);
  const [selectedPetId, setSelectedPetId] = React.useState(pets[0].id);
  // const [focusedField, setFocuseField] = React.useState<'name' | 'registrationAddress' | null>(
  //   null
  // );
  const { user, setStore } = useStore();

  const { mutationAsync: changeUserMutation, isLoading: changeUserLoading } = useMutation<
    UsersReqPatchParams,
    ApiResponse<User>
  >('changeUser', (params) => changeUser({ params }));

  const addPet = () => {
    setPets([
      ...pets,
      {
        id: pets[pets.length - 1].id + 1,
        dogBirthday: new Date(),
        dogName: '',
        dogWeight: '',
        breed: ''
      }
    ]);
  };

  const selectPet = (id: Pet['id']) => {
    setSelectedPetId(id);
  };

  const deletePet = (id: Pet['id']) => {
    const updatedPets = [...pets.filter((pet) => pet.id !== id)];
    setSelectedPetId(updatedPets[0].id);
    setPets(updatedPets);
  };

  return (
    <RegistrationWizardContainer
      activeStep={2}
      panel={{
        data: (
          <PetList
            pets={pets}
            selectedPetId={selectedPetId}
            onSelect={selectPet}
            onAdd={addPet}
            onDelete={deletePet}
          />
        ),
        footer: (
          <div role='link' tabIndex={0} aria-hidden onClick={() => nextStep(pets)}>
            <IntlText path='page.registration.skipAndFillInLater' />
          </div>
        )
      }}
      form={{
        title: <IntlText path='page.registration.step.fillLoginDataStep.fillYourLoginData' />,
        backButton: (
          <div aria-hidden onClick={() => backStep(pets)}>
            <IntlText path='button.goNextStep' />
          </div>
        ),
        content: (
          <PetForm
            onChange={(field, value) => {
              setPets([
                ...pets.map((pet) => {
                  if (pet.id === selectedPetId) {
                    return { ...pet, [field]: value };
                  }
                  return pet;
                })
              ]);
            }}
            isLoading={changeUserLoading}
            pet={pets.find((pet) => pet.id === selectedPetId)}
          />
        )
      }}
    />
  );
};
