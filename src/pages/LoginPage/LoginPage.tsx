import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@common/buttons';
import { CheckBox,Input, PasswordInput } from '@common/fields';
import { IntlText, useIntl, useMutation } from '@features';
import { createAuth } from '@utils/api';
import { COOKIE_NAMES, ROUTES } from '@utils/constants';
import { setCookie, validateIsEmpty } from '@utils/helpers';
import { useForm } from '@utils/hooks';

import styles from './LoginPage.module.css';

const loginFormValidateSchema = {
  username: (value: string) => validateIsEmpty(value),
  password: (value: string) => validateIsEmpty(value)
};

interface LoginFormValues {
  username: string;
  password: string;
  isNotMyDevice: boolean;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { mutationAsync: authMutation, isLoading: authLoading } = useMutation(
    'auth',
    (params: AuthReqPostParams) => createAuth({ params })
  );

  const { values, errors, setFieldValue, handleSubmit } = useForm<LoginFormValues>({
    intialValues: { username: '', password: '', isNotMyDevice: false },
    validateSchema: loginFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log('values', values);
      const response = await authMutation(values);

      if (!!response && values.isNotMyDevice) {
        setCookie(COOKIE_NAMES.IS_NOT_MY_DEVICE, new Date().getTime() + 30 * 60000);
      }
      // const response = await query();
      console.log('response', response);
    }
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.container_header}>DOGGEE</div>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <Input
              disabled={authLoading}
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
              disabled={authLoading}
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
            <CheckBox
              disabled={authLoading}
              checked={values.isNotMyDevice}
              label={intl.translateMessage('field.checkbox.isNotMyDevice.label')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const isNotMyDevice = event.target.checked;
                setFieldValue('isNotMyDevice', isNotMyDevice);
              }}
            />
          </div>

          <Button type='submit'>
            <IntlText path='button.signIn' />
          </Button>
        </form>

        <div
          role='link'
          tabIndex={0}
          aria-hidden
          className={styles.sing_up_container}
          onClick={() => navigate(ROUTES.REGISTRATION)}
        >
          <IntlText path='page.login.createNewAccont' />
        </div>
      </div>
    </div>
  );
};
