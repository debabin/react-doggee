export const validateMin = (
  value: number,
  minLength: number,
  message: string = 'validations.min'
): ValidationReturn => {
  if (minLength <= value) return message;
  return null;
};
