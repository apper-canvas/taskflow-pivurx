import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import getIcon from '../utils/iconUtils';
import ProjectList from '../components/ProjectList';

const Projects = () => {
  const navigate = useNavigate();
  
  // Getting icons
  const Logo = getIcon('ListTodo');
  const HomeIcon = getIcon('Home');
  const FolderIcon = getIcon('Folder');
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-surface-900/80 border-b border-surface-200 dark:border-surface-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Logo className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TaskFlow
              </span>
            </div>
            
            {/* Desktop nav */}
            <nav className="hidden md:flex space-x-1">
              <a 
                href="/" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                className="px-3 py-2 rounded-lg text-surface-600 hover:text-surface-900 dark:text-surface-300 dark:hover:text-white transition-colors"
              >
                My Tasks
              </a>
              <a 
                href="/projects" 
                className="px-3 py-2 rounded-lg font-medium bg-surface-100 text-surface-900 dark:bg-surface-800 dark:text-white"
              >
                Projects
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            className="flex flex-col gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Projects</h1>
              <button 
                onClick={() => navigate('/')}
                className="btn-outline"
              >
                <HomeIcon className="w-4 h-4 mr-2" />
                Back to Tasks
              </button>
            </div>
            
            <ProjectList />
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-surface-200 dark:border-surface-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center">
              <Logo className="h-6 w-6 text-primary" />
              <span className="ml-2 font-semibold text-surface-800 dark:text-surface-100">
                TaskFlow
              </span>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-surface-500">
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Projects;