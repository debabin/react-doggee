import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IntlText, useIntl } from '@features';
import { useForm, useMutation } from '@utils/hooks';
import { DateInput, Input } from '@common/fields';
import { Button } from '@common/buttons';
import { validateIsEmpty } from '@utils/helpers';
import { useStore } from '@utils/contextes';
import { changeUser } from '@utils/api';

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer';

import styles from '../../../RegistrationPage.module.css';

const registrationFormValidateSchema = {
  name: (value: string) => validateIsEmpty(value),
  registrationAddress: (value: string) => validateIsEmpty(value)
};

interface ProfileFormValues {
  name: string;
  registrationAddress: string;
  birthDate: Date;
}

interface FillProfileDataStepProps {
  nextStep: () => void;
}

export const AddYourPetsStep: React.FC<FillProfileDataStepProps> = ({ nextStep }) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const [focusedField, setFocuseField] = React.useState<'name' | 'registrationAddress' | null>(
    null
  );
  const { user, setStore } = useStore();

  const { mutationAsync: changeUserMutation, isLoading: changeUserLoading } = useMutation<
    UsersReqPatchParams,
    ApiResponse<User>
  >((params) => changeUser({ params }));

  const { values, errors, setFieldValue, handleSubmit } = useForm<ProfileFormValues>({
    intialValues: { name: '', registrationAddress: '', birthDate: new Date() },
    validateSchema: registrationFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (!user?.id) return;

      const changeUserMutationParams: UsersReqPatchParams = {
        ...values,
        id: user.id,
        birthDate: values.birthDate.getTime()
      };
      const response = await changeUserMutation(changeUserMutationParams);

      if (!response.success) {
        return;
      }

      setStore({ user: response.data });
      nextStep();
    }
  });

  return (
    <RegistrationWizardContainer
      activeStep={1}
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
            <div className={styles.input_container}>
              <Input
                disabled={changeUserLoading}
                value={values.name}
                label={intl.translateMessage('field.input.name.label')}
                onFocus={() => setFocuseField('name')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const username = event.target.value;
                  setFieldValue('name', username);
                }}
                {...(!!errors &&
                  !!errors.name && {
                    isError: !!errors.name,
                    helperText: errors.name
                  })}
              />
            </div>
            <div className={styles.input_container}>
              <Input
                disabled={changeUserLoading}
                value={values.registrationAddress}
                label={intl.translateMessage('field.input.registrationAddress.label')}
                onFocus={() => setFocuseField('registrationAddress')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const password = event.target.value;
                  setFieldValue('registrationAddress', password);
                }}
                {...(!!errors &&
                  !!errors.registrationAddress && {
                    isError: !!errors.registrationAddress,
                    helperText: errors.registrationAddress
                  })}
              />
            </div>
            <div className={styles.input_container}>
              <DateInput
                locale={intl.locale}
                disabled={changeUserLoading}
                value={values.birthDate}
                label={intl.translateMessage('field.input.birthDate.label')}
                onFocus={() => setFocuseField(null)}
                onChange={(date) => {
                  setFieldValue('birthDate', date);
                }}
                {...(!!errors &&
                  !!errors.birthDate && {
                    isError: !!errors.birthDate,
                    helperText: errors.birthDate
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
