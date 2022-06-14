import React from 'react';

import { Spacing } from '@common';
import { Stepper } from '@common/wizard';
import { useIntl } from '@features';

import styles from '../RegistrationWizardContainer.module.css';

interface RegistrationWizardContainerProps {
  activeStep?: number;
  form: {
    title: React.ReactNode;
    backButton?: React.ReactNode;
    content: React.ReactNode;
  };
  panel: {
    footer?: React.ReactNode;
    data?: React.ReactNode;
  };
}

export const RegistrationWizardContainer: React.FC<RegistrationWizardContainerProps> = ({
  activeStep,
  form,
  panel
}) => {
  const intl = useIntl();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <h1 className={styles.form_title}>{form.title}</h1>
          {activeStep && (
            <div className={styles.stepper_container}>
              <Stepper
                activeStep={activeStep}
                stepLabels={[
                  intl.translateMessage('page.registration.step.fillProfileData.label'),
                  intl.translateMessage('page.registration.step.addYourPetsStep.label'),
                  intl.translateMessage('page.registration.step.checkDataStep.label')
                ]}
              />
            </div>
          )}
          <Spacing spacing={40} />
          <div className={styles.content_container}>
            {form.backButton && (
              <>
                <div className={styles.back_container}>{form.backButton}</div>
                <Spacing spacing={15} />
              </>
            )}
            {form.content}
          </div>
        </div>
        <div className={styles.panel_container}>
          <div className={styles.panel_header}>DOGGEE</div>
          {panel.data && <div className={styles.panel_data}>{panel.data}</div>}

          <div className={styles.panel_footer}>{panel.footer}</div>
        </div>
      </div>
    </div>
  );
};
