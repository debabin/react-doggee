import React from 'react';

import styles from '../input.module.css';

export interface InputProps extends FieldProps {
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
          aria-hidden
          className={`${styles.input_container}`}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            className={styles.input}
            onChange={(e) => {
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
