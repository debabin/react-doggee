import React from 'react';

import {
  validateContainNumbers,
  validateContainUpperCase,
  validateContainLowerCase
} from '@utils/helpers';
import { MIN_LENGHT } from '@utils/constants';

import { PasswordRule } from './PasswordRule/PasswordRule';

interface PasswordRulesProps {
  password: string;
  passwordAgain: string;
  hasPasswordErrors: boolean;
}

export const PasswordRules: React.FC<PasswordRulesProps> = ({
  password,
  passwordAgain,
  hasPasswordErrors
}) => {
  const rules = React.useMemo(
    () => [
      {
        title: 'page.registration.passwordRules.containNumbers',
        isCorrect: !validateContainNumbers(password)
      },
      {
        title: 'page.registration.passwordRules.containUppercase',
        isCorrect: !validateContainUpperCase(password)
      },
      {
        title: 'page.registration.passwordRules.containLowerCase',
        isCorrect: !validateContainLowerCase(password)
      },
      {
        title: 'page.registration.passwordRules.contain8Characters',
        isCorrect: password.length >= MIN_LENGHT.PASSWORD
      }
    ],
    [password]
  );

  const isPasswordMatch = !!password && !!passwordAgain && password === passwordAgain;
  return (
    <>
      <div>Password must: </div>
      {rules.map(({ title, isCorrect }, index) => (
        <PasswordRule
          key={index}
          title={title}
          isCorrect={isCorrect}
          showIcon={isCorrect || hasPasswordErrors}
        />
      ))}

      <div>
        <PasswordRule
          showIcon={isPasswordMatch || hasPasswordErrors}
          title='page.registration.passwordRules.mustMatch'
          isCorrect={isPasswordMatch}
        />
      </div>
    </>
  );
};