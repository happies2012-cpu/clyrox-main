import { useUserPreferences } from '../contexts/UserPreferencesContext';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
];

export default function LanguageSelector() {
  const { preferences, setLanguage } = useUserPreferences();

  return (
    <div className="relative group">
      <button className="p-2 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center gap-2">
        <Globe className="w-5 h-5 text-white" />
        <span className="text-white text-sm hidden md:inline">
          {languages.find(lang => lang.code === preferences.language)?.name || 'Language'}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 backdrop-blur-xl bg-slate-800/90 border border-white/20 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => setLanguage(language.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                preferences.language === language.code
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}