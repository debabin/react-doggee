import React from 'react';

interface UseFormParams<Values> {
  intialValues: Values;
  validateSchema?: {
    [K in keyof Values]?: (value: Pick<Values, K>[K]) => ValidationReturn;
  };
  validateOnChange?: boolean;
  onSubmit?: (values: Values) => void;
}

export const useForm = <Values extends Object>({
  intialValues,
  validateSchema,
  validateOnChange = true,
  onSubmit
}: UseFormParams<Values>) => {
  const [isSubminting, setIsSubmiting] = React.useState(false);
  const [values, setValues] = React.useState(intialValues);
  const [errors, setErrors] = React.useState<{ [K in keyof Values]?: string } | null>(null);

  const setFieldValue = <K extends keyof Values>(field: K, value: Pick<Values, K>[K]) => {
    setValues({ ...values, [field]: value });

    const validateSchemaExistForField = !!validateSchema && !!validateSchema[field];
    if (!validateSchemaExistForField || !validateOnChange) return;

    const error = validateSchema[field]!(value);
    setErrors({ ...errors, [field]: error });
  };

  const setFieldsError = <K extends keyof Values>(field: K, error: Pick<Values, K>[K]) => {
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!validateSchema) {
      setIsSubmiting(true);
      return !!onSubmit && onSubmit(values);
    }

    let isErrorExist = false;
    let errors = {};
    Object.keys(values).forEach((field) => {
      if (!validateSchema[field as keyof Values]) return;
      const error = validateSchema[field as keyof Values]!(values[field as keyof Values]);
      if (error) isErrorExist = true;
      errors = {
        ...errors,
        [field]: error
      };
    });
    setErrors(errors);
    if (isErrorExist) return;
    setIsSubmiting(true);
    return !!onSubmit && onSubmit(values);
  };

  const resetForm = (values?: Values) => {
    if (values) {
      setValues(values);
    }
    setValues(intialValues);
  };

  return {
    values,
    errors,
    setFieldValue,
    setFieldsError,
    handleSubmit,
    isSubminting,
    setIsSubmiting,
    resetForm
  };
};
