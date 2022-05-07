import React from 'react';

import { checkDateIsEqual, checkIsToday } from '@utils/helpers';

import styles from './Calendar.module.css';
import { useCalendar } from './useCalendart';

interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstWeekDayNumber?: number;
}

const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10;
  return [...Array(10)].map((_, index) => startYear + index);
};

export const Calendar: React.FC<CalendarProps> = ({
  locale = 'default',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2
}) => {
  const {
    functions,
    mode,
    calendarDays,
    weekDaysNames,
    monthesNames,
    selectedDay,
    selectedMonth,
    selectedYear,
    selectedYearsInterval
  } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber
  });
  console.log('selectedMonth.monthIndex', selectedMonth.monthIndex);
  return (
    <div className={styles.calendar_container}>
      <div className={styles.calendar_header_container}>
        <div
          aria-hidden
          className={styles.calendar_header_arrow_left}
          onClick={() => functions.onClickArrow('left')}
        />
        {mode === 'days' && (
          <div aria-hidden onClick={() => functions.setMode('monthes')}>
            {monthesNames[selectedMonth.monthIndex].month} {selectedYear}
          </div>
        )}
        {mode === 'monthes' && (
          <div aria-hidden onClick={() => functions.setMode('years')}>
            {selectedYear}
          </div>
        )}
        {mode === 'years' && (
          <div>
            {selectedYearsInterval[0]} - {selectedYearsInterval[selectedYearsInterval.length - 1]}
          </div>
        )}
        <div
          aria-hidden
          className={styles.calendar_header_arrow_right}
          onClick={() => functions.onClickArrow('right')}
        />
      </div>
      <div className={styles.calendar_body_container}>
        {mode === 'days' && (
          <>
            <div className={styles.calendar_week_days_container}>
              {weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className={styles.calendar_days_container}>
              {calendarDays.map((day) => (
                <div
                  key={`${day.dayNumber}-${day.monthIndex}`}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedDay(day);
                    selectDate(day.date);
                  }}
                  className={`${styles.calendar_day_container} 
              ${
                checkDateIsEqual(day.date, selectedDay.date)
                  ? styles.calendar_selected_item_container
                  : ''
              }
              ${checkIsToday(day.date) ? styles.calendar_today_item_container : ''}
              ${
                day.monthIndex !== selectedMonth.monthIndex
                  ? styles.calendar_additional_day_container
                  : ''
              }`}
                >
                  {day.dayNumber}
                </div>
              ))}
            </div>
          </>
        )}

        {mode === 'monthes' && (
          <div className={styles.calendar_monthes_container}>
            {monthesNames.map((monthesName) => (
              <div
                key={monthesName.month}
                aria-hidden
                onClick={() => {
                  functions.setSelectedMonthByIndex(monthesName.monthIndex);
                  functions.setMode('days');
                }}
                className={`${styles.calendar_month_container} ${
                  monthesName.monthIndex === selectedMonth.monthIndex
                    ? styles.calendar_selected_item_container
                    : ''
                }
                  ${
                    new Date().getMonth() === monthesName.monthIndex
                      ? styles.calendar_today_item_container
                      : ''
                  }`}
              >
                {monthesName.monthShort}
              </div>
            ))}
          </div>
        )}

        {mode === 'years' && (
          <div className={styles.calendar_monthes_container}>
            {selectedYearsInterval[0] - 1}
            {selectedYearsInterval.map((year) => (
              <div
                key={year}
                aria-hidden
                onClick={() => {
                  functions.setSelectedYear(year);
                  functions.setMode('monthes');
                }}
                className={`${styles.calendar_month_container} ${
                  year === selectedYear ? styles.calendar_selected_item_container : ''
                }
                  ${new Date().getFullYear() === year ? styles.calendar_today_item_container : ''}`}
              >
                {year}
              </div>
            ))}
            {selectedYearsInterval[selectedYearsInterval.length - 1] + 1}
          </div>
        )}
      </div>
    </div>
  );
};
