import { useState } from 'react';
import SettingsCard from './SettingsCard';
import getIcon from '../../utils/iconUtils';
import { toast } from 'react-toastify';

function IntegrationSettings() {
  const LinkIcon = getIcon('Link');
  const GithubIcon = getIcon('Github');
  const CalendarIcon = getIcon('Calendar');
  const SlackIcon = getIcon('MessageSquare');
  
  const [integrations, setIntegrations] = useState({
    github: false,
    googleCalendar: true,
    slack: false
  });

  const toggleIntegration = (name) => {
    setIntegrations(prev => {
      const newValue = !prev[name];
      
      // Show toast based on the new state
      if (newValue) {
        toast.success(`${name.charAt(0).toUpperCase() + name.slice(1)} connected successfully!`);
      } else {
        toast.info(`${name.charAt(0).toUpperCase() + name.slice(1)} disconnected.`);
      }
      
      return { ...prev, [name]: newValue };
    });
  };

  return (
    <>
      <SettingsCard title="Connected Services" description="Manage integrations with external services" icon={LinkIcon}>
        <div className="space-y-6">
          <div className="flex items-start justify-between p-4 border border-surface-200 dark:border-surface-700 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white p-2 rounded-lg">
                <GithubIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-medium text-surface-800 dark:text-surface-200">GitHub</h4>
                <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                  Connect your GitHub repositories for automated task creation from issues.
                </p>
              </div>
            </div>
            <button 
              className={integrations.github ? "btn-primary" : "btn-outline"}
              onClick={() => toggleIntegration('github')}
            >
              {integrations.github ? 'Connected' : 'Connect'}
            </button>
          </div>
          
          <div className="flex items-start justify-between p-4 border border-surface-200 dark:border-surface-700 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500 text-white p-2 rounded-lg">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-medium text-surface-800 dark:text-surface-200">Google Calendar</h4>
                <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                  Sync your tasks and deadlines with Google Calendar.
                </p>
              </div>
            </div>
            <button 
              className={integrations.googleCalendar ? "btn-primary" : "btn-outline"}
              onClick={() => toggleIntegration('googleCalendar')}
            >
              {integrations.googleCalendar ? 'Connected' : 'Connect'}
            </button>
          </div>
          
          <div className="flex items-start justify-between p-4 border border-surface-200 dark:border-surface-700 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="bg-purple-500 text-white p-2 rounded-lg">
                <SlackIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-medium text-surface-800 dark:text-surface-200">Slack</h4>
                <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
                  Get notifications and updates directly in your Slack workspace.
                </p>
              </div>
            </div>
            <button 
              className={integrations.slack ? "btn-primary" : "btn-outline"}
              onClick={() => toggleIntegration('slack')}
            >
              {integrations.slack ? 'Connected' : 'Connect'}
            </button>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="API Access" description="Manage your API keys for third-party integrations">
        <div className="space-y-4">
          <div className="p-4 bg-surface-100 dark:bg-surface-700 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-surface-800 dark:text-surface-200">Personal API Key</h4>
              <button className="text-primary text-sm hover:underline">Generate New Key</button>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="password" 
                value="sk_test_****************************************"
                readOnly
                className="input-field"
              />
              <button 
                className="btn-outline"
                onClick={() => {
                  navigator.clipboard.writeText("sk_test_mockApiKeyWouldBeHere");
                  toast.success("API key copied to clipboard!");
                }}
              >
                Copy
              </button>
            </div>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-2">
              Last generated: 30 days ago · Expires in 330 days
            </p>
          </div>
        </div>
      </SettingsCard>
    </>
  );
}

export default IntegrationSettings;