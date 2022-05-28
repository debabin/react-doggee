import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@common/buttons';
import { IntlText, useIntl, useMutation } from '@features';
import { changeUser } from '@utils/api';
import { useStore } from '@utils/contextes';
import { validateIsEmpty } from '@utils/helpers';

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer';

import { PetForm } from './PetForm/PetForm';
import { PetList } from './PetList/PetList';

interface AddYourPetsStepProps {
  initialData: AddPetsData;
  nextStep: (addPetsData: AddPetsData) => void;
  backStep: (addPetsData: AddPetsData) => void;
}

const petFormValidateSchema = {
  dogName: (value: string) => validateIsEmpty(value),
  dogWeight: (value: string) => validateIsEmpty(value)
};

const validatePet = (pet: Pet) => {
  let petErrors: { [K in keyof typeof petFormValidateSchema]?: ValidationReturn } = {};
  Object.keys(petFormValidateSchema).forEach((field) => {
    const error = petFormValidateSchema[field as keyof typeof petFormValidateSchema](
      pet[field as keyof typeof petFormValidateSchema]
    );
    if (!error) return;

    petErrors = {
      ...petErrors,
      [field]: error
    };
  });
  if (!Object.keys(petErrors).length) return;
  return petErrors;
};

const validatePets = (pets: Pet[]) => {
  let errors: {
    [id: string]: { [K in keyof typeof petFormValidateSchema]?: ValidationReturn };
  } = {};

  pets.forEach((pet) => {
    const petErrors = validatePet(pet);
    if (!petErrors) return;
    errors = { ...errors, [pet.id]: petErrors };
  });

  return errors;
};

export const AddYourPetsStep: React.FC<AddYourPetsStepProps> = ({
  initialData,
  nextStep,
  backStep
}) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const [pets, setPets] = React.useState(initialData);
  const [selectedPetId, setSelectedPetId] = React.useState(pets[0].id);
  const [petErrors, setPetErrors] = React.useState({});
  const [isSumbited, setSubmited] = React.useState(false);

  // const [focusedField, setFocuseField] = React.useState<'name' | 'registrationAddress' | null>(
  //   null
  // );
  const { user, setStore } = useStore();

  const { mutationAsync: changeUserMutation, isLoading: changeUserLoading } = useMutation<
    UsersReqPatchParams,
    ApiResponse<User>
  >('changeUser', (params) => changeUser({ params }));

  const addPet = () => {
    const id = pets[pets.length - 1].id + 1;
    setPets([
      ...pets,
      {
        id,
        dogBirthday: new Date().getTime(),
        dogName: '',
        dogWeight: '',
        breed: ''
      }
    ]);
    setSelectedPetId(id);
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
            isSubmited={isSumbited}
            pets={pets}
            errors={petErrors}
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
        title: <IntlText path='page.registration.step.addYourPetsStep.title' />,
        backButton: (
          <div aria-hidden onClick={() => backStep(pets)}>
            <IntlText path='button.goNextStep' />
          </div>
        ),
        content: (
          <>
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
              pet={pets.find((pet) => pet.id === selectedPetId)!}
            />
            <Button
              type='submit'
              isLoading={changeUserLoading}
              onClick={() => {
                setSubmited(true);
                const petErrors = validatePets(pets);

                if (Object.keys(petErrors).length) {
                  setPetErrors(validatePets(pets));
                  return;
                }

                nextStep(pets);
              }}
            >
              <IntlText path='button.next' />
            </Button>
          </>
        )
      }}
    />
  );
};
