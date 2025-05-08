import { useState } from 'react';
import SettingsCard from './SettingsCard';
import getIcon from '../../utils/iconUtils';

function AppearanceSettings() {
  const PaletteIcon = getIcon('Palette');
  const LayoutIcon = getIcon('Layout');
  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');
  const MonitorIcon = getIcon('Monitor');
  
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState('medium');
  const [menuStyle, setMenuStyle] = useState('expanded');

  return (
    <>
      <SettingsCard title="Theme" description="Choose your preferred color theme" icon={PaletteIcon}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Color Mode</label>
            <div className="grid grid-cols-3 gap-4">
              <button 
                className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                  theme === 'light' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                }`}
                onClick={() => setTheme('light')}
              >
                <SunIcon className="w-6 h-6 mb-2" />
                <span className="text-sm">Light</span>
              </button>
              
              <button 
                className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                  theme === 'dark' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                }`}
                onClick={() => setTheme('dark')}
              >
                <MoonIcon className="w-6 h-6 mb-2" />
                <span className="text-sm">Dark</span>
              </button>
              
              <button 
                className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                  theme === 'system' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                }`}
                onClick={() => setTheme('system')}
              >
                <MonitorIcon className="w-6 h-6 mb-2" />
                <span className="text-sm">System</span>
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Font Size</label>
            <select 
              className="input-field"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium (Default)</option>
              <option value="large">Large</option>
              <option value="x-large">Extra Large</option>
            </select>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Layout" description="Customize your workspace layout" icon={LayoutIcon}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Menu Style</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                className={`flex items-center justify-center p-4 rounded-xl border transition-all ${
                  menuStyle === 'expanded' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                }`}
                onClick={() => setMenuStyle('expanded')}
              >
                <span className="text-sm">Expanded</span>
              </button>
              
              <button 
                className={`flex items-center justify-center p-4 rounded-xl border transition-all ${
                  menuStyle === 'compact' 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                }`}
                onClick={() => setMenuStyle('compact')}
              >
                <span className="text-sm">Compact</span>
              </button>
            </div>
          </div>
        </div>
      </SettingsCard>
    </>
  );
}

export default AppearanceSettings;