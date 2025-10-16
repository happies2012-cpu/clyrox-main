import { useEffect, useState } from 'react';
import { User, Shield, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';
import AnimatedSection from '../../components/AnimatedSection';
import GlassCard from '../../components/GlassCard';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';

interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  role: string;
  is_admin: boolean;
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Get all users from auth (this requires admin privileges)
      const { data, error } = await supabase.auth.admin.listUsers();
      
      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      // Transform user data to our format
      const userData = data.users.map(user => ({
        id: user.id,
        email: user.email || '',
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at || null,
        role: user.app_metadata?.role || 'user',
        is_admin: user.app_metadata?.role === 'admin' || user.email === 'happies2011@gmail.com'
      }));

      setUsers(userData);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const newRole = currentStatus ? 'user' : 'admin';
      
      // Update user role
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        app_metadata: { role: newRole }
      });

      if (error) {
        console.error('Error updating user role:', error);
        return;
      }

      // Update local state
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, role: newRole, is_admin: newRole === 'admin' } 
          : user
      ));
    } catch (error) {
      console.error('Error toggling admin status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedSection>
        <motion.h1 
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          User Management
        </motion.h1>
        <motion.p 
          className="text-white/70 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Manage user accounts and permissions
        </motion.p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GlassCard className="p-6">
            <div className="flex justify-between items-center mb-6">
              <motion.h2 
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                All Users
              </motion.h2>
              <motion.button 
                onClick={loadUsers}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              >
                Refresh
              </motion.button>
            </div>

            {loading ? (
              <motion.div 
                className="flex justify-center items-center h-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-white">Loading users...</div>
              </motion.div>
            ) : (
              <motion.div 
                className="overflow-x-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 text-white/70 font-semibold">User</th>
                      <th className="text-left py-3 text-white/70 font-semibold">Role</th>
                      <th className="text-left py-3 text-white/70 font-semibold">Joined</th>
                      <th className="text-left py-3 text-white/70 font-semibold">Last Login</th>
                      <th className="text-left py-3 text-white/70 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <motion.tr 
                        key={user.id} 
                        className="border-b border-white/10 hover:bg-white/5"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <motion.div 
                              className="backdrop-blur-xl bg-white/10 w-10 h-10 rounded-full flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <User className="w-5 h-5 text-white" />
                            </motion.div>
                            <div>
                              <motion.p 
                                className="font-semibold text-white"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                              >
                                {user.email}
                              </motion.p>
                              <motion.div 
                                className="flex items-center gap-1 text-xs text-white/60"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                <Mail className="w-3 h-3" />
                                <span>{user.email}</span>
                              </motion.div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <motion.div 
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {user.is_admin ? (
                              <>
                                <Shield className="w-4 h-4 text-yellow-400" />
                                <span className="text-yellow-400 font-semibold">Admin</span>
                              </>
                            ) : (
                              <>
                                <User className="w-4 h-4 text-white/60" />
                                <span className="text-white/60">User</span>
                              </>
                            )}
                          </motion.div>
                        </td>
                        <td className="py-4 text-white/70">
                          <motion.div 
                            className="flex items-center gap-1"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(user.created_at)}</span>
                          </motion.div>
                        </td>
                        <td className="py-4 text-white/70">
                          {user.last_sign_in_at ? (
                            <motion.div 
                              className="flex items-center gap-1"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(user.last_sign_in_at)}</span>
                            </motion.div>
                          ) : (
                            <motion.span 
                              className="text-white/50"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              Never
                            </motion.span>
                          )}
                        </td>
                        <td className="py-4">
                          <motion.button
                            onClick={() => toggleAdminStatus(user.id, user.is_admin)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
                              user.is_admin
                                ? 'backdrop-blur-xl bg-red-500/20 hover:bg-red-500/30 text-red-300'
                                : 'backdrop-blur-xl bg-green-500/20 hover:bg-green-500/30 text-green-300'
                            }`}
                          >
                            {user.is_admin ? (
                              <>
                                <XCircle className="w-4 h-4" />
                                Revoke Admin
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                Make Admin
                              </>
                            )}
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <GlassCard className="p-6">
            <motion.h2 
              className="text-2xl font-bold text-white mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Special Access
            </motion.h2>
            <motion.div 
              className="bg-white/5 p-4 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.p 
                className="text-white/70 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                The following email has permanent admin access:
              </motion.p>
              <motion.div 
                className="flex items-center gap-2 p-3 bg-white/10 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Mail className="w-5 h-5 text-white/70" />
                <span className="text-white font-mono">happies2011@gmail.com</span>
                <Shield className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 text-sm">Permanent Admin</span>
              </motion.div>
              <motion.p 
                className="text-white/60 text-sm mt-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                This user will always have admin access regardless of role settings.
              </motion.p>
            </motion.div>
          </GlassCard>
        </motion.div>
      </AnimatedSection>
    </motion.div>
  );
}