import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Spacing } from '@common';
import { Button } from '@common/buttons';
import { Input, PasswordInput } from '@common/fields';
import { IntlText, useIntl, useMutation } from '@features';
import { createRegistration } from '@utils/api';
import { MIN_LENGHT,ROUTES } from '@utils/constants';
import { useStore } from '@utils/contextes';
import {
  validateContainLowerCase,
  validateContainNumbers,
  validateContainUpperCase,
  validateIsEmpty} from '@utils/helpers';
import { useForm } from '@utils/hooks';

import { RegistrationWizardContainer } from '../../RegistrationWizardContainer/RegistrationWizardContainer';

import { PasswordRules } from './PasswordRules/PasswordRules';

import styles from '../../../RegistrationPage.module.css';

const fillLoginDataStepValidateSchema = {
  username: (value: string) => validateIsEmpty(value),
  password: (value: string) => validateIsEmpty(value),
  passwordAgain: (value: string) => validateIsEmpty(value)
};

interface FillLoginDataStepValues {
  username: string;
  password: string;
  passwordAgain: string;
}

interface FillLoginDataStepProps {
  nextStep: () => void;
}

export const getPasswordRules = (
  password: FillLoginDataStepValues['password'],
  passwordAgain: FillLoginDataStepValues['passwordAgain']
) => [
  {
    title: 'page.registration.step.fillLoginDataStep.passwordRules.containNumbers',
    isCorrect: !validateContainNumbers(password)
  },
  {
    title: 'page.registration.step.fillLoginDataStep.passwordRules.containUppercase',
    isCorrect: !validateContainUpperCase(password)
  },
  {
    title: 'page.registration.step.fillLoginDataStep.passwordRules.containLowerCase',
    isCorrect: !validateContainLowerCase(password)
  },
  {
    title: 'page.registration.step.fillLoginDataStep.passwordRules.contain8Characters',
    isCorrect: password.length >= MIN_LENGHT.PASSWORD
  },
  {
    title: 'page.registration.step.fillLoginDataStep.passwordRules.mustMatch',
    isCorrect: !!password && !!passwordAgain && password === passwordAgain
  }
];

export const FillLoginDataStep: React.FC<FillLoginDataStepProps> = ({ nextStep }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { setStore } = useStore();

  const { mutationAsync: registrationMutation, isLoading: registrationLoading } = useMutation(
    'createRegistration',
    (params: RegistrationReqPostParams) => createRegistration({ params })
  );

  const { values, errors, setFieldValue, handleSubmit, setIsSubmiting } =
    useForm<FillLoginDataStepValues>({
      intialValues: { username: '', password: '', passwordAgain: '' },
      validateSchema: fillLoginDataStepValidateSchema,
      validateOnChange: false,
      onSubmit: async (values) => {
        const passwordRules = getPasswordRules(values.password, values.passwordAgain);
        const isPasswordUnCorrect = passwordRules.some((rule) => rule.isCorrect === false);

        if (isPasswordUnCorrect) return;

        const response = await registrationMutation({
          password: values.password,
          username: values.username
        });

        if (!response.success) return;

        setStore({ user: response.data });
        nextStep();
        setIsSubmiting(false);
      }
    });

  const rules = React.useMemo(
    () => getPasswordRules(values.password, values.passwordAgain),
    [values.password, values.passwordAgain]
  );

  return (
    <RegistrationWizardContainer
      panel={{
        data: <PasswordRules rules={rules} hasPasswordErrors={!!errors?.password} />,
        footer: (
          <div role='link' tabIndex={0} aria-hidden onClick={() => navigate(ROUTES.AUTH)}>
            <IntlText path='page.registration.step.fillLoginDataStep.iAlreadyHaveAnAccount' />
          </div>
        )
      }}
      form={{
        title: <IntlText path='page.registration.step.fillLoginDataStep.title' />,
        content: (
          <form className={styles.form_container} onSubmit={handleSubmit}>
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
            <Spacing spacing={15} />

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
            <Spacing spacing={15} />

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
            <Spacing spacing={15} />

            <Button type='submit' isLoading={registrationLoading}>
              <IntlText path='button.done' />
            </Button>
          </form>
        )
      }}
    />
  );
};
