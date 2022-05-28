import React from 'react';

import styles from './Spacing.module.css';

interface SpacingProps {
  spacing: 15 | 40;
}

export const Spacing: React.FC<SpacingProps> = ({ spacing }) => (
  <div className={styles[`spacing-${spacing}`]} />
);
