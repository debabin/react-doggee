import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Spacing } from '@common';
import { Button } from '@common/buttons';
import { Input, PasswordInput } from '@common/fields';
import { IntlText, useIntl } from '@features';
import { ROUTES } from '@utils/constants';

import { RegistrationWizardContainerMobile } from '../../../RegistrationWizardContainer';
import { PasswordRules } from '../components/PasswordRules/PasswordRules';
import { useFillLoginDataStep } from '../hooks/useFillLoginDataStep';

import styles from '../../../../RegistrationPage.module.css';

export const FillLoginDataStep: React.FC<FillLoginDataStepProps> = ({ nextStep }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const { values, setFieldValue, handleSubmit, errors, rules, loading } = useFillLoginDataStep({
    nextStep
  });

  return (
    <RegistrationWizardContainerMobile
      form={{
        title: <IntlText path='page.registration.step.fillLoginDataStep.title' />,
        footer: (
          <div role='link' tabIndex={0} aria-hidden onClick={() => navigate(ROUTES.AUTH)}>
            <IntlText path='page.registration.step.fillLoginDataStep.iAlreadyHaveAnAccount' />
          </div>
        ),
        content: (
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <Input
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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

            <PasswordRules rules={rules} hasPasswordErrors={!!errors?.password} />

            <Spacing spacing={15} />

            <Button type='submit' isLoading={loading}>
              <IntlText path='button.done' />
            </Button>
          </form>
        )
      }}
    />
  );
};
