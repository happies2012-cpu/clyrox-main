import { NavLink, Outlet } from 'react-router-dom';
import { LayoutGrid, BarChart2, User, Settings, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const sidebarNavItems = [
  { href: '/dashboard/projects', icon: LayoutGrid, label: 'Projects' },
  { href: '/dashboard/analytics', icon: BarChart2, label: 'Analytics' },
  { href: '/dashboard/profile', icon: User, label: 'Profile' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function Dashboard() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 flex-shrink-0">
            <div className="p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl sticky top-24">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-white">Dashboard</h2>
                <p className="text-sm text-white/60 truncate">{user?.email || 'User'}</p>
                {isAdmin && (
                  <div className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    <Shield className="w-3 h-3" />
                    Admin
                  </div>
                )}
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
                    {item.label}
                  </NavLink>
                ))}
                {isAdmin && (
                  <NavLink
                    to="/admin/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Shield className="w-5 h-5" />
                    Admin Panel
                  </NavLink>
                )}
              </nav>
            </div>
          </aside>
          <main className="flex-grow">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}