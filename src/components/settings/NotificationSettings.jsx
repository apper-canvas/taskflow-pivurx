import { useState } from 'react';
import SettingsCard from './SettingsCard';
import getIcon from '../../utils/iconUtils';

function NotificationSettings() {
  const BellIcon = getIcon('Bell');
  const ClockIcon = getIcon('Clock');
  const DevicesIcon = getIcon('Smartphone');
  
  const [notifications, setNotifications] = useState({
    tasks: true,
    comments: true,
    mentions: true,
    projectUpdates: false,
    teamAnnouncements: true,
    deadlineReminders: true
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <>
      <SettingsCard title="Notification Preferences" description="Control what notifications you receive" icon={BellIcon}>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-surface-800 dark:text-surface-200">Task assignments and updates</span>
            <div className="relative inline-block w-10 align-middle select-none">
              <input 
                type="checkbox" 
                name="tasks" 
                id="tasks"
                checked={notifications.tasks}
                onChange={handleChange}
                className="sr-only"
              />
              <label 
                htmlFor="tasks"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${notifications.tasks ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'}`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white dark:bg-surface-200 shadow transform transition-transform duration-200 ease-in-out ${notifications.tasks ? 'translate-x-4' : 'translate-x-0'}`}
                ></span>
              </label>
            </div>
          </label>
          
          <label className="flex items-center justify-between">
            <span className="text-surface-800 dark:text-surface-200">Comments on your tasks</span>
            <div className="relative inline-block w-10 align-middle select-none">
              <input 
                type="checkbox" 
                name="comments" 
                id="comments"
                checked={notifications.comments}
                onChange={handleChange}
                className="sr-only"
              />
              <label 
                htmlFor="comments"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${notifications.comments ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'}`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white dark:bg-surface-200 shadow transform transition-transform duration-200 ease-in-out ${notifications.comments ? 'translate-x-4' : 'translate-x-0'}`}
                ></span>
              </label>
            </div>
          </label>
          
          <label className="flex items-center justify-between">
            <span className="text-surface-800 dark:text-surface-200">When you're mentioned</span>
            <div className="relative inline-block w-10 align-middle select-none">
              <input 
                type="checkbox" 
                name="mentions" 
                id="mentions"
                checked={notifications.mentions}
                onChange={handleChange}
                className="sr-only"
              />
              <label 
                htmlFor="mentions"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${notifications.mentions ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'}`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white dark:bg-surface-200 shadow transform transition-transform duration-200 ease-in-out ${notifications.mentions ? 'translate-x-4' : 'translate-x-0'}`}
                ></span>
              </label>
            </div>
          </label>
          
          <label className="flex items-center justify-between">
            <span className="text-surface-800 dark:text-surface-200">Project updates</span>
            <div className="relative inline-block w-10 align-middle select-none">
              <input 
                type="checkbox" 
                name="projectUpdates" 
                id="projectUpdates"
                checked={notifications.projectUpdates}
                onChange={handleChange}
                className="sr-only"
              />
              <label 
                htmlFor="projectUpdates"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${notifications.projectUpdates ? 'bg-primary' : 'bg-surface-300 dark:bg-surface-600'}`}
              >
                <span 
                  className={`block h-6 w-6 rounded-full bg-white dark:bg-surface-200 shadow transform transition-transform duration-200 ease-in-out ${notifications.projectUpdates ? 'translate-x-4' : 'translate-x-0'}`}
                ></span>
              </label>
            </div>
          </label>
        </div>
      </SettingsCard>

      <SettingsCard title="Notification Delivery" description="Choose where to receive notifications" icon={DevicesIcon}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Push Notifications</label>
              <select className="input-field">
                <option>All notifications</option>
                <option>Important only</option>
                <option>None</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Desktop Notifications</label>
              <select className="input-field">
                <option>All notifications</option>
                <option>Important only</option>
                <option>None</option>
              </select>
            </div>
          </div>
        </div>
      </SettingsCard>
    </>
  );
}

export default NotificationSettings;