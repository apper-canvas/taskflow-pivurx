import getIcon from '../../utils/iconUtils';

function SettingsNav({ activeTab, setActiveTab }) {
  const UserIcon = getIcon('User');
  const ShieldIcon = getIcon('Shield');
  const PaletteIcon = getIcon('Palette');
  const BellIcon = getIcon('Bell');
  const LinkIcon = getIcon('Link');
  
  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'account', label: 'Account', icon: ShieldIcon },
    { id: 'appearance', label: 'Appearance', icon: PaletteIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'integrations', label: 'Integrations', icon: LinkIcon }
  ];

  return (
    <nav className="settings-nav">
      <h3 className="text-lg font-medium mb-4 text-surface-800 dark:text-surface-200">
        Settings
      </h3>
      <ul className="space-y-1">
        {settingsTabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary font-medium'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 hover:text-primary'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-700">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={() => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
              // In a real application, this would trigger an API call to delete the account
              alert('Account deletion would be processed here in a real application.');
            }
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Delete Account</span>
        </button>
      </div>
    </nav>
  );
}

export default SettingsNav;