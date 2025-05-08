import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
        addMonths, subMonths, addDays, isSameMonth, isSameDay, parseISO } from 'date-fns';
import getIcon from '../utils/iconUtils';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';
import EventModal from '../components/calendar/EventModal';
import { toast } from 'react-toastify';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month'); // 'month', 'week', 'day'
  const [events, setEvents] = useState(() => {
    // Get events from localStorage or use defaults
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [
      {
        id: '1',
        title: 'Team Meeting',
        start: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
        end: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(),
        description: 'Weekly team sync meeting',
        color: '#6366f1' // primary color
      },
      {
        id: '2',
        title: 'Project Deadline',
        start: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
        end: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
        description: 'Submit final project deliverables',
        color: '#f97316' // accent color
      }
    ];
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  
  // Icons
  const PlusIcon = getIcon('Plus');
  
  useEffect(() => {
    // Save events to localStorage whenever they change
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    // Open modal with empty event for the selected date
    setCurrentEvent({
      id: Date.now().toString(),
      title: '',
      start: new Date(day.setHours(9, 0, 0, 0)).toISOString(),
      end: new Date(day.setHours(10, 0, 0, 0)).toISOString(),
      description: '',
      color: '#6366f1'
    });
    setIsModalOpen(true);
  };

  const handleEventClick = (event) => {
    setCurrentEvent(event);
    setSelectedDate(parseISO(event.start));
    setIsModalOpen(true);
  };

  const handleSaveEvent = (event) => {
    if (!event.title.trim()) {
      toast.error('Event title is required');
      return;
    }

    // Check if it's an edit or a new event
    if (events.some(e => e.id === event.id)) {
      setEvents(events.map(e => e.id === event.id ? event : e));
      toast.success('Event updated successfully');
    } else {
      setEvents([...events, event]);
      toast.success('Event created successfully');
    }
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setIsModalOpen(false);
    toast.success('Event deleted successfully');
  };

  const handleAddEvent = () => {
    setCurrentEvent({
      id: Date.now().toString(),
      title: '',
      start: new Date(selectedDate.setHours(9, 0, 0, 0)).toISOString(),
      end: new Date(selectedDate.setHours(10, 0, 0, 0)).toISOString(),
      description: '',
      color: '#6366f1'
    });
    setIsModalOpen(true);
  };

  // Get days for the current view
  const getDays = () => {
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

  // Filter events for the current view
  const getEventsForView = () => {
    const days = getDays();
    return events.filter(event => {
      const eventDate = parseISO(event.start);
      return days.some(day => isSameDay(day, eventDate));
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold dark:text-white">Calendar</h1>
        <button 
          onClick={handleAddEvent}
          className="btn-primary flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          Add Event
        </button>
      </div>

      <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card dark:shadow-xl overflow-hidden">
        <CalendarHeader 
          currentDate={currentDate}
          currentView={currentView}
          onPrev={prevMonth}
          onNext={nextMonth}
          onViewChange={setCurrentView}
          onTodayClick={() => setCurrentDate(new Date())}
        />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CalendarGrid 
            currentDate={currentDate}
            selectedDate={selectedDate}
            events={getEventsForView()}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
            view={currentView}
          />
        </motion.div>
      </div>

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={currentEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
}

export default Calendar;