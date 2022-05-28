import React from 'react';

import { checkDateIsEqual, checkIsToday, classnames } from '@utils/helpers';

import { useCalendar } from './hooks/useCalendart';

import styles from './Calendar.module.css';

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
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;

                return (
                  <div
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    aria-hidden
                    onClick={() => {
                      functions.setSelectedDay(day);
                      selectDate(day.date);
                    }}
                    className={classnames(styles.calendar_day_container, {
                      [styles.calendar_today_item_container]: isToday,
                      [styles.calendar_selected_item_container]: isSelectedDay,
                      [styles.calendar_additional_day_container]: isAdditionalDay
                    })}
                  >
                    {day.dayNumber}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {state.mode === 'monthes' && (
          <div className={styles.calendar_pick_items_container}>
            {state.monthesNames.map((monthesName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthesName.monthIndex &&
                state.selectedYear === new Date().getFullYear();
              const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;
              return (
                <div
                  key={monthesName.month}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthesName.monthIndex);
                    functions.setMode('days');
                  }}
                  className={classnames(styles.calendar_pick_item_container, {
                    [styles.calendar_today_item_container]: isCurrentMonth,
                    [styles.calendar_selected_item_container]: isSelectedMonth
                  })}
                >
                  {monthesName.monthShort}
                </div>
              );
            })}
          </div>
        )}

        {state.mode === 'years' && (
          <div className={styles.calendar_pick_items_container}>
            <div className={styles.calendar_unchoosable_year}>
              {state.selectedYearsInterval[0] - 1}
            </div>
            {state.selectedYearsInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = year === state.selectedYear;

              return (
                <div
                  key={year}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode('monthes');
                  }}
                  className={classnames(styles.calendar_pick_item_container, {
                    [styles.calendar_today_item_container]: isCurrentYear,
                    [styles.calendar_selected_item_container]: isSelectedYear
                  })}
                >
                  {year}
                </div>
              );
            })}
            <div className={styles.calendar_unchoosable_year}>
              {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
