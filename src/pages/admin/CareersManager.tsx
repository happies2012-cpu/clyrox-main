import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../../components/GlassCard';
import AnimatedSection from '../../components/AnimatedSection';
import { motion } from 'framer-motion';

// Define the Career interface
interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary_range?: string;
  is_active: boolean;
}

export default function CareersManager() {
  const navigate = useNavigate();
  const [careers, setCareers] = useState<Career[]>([
    {
      id: '1',
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      employment_type: 'Full-time',
      description: 'We are looking for a skilled Frontend Developer to join our team.',
      requirements: ['Experience with React', 'Knowledge of TypeScript'],
      responsibilities: ['Develop user interfaces', 'Collaborate with design team'],
      is_active: true
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove the career from state
    setCareers(careers.filter(career => career.id !== id));
    toast.success('Career deleted successfully');
  };

  const filteredCareers = careers.filter(career => 
    career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    career.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <motion.h1 
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Career Opportunities
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={() => navigate('/admin/careers/new')}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Plus className="w-5 h-5" />
            Add New Career
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <input
          type="text"
          placeholder="Search careers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all"
        />
      </motion.div>

      {filteredCareers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center">
            <p className="text-xl text-white/70">No career opportunities found.</p>
            <button
              onClick={() => navigate('/admin/careers/new')}
              className="mt-4 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Create Your First Career
            </button>
          </GlassCard>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {filteredCareers.map((career, index) => (
            <AnimatedSection key={career.id} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GlassCard className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold text-white">{career.title}</h2>
                        {!career.is_active && (
                          <span className="bg-red-500/20 text-red-300 text-xs font-semibold px-2 py-1 rounded">
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 mb-3 text-sm text-white/70">
                        <span>{career.department}</span>
                        <span>•</span>
                        <span>{career.location}</span>
                        <span>•</span>
                        <span>{career.employment_type}</span>
                        {career.salary_range && (
                          <>
                            <span>•</span>
                            <span>{career.salary_range}</span>
                          </>
                        )}
                      </div>
                      <p className="text-white/70 mb-3 line-clamp-2">{career.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(`/career/${career.id}`, '_blank')}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-white/70" />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/careers/edit/${career.id}`)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-white/70" />
                      </button>
                      <button
                        onClick={() => handleDelete(career.id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-300" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}