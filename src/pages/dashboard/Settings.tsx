import { useState } from 'react';
import { motion } from 'framer-motion';
import EnhancedLoadingSpinner from '../../components/EnhancedLoadingSpinner';
import { NotificationManager, notify } from '../../utils/notifications';

export default function Settings() {
  const [updating, setUpdating] = useState(false);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const toastId = notify.loading.saving();
    setUpdating(true);

    // Simulate password update since we're bypassing authentication
    setTimeout(() => {
      NotificationManager.dismiss(toastId);
      notify.success.update();
      setUpdating(false);
    }, 1000);
  };

  if (updating) {
    return (
      <div className="flex justify-center items-center h-64">
        <EnhancedLoadingSpinner type="pulse" size="md" color="text-white" message="Updating settings..." />
      </div>
    );
  }

  return (
    <div>
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Settings
      </motion.h1>
      
      <motion.div 
        className="max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.h2 
          className="text-2xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Account Settings
        </motion.h2>
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-white/70">
            This is an open website with no password protection. All settings are publicly accessible.
          </p>
          <motion.button
            onClick={handlePasswordUpdate}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="backdrop-blur-xl bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
          >
            {updating ? (
              <div className="flex items-center justify-center">
                <EnhancedLoadingSpinner type="spinner" size="sm" color="text-slate-900" />
                <span className="ml-2">Saving...</span>
              </div>
            ) : (
              'Save Settings'
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}