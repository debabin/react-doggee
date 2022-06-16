interface AddYourPetsStepProps {
  initialData: AddPetsData;
  skipStep: () => void;
  nextStep: (addPetsData: AddPetsData) => void;
  backStep: (addPetsData: AddPetsData) => void;
}

interface PetFormValues {
  dogName: string;
  dogWeight: string;
  breed: Breed;
  dogBirthday: Date;
}
