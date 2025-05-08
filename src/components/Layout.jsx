import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ children, darkMode, setDarkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-surface-50 dark:bg-surface-900">
      {/* Sidebar - fixed position */}
      <div 
        className="fixed top-0 left-0 h-full z-20 transition-all duration-300"
        style={{ width: sidebarOpen ? '280px' : '80px' }}
      >
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      
      {/* Main content - adjusted margin */}
      <div 
        className="flex flex-col flex-1 overflow-hidden transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? '280px' : '80px' }}
      >
        <Header 
          toggleSidebar={toggleSidebar} 
          sidebarOpen={sidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main className="flex-1 overflow-y-auto p-6 pt-20">
          {children}
        </main>
      </div>
      
      {/* Toast container */}
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