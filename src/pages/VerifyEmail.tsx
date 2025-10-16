import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function VerifyEmail() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already "authenticated"
    if (isAdmin) {
      navigate('/dashboard');
    }
    
    // Simulate email verification process
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isAdmin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md p-8"
      >
        <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">✓</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Verify Your Email</h1>
        <p className="text-white/70 mb-6">
          We've sent a verification email to your inbox. Please check your email and click the verification link to complete your registration.
        </p>
        <p className="text-white/50 text-sm">
          Redirecting to dashboard in 3 seconds...
        </p>
      </motion.div>
    </div>
  );
}