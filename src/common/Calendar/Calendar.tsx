import React from 'react';

import { checkDateIsEqual, checkIsToday } from '@utils/helpers';

import styles from './Calendar.module.css';
import { useCalendar } from './hooks/useCalendart';

interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstWeekDayNumber?: number;
}

export const Calendar: React.FC<CalendarProps> = ({
  locale = 'default',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2
}) => {
  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber
  });

  return (
    <div className={styles.calendar_container}>
      <div className={styles.calendar_header_container}>
        <div
          aria-hidden
          className={styles.calendar_header_arrow_left}
          onClick={() => functions.onClickArrow('left')}
        />
        {state.mode === 'days' && (
          <div aria-hidden onClick={() => functions.setMode('monthes')}>
            {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
        )}
        {state.mode === 'monthes' && (
          <div aria-hidden onClick={() => functions.setMode('years')}>
            {state.selectedYear}
          </div>
        )}
        {state.mode === 'years' && (
          <div>
            {state.selectedYearsInterval[0]} -{' '}
            {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
          </div>
        )}
        <div
          aria-hidden
          className={styles.calendar_header_arrow_right}
          onClick={() => functions.onClickArrow('right')}
        />
      </div>
      <div className={styles.calendar_body_container}>
        {state.mode === 'days' && (
          <>
            <div className={styles.calendar_week_days_container}>
              {state.weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className={styles.calendar_days_container}>
              {state.calendarDays.map((day) => (
                <div
                  key={`${day.dayNumber}-${day.monthIndex}`}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedDay(day);
                    selectDate(day.date);
                  }}
                  className={`${styles.calendar_day_container} 
              ${
                checkDateIsEqual(day.date, state.selectedDay.date)
                  ? styles.calendar_selected_item_container
                  : ''
              }
              ${checkIsToday(day.date) ? styles.calendar_today_item_container : ''}
              ${
                day.monthIndex !== state.selectedMonth.monthIndex
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

        {state.mode === 'monthes' && (
          <div className={styles.calendar_pick_items_container}>
            {state.monthesNames.map((monthesName) => (
              <div
                key={monthesName.month}
                aria-hidden
                onClick={() => {
                  functions.setSelectedMonthByIndex(monthesName.monthIndex);
                  functions.setMode('days');
                }}
                className={`${styles.calendar_pick_item_container} ${
                  monthesName.monthIndex === state.selectedMonth.monthIndex
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

        {state.mode === 'years' && (
          <div className={styles.calendar_pick_items_container}>
            <div className={styles.calendar_unchoosable_year}>
              {state.selectedYearsInterval[0] - 1}
            </div>
            {state.selectedYearsInterval.map((year) => (
              <div
                key={year}
                aria-hidden
                onClick={() => {
                  functions.setSelectedYear(year);
                  functions.setMode('monthes');
                }}
                className={`${styles.calendar_pick_item_container} ${
                  year === state.selectedYear ? styles.calendar_selected_item_container : ''
                }
                  ${new Date().getFullYear() === year ? styles.calendar_today_item_container : ''}`}
              >
                {year}
              </div>
            ))}
            <div className={styles.calendar_unchoosable_year}>
              {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
