import React from 'react';

import styles from './Stepper.module.css';

interface StepperProps {
  activeStep: number;
  stepLabels: string[];
}

export const Stepper: React.FC<StepperProps> = ({ activeStep, stepLabels }) => (
  <div className={styles.steps_container}>
    {stepLabels
      .map((stepLabel, index) => {
        const stepNumber = index + 1;
        const isLastStep = stepNumber === stepLabels.length;
        const isActiveStep = stepNumber <= activeStep;

        return (
          <div className={styles.step_container}>
            <div
              className={`${styles.step_index_container} ${
                isActiveStep ? styles.active_step_index_container : ''
              }`}
            >
              {!isLastStep ? stepNumber : <div className={styles.last_step_checkmark} />}
            </div>
            <div
              className={`${styles.step_label_container} ${
                isActiveStep ? styles.active_step_label_container : ''
              }`}
            >
              {stepLabel}
            </div>
          </div>
        );
      })
      .reduce((array: JSX.Element[], element: JSX.Element, index) => {
        const stepNumber = index + 1;
        const isActiveStep = stepNumber === activeStep;

        return [
          ...array,
          <div
            className={`${styles.step_separator} ${
              isActiveStep ? styles.active_step_separator : ''
            }`}
          />,
          element
        ];
      }, [])
      .slice(1)}
  </div>
);
