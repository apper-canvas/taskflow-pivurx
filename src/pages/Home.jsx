import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const navigate = useNavigate();
  
  // Getting icons
  const CheckIcon = getIcon('CheckCircle2');
  const RocketIcon = getIcon('Rocket');
  const PencilIcon = getIcon('PenLine');
  const MenuIcon = getIcon('Menu');
  const XIcon = getIcon('X');
  const Logo = getIcon('ListTodo');
  
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  // Close mobile nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNavOpen && !event.target.closest('nav') && !event.target.closest('button')) {
        setIsNavOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNavOpen]);
  
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
                href="#features" 
                className="px-3 py-2 rounded-lg text-surface-600 hover:text-surface-900 dark:text-surface-300 dark:hover:text-white transition-colors"
              >
                Features
              </a>
              <a 
                href="#main" 
                className="px-3 py-2 rounded-lg font-medium bg-surface-100 text-surface-900 dark:bg-surface-800 dark:text-white"
              >
                My Tasks
              </a>
            </nav>
            
            {/* Mobile nav toggle */}
            <button 
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="md:hidden p-2 rounded-lg text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-300 dark:hover:text-white dark:hover:bg-surface-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isNavOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile nav menu */}
      {isNavOpen && (
        <motion.div 
          className="fixed inset-0 z-30 md:hidden pt-16 bg-white/95 dark:bg-surface-900/95 backdrop-blur-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="flex flex-col p-4 space-y-3">
            <a 
              onClick={() => {
                setIsNavOpen(false);
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-3 rounded-xl text-center text-surface-600 hover:text-surface-900 hover:bg-surface-100 dark:text-surface-300 dark:hover:text-white dark:hover:bg-surface-800 transition-colors"
            >
              Features
            </a>
            <a 
              onClick={() => {
                setIsNavOpen(false);
                document.getElementById('main').scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-3 rounded-xl text-center font-medium bg-surface-100 text-surface-900 dark:bg-surface-800 dark:text-white"
            >
              My Tasks
            </a>
          </nav>
        </motion.div>
      )}
      
      {/* Hero */}
      <section className="py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Organize your tasks with ease
            </h1>
            <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto mb-8">
              Boost your productivity with our beautifully designed task manager. 
              Create, organize, and complete tasks with intuitive workflows.
            </p>
            <a 
              href="#main"
              className="btn-primary text-base"
            >
              <RocketIcon className="w-5 h-5 mr-2" />
              Start Managing Tasks
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Features */}
      <section id="features" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-surface-100 dark:bg-surface-800">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Features that make task management a breeze
            </motion.h2>
            <motion.p 
              className="text-surface-600 dark:text-surface-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Simple yet powerful tools to keep you organized and productive
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="neu-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                  <PencilIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Create & Organize</h3>
                <p className="text-surface-600 dark:text-surface-300">
                  Quickly add tasks with titles, descriptions, due dates, and priority levels.
                </p>
              </div>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="neu-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center mb-4">
                  <CheckIcon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-surface-600 dark:text-surface-300">
                  Mark tasks as complete and visualize your daily achievements.
                </p>
              </div>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="neu-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center mb-4">
                  <RocketIcon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Stay Productive</h3>
                <p className="text-surface-600 dark:text-surface-300">
                  Filter tasks by priority or category to focus on what matters most.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Main Feature */}
      <section id="main" className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <MainFeature />
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

export default Home;