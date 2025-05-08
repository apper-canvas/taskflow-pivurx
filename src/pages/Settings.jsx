import { useState } from 'react';
import { motion } from 'framer-motion';
import SettingsNav from '../components/settings/SettingsNav';
import ProfileSettings from '../components/settings/ProfileSettings';
import AccountSettings from '../components/settings/AccountSettings';
import AppearanceSettings from '../components/settings/AppearanceSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import IntegrationSettings from '../components/settings/IntegrationSettings';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const SaveIcon = getIcon('Save');

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const renderActiveSettings = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'account':
        return <AccountSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'integrations':
        return <IntegrationSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-surface-800 dark:text-surface-100">Settings</h1>
        <button 
          onClick={handleSaveSettings}
          className="btn-primary flex items-center gap-2"
        >
          <SaveIcon className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="card">
            <SettingsNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderActiveSettings()}
          </motion.div>
        </div>
      </div>

      <div className="mt-6 bg-surface-100 dark:bg-surface-800 rounded-xl p-4 text-sm text-surface-600 dark:text-surface-400">
        <p>TaskFlow v0.1.0 - Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </motion.div>
  );
}

export default Settings;