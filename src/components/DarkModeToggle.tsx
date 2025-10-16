import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useUserPreferences } from '../contexts/UserPreferencesContext';

export default function DarkModeToggle() {
  const { preferences, toggleDarkMode } = useUserPreferences();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
      aria-label={preferences.darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {preferences.darkMode ? (
        <Sun className="w-5 h-5 text-white" />
      ) : (
        <Moon className="w-5 h-5 text-white" />
      )}
    </button>
  );
}