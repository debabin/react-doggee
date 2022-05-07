import React from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '@utils/api';
import { IntlText, useIntl } from '@features';
import { useForm, useMutation } from '@utils/hooks';
import { DateInput, Input } from '@common/fields';
import { Button } from '@common/buttons';
import { validateIsEmpty } from '@utils/helpers';

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer';

import styles from './FillProfileDataStep.module.css';

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

export const FillProfileDataStep: React.FC<FillProfileDataStepProps> = ({ nextStep }) => {
  const navigate = useNavigate();
  const intl = useIntl();

  const { mutationAsync: registrationMutation, isLoading: registrationLoading } = useMutation<
    Omit<ProfileFormValues, 'passwordAgain'>,
    ApiResponse<User[]>
  >((values) => api.post('registration', values));

  const { values, errors, setFieldValue, handleSubmit } = useForm<ProfileFormValues>({
    intialValues: { name: '', registrationAddress: '', birthDate: new Date() },
    validateSchema: registrationFormValidateSchema,
    validateOnChange: false
    // onSubmit: async (values) => {
    //   const response = await registrationMutation({
    //     password: values.password,
    //     username: values.username
    //   });

    //   if (!response.success) {
    //     return;
    //   }
    //   console.log('response', response);
    //   nextStep();
    // }
  });

  return (
    <RegistrationWizardContainer
      panel={{
        data: <div>123</div>,
        footer: (
          <div role='link' tabIndex={0} aria-hidden='true' onClick={() => nextStep()}>
            <IntlText path='page.registration.skipAndFillInLater' />
          </div>
        )
      }}
      form={{
        title: <IntlText path='page.registration.fillYourLoginData' />,
        content: (
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <div className={styles.input_container}>
              <Input
                disabled={registrationLoading}
                value={values.name}
                label={intl.translateMessage('field.input.name.label')}
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
                disabled={registrationLoading}
                value={values.registrationAddress}
                label={intl.translateMessage('field.input.registrationAddress.label')}
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
                disabled={registrationLoading}
                value={values.birthDate}
                label={intl.translateMessage('field.input.birthDate.label')}
                onChange={(date: Date) => {
                  setFieldValue('birthDate', date);
                }}
                {...(!!errors &&
                  !!errors.birthDate && {
                    isError: !!errors.birthDate,
                    helperText: errors.birthDate
                  })}
              />
            </div>

            <Button type='submit' isLoading={registrationLoading}>
              <IntlText path='button.next' />
            </Button>
          </form>
        )
      }}
    />
  );
};
