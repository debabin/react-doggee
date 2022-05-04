import React from 'react';

import { IntlText } from '@features';

import styles from './PasswordRule.module.css';

interface PasswordRuleProps {
  title: string;
  isCorrect: boolean;
  showIcon: boolean;
}

export const PasswordRule: React.FC<PasswordRuleProps> = ({ title, isCorrect, showIcon }) => {
  const ruleClassName = isCorrect ? styles.password_rule_correct : styles.password_rule_uncorrect;
  const iconClassName = isCorrect
    ? styles.password_rule_correct_icon
    : styles.password_rule_uncorrect_icon;

  return (
    <div className={styles.password_rule_conteiner}>
      {showIcon && (
        <div className={styles.password_rule_icon_container}>
          <div className={iconClassName} />
        </div>
      )}

      <IntlText
        path={title}
        values={{
          rule: (text) => <div className={`${styles.password_rule} ${ruleClassName}`}>{text}</div>
        }}
      />
    </div>
  );
};
