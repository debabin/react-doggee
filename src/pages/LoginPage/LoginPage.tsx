import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Input, PasswordInput, CheckBox } from '@common/fields';
import { Button } from '@common/buttons';
import { useMutation, useQueryLazy } from '@utils';

import styles from './LoginPage.module.css';

const validateIsEmpty = (value: string) => {
  if (!value) return 'field required';
  return null;
};

const validateUsername = (value: string) => {
  return validateIsEmpty(value);
};

const validatePassword = (value: string) => {
  return validateIsEmpty(value);
};

const loginFormValidateSchema = {
  username: validateUsername,
  password: validatePassword,
};

const validateLoginForm = (name: keyof typeof loginFormValidateSchema, value: string) => {
  return loginFormValidateSchema[name](value);
};

interface FormErrors {
  username: string | null;
  password: string | null;
}

interface User {
  username: string;
  password: string;
  id: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = React.useState({
    username: '',
    password: '',
    notMyComputer: false,
  });
  const { mutation: authMutation, isLoading: authLoading } = useMutation<typeof formValues, User>(
    'http://localhost:3001/auth',
    'post',
  );
  const { query } = useQueryLazy<User>('http://localhost:3001/users');

  const [formErrors, setFormErrors] = React.useState<FormErrors>({
    username: null,
    password: null,
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.container_header}>DOGGEE</div>
        <form
          className={styles.form_container}
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const response = await authMutation(formValues);
            // const response = await query();
            console.log('response', response);
          }}
        >
          <div className={styles.input_container}>
            <Input
              disabled={authLoading}
              value={formValues.username}
              label='username'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                setFormValues({ ...formValues, username });

                const error = validateLoginForm('username', username);
                setFormErrors({ ...formErrors, username: error });
              }}
              {...(!!formErrors.username && {
                isError: !!formErrors.username,
                helperText: formErrors.username,
              })}
            />
          </div>
          <div className={styles.input_container}>
            <PasswordInput
              disabled={authLoading}
              value={formValues.password}
              label='password'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                setFormValues({ ...formValues, password });

                const error = validateLoginForm('password', password);
                setFormErrors({ ...formErrors, password: error });
              }}
              {...(!!formErrors.password && {
                isError: !!formErrors.password,
                helperText: formErrors.password,
              })}
            />
          </div>
          <div className={styles.input_container}>
            <CheckBox
              disabled={authLoading}
              checked={formValues.notMyComputer}
              label='This is not my device'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const notMyComputer = event.target.checked;
                setFormValues({ ...formValues, notMyComputer });
              }}
            />
          </div>
          <div>
            <Button isLoading={authLoading} type='submit'>
              Sign in
            </Button>
          </div>
        </form>

        <div className={styles.sing_up_container} onClick={() => navigate('/registration')}>
          Create new account
        </div>
      </div>
    </div>
  );
};
