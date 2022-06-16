import React from 'react';

import { Spacing } from '@common';
import { Button } from '@common/buttons';
import { DateInput, Input } from '@common/fields';
import { IntlText, useIntl } from '@features';

import { RegistrationWizardContainerDesktop } from '../../../RegistrationWizardContainer';
import { FillProfilePanelData } from '../components/FillProfilePanelData/FillProfilePanelData';
import { useFillProfileDataStep } from '../hooks/useFillProfileDataStep';

import styles from '../../../../RegistrationPage.module.css';

export const FillProfileDataStep: React.FC<FillProfileDataStepProps> = ({
  initialData,
  nextStep,
  skipStep
}) => {
  const intl = useIntl();
  const [focusedField, setFocuseField] = React.useState<'name' | 'registrationAddress' | null>(
    null
  );

  const { state, functions } = useFillProfileDataStep({ nextStep, initialData });

  return (
    <RegistrationWizardContainerDesktop
      activeStep={1}
      panel={{
        ...(focusedField && { data: <FillProfilePanelData focusedField={focusedField} /> }),
        footer: (
          <div role='link' tabIndex={0} aria-hidden onClick={skipStep}>
            <IntlText path='page.registration.skipAndFillInLater' />
          </div>
        )
      }}
      form={{
        title: <IntlText path='page.registration.step.fillProfileData.title' />,
        content: (
          <form className={styles.form_container} onSubmit={functions.handleSubmit}>
            <Input
              disabled={state.loading}
              value={state.values.name}
              label={intl.translateMessage('field.input.name.label')}
              onFocus={() => setFocuseField('name')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const username = event.target.value;
                functions.setFieldValue('name', username);
              }}
              {...(!!state.errors &&
                !!state.errors.name && {
                  isError: !!state.errors.name,
                  helperText: state.errors.name
                })}
            />
            <Spacing spacing={15} />

            <Input
              disabled={state.loading}
              value={state.values.registrationAddress}
              label={intl.translateMessage('field.input.registrationAddress.label')}
              onFocus={() => setFocuseField('registrationAddress')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const password = event.target.value;
                functions.setFieldValue('registrationAddress', password);
              }}
              {...(!!state.errors &&
                !!state.errors.registrationAddress && {
                  isError: !!state.errors.registrationAddress,
                  helperText: state.errors.registrationAddress
                })}
            />
            <Spacing spacing={15} />

            <DateInput
              locale={intl.locale}
              disabled={state.loading}
              value={state.values.birthDate}
              label={intl.translateMessage('field.input.birthDate.label')}
              onFocus={() => setFocuseField(null)}
              onChange={(date) => {
                functions.setFieldValue('birthDate', date);
              }}
              {...(!!state.errors &&
                !!state.errors.birthDate && {
                  isError: !!state.errors.birthDate,
                  helperText: state.errors.birthDate
                })}
            />
            <Spacing spacing={15} />
            <Button type='submit' isLoading={state.loading}>
              <IntlText path='button.next' />
            </Button>
          </form>
        )
      }}
    />
  );
};
