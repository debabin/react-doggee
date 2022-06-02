import React from 'react';

import { IntlText } from '@features/intl';

import { PasswordRule } from './PasswordRule/PasswordRule';

interface PasswordRulesProps {
  rules: {
    title: string;
    isCorrect: boolean;
  }[];
  hasPasswordErrors: boolean;
}

export const PasswordRules: React.FC<PasswordRulesProps> = ({ rules, hasPasswordErrors }) => (
  <>
    <div>
      <IntlText path='page.registration.step.fillLoginDataStep.passwordRules.must' />
    </div>
    {rules.slice(0, -1).map(({ title, isCorrect }, index) => (
      <PasswordRule
        key={index}
        title={title}
        isCorrect={isCorrect}
        showIcon={isCorrect || hasPasswordErrors}
      />
    ))}

    <PasswordRule
      showIcon={rules[rules.length - 1].isCorrect || hasPasswordErrors}
      title='page.registration.step.fillLoginDataStep.passwordRules.mustMatch'
      isCorrect={rules[rules.length - 1].isCorrect}
    />
  </>
);
