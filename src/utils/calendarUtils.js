import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  addDays,
  parseISO
} from 'date-fns';

// Get all days in the month view (including days from prev/next months)
export const getCalendarDays = (currentDate) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const days = [];
  let day = startDate;
  
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }
  
  return days;
};

// Format time for display
export const formatEventTime = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'h:mm a');
};

// Get events for a specific date
export const getEventsForDate = (events, date) => {
  return events.filter(event => {
    const eventDate = parseISO(event.start);
    return isSameDay(date, eventDate);
  });
};

// Check if an event spans multiple days
export const isMultiDayEvent = (start, end) => {
  const startDate = parseISO(start);
  const endDate = parseISO(end);
  
  return !isSameDay(startDate, endDate);
};

export default { getCalendarDays, formatEventTime, getEventsForDate, isMultiDayEvent };