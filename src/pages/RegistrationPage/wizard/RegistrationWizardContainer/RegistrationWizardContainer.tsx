import { Stepper } from '@common/wizard';
import React from 'react';

import styles from './RegistrationWizardContainer.module.css';

interface RegistrationWizardContainerProps {
  activeStep?: number;
  form: {
    title: React.ReactNode;
    content: React.ReactNode;
  };
  panel: {
    footer: React.ReactNode;
    data?: React.ReactNode;
  };
}

export const RegistrationWizardContainer: React.FC<RegistrationWizardContainerProps> = ({
  activeStep,
  form,
  panel
}) => (
  <div className={styles.page}>
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h1 className={styles.form_title}>{form.title}</h1>
        {activeStep && (
          <div className={styles.stepper_container}>
            <Stepper activeStep={activeStep} stepLabels={['Your profile', 'Woof!', 'Woof!']} />
          </div>
        )}
        {form.content}
      </div>
      <div className={styles.panel_container}>
        <div className={styles.panel_header}>DOGGEE</div>
        {panel.data && <div className={styles.panel_data}>{panel.data}</div>}

        <div className={styles.panel_footer}>{panel.footer}</div>
      </div>
    </div>
  </div>
);
