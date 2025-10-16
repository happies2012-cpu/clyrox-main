import { useEffect, useState } from 'react';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import AnimatedSection from '../../components/AnimatedSection';
import { motion } from 'framer-motion';

interface User {
  id: string;
  email: string;
  created_at: string;
  role: string;
  is_active: boolean;
}

export default function UserManagement() {
  const [users] = useState<User[]>([
    {
      id: '1',
      email: 'admin@clyrox.com',
      created_at: new Date().toISOString(),
      role: 'admin',
      is_active: true
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        User Management
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all"
        />
      </motion.div>

      {filteredUsers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center">
            <p className="text-xl text-white/70">No users found.</p>
          </GlassCard>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-lg p-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-semibold text-white/80">
              <div>User</div>
              <div>Email</div>
              <div>Role</div>
              <div>Joined</div>
            </div>
          </motion.div>
          {filteredUsers.map((user, index) => (
            <AnimatedSection key={user.id} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/5 border border-white/10 rounded-lg p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <User className="w-4 h-4 text-primary-light" />
                    </div>
                    <span className="text-white font-medium">User</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-white/50" />
                    <span className="text-white">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-white/50" />
                    <span className="text-white/70 capitalize">{user.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white/50" />
                    <span className="text-white/70">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}
