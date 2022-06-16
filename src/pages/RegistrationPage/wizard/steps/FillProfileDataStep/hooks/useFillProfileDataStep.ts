import { useMutation } from '@features';
import { changeUser } from '@utils/api';
import { useStore } from '@utils/contextes';
import { validateIsEmpty } from '@utils/helpers';
import { useForm } from '@utils/hooks';

const fillProfileDataStepValidateSchema = {
  name: (value: string) => validateIsEmpty(value),
  registrationAddress: (value: string) => validateIsEmpty(value)
};

type UseFillProfileDataStepParams = Omit<FillProfileDataStepProps, 'skipStep'>;

export const useFillProfileDataStep = ({ initialData, nextStep }: UseFillProfileDataStepParams) => {
  const { user, setStore } = useStore();

  const { mutationAsync: changeUserMutation, isLoading: changeUserLoading } = useMutation(
    'changeUser',
    (params: UsersIdReqPatchParams) => changeUser({ params })
  );

  const { values, errors, setFieldValue, handleSubmit } = useForm<FillProfileDataStepValues>({
    intialValues: { ...initialData, birthDate: new Date(initialData.birthDate) },
    validateSchema: fillProfileDataStepValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (!user?.id) return;

      const changeUserMutationParams: UsersIdReqPatchParams = {
        ...values,
        id: user.id,
        birthDate: values.birthDate.getTime()
      };
      const response = await changeUserMutation(changeUserMutationParams);

      if (!response.success) return;

      setStore({ user: response.data });
      nextStep({ ...values, birthDate: values.birthDate.getTime() });
    }
  });

  return {
    state: {
      loading: changeUserLoading,
      values,
      errors
    },
    functions: {
      setFieldValue,
      handleSubmit
    }
  };
};
