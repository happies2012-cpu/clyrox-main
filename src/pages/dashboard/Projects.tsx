import { useState, useEffect, useCallback } from 'react';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '../../components/GlassCard';
import AnimatedSection from '../../components/AnimatedSection';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  created_at: string;
}

export default function Projects() {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete redesign of company website with modern UI',
      status: 'in-progress',
      progress: 75,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Native mobile app for iOS and Android platforms',
      status: 'planning',
      progress: 10,
      created_at: new Date().toISOString()
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-300';
      case 'in-progress': return 'bg-blue-500/20 text-blue-300';
      case 'on-hold': return 'bg-yellow-500/20 text-yellow-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <motion.h1 
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <Plus className="w-5 h-5" />
          New Project
        </motion.button>
      </div>

      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center">
            <p className="text-xl text-white/70">No projects found.</p>
            <button className="mt-4 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50">
              Create Your First Project
            </button>
          </GlassCard>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GlassCard className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold text-white">{project.name}</h2>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                          {project.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-white/70 mb-4">{project.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/70">Progress</span>
                          <span className="text-white">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-white/50">
                        Created: {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors" title="View">
                        <Eye className="w-4 h-4 text-white/70" />
                      </button>
                      <button className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors" title="Edit">
                        <Edit className="w-4 h-4 text-white/70" />
                      </button>
                      <button className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-md transition-colors" title="Delete">
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
