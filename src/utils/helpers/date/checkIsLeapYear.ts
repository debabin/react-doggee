export const checkIsLeapYear = (year: number) =>
  year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
