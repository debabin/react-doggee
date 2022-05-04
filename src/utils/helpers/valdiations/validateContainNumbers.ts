export const validateContainNumbers = (
  value: string,
  message: string = 'validations.containNumbers'
): ValidationReturn => {
  if (!/\d/g.test(value)) return message;
  return null;
};
