import { useState } from 'react';
import SettingsCard from './SettingsCard';
import getIcon from '../../utils/iconUtils';
import { toast } from 'react-toastify';

function ProfileSettings() {
  const UserIcon = getIcon('User');
  const MapPinIcon = getIcon('MapPin');
  const UploadIcon = getIcon('Upload');
  
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    jobTitle: 'Senior Product Manager',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Product manager with 5+ years of experience in SaaS and mobile applications.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this file to your server
      toast.success('Profile picture updated!');
    }
  };

  return (
    <>
      <SettingsCard 
        title="Personal Information" 
        description="Update your personal details and public profile"
        icon={UserIcon}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold overflow-hidden">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <label htmlFor="profile-picture" className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-surface-700 rounded-full shadow-md cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-600 transition-colors">
                <UploadIcon className="w-4 h-4 text-primary" />
                <input 
                  type="file" 
                  id="profile-picture" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleProfilePictureUpload} 
                />
              </label>
            </div>
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={profile.name} 
                  onChange={handleChange} 
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Job Title</label>
                <input 
                  type="text" 
                  name="jobTitle" 
                  value={profile.jobTitle} 
                  onChange={handleChange} 
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Location" description="Set your location information" icon={MapPinIcon}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Location</label>
            <input 
              type="text" 
              name="location" 
              value={profile.location} 
              onChange={handleChange} 
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">Timezone</label>
            <select className="input-field">
              <option>(GMT-08:00) Pacific Time</option>
              <option>(GMT-07:00) Mountain Time</option>
              <option>(GMT-06:00) Central Time</option>
              <option>(GMT-05:00) Eastern Time</option>
              <option>(GMT+00:00) UTC</option>
            </select>
          </div>
        </div>
      </SettingsCard>
    </>
  );
}

export default ProfileSettings;