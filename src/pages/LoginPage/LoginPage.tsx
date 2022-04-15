import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Input, PasswordInput, CheckBox } from '@common/fields';
import { Button } from '@common/buttons';
import { api, setCookie, useMutation, useQuery, useQueryLazy } from '@utils';
import { IntlText } from '@features';

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
    isNotMyDevice: false,
  });

  const { mutationAsync: authMutation, isLoading: authLoading } = useMutation<
    typeof formValues,
    ApiResponse<User[]>
  >((values) => api.post('auth', values));
  // const { data, isLoading } = useQuery<User[]>(() => api.get('users'));
  // const { query, isLoading } = useQueryLazy<User[]>(() => api.get('users'));

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

            if (!!response && formValues.isNotMyDevice) {
              setCookie('doggee-isNotMyDevice', new Date().getTime() + 30 * 60000);
            }
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
              checked={formValues.isNotMyDevice}
              label='This is not my device'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const isNotMyDevice = event.target.checked;
                setFormValues({ ...formValues, isNotMyDevice });
              }}
            />
          </div>
          <div>
            <Button isLoading={authLoading} type='submit'>
              <IntlText path='button.signIn' />
            </Button>
          </div>
        </form>

        <div className={styles.sing_up_container} onClick={() => navigate('/registration')}>
          <IntlText path='page.login.createNewAccont' />
        </div>
      </div>
    </div>
  );
};
