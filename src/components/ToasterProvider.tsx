import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'rgba(30, 41, 59, 0.9)',
          color: '#f1f5f9',
          border: '1px solid rgba(71, 85, 105, 0.5)',
          borderRadius: '12px',
          padding: '16px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        success: {
          style: {
            background: 'rgba(5, 150, 105, 0.9)',
            color: '#f0fdf4',
            border: '1px solid rgba(4, 120, 87, 0.7)',
            backdropFilter: 'blur(10px)',
          },
          iconTheme: {
            primary: '#f0fdf4',
            secondary: '#10b981',
          },
        },
        error: {
          style: {
            background: 'rgba(220, 38, 38, 0.9)',
            color: '#fef2f2',
            border: '1px solid rgba(185, 28, 28, 0.7)',
            backdropFilter: 'blur(10px)',
          },
          iconTheme: {
            primary: '#fef2f2',
            secondary: '#ef4444',
          },
        },
        warning: {
          style: {
            background: 'rgba(202, 138, 4, 0.9)',
            color: '#fffbeb',
            border: '1px solid rgba(161, 98, 7, 0.7)',
            backdropFilter: 'blur(10px)',
          },
          iconTheme: {
            primary: '#fffbeb',
            secondary: '#f59e0b',
          },
        },
        info: {
          style: {
            background: 'rgba(59, 130, 246, 0.9)',
            color: '#eff6ff',
            border: '1px solid rgba(37, 99, 235, 0.7)',
            backdropFilter: 'blur(10px)',
          },
          iconTheme: {
            primary: '#eff6ff',
            secondary: '#3b82f6',
          },
        },
        duration: 5000,
      }}
    />
  );
}