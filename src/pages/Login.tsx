import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  // Redirect immediately since authentication is bypassed
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  }, [user, isAdmin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-white text-2xl">Redirecting...</div>
    </div>
  );
}
