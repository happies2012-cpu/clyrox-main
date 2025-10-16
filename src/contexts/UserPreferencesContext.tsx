import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface UserPreferences {
  darkMode: boolean;
  language: string;
  animations: boolean;
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  toggleDarkMode: () => void;
  setLanguage: (language: string) => void;
  toggleAnimations: () => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

const defaultPreferences: UserPreferences = {
  darkMode: false,
  language: 'en',
  animations: true,
};

export const UserPreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  // Load preferences from localStorage on initial render
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);
        setPreferences({
          ...defaultPreferences,
          ...parsedPreferences,
        });
      } catch (error) {
        console.error('Error parsing user preferences:', error);
      }
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.darkMode]);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreference = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleDarkMode = () => {
    setPreferences(prev => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };

  const setLanguage = (language: string) => {
    setPreferences(prev => ({
      ...prev,
      language,
    }));
  };

  const toggleAnimations = () => {
    setPreferences(prev => ({
      ...prev,
      animations: !prev.animations,
    }));
  };

  const value = {
    preferences,
    updatePreference,
    toggleDarkMode,
    setLanguage,
    toggleAnimations,
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};