import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../components/GlassCard';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@clyrox.com',
    role: 'Administrator',
    joined: new Date().toLocaleDateString(),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  return (
    <div>
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Profile
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <GlassCard className="p-6">
          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="block text-white mb-2 font-semibold">Name</label>
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-semibold">Email</label>
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSave}
                  className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedProfile(profile);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-primary-light font-bold">
                    {profile.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                  <p className="text-white/70">{profile.role}</p>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/50 text-sm">Email</p>
                    <p className="text-white">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Joined</p>
                    <p className="text-white">{profile.joined}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setIsEditing(true)}
                className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Edit Profile
              </button>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}