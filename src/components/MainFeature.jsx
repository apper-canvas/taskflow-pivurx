import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Get icons
  const PlusIcon = getIcon('Plus');
  const CalendarIcon = getIcon('Calendar');
  const FlagIcon = getIcon('Flag');
  const FilterIcon = getIcon('SlidersHorizontal');
  const CheckIcon = getIcon('Check');
  const TrashIcon = getIcon('Trash2');
  const EditIcon = getIcon('Edit2');
  const CloseIcon = getIcon('X');
  const SaveIcon = getIcon('Save');
  const SortIcon = getIcon('ArrowUpDown');
  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');
  const ClockIcon = getIcon('Clock');
  const AlertIcon = getIcon('AlertTriangle');
  const FolderIcon = getIcon('Folder');
  
  // Define priority colors and icons
  const priorityConfig = {
    high: { color: 'text-red-500', bgColor: 'bg-red-50 dark:bg-red-900/20', name: 'High' },
    medium: { color: 'text-amber-500', bgColor: 'bg-amber-50 dark:bg-amber-900/20', name: 'Medium' },
    low: { color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20', name: 'Low' }
  };
  
  // Initial task data from localStorage or default sample tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (e) {
        return [];
      }
    }
    
    // Default sample tasks
    return [
      {
        id: '1',
        title: 'Create new project plan',
        description: 'Outline the scope, timeline, and resources needed',
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'high',
        category: 'Work'
      },
      {
        id: '2',
        title: 'Grocery shopping',
        description: 'Milk, eggs, bread, and vegetables',
        completed: true,
        createdAt: new Date().toISOString(),
        dueDate: new Date().toISOString(),
        priority: 'medium',
        category: 'Personal'
      },
      {
        id: '3',
        title: 'Read chapter 5 of design book',
        description: 'Take notes on key principles',
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'low',
        category: 'Learning'
      }
    ];
  });

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
      }
    ];
  });
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Task form state
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    priority: 'medium',
    category: '',
    projectId: ''
  });
  
  // Editing state
  const [editingTask, setEditingTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Project filter state
  const [projectFilter, setProjectFilter] = useState('all');
  // Filter and sort state
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sort, setSort] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  
  // All available categories from tasks
  const allCategories = ['all', ...new Set(tasks.map(task => task.category).filter(Boolean))];
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle edit input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTask(prev => ({ ...prev, [name]: value }));
  };
  
  // Filter tasks based on current filters
  const getFilteredTasks = () => {
    return tasks
      .filter(task => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
      })
      .filter(task => {
        if (categoryFilter === 'all') return true;
        return task.category === categoryFilter;
      })
      .filter(task => {
        if (projectFilter === 'all') return true;
        return task.projectId === projectFilter;
      })
      .sort((a, b) => {
        let aValue = a[sort];
        let bValue = b[sort];
        
        // Handle date comparisons
        if (sort === 'dueDate' || sort === 'createdAt') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
  };
  
  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    
    if (!newTask.title.trim()) {
      toast.error("Task title cannot be empty!");
      return;
    }
    
    const task = {
      id: Date.now().toString(),
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date(newTask.dueDate).toISOString(),
      priority: newTask.priority,
      category: newTask.category.trim() || 'Uncategorized',
      projectId: newTask.projectId || null
    };
    
    setTasks(prev => [task, ...prev]);
    setNewTask({
      title: '',
      description: '',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      priority: 'medium',
      category: '',
      projectId: ''
    });
    
    toast.success("Task added successfully!");
  };
  
  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    
    const task = tasks.find(t => t.id === id);
    if (!task.completed) {
      toast.success("Nice job! Task completed.");
    }
  };
  
  // Delete task
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast.info("Task deleted");
  };
  
  // Start editing a task
  const startEdit = (task) => {
    setEditingTask({
      ...task,
      dueDate: format(new Date(task.dueDate), 'yyyy-MM-dd')
    });
    setIsEditing(true);
  };
  
  // Save edited task
  const saveEdit = (e) => {
    e.preventDefault();
    
    if (!editingTask.title.trim()) {
      toast.error("Task title cannot be empty!");
      return;
    }
    
    setTasks(prev => 
      prev.map(task => 
        task.id === editingTask.id 
          ? {
              ...editingTask,
              title: editingTask.title.trim(),
              description: editingTask.description.trim(),
              dueDate: new Date(editingTask.dueDate).toISOString(),
              category: editingTask.category.trim() || 'Uncategorized'
            } 
          : task
      )
    );
    
    setIsEditing(false);
    setEditingTask(null);
    toast.success("Task updated successfully!");
  };
  
  // Format due date for display
  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Check if date is today
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    // Check if date is tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    // Otherwise return formatted date
    return format(date, 'MMM d, yyyy');
  };
  
  // Check if a task is overdue
  const isOverdue = (dateString) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    
    // Reset time to compare just the dates
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return dueDate < today && !dateString.completed;
  };
  
  // Stats calculation
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    active: tasks.filter(task => !task.completed).length,
    overdue: tasks.filter(task => !task.completed && isOverdue(task.dueDate)).length
  };
  
  // Get completion percentage
  const completionPercentage = tasks.length > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;
  
  return (
    <div className="flex flex-col space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">My Task Dashboard</h2>
        <p className="text-surface-600 dark:text-surface-300">
          Create, organize, and track your tasks in one place
        </p>
      </motion.div>
      
      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="card bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border border-primary/20">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-primary">{stats.total}</span>
            <span className="text-sm text-surface-600 dark:text-surface-300">Total Tasks</span>
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-green-500/10 to-green-500/5 dark:from-green-500/20 dark:to-green-500/10 border border-green-500/20">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-green-500">{stats.completed}</span>
            <span className="text-sm text-surface-600 dark:text-surface-300">Completed</span>
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-blue-500/10 to-blue-500/5 dark:from-blue-500/20 dark:to-blue-500/10 border border-blue-500/20">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-blue-500">{stats.active}</span>
            <span className="text-sm text-surface-600 dark:text-surface-300">Active</span>
          </div>
        </div>
        
        <div className="card bg-gradient-to-br from-red-500/10 to-red-500/5 dark:from-red-500/20 dark:to-red-500/10 border border-red-500/20">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-bold text-red-500">{stats.overdue}</span>
            <span className="text-sm text-surface-600 dark:text-surface-300">Overdue</span>
          </div>
        </div>
      </motion.div>
      
      {/* Progress Bar */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Completion Progress</span>
            <span className="text-sm font-medium">{completionPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Task Form */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <form onSubmit={addTask} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="title" className="text-sm font-medium">
              Task Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="What needs to be done?"
              value={newTask.title}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          
          <div className="flex flex-col space-y-1">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Add details about your task..."
              value={newTask.description}
              onChange={handleInputChange}
              className="input-field min-h-[80px] resize-y"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="dueDate" className="text-sm font-medium flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1 text-surface-500" />
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            
            <div className="flex flex-col space-y-1">
              <label htmlFor="priority" className="text-sm font-medium flex items-center">
                <FlagIcon className="w-4 h-4 mr-1 text-surface-500" />
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={newTask.priority}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="flex flex-col space-y-1">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="e.g. Work, Personal, Health"
                value={newTask.category}
                onChange={handleInputChange}
                className="input-field"
              />

            <div className="flex flex-col space-y-1">
              <label htmlFor="projectId" className="text-sm font-medium flex items-center">
                <FolderIcon className="w-4 h-4 mr-1 text-surface-500" />
                Project
              </label>
              <select
                id="projectId"
                name="projectId"
                value={newTask.projectId}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">No Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            </div>
          </div>
          
          <button type="submit" className="btn-primary w-full md:w-auto md:ml-auto md:block">
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Task
          </button>
        </form>
      </motion.div>
      
      {/* Filters */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`btn px-3 py-1.5 ${filter === 'all' 
                ? 'bg-primary text-white' 
                : 'btn-outline'}`}
            >
              All
                  ? 'bg-primary text-white' 
                  : 'btn-outline'}`}
              >
                All Tasks
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`btn px-3 py-1.5 ${filter === 'active' 
                  ? 'bg-blue-500 text-white' 
                  : 'btn-outline'}`}
              >
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`btn px-3 py-1.5 ${filter === 'active' 
                ? 'bg-blue-500 text-white' 
                : 'btn-outline'}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`btn px-3 py-1.5 ${filter === 'completed' 
                ? 'bg-green-500 text-white' 
                : 'btn-outline'}`}
            >
              Completed
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline px-3"
            >
              <FilterIcon className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Filters & Sort</span>
              <span className="md:hidden">More</span>
            </button>
          </div>
        </div>
        
        {/* Advanced filters and sort */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-surface-200 dark:border-surface-700 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="pt-4 mt-4 border-t border-surface-200 dark:border-surface-700 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <label className="text-sm font-medium">Category Filter</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="input-field"
                  >
                    {allCategories.map((category, index) => (
                      <option key={index} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">Project Filter</label>
                  <select
                    value={projectFilter}
                    onChange={(e) => setProjectFilter(e.target.value)}
                    className="input-field"
                  >
                    <option value="all">All Projects</option>
                    <option value="">No Project</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>
                
                
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">Sort By</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="input-field"
                  >
                    <option value="createdAt">Date Created</option>
                    <option value="dueDate">Due Date</option>
                    <option value="title">Title</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">Sort Direction</label>
                  <button
                    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                    className="btn-outline flex items-center justify-between"
                  >
                    <span>{sortDirection === 'asc' ? 'Ascending' : 'Descending'}</span>
                    <SortIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Task List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold">
          {filter === 'all' ? 'All Tasks' : filter === 'completed' ? 'Completed Tasks' : 'Active Tasks'}
          {categoryFilter !== 'all' && ` • ${categoryFilter}`}
          {projectFilter !== 'all' && ` • ${projectFilter === '' ? 'No Project' : projects.find(p => p.id === projectFilter)?.name}`}
        </h3>
        
        {getFilteredTasks().length === 0 ? (
          <div className="card text-center py-12">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="text-6xl opacity-20 dark:opacity-10">🗒️</div>
              <h4 className="text-xl font-medium">No tasks found</h4>
              <p className="text-surface-500 dark:text-surface-400 max-w-md">
                {filter === 'all' 
                  ? "You haven't added any tasks yet. Add your first task to get started!"
                  : filter === 'completed'
                    ? "You haven't completed any tasks yet. Keep going!"
                    : "No active tasks found. Time to add some new tasks!"}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {getFilteredTasks().map(task => (
                <motion.div
                  key={task.id}
                  className={`card border-l-4 ${task.completed 
                    ? 'border-l-green-500' 
                    : isOverdue(task.dueDate)
                      ? 'border-l-red-500'
                      : `border-l-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'amber' : 'blue'}-500`
                  } transition-all group`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleComplete(task.id)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            task.completed
                              ? 'bg-green-500 text-white'
                              : 'border-2 border-surface-300 dark:border-surface-600 hover:border-green-500 dark:hover:border-green-500'
                          } transition-colors`}
                          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                        >
                          {task.completed && <CheckIcon className="w-4 h-4" />}
                        </button>
                        
                        <h4 className={`font-medium ${
                          task.completed ? 'line-through text-surface-400 dark:text-surface-500' : ''
                        }`}>
                          {task.title}
                        </h4>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${priorityConfig[task.priority].bgColor} ${priorityConfig[task.priority].color}`}>
                          {priorityConfig[task.priority].name}
                        </span>
                        
                        <span className={`text-xs px-2 py-1 rounded-full bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300`}>
                          {task.category}
                        </span>

                        {task.projectId && (
                          <span 
                            className="text-xs px-2 py-1 rounded-full flex items-center space-x-1"
                            style={{ backgroundColor: projects.find(p => p.id === task.projectId)?.color + '20' }}
                          >
                            <FolderIcon className="w-3 h-3" style={{ color: projects.find(p => p.id === task.projectId)?.color }} />
                            <span style={{ color: projects.find(p => p.id === task.projectId)?.color }}>{projects.find(p => p.id === task.projectId)?.name}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {task.description && (
                      <p className={`text-sm text-surface-600 dark:text-surface-400 ${
                        task.completed ? 'line-through opacity-70' : ''
                      }`}>
                        {task.description}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap items-center justify-between mt-1 text-xs">
                      <div className="flex items-center space-x-4">
                        <span className={`flex items-center ${
                          isOverdue(task.dueDate) && !task.completed 
                            ? 'text-red-500' 
                            : 'text-surface-500 dark:text-surface-400'
                        }`}>
                          <CalendarIcon className="w-3.5 h-3.5 mr-1" />
                          {formatDueDate(task.dueDate)}
                          {isOverdue(task.dueDate) && !task.completed && (
                            <span className="ml-1 font-medium">(Overdue)</span>
                          )}
                        </span>
                        
                        <span className="flex items-center text-surface-500 dark:text-surface-400">
                          <ClockIcon className="w-3.5 h-3.5 mr-1" />
                          {format(new Date(task.createdAt), 'MMM d')}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(task)}
                          className="p-1.5 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                          aria-label="Edit task"
                        >
                          <EditIcon className="w-4 h-4 text-blue-500" />
                        </button>
                        
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1.5 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                          aria-label="Delete task"
                        >
                          <TrashIcon className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
      
      {/* Edit Task Modal */}
      <AnimatePresence>
        {isEditing && editingTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsEditing(false)}
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
                <h3 className="text-lg font-semibold">Edit Task</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  aria-label="Close modal"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={saveEdit} className="p-4 sm:p-6 space-y-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="edit-title" className="text-sm font-medium">
                    Task Title*
                  </label>
                  <input
                    type="text"
                    id="edit-title"
                    name="title"
                    placeholder="Task title"
                    value={editingTask.title}
                    onChange={handleEditChange}
                    className="input-field"
                    required
                  />
                </div>
                
                <div className="flex flex-col space-y-1">
                  <label htmlFor="edit-description" className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="edit-description"
                    name="description"
                    placeholder="Task description"
                    value={editingTask.description}
                    onChange={handleEditChange}
                    className="input-field min-h-[100px] resize-y"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="edit-dueDate" className="text-sm font-medium flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1 text-surface-500" />
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="edit-dueDate"
                      name="dueDate"
                      value={editingTask.dueDate}
                      onChange={handleEditChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="edit-priority" className="text-sm font-medium flex items-center">
                      <FlagIcon className="w-4 h-4 mr-1 text-surface-500" />
                      Priority
                    </label>
                    <select
                      id="edit-priority"
                      name="priority"
                      value={editingTask.priority}
                      onChange={handleEditChange}
                      className="input-field"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="edit-category" className="text-sm font-medium">
                      Category
                    </label>
                    <input
                      type="text"
                      id="edit-category"
                      name="category"
                      placeholder="e.g. Work, Personal, Health"
                      value={editingTask.category}
                      onChange={handleEditChange}
                      className="input-field"
                    />

                  <div className="flex flex-col space-y-1">
                    <label htmlFor="edit-projectId" className="text-sm font-medium flex items-center">
                      <FolderIcon className="w-4 h-4 mr-1 text-surface-500" />
                      Project
                    </label>
                    <select
                      id="edit-projectId"
                      name="projectId"
                      value={editingTask.projectId || ''}
                      onChange={handleEditChange}
                      className="input-field"
                    >
                      <option value="">No Project</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 sm:justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <SaveIcon className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;