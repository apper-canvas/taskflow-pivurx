import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const ProjectForm = ({ project, isEditing, onSave, onCancel }) => {
  // Get icons
  const CloseIcon = getIcon('X');
  const SaveIcon = getIcon('Save');
  const FolderIcon = getIcon('Folder');
  
  // Default project values
  const defaultProject = {
    name: '',
    description: '',
    color: 'blue'
  };
  
  // Form state
  const [formData, setFormData] = useState(project || defaultProject);
  const [errors, setErrors] = useState({});
  
  // Update form when project changes
  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData(defaultProject);
    }
  }, [project]);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
        id: project?.id || undefined
      });
    } else {
      toast.error('Please correct the errors in the form');
    }
  };
  
  // Available color options
  const colorOptions = [
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'red', label: 'Red' },
    { value: 'amber', label: 'Amber' },
    { value: 'purple', label: 'Purple' },
    { value: 'pink', label: 'Pink' },
    { value: 'indigo', label: 'Indigo' }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-lg bg-white dark:bg-surface-800 rounded-2xl shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-surface-200 dark:border-surface-700">
          <h3 className="text-lg font-semibold flex items-center">
            <FolderIcon className="w-5 h-5 mr-2 text-primary" />
            {isEditing ? 'Edit Project' : 'Create New Project'}
          </h3>
          <button
            onClick={onCancel}
            className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label="Close modal"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="text-sm font-medium">
              Project Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Website Redesign"
              value={formData.name}
              onChange={handleInputChange}
              className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>
          
          <div className="flex flex-col space-y-1">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the purpose of this project..."
              value={formData.description}
              onChange={handleInputChange}
              className="input-field min-h-[100px] resize-y"
            />
          </div>
          
          <div className="flex flex-col space-y-1">
            <label htmlFor="color" className="text-sm font-medium">
              Project Color
            </label>
            <div className="grid grid-cols-7 gap-2">
              {colorOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-full aspect-square rounded-full ${
                    formData.color === option.value 
                      ? `ring-2 ring-offset-2 ring-${option.value}-500 dark:ring-offset-surface-800` 
                      : ''
                  } bg-${option.value}-500 hover:opacity-90 transition-opacity`}
                  onClick={() => setFormData(prev => ({ ...prev, color: option.value }))}
                  aria-label={`Select ${option.label} color`}
                  title={option.label}
                />
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 sm:justify-end pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <SaveIcon className="w-4 h-4 mr-2" />
              {isEditing ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProjectForm;