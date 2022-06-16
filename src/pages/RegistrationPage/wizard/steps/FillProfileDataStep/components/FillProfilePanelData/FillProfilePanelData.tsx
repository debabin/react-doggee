import React from 'react';

import { IntlText } from '@features';

import styles from './FillProfilePanelData.module.css';

interface FillProfilePanelDataProps {
  focusedField: 'name' | 'registrationAddress';
}

export const FillProfilePanelData: React.FC<FillProfilePanelDataProps> = ({ focusedField }) => (
  <div className={styles.text}>
    {focusedField === 'name' && (
      <IntlText path='page.registration.step.fillProfileData.hint.name' />
    )}
    {focusedField === 'registrationAddress' && (
      <IntlText path='page.registration.step.fillProfileData.hint.registrationAddressHint' />
    )}
  </div>
);
