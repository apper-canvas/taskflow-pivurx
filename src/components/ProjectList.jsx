import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import getIcon from '../utils/iconUtils';
import ProjectForm from './ProjectForm';

const ProjectList = () => {
  const navigate = useNavigate();
  
  // Get icons
  const PlusIcon = getIcon('Plus');
  const EditIcon = getIcon('Edit2');
  const TrashIcon = getIcon('Trash2');
  const FolderIcon = getIcon('Folder');
  const CheckIcon = getIcon('Check');
  const TasksIcon = getIcon('FileText');
  
  // Load projects from localStorage
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      try {
        return JSON.parse(savedProjects);
      } catch (e) {
        return [];
      }
    }
    
    // Default sample projects
    return [
      {
        id: '1',
        name: 'Work',
        description: 'Professional tasks and assignments',
        color: 'blue'
      },
      {
        id: '2',
        name: 'Personal',
        description: 'Personal errands and goals',
        color: 'green'
      }
    ];
  });
  
  // Load tasks to count by project
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  
  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Get task counts for a project
  const getProjectTaskCounts = (projectId) => {
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    return {
      total: projectTasks.length,
      completed: projectTasks.filter(task => task.completed).length,
      active: projectTasks.filter(task => !task.completed).length
    };
  };
  
  // Add new project
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    
    setProjects(prev => [...prev, newProject]);
    toast.success("Project created successfully!");
    setIsModalOpen(false);
  };
  
  // Update existing project
  const updateProject = (updatedProject) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    toast.success("Project updated successfully!");
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentProject(null);
  };
  
  // Delete project
  const deleteProject = (id) => {
    const projectToDelete = projects.find(project => project.id === id);
    
    if (confirm(`Are you sure you want to delete "${projectToDelete.name}"? This will NOT delete the tasks within the project.`)) {
      setProjects(prev => prev.filter(project => project.id !== id));
      
      // Update tasks to remove the project reference
      const updatedTasks = tasks.map(task => {
        if (task.projectId === id) {
          return { ...task, projectId: null };
        }
        return task;
      });
      
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      
      toast.info("Project deleted");
    }
  };
  
  // Open modal for adding new project
  const openAddModal = () => {
    setCurrentProject(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };
  
  // Open modal for editing project
  const openEditModal = (project) => {
    setCurrentProject(project);
    setIsEditing(true);
    setIsModalOpen(true);
  };
  
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
    setIsEditing(false);
  };
  
  // View project tasks
  const viewProjectTasks = (projectId) => {
    navigate('/?project=' + projectId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Projects</h2>
        <button 
          onClick={openAddModal}
          className="btn-primary"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          New Project
        </button>
      </div>
      
      {projects.length === 0 ? (
        <div className="card text-center py-12">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="text-6xl opacity-20 dark:opacity-10">📁</div>
            <h4 className="text-xl font-medium">No projects yet</h4>
            <p className="text-surface-500 dark:text-surface-400 max-w-md">
              Create your first project to organize your tasks better
            </p>
            <button 
              onClick={openAddModal}
              className="btn-primary mt-4"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Create First Project
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => {
            const taskCounts = getProjectTaskCounts(project.id);
            
            return (
              <motion.div
                key={project.id}
                className="card relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEditModal(project)}
                    className="p-1.5 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                    aria-label="Edit project"
                  >
                    <EditIcon className="w-4 h-4 text-blue-500" />
                  </button>
                  
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-1.5 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                    aria-label="Delete project"
                  >
                    <TrashIcon className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full bg-${project.color || 'blue'}-100 dark:bg-${project.color || 'blue'}-900/20 flex items-center justify-center mb-2`}>
                        <FolderIcon className={`w-5 h-5 text-${project.color || 'blue'}-500`} />
                      </div>
                      <h3 className="text-lg font-medium ml-3">{project.name}</h3>
                    </div>
                    
                    {project.description && (
                      <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
                        {project.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-sm text-surface-500 dark:text-surface-400 mb-3">
                      <span>{taskCounts.total} task{taskCounts.total !== 1 ? 's' : ''}</span>
                      <span>{taskCounts.completed} completed</span>
                    </div>
                    
                    <button 
                      onClick={() => viewProjectTasks(project.id)}
                      className="btn-outline w-full"
                    >
                      <TasksIcon className="w-4 h-4 mr-2" />
                      View Tasks
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
      
      {/* Project Form Modal */}
      {isModalOpen && (
        <ProjectForm 
          project={currentProject}
          isEditing={isEditing}
          onSave={isEditing ? updateProject : addProject}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};

export default ProjectList;