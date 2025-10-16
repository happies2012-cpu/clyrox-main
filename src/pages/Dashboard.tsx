import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutGrid, BarChart2, User, Settings, LogOut, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const sidebarNavItems = [
  { href: '/dashboard/projects', icon: LayoutGrid, label: 'Projects' },
  { href: '/dashboard/analytics', icon: BarChart2, label: 'Analytics' },
  { href: '/dashboard/profile', icon: User, label: 'Profile' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 flex-shrink-0">
            <div className="p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl sticky top-24">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white">Dashboard</h2>
                <p className="text-sm text-white/60 truncate">{user?.email}</p>
              </div>
              <nav className="flex flex-col gap-2">
                {sidebarNavItems.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
                {isAdmin && (
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <Shield className="w-5 h-5" />
                    <span>Admin Panel</span>
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>
          <main className="flex-grow">
            <div className="p-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl min-h-[60vh]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}