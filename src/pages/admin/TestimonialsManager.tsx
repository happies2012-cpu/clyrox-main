import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../../components/GlassCard';
import AnimatedSection from '../../components/AnimatedSection';
import { motion } from 'framer-motion';

// Define the Testimonial interface
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar_url: string;
  rating: number;
  is_featured: boolean;
}

export default function TestimonialsManager() {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      role: 'CEO',
      company: 'Tech Corp',
      content: 'Clyrox delivered an amazing website for our company. Highly recommended!',
      avatar_url: '/placeholder-avatar.jpg',
      rating: 5,
      is_featured: true
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove the testimonial from state
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    toast.success('Testimonial deleted successfully');
  };

  const filteredTestimonials = testimonials.filter(testimonial => 
    testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-white/30'}`}
          />
        ))}
      </div>
    );
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
          Testimonials
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={() => navigate('/admin/testimonials/new')}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Plus className="w-5 h-5" />
            Add New Testimonial
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
          placeholder="Search testimonials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all"
        />
      </motion.div>

      {filteredTestimonials.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center">
            <p className="text-xl text-white/70">No testimonials found.</p>
            <button
              onClick={() => navigate('/admin/testimonials/new')}
              className="mt-4 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Create Your First Testimonial
            </button>
          </GlassCard>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {filteredTestimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.id} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GlassCard className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold text-white">{testimonial.name}</h2>
                        {testimonial.is_featured && (
                          <span className="bg-yellow-500/20 text-yellow-300 text-xs font-semibold px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-primary-light font-semibold mb-2">
                        {testimonial.role}, {testimonial.company}
                      </p>
                      <div className="mb-3">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="text-white/70 italic mb-3">"{testimonial.content}"</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/testimonials/edit/${testimonial.id}`)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-white/70" />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
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