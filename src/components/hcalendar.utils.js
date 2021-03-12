import {
  addDays,
  eachDayOfInterval,
  format,
  startOfToday,
  subDays,
} from 'date-fns';
import {de} from 'date-fns/locale';

export const createCalendarElements = (
  daysBeforeToday = 3,
  daysAfterToday = 14,
) => {
  const currentDate = startOfToday();
  const startOfInterval = subDays(currentDate, daysBeforeToday);
  const endOfInterval = addDays(currentDate, daysAfterToday);
  const dates = eachDayOfInterval({start: startOfInterval, end: endOfInterval});
  const calendarElements = dates.map((date, index) => {
    return buildHorizontalCalendarElementFromDate(date, index + 2);
  });
  return calendarElements;
};

export const buildHorizontalCalendarElementFromDate = (date, index) => {
  const today = startOfToday().toISOString();
  return {
    id: index.toString(),
    dayNumber: format(date, 'd'),
    dayAcronym: format(date, 'cccccc', {locale: de}),
    timestamp: date.toISOString(),
    isToday: date.toISOString() === today,
    // Today is set by default
    isSelected: date.toISOString() === today,
  };
};