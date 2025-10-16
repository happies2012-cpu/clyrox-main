import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../../components/GlassCard';
import AnimatedSection from '../../components/AnimatedSection';
import { motion } from 'framer-motion';

// Define the Service interface
interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  hero_image: string;
  features: Array<{ title: string; description: string }>;
  order_index: number;
  is_active: boolean;
}

export default function ServicesManager() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      slug: 'web-development',
      title: 'Web Development',
      subtitle: 'Custom websites and web applications',
      description: 'We build custom websites and web applications using modern technologies.',
      icon: 'code',
      hero_image: '/placeholder-image.jpg',
      features: [
        { title: 'Responsive Design', description: 'Websites that work on all devices' },
        { title: 'Fast Loading', description: 'Optimized for performance' }
      ],
      order_index: 1,
      is_active: true
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove the service from state
    setServices(services.filter(service => service.id !== id));
    toast.success('Service deleted successfully');
  };

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
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
          Services
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={() => navigate('/admin/services/new')}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Plus className="w-5 h-5" />
            Add New Service
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
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all"
        />
      </motion.div>

      {filteredServices.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center">
            <p className="text-xl text-white/70">No services found.</p>
            <button
              onClick={() => navigate('/admin/services/new')}
              className="mt-4 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Create Your First Service
            </button>
          </GlassCard>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {filteredServices.map((service, index) => (
            <AnimatedSection key={service.id} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GlassCard className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold text-white">{service.title}</h2>
                        {!service.is_active && (
                          <span className="bg-red-500/20 text-red-300 text-xs font-semibold px-2 py-1 rounded">
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className="text-primary-light font-semibold mb-3">{service.subtitle}</p>
                      <p className="text-white/70 mb-3 line-clamp-2">{service.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-white/10 text-white/70 text-xs font-semibold px-2 py-1 rounded">
                          Order: {service.order_index}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => window.open(`/services/${service.slug}`, '_blank')}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-white/70" />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/services/edit/${service.id}`)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-white/70" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
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