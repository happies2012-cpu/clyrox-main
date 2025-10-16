import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutGrid, Briefcase, FileText, Users, LogOut, MessageSquare, Star, Mail, UserCog } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const sidebarNavItems = [
  { href: '/admin/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { href: '/admin/services', icon: Briefcase, label: 'Services' },
  { href: '/admin/blog', icon: FileText, label: 'Blog' },
  { href: '/admin/careers', icon: Users, label: 'Careers' },
  { href: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { href: '/admin/submissions', icon: MessageSquare, label: 'Submissions' },
  { href: '/admin/newsletter', icon: Mail, label: 'Newsletter' },
  { href: '/admin/users', icon: UserCog, label: 'User Management' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();

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
                <h2 className="text-xl font-bold text-white">Admin Panel</h2>
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