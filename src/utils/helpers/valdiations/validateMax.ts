export const validateMax = (
  value: number,
  maxLength: number,
  message: string = 'validations.max'
): ValidationReturn => {
  if (maxLength <= value) return message;
  return null;
};
