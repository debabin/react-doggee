import React from 'react';
import { classnames } from '@utils/helpers';
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
        className={classnames(styles.field_container, { [styles.input_error]: isError })}
      >
        {components?.indicator && (
          <div className={styles.indicator_container}>
            <components.indicator />
          </div>
        )}
        <div
          aria-hidden
          className={styles.input_container}
          onClick={() => inputRef.current?.focus()}
        >
          <input
            ref={inputRef}
            className={styles.input}
            onChange={(e) => {
              if (!!onChange && !e.target.value) return onChange(e);
              if (!onChange || (availableChars && !availableChars.test(e.target.value)))
                // @ts-ignore
                return onChange({ ...e, target: { ...e.target, value: props.value } });
              onChange(e);
            }}
            {...props}
          />
          <label htmlFor={props.id} className={styles.input_label}>
            {label}
          </label>
        </div>
      </div>
      {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
    </>
  );
};
