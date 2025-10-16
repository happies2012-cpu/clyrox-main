import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Projects', href: '/dashboard/projects', icon: '📋' },
    { name: 'Analytics', href: '/dashboard/analytics', icon: '📊' },
    { name: 'Profile', href: '/dashboard/profile', icon: '👤' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ];

  const handleLogout = () => {
    // Simply navigate to home page
    navigate('/');
  };

  return (
    <div className="flex h-[calc(100vh-6rem)]">
      {/* Sidebar */}
      <motion.div
        className={`bg-slate-800/50 backdrop-blur-xl border-r border-white/10 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 flex flex-col`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && (
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className={`w-5 h-5 text-white ${sidebarOpen ? '' : 'rotate-45'}`} />
          </button>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && <span>{item.name}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/20 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-primary-light font-bold">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            {sidebarOpen && (
              <div>
                <p className="text-white font-medium text-sm">User</p>
                <p className="text-white/50 text-xs">{user?.email || 'user@example.com'}</p>
              </div>
            )}
          </div>
          
          {sidebarOpen && (
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors text-sm font-medium"
            >
              Logout
            </button>
          )}
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}