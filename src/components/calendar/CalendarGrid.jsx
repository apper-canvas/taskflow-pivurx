import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
         addDays, isSameMonth, isSameDay, parseISO, isToday } from 'date-fns';
import { motion } from 'framer-motion';

function CalendarGrid({ 
  currentDate, 
  selectedDate, 
  events, 
  onDateClick, 
  onEventClick,
  view = 'month'
}) {
  const [days, setDays] = useState([]);
  
  useEffect(() => {
    // Generate the days for the current view
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const daysArray = [];
    let day = startDate;
    
    while (day <= endDate) {
      daysArray.push(day);
      day = addDays(day, 1);
    }
    
    setDays(daysArray);
  }, [currentDate, view]);
  
  // Group events by date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = parseISO(event.start);
      return isSameDay(date, eventDate);
    });
  };
  
  // Format event time
  const formatEventTime = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'h:mm a');
  };
  
  // Week day headers
  const renderDayHeaders = () => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="grid grid-cols-7 border-b border-surface-200 dark:border-surface-700">
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className="py-3 text-center text-sm font-medium text-surface-500 dark:text-surface-400"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };
  
  // Render calendar cells for month view
  const renderMonthView = () => {
    return (
      <div className="grid grid-cols-7 grid-rows-6 h-[calc(100vh-280px)]">
        {days.map((day, index) => {
          const dateEvents = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isSelectedDay = isSameDay(day, selectedDate);
          const isTodayDate = isToday(day);
          
          return (
            <div 
              key={index} 
              onClick={() => onDateClick(day)}
              className={`
                border-b border-r border-surface-200 dark:border-surface-700 
                p-1 overflow-hidden transition-colors
                ${isCurrentMonth ? 'bg-white dark:bg-surface-800' : 'bg-surface-100 dark:bg-surface-700'}
                ${isSelectedDay ? 'ring-2 ring-inset ring-primary' : ''}
                ${isTodayDate ? 'border-l-4 border-l-primary-light' : ''}
                hover:bg-surface-50 dark:hover:bg-surface-750 cursor-pointer
              `}
            >
              <div className="flex flex-col h-full">
                <div className={`
                  text-sm px-2 pt-1 pb-1
                  ${!isCurrentMonth ? 'text-surface-400 dark:text-surface-500' : 'text-surface-800 dark:text-surface-200'}
                  ${isTodayDate ? 'font-semibold text-primary-dark dark:text-primary-light' : ''}
                `}>
                  {format(day, 'd')}
                </div>
                
                <div className="flex-1 overflow-y-auto no-scrollbar">
                  {dateEvents.slice(0, 3).map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className="text-xs p-1 mb-1 rounded truncate cursor-pointer"
                      style={{ 
                        backgroundColor: `${event.color}25`, // Use color with transparency
                        borderLeft: `3px solid ${event.color}`,
                      }}
                    >
                      <div className="font-medium" style={{ color: event.color }}>
                        {formatEventTime(event.start)} {event.title}
                      </div>
                    </motion.div>
                  ))}
                  
                  {dateEvents.length > 3 && (
                    <div className="text-xs text-surface-500 dark:text-surface-400 px-1 font-medium">
                      +{dateEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render week view
  const renderWeekView = () => {
    return (
      <div className="text-center py-10 text-surface-500 dark:text-surface-400">
        Week view coming soon
      </div>
    );
  };
  
  // Render day view
  const renderDayView = () => {
    return (
      <div className="text-center py-10 text-surface-500 dark:text-surface-400">
        Day view coming soon
      </div>
    );
  };
  
  return (
    <div className="calendar-grid">
      {renderDayHeaders()}
      {view === 'month' && renderMonthView()}
      {view === 'week' && renderWeekView()}
      {view === 'day' && renderDayView()}
    </div>
  );
}

export default CalendarGrid;