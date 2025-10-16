import { useUserPreferences } from '../contexts/UserPreferencesContext';
import DarkModeToggle from './DarkModeToggle';
import LanguageSelector from './LanguageSelector';
import AnimationsToggle from './AnimationsToggle';
import { X } from 'lucide-react';

interface UserPreferencesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserPreferencesPanel({ isOpen, onClose }: UserPreferencesPanelProps) {
  const { preferences } = useUserPreferences();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md backdrop-blur-xl bg-slate-900 border border-white/20 rounded-2xl shadow-2xl z-10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Preferences</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-all"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Dark Mode</h3>
              <p className="text-white/60 text-sm">Toggle between light and dark themes</p>
            </div>
            <DarkModeToggle />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Language</h3>
              <p className="text-white/60 text-sm">Select your preferred language</p>
            </div>
            <LanguageSelector />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Animations</h3>
              <p className="text-white/60 text-sm">Enable or disable UI animations</p>
            </div>
            <AnimationsToggle />
          </div>

          <div className="pt-4 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">Current Settings</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="text-white/60">Theme</p>
                <p className="text-white font-medium">{preferences.darkMode ? 'Dark' : 'Light'}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="text-white/60">Language</p>
                <p className="text-white font-medium">{preferences.language.toUpperCase()}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <p className="text-white/60">Animations</p>
                <p className="text-white font-medium">{preferences.animations ? 'On' : 'Off'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}