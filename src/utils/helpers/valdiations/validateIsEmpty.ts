export const validateIsEmpty = (
  value: string,
  message: string = 'validations.required'
): ValidationReturn => {
  if (!value) return message;
  return null;
};
