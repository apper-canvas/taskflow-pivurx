import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ children, darkMode, setDarkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="app-container bg-surface-50 dark:bg-surface-900">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="relative flex flex-col flex-1 overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
          sidebarOpen={sidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        
        <main className="main-content">
          {children}
        </main>
      </div>
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
        toastClassName={() => "relative flex p-2 min-h-10 rounded-2xl justify-between overflow-hidden cursor-pointer mt-2 mb-2 backdrop-blur-sm " + (darkMode ? "bg-surface-800/95 text-surface-100" : "bg-white/95 text-surface-800")}
        bodyClassName={() => "text-sm font-medium block p-2"}
      />
    </div>
  );
}

export default Layout;