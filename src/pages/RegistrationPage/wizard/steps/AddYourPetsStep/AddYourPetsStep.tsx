import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IntlText, useIntl, useMutation, useQuery } from '@features';
import { useForm } from '@utils/hooks';
import { DateInput, Input, Select } from '@common/fields';
import { Button } from '@common/buttons';
import { validateIsEmpty } from '@utils/helpers';
import { useStore } from '@utils/contextes';
import { changeUser, requestBreeds } from '@utils/api';

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer';

import styles from '../../../RegistrationPage.module.css';

const registrationFormValidateSchema = {
  dogName: (value: string) => validateIsEmpty(value),
  dogWeight: (value: string) => validateIsEmpty(value),
  breed: (value: string) => validateIsEmpty(value)
};

interface PetFormValues {
  dogName: string;
  dogWeight: string;
  breed: $TSFixMe;
  dogBirthday: Date;
}

interface FillProfileDataStepProps {
  nextStep: () => void;
  backStep: () => void;
}

export const AddYourPetsStep: React.FC<FillProfileDataStepProps> = ({ nextStep, backStep }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  // const [focusedField, setFocuseField] = React.useState<'name' | 'registrationAddress' | null>(
  //   null
  // );
  const { user, setStore } = useStore();

  const {
    data: breedsData,
    isLoading: breedsLoading,
    error
  } = useQuery('breeds', () => requestBreeds({ params: null }), { staleTime: 4000 });

  const { mutationAsync: changeUserMutation, isLoading: changeUserLoading } = useMutation<
    UsersReqPatchParams,
    ApiResponse<User>
  >('changeUser', (params) => changeUser({ params }));

  const { values, errors, setFieldValue, handleSubmit } = useForm<PetFormValues>({
    intialValues: { dogName: '', dogWeight: '', breed: null, dogBirthday: new Date() },
    validateSchema: registrationFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (!user?.id) return;

      // const changeUserMutationParams: UsersReqPatchParams = {
      //   ...values,
      //   id: user.id,
      //   birthDate: values.birthDate.getTime()
      // };
      // const response = await changeUserMutation(changeUserMutationParams);

      // if (!response.success) {
      //   return;
      // }

      // setStore({ user: response.data });
      nextStep();
    }
  });

  return (
    <RegistrationWizardContainer
      activeStep={2}
      panel={{
        // ...(focusedField && { data: <FillProfilePanelData focusedField={focusedField} /> }),
        footer: (
          <div role='link' tabIndex={0} aria-hidden onClick={() => nextStep()}>
            <IntlText path='page.registration.skipAndFillInLater' />
          </div>
        )
      }}
      form={{
        title: <IntlText path='page.registration.step.fillLoginDataStep.fillYourLoginData' />,
        content: (
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <button onClick={() => backStep()}>back</button>
            <div className={styles.input_container}>
              <Input
                disabled={changeUserLoading}
                value={values.dogName}
                label={intl.translateMessage('field.input.dogName.label')}
                // onFocus={() => setFocuseField('')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const dogName = event.target.value;
                  setFieldValue('dogName', dogName);
                }}
                {...(!!errors &&
                  !!errors.dogName && {
                    isError: !!errors.dogName,
                    helperText: errors.dogName
                  })}
              />
            </div>

            <div className={styles.input_container}>
              <Select
                options={
                  breedsData?.map((breed) => ({
                    label: breed.name,
                    id: breed.id,
                    value: breed
                  })) ?? []
                }
                onChange={(option) => {
                  setFieldValue('breed', option);
                }}
                value={values.breed}
                label={intl.translateMessage('field.input.breed.label')}
              />
            </div>
            <div className={styles.input_container}>
              <DateInput
                locale={intl.locale}
                disabled={changeUserLoading}
                value={values.dogBirthday}
                label={intl.translateMessage('field.input.dogBirthday.label')}
                // onFocus={() => setFocuseField(null)}
                onChange={(date) => {
                  setFieldValue('dogBirthday', date);
                }}
                {...(!!errors &&
                  !!errors.dogBirthday && {
                    isError: !!errors.dogBirthday,
                    helperText: errors.dogBirthday
                  })}
              />
            </div>

            <div className={styles.input_container}>
              <Input
                disabled={changeUserLoading}
                value={values.dogWeight}
                label={intl.translateMessage('field.input.dogWeight.label')}
                // onFocus={() => setFocuseField('')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const dogWeight = event.target.value;
                  setFieldValue('dogWeight', dogWeight);
                }}
                {...(!!errors &&
                  !!errors.dogWeight && {
                    isError: !!errors.dogWeight,
                    helperText: errors.dogWeight
                  })}
              />
            </div>

            <Button type='submit' isLoading={changeUserLoading}>
              <IntlText path='button.next' />
            </Button>
          </form>
        )
      }}
    />
  );
};
