import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';

const Projects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();
  
  // Icons
  const FolderIcon = getIcon('Folder');
  const PlusIcon = getIcon('Plus');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const FolderPlusIcon = getIcon('FolderPlus');
  const SearchIcon = getIcon('Search');
  const CheckIcon = getIcon('Check');
  const CopyIcon = getIcon('Copy');
  const CalendarIcon = getIcon('Calendar');
  const ClockIcon = getIcon('Clock');
  const Logo = getIcon('ListTodo');

  // Projects state
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      try {
        return JSON.parse(savedProjects);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: '1',
        name: 'Work Tasks',
        description: 'Professional tasks and work-related activities',
        color: '#4f46e5', // primary color
        createdAt: new Date().toISOString(),
        tasks: []
      },
      {
        id: '2',
        name: 'Personal',
        description: 'Personal errands and activities',
        color: '#10b981', // secondary color
        createdAt: new Date().toISOString(),
        tasks: []
      }
    ];
  });

  // Get tasks from localStorage
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

  // Save projects to localStorage
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  // Update tasks in localStorage when they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Create a new project
  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      tasks: []
    };
    
    setProjects(prev => [...prev, newProject]);
    toast.success(`Project "${project.name}" created successfully!`);
    navigate('/projects');
  };

  // Update an existing project
  const updateProject = (projectId, updatedData) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { ...project, ...updatedData }
          : project
      )
    );
    toast.success(`Project updated successfully!`);
    navigate('/projects');
  };

  // Delete a project
  const deleteProject = (projectId) => {
    const projectToDelete = projects.find(project => project.id === projectId);
    
    // Check if project has tasks
    const projectTasks = tasks.filter(task => task.projectId === projectId);
    
    if (projectTasks.length > 0) {
      // If project has tasks, either reassign or delete those tasks
      if (confirm(`This project has ${projectTasks.length} tasks. Delete all associated tasks?`)) {
        // Delete associated tasks
        setTasks(prev => prev.filter(task => task.projectId !== projectId));
      } else {
        // Reassign tasks to "No Project"
        setTasks(prev => 
          prev.map(task => 
            task.projectId === projectId 
              ? { ...task, projectId: null }
              : task
          )
        );
      }
    }
    
    // Delete the project
    setProjects(prev => prev.filter(project => project.id !== projectId));
    toast.info(`Project "${projectToDelete.name}" deleted`);
    navigate('/projects');
  };

  // Get tasks for a specific project
  const getProjectTasks = (projectId) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  // Add a task to a project
  const addTaskToProject = (projectId, task) => {
    // Create new task with the projectId
    const newTask = {
      ...task,
      id: Date.now().toString(),
      projectId: projectId,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    // Add to global tasks
    setTasks(prev => [newTask, ...prev]);
    
    toast.success("Task added to project successfully!");
    navigate(`/projects/${projectId}`);
  };

  // Find the current project from URL parameter
  const currentProject = projectId 
    ? projects.find(project => project.id === projectId)
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-surface-900/80 border-b border-surface-200 dark:border-surface-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Logo className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  TaskFlow
                </span>
              </Link>
            </div>
            
            {/* Navigation */}
            <nav className="flex space-x-1">
              <Link 
                to="/" 
                className="px-3 py-2 rounded-lg text-surface-600 hover:text-surface-900 dark:text-surface-300 dark:hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/projects" 
                className="px-3 py-2 rounded-lg font-medium bg-surface-100 text-surface-900 dark:bg-surface-800 dark:text-white"
              >
                Projects
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <Routes>
            {/* Project List */}
            <Route path="/" element={
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 text-center"
                >
                  <h1 className="text-3xl font-bold mb-2">Projects</h1>
                  <p className="text-surface-600 dark:text-surface-300">
                    Organize your tasks by projects to stay more focused
                  </p>
                </motion.div>
                
                <div className="flex justify-end mb-6">
                  <Link 
                    to="/projects/create" 
                    className="btn-primary"
                  >
                    <FolderPlusIcon className="w-5 h-5 mr-2" />
                    Create Project
                  </Link>
                </div>
                
                <ProjectList 
                  projects={projects} 
                  tasks={tasks}
                  onDeleteProject={deleteProject}
                />
              </>
            } />
            
            {/* Create Project */}
            <Route path="/create" element={
              <>
                <div className="mb-6">
                  <Link to="/projects" className="btn-outline inline-flex items-center">
                    <ChevronLeftIcon className="w-5 h-5 mr-2" />
                    Back to Projects
                  </Link>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card"
                >
                  <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
                  <ProjectForm onSubmit={addProject} />
                </motion.div>
              </>
            } />
            
            {/* Edit Project */}
            <Route path="/edit/:projectId" element={
              <>
                <div className="mb-6">
                  <Link to="/projects" className="btn-outline inline-flex items-center">
                    <ChevronLeftIcon className="w-5 h-5 mr-2" />
                    Back to Projects
                  </Link>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card"
                >
                  <h2 className="text-2xl font-bold mb-6">Edit Project</h2>
                  <ProjectForm 
                    project={projects.find(p => p.id === useParams().projectId)}
                    onSubmit={(project) => updateProject(useParams().projectId, project)}
                  />
                </motion.div>
              </>
            } />
          </Routes>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-surface-200 dark:border-surface-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-surface-500 text-sm">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Projects;