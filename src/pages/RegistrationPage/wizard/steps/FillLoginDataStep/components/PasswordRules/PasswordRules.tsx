import React from 'react';

import { IntlText } from '@features/intl';

import { PasswordRule } from './PasswordRule/PasswordRule';

import styles from './PasswordRules.module.css';

interface PasswordRulesProps {
  rules: {
    title: string;
    isCorrect: boolean;
  }[];
  hasPasswordErrors: boolean;
}

export const PasswordRules: React.FC<PasswordRulesProps> = ({ rules, hasPasswordErrors }) => (
  <div className={styles.password_rules_conteiner}>
    <IntlText path='page.registration.step.fillLoginDataStep.passwordRules.must' />

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
  </div>
);
