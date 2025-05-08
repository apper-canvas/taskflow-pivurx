import { format } from 'date-fns';
import getIcon from '../../utils/iconUtils';

function CalendarHeader({ 
  currentDate, 
  currentView, 
  onPrev, 
  onNext, 
  onViewChange,
  onTodayClick
}) {
  // Icons
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const ChevronRightIcon = getIcon('ChevronRight');

  const viewOptions = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
    { value: 'day', label: 'Day' }
  ];

  return (
    <div className="px-6 py-4 border-b border-surface-200 dark:border-surface-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold dark:text-white">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center space-x-1">
            <button 
              onClick={onPrev}
              className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeftIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            </button>
            <button 
              onClick={onNext}
              className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label="Next month"
            >
              <ChevronRightIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            </button>
            <button 
              onClick={onTodayClick}
              className="px-3 py-1.5 ml-2 text-sm rounded-full bg-surface-100 hover:bg-surface-200 dark:bg-surface-700 dark:hover:bg-surface-600 transition-colors dark:text-white"
            >
              Today
            </button>
          </div>
        </div>
        
        <div className="flex bg-surface-100 dark:bg-surface-700 rounded-lg p-1">
          {viewOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onViewChange(option.value)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentView === option.value 
                  ? 'bg-white dark:bg-surface-600 text-surface-800 dark:text-white shadow-sm' 
                  : 'text-surface-600 dark:text-surface-300 hover:text-surface-800 dark:hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarHeader;