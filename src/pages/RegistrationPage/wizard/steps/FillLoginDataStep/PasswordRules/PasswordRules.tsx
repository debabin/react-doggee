import React from 'react';

import { MIN_LENGHT } from '@utils/constants';
import {
  validateContainLowerCase,
  validateContainNumbers,
  validateContainUpperCase} from '@utils/helpers';

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
        title: 'page.registration.step.fillLoginDataStep.passwordRules.containNumbers',
        isCorrect: !validateContainNumbers(password)
      },
      {
        title: 'page.registration.step.fillLoginDataStep.passwordRules.containUppercase',
        isCorrect: !validateContainUpperCase(password)
      },
      {
        title: 'page.registration.step.fillLoginDataStep.passwordRules.containLowerCase',
        isCorrect: !validateContainLowerCase(password)
      },
      {
        title: 'page.registration.step.fillLoginDataStep.passwordRules.contain8Characters',
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
          title='page.registration.step.fillLoginDataStep.passwordRules.mustMatch'
          isCorrect={isPasswordMatch}
        />
      </div>
    </>
  );
};
