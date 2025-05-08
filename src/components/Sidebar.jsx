import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function Sidebar({ isOpen, toggleSidebar }) {
  const HomeIcon = getIcon('Home');
  const FolderIcon = getIcon('Folder');
  const CalendarIcon = getIcon('Calendar');
  const BarChartIcon = getIcon('BarChart');
  const UsersIcon = getIcon('Users');
  const SettingsIcon = getIcon('Settings');
  const MenuIcon = getIcon('Menu');
  const ChevronLeftIcon = getIcon('ChevronLeft');

  const sidebarVariants = {
    open: { width: 280, transition: { duration: 0.3 } },
    closed: { width: 80, transition: { duration: 0.3 } }
  };

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Dashboard' },
    { path: '/projects', icon: FolderIcon, label: 'Projects' },
    { path: '/calendar', icon: CalendarIcon, label: 'Calendar' },
    { path: '/analytics', icon: BarChartIcon, label: 'Analytics' },
    { path: '/team', icon: UsersIcon, label: 'Team' },
    { path: '/settings', icon: SettingsIcon, label: 'Settings' }
  ];
  
  return (
    <motion.aside
      className="h-screen bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 z-20"
      variants={sidebarVariants}
      animate={isOpen ? 'open' : 'closed'}
      initial="open"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-surface-200 dark:border-surface-700">
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-semibold text-xl text-primary"
              >
                TaskFlow
              </motion.div>
            )}
          </AnimatePresence>
            
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? (
              <ChevronLeftIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            ) : (
              <MenuIcon className="w-5 h-5 text-surface-600 dark:text-surface-400" />
            )}
          </button>
        </div>
            
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    sidebar-link
                    ${isActive ? 'active' : ''}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <AnimatePresence mode="wait">
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.aside>
  );
}

export default Sidebar;