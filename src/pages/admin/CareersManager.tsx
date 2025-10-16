import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Career } from '../../lib/supabase';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function CareersManager() {
  const [careers, setCareers] = useState<Career[]>([]);

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    const { data } = await supabase.from('careers').select('*').order('created_at', { ascending: false });
    if (data) setCareers(data);
  };

  const handleDelete = async (id: string) => {
    // Automatically confirm deletion instead of prompting user
    const { error } = await supabase.from('careers').delete().eq('id', id);
    if (error) {
      toast.error('Error deleting job posting: ' + error.message);
    } else {
      toast.success('Job posting deleted successfully');
      loadCareers();
    }
  };

  return (
    <div>
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Manage Careers
        </motion.h1>
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/admin/careers/new"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Job
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <table className="w-full text-left text-white/80">
          <thead className="bg-white/10">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.map((job, index) => (
              <motion.tr 
                key={job.id} 
                className="border-b border-white/10 last:border-b-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                <td className="p-4">{job.title}</td>
                <td className="p-4">{job.location}</td>
                <td className="p-4">
                  <motion.span
                    className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs ${
                      job.is_active
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-500/20 text-slate-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {job.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {job.is_active ? 'Active' : 'Inactive'}
                  </motion.span>
                </td>
                <td className="p-4 flex gap-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link to={`/admin/careers/edit/${job.id}`}>
                      <button className="p-2 bg-white/10 hover:bg-white/20 rounded-md">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-md"
                    >
                      <Trash2 className="w-4 h-4 text-red-300" />
                    </button>
                  </motion.div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}