import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { Play, Pause } from 'lucide-react';

export default function AnimationsToggle() {
  const { preferences, toggleAnimations } = useUserPreferences();

  return (
    <button
      onClick={toggleAnimations}
      className="p-2 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center gap-2"
      aria-label={preferences.animations ? "Disable animations" : "Enable animations"}
    >
      {preferences.animations ? (
        <>
          <Pause className="w-5 h-5 text-white" />
          <span className="text-white text-sm hidden md:inline">Animations On</span>
        </>
      ) : (
        <>
          <Play className="w-5 h-5 text-white" />
          <span className="text-white text-sm hidden md:inline">Animations Off</span>
        </>
      )}
    </button>
  );
}