import React from 'react';

import styles from './RegistrationWizardContainer.module.css';

interface RegistrationWizardContainerProps {
  form: {
    title: React.ReactNode;
    content: React.ReactNode;
  };
  panel: {
    footer: React.ReactNode;
    data: React.ReactNode;
  };
}

export const RegistrationWizardContainer: React.FC<RegistrationWizardContainerProps> = ({
  form,
  panel
}) => (
  <div className={styles.page}>
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h1 className={styles.form_title}>{form.title}</h1>
        {form.content}
      </div>
      <div className={styles.panel_container}>
        <div className={styles.panel_header}>DOGGEE</div>
        <div className={styles.panel_data}>{panel.data}</div>

        <div className={styles.panel_footer}>{panel.footer}</div>
      </div>
    </div>
  </div>
);
