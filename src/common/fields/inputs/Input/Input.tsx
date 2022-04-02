import React from 'react';

import styles from './Input.module.css';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  isError?: boolean;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ isError = false, helperText, ...props }) => {
  return (
    <>
      <input className={`${styles.input} ${isError ? styles.error : ''}`} {...props} />
      {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
    </>
  );
};
