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

  const { state, functions } = useFillLoginDataStep({
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
          <form className={styles.form_container} onSubmit={functions.handleSubmit}>
            <Input
              disabled={state.loading}
              value={state.values.username}
              label={intl.translateMessage('field.input.username.label')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                functions.setFieldValue('username', username);
              }}
              {...(!!state.errors &&
                !!state.errors.username && {
                  isError: !!state.errors.username,
                  helperText: state.errors.username
                })}
            />
            <Spacing spacing={15} />

            <PasswordInput
              disabled={state.loading}
              value={state.values.password}
              label={intl.translateMessage('field.input.password.label')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                functions.setFieldValue('password', password);
              }}
              {...(!!state.errors &&
                !!state.errors.password && {
                  isError: !!state.errors.password,
                  helperText: state.errors.password
                })}
            />
            <Spacing spacing={15} />

            <PasswordInput
              disabled={state.loading}
              value={state.values.passwordAgain}
              label={intl.translateMessage('field.input.passwordAgain.label')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const passwordAgain = event.target.value;
                functions.setFieldValue('passwordAgain', passwordAgain);
              }}
              {...(!!state.errors &&
                !!state.errors.password && {
                  isError: !!state.errors.password,
                  helperText: state.errors.password
                })}
            />
            <Spacing spacing={15} />

            <PasswordRules rules={state.rules} hasPasswordErrors={!!state.errors?.password} />

            <Spacing spacing={15} />

            <Button type='submit' isLoading={state.loading}>
              <IntlText path='button.done' />
            </Button>
          </form>
        )
      }}
    />
  );
};
