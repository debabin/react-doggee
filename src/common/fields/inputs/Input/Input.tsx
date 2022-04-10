import React from 'react';

import styles from '../input.module.css';

export const Input: React.FC<InputProps> = ({ isError = false, helperText, label, ...props }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isFocus, setFocus] = React.useState(!!props.value ?? false);

  return (
    <>
      <div
        className={`${styles.input_container} ${isError ? styles.input_container : ''} ${
          isFocus ? styles.focused : ''
        }`}
        onClick={() => {
          inputRef.current?.focus();
          setFocus(true);
        }}
      >
        <label htmlFor='' className={styles.input_label}>
          {label}
        </label>
        <input
          ref={inputRef}
          className={styles.input}
          onBlur={() => !props.value && setFocus(false)}
          {...props}
        />
      </div>
      {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
    </>
  );
};
