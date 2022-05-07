import { checkIsLeapYear } from './checkIsLeapYear';

export const getMonthNumberOfDays = (
  monthIndex: number,
  year: number = new Date().getFullYear()
) => {
  const monthsSizes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const isFebruary = monthIndex === 1;
  return isFebruary && checkIsLeapYear(year)
    ? monthsSizes[monthIndex] + 1
    : monthsSizes[monthIndex];
};
