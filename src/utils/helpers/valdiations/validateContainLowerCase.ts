export const validateContainLowerCase = (
  value: string,
  message: string = 'validations.containLowerCase'
): ValidationReturn => {
  if (!/[a-z]/g.test(value)) return message;
  return null;
};
