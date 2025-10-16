import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner';

export default function Login() {
  const navigate = useNavigate();

  // Redirect immediately since authentication is bypassed
  useEffect(() => {
    // Navigate to admin dashboard by default
    navigate('/admin/dashboard');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-white text-2xl">Redirecting...</div>
    </div>
  );
}