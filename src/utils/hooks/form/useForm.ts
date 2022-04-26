import React from 'react';

interface UseFormParams<Values> {
  intialValues: Values;
  validateSchema?: {
    [K in keyof Values]?: (value: Pick<Values, K>[K]) => string | null;
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
    // @ts-ignore
    const error = validateSchema[field](value);
    setErrors({ ...errors, [field]: error });
  };

  const setFieldsError = <K extends keyof Values>(field: K, error: Pick<Values, K>[K]) => {
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsSubmiting(true);
    return !!onSubmit && onSubmit(values);
  };

  return {
    values,
    errors,
    setFieldValue,
    setFieldsError,
    handleSubmit,
    isSubminting,
    setIsSubmiting
  };
};
