import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import EnhancedLoadingSpinner from '../../components/EnhancedLoadingSpinner';
import { FormValidator, ValidationError, getErrorMessage, hasError } from '../../utils/formValidation';
import { NotificationManager, notify } from '../../utils/notifications';

export default function Settings() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateForm = () => {
    const validator = FormValidator.create()
      .required(password, 'Password', 'Password is required')
      .minLength(password, 'Password', 6)
      .required(confirmPassword, 'Confirm Password', 'Please confirm your password');

    if (password && confirmPassword && password !== confirmPassword) {
      validator.custom('', 'Confirm Password', () => false, "Passwords do not match");
    }

    const result = validator.validate();
    setErrors(result.errors);
    return result.isValid;
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      notify.error.validation('Please fix the errors in the form');
      return;
    }

    const toastId = notify.loading.saving();
    setUpdating(true);

    const { error } = await supabase.auth.updateUser({ password });

    NotificationManager.dismiss(toastId);

    if (error) {
      console.error('Error updating password:', error);
      notify.error.update();
    } else {
      notify.success.update();
      setPassword('');
      setConfirmPassword('');
      setErrors([]);
    }
    setUpdating(false);
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  if (updating) {
    return (
      <div className="flex justify-center items-center h-64">
        <EnhancedLoadingSpinner type="pulse" size="md" color="text-white" message="Updating password..." />
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
          Change Password
        </motion.h2>
        <motion.form 
          onSubmit={handlePasswordUpdate} 
          className="space-y-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div>
            <label htmlFor="password" className="block text-white mb-2 font-semibold">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleChange(setPassword)}
              required
              minLength={6}
              className={`w-full backdrop-blur-xl bg-white/10 border ${
                hasError(errors, 'Password') ? 'border-red-500' : 'border-white/20'
              } text-white placeholder-white/50 px-6 py-3 rounded-xl focus:outline-none focus:border-white/40`}
              placeholder="New password (min. 6 characters)"
            />
            {hasError(errors, 'Password') && (
              <p className="text-red-400 text-sm mt-1">{getErrorMessage(errors, 'Password')}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-white mb-2 font-semibold">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange(setConfirmPassword)}
              required
              className={`w-full backdrop-blur-xl bg-white/10 border ${
                hasError(errors, 'Confirm Password') ? 'border-red-500' : 'border-white/20'
              } text-white placeholder-white/50 px-6 py-3 rounded-xl focus:outline-none focus:border-white/40`}
              placeholder="Confirm new password"
            />
            {hasError(errors, 'Confirm Password') && (
              <p className="text-red-400 text-sm mt-1">{getErrorMessage(errors, 'Confirm Password')}</p>
            )}
          </div>
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
              'Update Password'
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}