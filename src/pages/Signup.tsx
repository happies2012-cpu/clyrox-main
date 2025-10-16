import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // Redirect immediately since authentication is bypassed
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  }, [isAdmin]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-white text-2xl">Redirecting...</div>
    </div>
  );
}
