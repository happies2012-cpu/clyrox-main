import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, Career } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function CareerEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [career, setCareer] = useState<Partial<Career>>({
    title: '',
    department: '',
    location: '',
    employment_type: 'Full-time',
    description: '',
    requirements: [],
    responsibilities: [],
    is_active: true,
  });
  const [loading, setLoading] = useState(false);

  const loadCareer = useCallback(async () => {
    const { data } = await supabase.from('careers').select('*').eq('id', id).single();
    if (data) setCareer(data);
  }, [id]);

  useEffect(() => {
    if (id) {
      loadCareer();
    }
  }, [id, loadCareer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = id
      ? await supabase.from('careers').update(career).eq('id', id)
      : await supabase.from('careers').insert([career]);

    if (error) {
      toast.error('Error saving job posting: ' + error.message);
    } else {
      toast.success(`Job posting ${id ? 'updated' : 'created'} successfully!`);
      navigate('/admin/careers');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setCareer({
      ...career,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    });
  };
  
  const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCareer({
      ...career,
      [name]: value.split('\n').filter(item => item.trim() !== ''),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {id ? 'Edit Job Posting' : 'Add New Job Posting'}
      </motion.h1>
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label htmlFor="title" className="block text-white mb-2 font-semibold">Job Title</label>
            <input 
              type="text" 
              name="title" 
              value={career.title} 
              onChange={handleChange} 
              required 
              className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label htmlFor="department" className="block text-white mb-2 font-semibold">Department</label>
            <input 
              type="text" 
              name="department" 
              value={career.department} 
              onChange={handleChange} 
              required 
              className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
            />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label htmlFor="location" className="block text-white mb-2 font-semibold">Location</label>
            <input 
              type="text" 
              name="location" 
              value={career.location} 
              onChange={handleChange} 
              required 
              className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <label htmlFor="employment_type" className="block text-white mb-2 font-semibold">Employment Type</label>
            <select 
              name="employment_type" 
              value={career.employment_type} 
              onChange={handleChange} 
              className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <label htmlFor="description" className="block text-white mb-2 font-semibold">Description</label>
          <textarea 
            name="description" 
            value={career.description} 
            onChange={handleChange} 
            rows={5} 
            className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <label htmlFor="responsibilities" className="block text-white mb-2 font-semibold">Responsibilities (one per line)</label>
          <textarea 
            name="responsibilities" 
            value={Array.isArray(career.responsibilities) ? career.responsibilities.join('\n') : ''} 
            onChange={handleArrayChange} 
            rows={5} 
            className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <label htmlFor="requirements" className="block text-white mb-2 font-semibold">Requirements (one per line)</label>
          <textarea 
            name="requirements" 
            value={Array.isArray(career.requirements) ? career.requirements.join('\n') : ''} 
            onChange={handleArrayChange} 
            rows={5} 
            className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
          />
        </motion.div>
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <input 
            type="checkbox" 
            name="is_active" 
            checked={career.is_active} 
            onChange={handleChange} 
            className="h-5 w-5 rounded bg-white/10 border-white/20 focus:ring-primary focus:ring-2" 
          />
          <label htmlFor="is_active" className="text-white font-semibold">Is Active</label>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving...
              </div>
            ) : 'Save Job Posting'}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}