export const validateMinLength = (
  value: string,
  minLength: number,
  message: string = 'validations.minLength'
): ValidationReturn => {
  if (minLength <= value.length) return message;
  return null;
};
