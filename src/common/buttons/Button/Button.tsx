import React from 'react';

import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading = false, ...props }) => (
  <button className={styles.button} disabled={isLoading} {...props}>
    {!isLoading && children}
    {isLoading && <div className={styles['dot-flashing']} />}
  </button>
);
