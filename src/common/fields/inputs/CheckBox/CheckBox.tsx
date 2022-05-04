import React from 'react';

import { InputProps } from '../Input/Input';

import styles from './CheckBox.module.css';

type CheckBoxProps = InputProps;
export const CheckBox: React.FC<CheckBoxProps> = ({ label, ...props }) => (
  <label htmlFor={props.id} className={styles.checkbox_container}>
    <input className={styles.checkbox} type='checkbox' checked={props.checked} {...props} />
    <span className={styles.custom_checkbox} />
    <span className={styles.label}>{label}</span>
  </label>
);
