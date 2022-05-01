import React from 'react';

import inputStyles from '../input.module.css';
import paswordInputstyles from './PasswordInput.module.css';

export const PasswordInput: React.FC<InputProps> = ({
  isError = false,
  helperText,
  label,
  onChange,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const showPasswordToggle = props.value;

  return (
    <>
      <div
        aria-hidden='true'
        aria-disabled={props.disabled}
        className={`${isError ? inputStyles.input_error : ''} ${inputStyles.input_container}`}
        onClick={() => inputRef.current?.focus()}
      >
        <input
          type={showPasswordToggle && showPassword ? 'text' : 'password'}
          ref={inputRef}
          className={inputStyles.input}
          onChange={(e) => {
            if (!!onChange && !e.target.value) return onChange(e);
            if (!onChange || !/^[a-zA-Z0-9!;,.]+$/g.test(e.target.value)) return;
            onChange(e);
          }}
          {...props}
        />
        <label htmlFor={props.id} className={inputStyles.input_label}>
          {label}
        </label>
        {showPasswordToggle && (
          <div
            aria-hidden='true'
            role='button'
            className={paswordInputstyles.password_toogle_container}
            onClick={() => setShowPassword(!showPassword)}
          >
            <div
              className={
                showPassword
                  ? paswordInputstyles.password_hide_icon
                  : paswordInputstyles.password_show_icon
              }
            />
          </div>
        )}
      </div>
      {isError && helperText && <div className={inputStyles.helper_text}>{helperText}</div>}
    </>
  );
};
