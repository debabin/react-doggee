import React from 'react';

import styles from '../input.module.css';

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  isError?: boolean;
  helperText?: string;
  availableChars?: RegExp;
  components?: {
    indicator?: () => React.ReactElement;
  };
}

export const Input: React.FC<InputProps> = ({
  isError = false,
  helperText,
  onChange,
  label,
  availableChars,
  components,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        aria-disabled={props.disabled}
        className={`${isError ? styles.input_error : ''} ${styles.field_container}`}
      >
        <div
          aria-hidden='true'
          className={` ${styles.input_container}`}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            className={styles.input}
            onChange={(e) => {
              console.log(e.target.value);
              if (!!onChange && !e.target.value) return onChange(e);
              if (!onChange || (availableChars && !availableChars.test(e.target.value))) return;
              onChange(e);
            }}
            {...props}
          />
          <label htmlFor={props.id} className={styles.input_label}>
            {label}
          </label>
        </div>
        {components?.indicator && (
          <div className={styles.indicator_container}>
            <components.indicator />
          </div>
        )}
      </div>
      {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
    </>
  );
};
