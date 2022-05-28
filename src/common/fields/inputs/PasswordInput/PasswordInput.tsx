import React from 'react';

import { classnames } from '@utils/helpers';

import type { InputProps } from '../Input/Input';
import { Input } from '../Input/Input';

import styles from './PasswordInput.module.css';

type PasswordInputProps = InputProps;
export const PasswordInput: React.FC<PasswordInputProps> = ({ value, disabled, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const showPasswordToggle = !!value;

  const EyeIcon = React.useCallback(
    () => (
      <div aria-hidden role='button' onClick={() => !disabled && setShowPassword(!showPassword)}>
        <div
          className={classnames(styles.password_icon, {
            [styles.password_hide_icon]: !showPassword,
            [styles.password_show_icon]: showPassword
          })}
        />
      </div>
    ),
    [showPassword, disabled]
  );

  return (
    <Input
      {...(showPasswordToggle && {
        components: {
          indicator: EyeIcon
        }
      })}
      type={showPassword ? 'text' : 'password'}
      availableChars={/^[a-zA-Z0-9!;,.]+$/g}
      value={value}
      disabled={disabled}
      {...props}
    />
  );
};
