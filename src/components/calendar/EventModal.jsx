import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import getIcon from '../../utils/iconUtils';

function EventModal({ isOpen, onClose, event, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    start: '',
    end: '',
    description: '',
    color: '#6366f1'
  });
  
  const [errors, setErrors] = useState({});
  
  // Icons
  const XIcon = getIcon('X');
  const TrashIcon = getIcon('Trash');
  
  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        start: formatDateTimeForInput(event.start),
        end: formatDateTimeForInput(event.end)
      });
    }
  }, [event]);
  
  // Helper to format ISO date to datetime-local input format
  const formatDateTimeForInput = (isoString) => {
    const date = parseISO(isoString);
    return format(date, "yyyy-MM-dd'T'HH:mm");
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.start) {
      newErrors.start = 'Start time is required';
    }
    
    if (!formData.end) {
      newErrors.end = 'End time is required';
    } else if (formData.start && formData.end && formData.start > formData.end) {
      newErrors.end = 'End time must be after start time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert datetime-local values back to ISO strings
      const startDate = new Date(formData.start);
      const endDate = new Date(formData.end);
      
      onSave({
        ...formData,
        start: startDate.toISOString(),
        end: endDate.toISOString()
      });
    }
  };
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      onDelete(formData.id);
    }
  };
  
  const colorOptions = [
    { value: '#6366f1', label: 'Primary' },
    { value: '#10b981', label: 'Secondary' },
    { value: '#f97316', label: 'Accent' },
    { value: '#ef4444', label: 'Red' },
    { value: '#3b82f6', label: 'Blue' },
    { value: '#8b5cf6', label: 'Purple' }
  ];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-xl w-full max-w-md z-10 relative"
          >
            <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-700">
              <h3 className="text-lg font-semibold dark:text-white">
                {formData.id && formData.title ? 'Edit Event' : 'New Event'}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <XIcon className="w-5 h-5 text-surface-500 dark:text-surface-400" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5">
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg border ${errors.title ? 'border-red-500 dark:border-red-400' : 'border-surface-300 dark:border-surface-600'} bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                    placeholder="Add title"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.title}</p>}
                </div>
                
                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="start" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Start
                    </label>
                    <input
                      type="datetime-local"
                      id="start"
                      name="start"
                      value={formData.start}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded-lg border ${errors.start ? 'border-red-500 dark:border-red-400' : 'border-surface-300 dark:border-surface-600'} bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {errors.start && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.start}</p>}
                  </div>
                  <div>
                    <label htmlFor="end" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      End
                    </label>
                    <input
                      type="datetime-local"
                      id="end"
                      name="end"
                      value={formData.end}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded-lg border ${errors.end ? 'border-red-500 dark:border-red-400' : 'border-surface-300 dark:border-surface-600'} bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {errors.end && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.end}</p>}
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Add description (optional)"
                  />
                </div>
                
                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Color
                  </label>
                  <div className="flex items-center space-x-2">
                    {colorOptions.map(color => (
                      <div 
                        key={color.value}
                        onClick={() => setFormData({ ...formData, color: color.value })}
                        className={`w-8 h-8 rounded-full cursor-pointer ${formData.color === color.value ? 'ring-2 ring-offset-2 dark:ring-offset-surface-800 ring-surface-800 dark:ring-white' : ''}`}
                        style={{ backgroundColor: color.value }}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                {formData.id && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                  </button>
                )}
                
                <div className="flex items-center space-x-3 ml-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-surface-700 dark:text-surface-300 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default EventModal;