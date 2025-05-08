import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Projects from './pages/Projects';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      return true;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');

  return (
    <div className="min-h-screen relative">
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-white/90 dark:bg-surface-800/90 shadow-card backdrop-blur-sm transition-all duration-300 hover:scale-110"
        aria-label="Toggle dark mode"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={darkMode ? 'dark' : 'light'}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {darkMode ? (
              <SunIcon className="text-yellow-500 w-5 h-5" />
            ) : (
              <MoonIcon className="text-primary w-5 h-5" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
        toastClassName={() => 
          "relative flex p-2 min-h-10 rounded-2xl justify-between overflow-hidden cursor-pointer mt-2 mb-2 backdrop-blur-sm " + 
          (darkMode 
            ? "bg-surface-800/95 text-surface-100" 
            : "bg-white/95 text-surface-800")
        }
        bodyClassName={() => "text-sm font-medium block p-2"}
      />
    </div>
  );
}

export default App;