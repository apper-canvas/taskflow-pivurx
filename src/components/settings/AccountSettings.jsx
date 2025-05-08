import { useState } from 'react';
import SettingsCard from './SettingsCard';
import getIcon from '../../utils/iconUtils';
import { toast } from 'react-toastify';

function AccountSettings() {
  const KeyIcon = getIcon('Key');
  const ShieldIcon = getIcon('Shield');
  const MailIcon = getIcon('Mail');
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [emailPreferences, setEmailPreferences] = useState({
    updates: true,
    taskAssignments: true,
    projectComments: true,
    weeklyReports: false
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailPrefChange = (e) => {
    const { name, checked } = e.target;
    setEmailPreferences(prev => ({ ...prev, [name]: checked }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }
    // In a real app, you would send this to your server
    toast.success('Password updated successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <>
      <SettingsCard title="Change Password" description="Update your password to keep your account secure" icon={KeyIcon}>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Current Password</label>
            <input 
              type="password" 
              name="currentPassword" 
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="input-field"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">New Password</label>
              <input 
                type="password" 
                name="newPassword" 
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Confirm New Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="input-field"
                required
              />
            </div>
          </div>
          
          <div>
            <button type="submit" className="btn-primary">Update Password</button>
          </div>
        </form>
      </SettingsCard>

      <SettingsCard title="Email Preferences" description="Manage your email notification settings" icon={MailIcon}>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              name="updates" 
              checked={emailPreferences.updates}
              onChange={handleEmailPrefChange}
              className="w-4 h-4 text-primary focus:ring-primary rounded"
            />
            <span className="text-surface-800 dark:text-surface-200">Product updates and announcements</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              name="taskAssignments" 
              checked={emailPreferences.taskAssignments}
              onChange={handleEmailPrefChange}
              className="w-4 h-4 text-primary focus:ring-primary rounded"
            />
            <span className="text-surface-800 dark:text-surface-200">Task assignments and changes</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              name="projectComments" 
              checked={emailPreferences.projectComments}
              onChange={handleEmailPrefChange}
              className="w-4 h-4 text-primary focus:ring-primary rounded"
            />
            <span className="text-surface-800 dark:text-surface-200">Project comments and mentions</span>
          </label>
          
          <label className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              name="weeklyReports" 
              checked={emailPreferences.weeklyReports}
              onChange={handleEmailPrefChange}
              className="w-4 h-4 text-primary focus:ring-primary rounded"
            />
            <span className="text-surface-800 dark:text-surface-200">Weekly summary reports</span>
          </label>
        </div>
      </SettingsCard>

      <SettingsCard title="Security" description="Manage your account security settings" icon={ShieldIcon}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-surface-800 dark:text-surface-200 font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-surface-600 dark:text-surface-400">Add an extra layer of security to your account</p>
            </div>
            <div className="form-switch">
              <button className="btn-secondary">Enable 2FA</button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-surface-800 dark:text-surface-200 font-medium">Active Sessions</h4>
              <p className="text-sm text-surface-600 dark:text-surface-400">Manage your active login sessions</p>
            </div>
            <button className="btn-outline">Manage</button>
          </div>
        </div>
      </SettingsCard>
    </>
  );
}

export default AccountSettings;