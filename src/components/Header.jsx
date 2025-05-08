import { motion, AnimatePresence } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function Header({ toggleSidebar, sidebarOpen, darkMode, setDarkMode }) {
  const MenuIcon = getIcon('Menu');
  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');
  const BellIcon = getIcon('Bell');
  const SearchIcon = getIcon('Search');
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-10 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm h-16 border-b border-surface-200 dark:border-surface-700 pl-6 pr-6" style={{ left: sidebarOpen ? '280px' : '80px' }}>
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center md:hidden">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
          >
            <MenuIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
          </button>
        </div>
        
        <div className="flex items-center relative w-full max-w-md">
          <SearchIcon className="w-5 h-5 absolute left-3 text-surface-500" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 input-field py-2"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? 'dark' : 'light'}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? <SunIcon className="text-yellow-500 w-5 h-5" /> : <MoonIcon className="text-primary w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;