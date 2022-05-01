import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IntlText, useIntl } from '@features';
import { useForm } from '@utils/hooks';
import { Input, PasswordInput } from '@common/fields';
import { Button } from '@common/buttons';
import { ROUTES } from '@utils/constants';
import { validateIsEmpty } from '@utils/helpers';

import { PasswordRules } from './PasswordRules/PasswordRules';
import styles from './RegistrationPage.module.css';

const registrationFormValidateSchema = {
  username: (value: string) => validateIsEmpty(value),
  password: (value: string) => validateIsEmpty(value)
};

interface RegistrationFormValues {
  username: string;
  password: string;
  passwordAgain: string;
}

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { values, errors, setFieldValue, handleSubmit } = useForm<RegistrationFormValues>({
    intialValues: { username: '', password: '', passwordAgain: '' },
    validateSchema: registrationFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log('values', values);
      //   const response = await authMutation(values);

      //   if (!!response && values.isNotMyDevice) {
      //     setCookie(COOKIE_NAMES.IS_NOT_MY_DEVICE, new Date().getTime() + 30 * 60000);
      //   }
      // const response = await query();
      //   console.log('response', response);
    }
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <h1 className={styles.form_title}>
            <IntlText path='page.registration.fillYourLoginData' />
          </h1>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <div className={styles.input_container}>
              <Input
                // disabled={authLoading}
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
                // disabled={authLoading}
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
                // disabled={authLoading}
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

            <Button type='submit'>
              <IntlText path='button.done' />
            </Button>
          </form>
        </div>
        <div className={styles.panel_container}>
          <div className={styles.panel_header}>DOGGEE</div>
          <div className={styles.panel_data}>
            <PasswordRules
              password={values.password}
              passwordAgain={values.passwordAgain}
              hasPasswordErrors={!!errors?.password}
            />
          </div>

          <div
            role='link'
            tabIndex={0}
            aria-hidden='true'
            className={styles.panel_have_account}
            onClick={() => navigate(ROUTES.AUTH)}
          >
            <IntlText path='page.registration.iAlreadyHaveAnAccount' />
          </div>
        </div>
      </div>
    </div>
  );
};
