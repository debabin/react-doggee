import { createDate } from './createDate';

export const getMonthesNames = (locale: string = 'default') => {
  const monthesNames: {
    month: ReturnType<typeof createDate>['month'];
    monthShort: ReturnType<typeof createDate>['monthShort'];
    monthIndex: ReturnType<typeof createDate>['monthIndex'];
  }[] = Array.from({ length: 12 });
  const date = new Date();

  monthesNames.forEach((_, i) => {
    const { month, monthIndex, monthShort } = createDate({
      locale,
      date: new Date(date.getFullYear(), date.getMonth() + i, date.getDate())
    });

    monthesNames[monthIndex] = { month, monthShort, monthIndex };
  });

  return monthesNames;
};
