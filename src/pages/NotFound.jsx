import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  
  // Get icons
  const HomeIcon = getIcon('Home');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const AlertIcon = getIcon('AlertTriangle');
  
  // Auto-redirect after countdown
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/');
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div 
        className="max-w-md w-full text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertIcon className="w-12 h-12 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Link to="/" className="btn-primary w-full sm:w-auto">
            <HomeIcon className="w-5 h-5 mr-2" />
            Go to Home
          </Link>
          
          <button 
            onClick={() => navigate(-1)} 
            className="btn-outline w-full sm:w-auto"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
        
        <div className="text-sm text-surface-500 dark:text-surface-400">
          Redirecting to home in <span className="font-medium">{countdown}</span> seconds...
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;