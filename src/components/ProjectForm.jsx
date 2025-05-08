import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const ProjectForm = ({ project, onSubmit }) => {
  // Default colors
  const colorOptions = [
    '#6366f1', // primary
    '#10b981', // secondary
    '#f97316', // accent
    '#ef4444', // red
    '#f59e0b', // amber
    '#3b82f6', // blue
    '#8b5cf6', // violet
    '#ec4899', // pink
  ];

  // Initialize form state with project data or defaults
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: colorOptions[0]
  });

  // If editing a project, load its data
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        color: project.color || colorOptions[0]
      });
    }
  }, [project]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      color
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Project name is required");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Project Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter project name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="input-field min-h-[100px] resize-y"
            placeholder="Describe the purpose of this project"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Project Color
          </label>
          <div className="flex flex-wrap gap-3">
            {colorOptions.map((color, index) => (
              <button
                key={index}
                type="button"
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  formData.color === color ? 'ring-2 ring-offset-2 ring-surface-900 dark:ring-white' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                aria-label={`Select color ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <button type="submit" className="btn-primary">
          {project ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;