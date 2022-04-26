/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Input, PasswordInput, CheckBox } from '@common/fields';
import { Button } from '@common/buttons';
import { api, setCookie, useForm, useMutation } from '@utils';
import { IntlText } from '@features';

import styles from './LoginPage.module.css';

const validateIsEmpty = (value: string) => {
  if (!value) return 'field required';
  return null;
};

const validateUsername = (value: string) => validateIsEmpty(value);

const validatePassword = (value: string) => validateIsEmpty(value);

const loginFormValidateSchema = {
  username: validateUsername,
  password: validatePassword,
  isNotMyDevice: (value: boolean) => null
};

// const validateLoginForm = (name: keyof typeof loginFormValidateSchema, value: string) =>
//   loginFormValidateSchema[name](value);

interface FormValues {
  username: string;
  password: string;
  isNotMyDevice: boolean;
}

interface User {
  username: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { mutationAsync: authMutation, isLoading: authLoading } = useMutation<
    FormValues,
    ApiResponse<User[]>
  >((values) => api.post('auth', values));

  const { values, errors, setFieldValue, handleSubmit } = useForm<FormValues>({
    intialValues: { username: '', password: '', isNotMyDevice: false },
    validateSchema: loginFormValidateSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log('values', values);
      const response = await authMutation(values);

      if (!!response && values.isNotMyDevice) {
        setCookie('doggee-isNotMyDevice', new Date().getTime() + 30 * 60000);
      }
      // const response = await query();
      console.log('response', response);
    }
  });

  // const { data, isLoading } = useQuery<User[]>(() => api.get('users'));
  // const { query, isLoading } = useQueryLazy<User[]>(() => api.get('users'));

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.container_header}>DOGGEE</div>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <Input
              // disabled={authLoading}
              value={values.username}
              label='username'
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
              label='password'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFieldValue('password', password);
              }}
              // {...(!!formErrors.password && {
              //   isError: !!formErrors.password,
              //   helperText: formErrors.password
              // })}
            />
          </div>
          <div className={styles.input_container}>
            <CheckBox
              // disabled={authLoading}
              checked={values.isNotMyDevice}
              label='This is not my device'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const isNotMyDevice = event.target.checked;
                setFieldValue('isNotMyDevice', isNotMyDevice);
              }}
            />
          </div>
          <div>
            <Button type='submit'>
              <IntlText path='button.signIn' />
            </Button>
          </div>
        </form>

        <div
          role='link'
          tabIndex={0}
          aria-hidden='true'
          className={styles.sing_up_container}
          onClick={() => navigate('/registration')}
        >
          <IntlText path='page.login.createNewAccont' />
        </div>
      </div>
    </div>
  );
};
