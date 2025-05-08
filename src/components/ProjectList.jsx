import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

const ProjectList = ({ projects, tasks, onDeleteProject }) => {
  const FolderIcon = getIcon('Folder');
  const EditIcon = getIcon('Edit2');
  const TrashIcon = getIcon('Trash2');
  const CheckCircleIcon = getIcon('CheckCircle2');
  const AlertCircleIcon = getIcon('AlertCircle');
  const ClockIcon = getIcon('Clock');

  // Calculate project statistics
  const getProjectStats = (projectId) => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    const completedTasks = projectTasks.filter(task => task.completed);
    
    return {
      total: projectTasks.length,
      completed: completedTasks.length,
      completion: projectTasks.length > 0 
        ? Math.round((completedTasks.length / projectTasks.length) * 100) 
        : 0
    };
  };

  // Handle delete with confirmation
  const handleDelete = (project) => {
    if (confirm(`Are you sure you want to delete project "${project.name}"?`)) {
      onDeleteProject(project.id);
    }
  };

  return (
    <div className="space-y-6">
      {projects.length === 0 ? (
        <div className="card text-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-6xl opacity-20">📁</div>
            <h3 className="text-xl font-semibold">No Projects Yet</h3>
            <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
              Create your first project to organize your tasks more effectively.
            </p>
            <Link to="/projects/create" className="btn-primary mt-4">
              Create First Project
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {projects.map(project => {
            const stats = getProjectStats(project.id);
            
            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card hover:shadow-lg transition-shadow border-l-4"
                style={{ borderLeftColor: project.color }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <Link to={`/projects/${project.id}`} className="flex items-center">
                      <FolderIcon className="w-5 h-5 mr-2" style={{ color: project.color }} />
                      <h3 className="text-xl font-bold hover:text-primary">{project.name}</h3>
                    </Link>
                    <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="text-center px-3 py-1 bg-surface-100 dark:bg-surface-800 rounded-lg text-sm">
                      <div className="flex items-center space-x-1 text-surface-600 dark:text-surface-300">
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>{stats.completed}/{stats.total} tasks</span>
                      </div>
                    </div>
                    
                    <Link to={`/projects/edit/${project.id}`} className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700">
                      <EditIcon className="w-5 h-5 text-blue-500" />
                    </Link>
                    
                    <button onClick={() => handleDelete(project)} className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700">
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectList;