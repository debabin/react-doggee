import React from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '@utils/api';
import { IntlText, useIntl } from '@features';
import { useForm, useMutation } from '@utils/hooks';
import { Input, PasswordInput } from '@common/fields';
import { Button } from '@common/buttons';
import { ROUTES } from '@utils/constants';
import { validateIsEmpty } from '@utils/helpers';

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer';
import { PasswordRules } from './PasswordRules/PasswordRules';

import styles from '../../../RegistrationPage.module.css';

const registrationFormValidateSchema = {
  username: (value: string) => validateIsEmpty(value),
  password: (value: string) => validateIsEmpty(value)
};

interface RegistrationFormValues {
  username: string;
  password: string;
  passwordAgain: string;
}

interface FillLoginDataStepProps {
  nextStep: () => void;
}

export const FillLoginDataStep: React.FC<FillLoginDataStepProps> = ({ nextStep }) => {
  const navigate = useNavigate();
  const intl = useIntl();

  const { mutationAsync: registrationMutation, isLoading: registrationLoading } = useMutation<
    Omit<RegistrationFormValues, 'passwordAgain'>,
    ApiResponse<User[]>
  >((values) => api.post('registration', values));

  const { values, errors, setFieldValue, handleSubmit } = useForm<RegistrationFormValues>({
    intialValues: { username: '', password: '', passwordAgain: '' },
    validateSchema: registrationFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      const response = await registrationMutation({
        password: values.password,
        username: values.username
      });

      // if (!response.success) {
      //   return;
      // }
      console.log('response', response);
      nextStep();
    }
  });

  return (
    <RegistrationWizardContainer
      panel={{
        data: (
          <PasswordRules
            password={values.password}
            passwordAgain={values.passwordAgain}
            hasPasswordErrors={!!errors?.password}
          />
        ),
        footer: (
          <div role='link' tabIndex={0} aria-hidden='true' onClick={() => navigate(ROUTES.AUTH)}>
            <IntlText path='page.registration.iAlreadyHaveAnAccount' />
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
                value={values.username}
                label={intl.translateMessage('field.input.username.label')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const username = event.target.value;
                  setFieldValue('username', username);
                }}
                {...(!!errors &&
                  !!errors.username && {
                    isError: !!errors.username,
                    helperText: errors.username
                  })}
              />
            </div>
            <div className={styles.input_container}>
              <PasswordInput
                disabled={registrationLoading}
                value={values.password}
                label={intl.translateMessage('field.input.password.label')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const password = event.target.value;
                  setFieldValue('password', password);
                }}
                {...(!!errors &&
                  !!errors.password && {
                    isError: !!errors.password,
                    helperText: errors.password
                  })}
              />
            </div>
            <div className={styles.input_container}>
              <PasswordInput
                disabled={registrationLoading}
                value={values.passwordAgain}
                label={intl.translateMessage('field.input.passwordAgain.label')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const passwordAgain = event.target.value;
                  setFieldValue('passwordAgain', passwordAgain);
                }}
                {...(!!errors &&
                  !!errors.password && {
                    isError: !!errors.password,
                    helperText: errors.password
                  })}
              />
            </div>

            <Button type='submit' isLoading={registrationLoading}>
              <IntlText path='button.done' />
            </Button>
          </form>
        )
      }}
    />
  );
};
