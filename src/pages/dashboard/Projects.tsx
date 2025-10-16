import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Plus, Edit3, Trash2, Calendar } from 'lucide-react';
import EnhancedLoadingSpinner from '../../components/EnhancedLoadingSpinner';
import { NotificationManager, notify } from '../../utils/notifications';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  created_at: string;
  updated_at: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'planning' as const
  });

  const loadProjects = useCallback(async () => {
    // Load projects without user authentication
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading projects:', error);
      notify.error.load();
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = notify.loading.creating();

    const newProject = {
      ...formData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('projects')
      .insert([newProject])
      .select();

    NotificationManager.dismiss(toastId);

    if (error) {
      console.error('Error creating project:', error);
      notify.error.create();
    } else {
      setProjects([data[0], ...projects]);
      setFormData({ name: '', description: '', status: 'planning' });
      setShowForm(false);
      notify.success.create();
    }
  };

  const deleteProject = async (id: string) => {
    const toastId = notify.loading.deleting();

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    NotificationManager.dismiss(toastId);

    if (error) {
      console.error('Error deleting project:', error);
      notify.error.delete();
    } else {
      setProjects(projects.filter(project => project.id !== id));
      notify.success.delete();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400';
      case 'on-hold': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <EnhancedLoadingSpinner type="bars" size="md" color="text-white" message="Loading projects..." />
      </div>
    );
  }

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
          Projects
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </motion.button>
      </motion.div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl"
        >
          <motion.h2 
            className="text-xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Create New Project
          </motion.h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-white mb-2 font-semibold">
                Project Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-2 rounded-lg focus:outline-none focus:border-white/40"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-white mb-2 font-semibold">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows={3}
                className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 py-2 rounded-lg focus:outline-none focus:border-white/40"
                placeholder="Enter project description"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-white mb-2 font-semibold">
                Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-white/40"
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex gap-3">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="backdrop-blur-xl bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-all"
              >
                Create Project
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(false)}
                className="backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-semibold transition-all"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {projects.length === 0 ? (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p 
            className="text-white/70 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            No projects yet. Create your first project!
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all"
          >
            Create Project
          </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl hover:bg-white/15 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <motion.h3 
                  className="text-xl font-bold text-white"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {project.name}
                </motion.h3>
                <div className="flex gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <Edit3 className="w-4 h-4 text-white/70 hover:text-white" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteProject(project.id)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-white/70 hover:text-red-400" />
                  </motion.button>
                </div>
              </div>
              <motion.p 
                className="text-white/70 mb-4 line-clamp-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.description}
              </motion.p>
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(project.created_at)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}