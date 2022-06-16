interface FillProfileDataStepValues {
  name: string;
  registrationAddress: string;
  birthDate: Date;
}

interface FillProfileDataStepProps {
  initialData: FillProfileData;
  skipStep: () => void;
  nextStep: (fillProfileData: FillProfileData) => void;
}
