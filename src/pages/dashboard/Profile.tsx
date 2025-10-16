import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import EnhancedLoadingSpinner from '../../components/EnhancedLoadingSpinner';
import { FormValidator, ValidationError, getErrorMessage, hasError } from '../../utils/formValidation';
import { NotificationManager, notify } from '../../utils/notifications';

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [fullName, setFullName] = useState('');
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const getProfile = useCallback(() => {
    setLoading(true);
    if (user?.user_metadata) {
      setFullName(user.user_metadata.full_name || '');
      setWebsite(user.user_metadata.website || '');
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user, getProfile]);

  const validateForm = () => {
    const validator = FormValidator.create()
      .maxLength(fullName, 'Full Name', 100);

    if (website) {
      validator.pattern(website, 'Website', /^https?:\/\/.+/i, 'Please enter a valid URL starting with http:// or https://');
    }

    const result = validator.validate();
    setErrors(result.errors);
    return result.isValid;
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      notify.error.validation('Please fix the errors in the form');
      return;
    }
    
    const toastId = notify.loading.saving();
    setUpdating(true);

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, website: website },
    });

    NotificationManager.dismiss(toastId);

    if (error) {
      console.error('Error updating profile:', error);
      notify.error.save();
    } else {
      notify.success.save();
    }
    setUpdating(false);
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <EnhancedLoadingSpinner type="bars" size="md" color="text-white" message="Loading profile..." />
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
        Profile
      </motion.h1>
      <motion.p 
        className="text-white/70 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Update your user profile here.
      </motion.p>

      <motion.form 
        onSubmit={updateProfile} 
        className="max-w-lg space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div>
          <label htmlFor="email" className="block text-white mb-2 font-semibold">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={user?.email || ''}
            disabled
            className="w-full backdrop-blur-xl bg-white/5 border border-white/20 text-white/50 px-6 py-3 rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="fullName" className="block text-white mb-2 font-semibold">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={handleChange(setFullName)}
            className={`w-full backdrop-blur-xl bg-white/10 border ${
              hasError(errors, 'Full Name') ? 'border-red-500' : 'border-white/20'
            } text-white placeholder-white/50 px-6 py-3 rounded-xl focus:outline-none focus:border-white/40`}
            placeholder="Your full name"
          />
          {hasError(errors, 'Full Name') && (
            <p className="text-red-400 text-sm mt-1">{getErrorMessage(errors, 'Full Name')}</p>
          )}
        </div>
        <div>
          <label htmlFor="website" className="block text-white mb-2 font-semibold">
            Website
          </label>
          <input
            id="website"
            type="url"
            value={website}
            onChange={handleChange(setWebsite)}
            className={`w-full backdrop-blur-xl bg-white/10 border ${
              hasError(errors, 'Website') ? 'border-red-500' : 'border-white/20'
            } text-white placeholder-white/50 px-6 py-3 rounded-xl focus:outline-none focus:border-white/40`}
            placeholder="https://your-website.com"
          />
          {hasError(errors, 'Website') && (
            <p className="text-red-400 text-sm mt-1">{getErrorMessage(errors, 'Website')}</p>
          )}
        </div>

        <div>
          <motion.button
            type="submit"
            disabled={updating}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="backdrop-blur-xl bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
          >
            {updating ? (
              <div className="flex items-center justify-center">
                <EnhancedLoadingSpinner type="spinner" size="sm" color="text-slate-900" />
                <span className="ml-2">Saving...</span>
              </div>
            ) : (
              'Update Profile'
            )}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}