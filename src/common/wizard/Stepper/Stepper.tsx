import React from 'react';

import { classnames } from '@utils/helpers';

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
          <div key={stepNumber} className={styles.step_container}>
            <div
              className={classnames(styles.step_index_container, {
                [styles.active_step_index_container]: isActiveStep
              })}
            >
              {!isLastStep ? stepNumber : <div className={styles.last_step_checkmark} />}
            </div>
            <div
              className={classnames(styles.step_label_container, {
                [styles.active_step_label_container]: isActiveStep
              })}
            >
              {stepLabel}
            </div>
          </div>
        );
      })
      .reduce((array: JSX.Element[], element: JSX.Element, index) => {
        const stepNumber = index + 1;
        const isActiveStep = stepNumber <= activeStep;

        return [
          ...array,
          <div
            key={`line-${stepNumber}`}
            className={classnames(styles.step_separator, {
              [styles.active_step_separator]: isActiveStep
            })}
          />,
          element
        ];
      }, [])
      .slice(1)}
  </div>
);
