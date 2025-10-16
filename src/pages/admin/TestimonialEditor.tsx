import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase, Testimonial } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function TestimonialEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState<Partial<Testimonial>>({
    name: '',
    title: '',
    quote: '',
    rating: 5,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);

  const loadTestimonial = useCallback(async () => {
    const { data } = await supabase.from('testimonials').select('*').eq('id', id).single();
    if (data) setTestimonial(data);
  }, [id]);

  useEffect(() => {
    if (id) {
      loadTestimonial();
    }
  }, [id, loadTestimonial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = id
      ? await supabase.from('testimonials').update(testimonial).eq('id', id)
      : await supabase.from('testimonials').insert([testimonial]);

    if (error) {
      toast.error('Error saving testimonial: ' + error.message);
    } else {
      toast.success(`Testimonial ${id ? 'updated' : 'created'} successfully!`);
      navigate('/admin/testimonials');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const isNumber = type === 'number';
    
    setTestimonial({
      ...testimonial,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : isNumber ? parseInt(value) : value,
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
        {id ? 'Edit Testimonial' : 'Add New Testimonial'}
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
            <label htmlFor="name" className="block text-white mb-2 font-semibold">Name</label>
            <input 
              type="text" 
              name="name" 
              value={testimonial.name} 
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
            <label htmlFor="title" className="block text-white mb-2 font-semibold">Title (e.g., CEO, Company)</label>
            <input 
              type="text" 
              name="title" 
              value={testimonial.title} 
              onChange={handleChange} 
              className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label htmlFor="quote" className="block text-white mb-2 font-semibold">Quote</label>
          <textarea 
            name="quote" 
            value={testimonial.quote} 
            onChange={handleChange} 
            required 
            rows={5} 
            className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <label htmlFor="rating" className="block text-white mb-2 font-semibold">Rating (1-5)</label>
          <input 
            type="number" 
            name="rating" 
            value={testimonial.rating} 
            onChange={handleChange} 
            min="1" 
            max="5" 
            required 
            className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all" 
          />
        </motion.div>
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <input 
            type="checkbox" 
            name="is_active" 
            checked={testimonial.is_active} 
            onChange={handleChange} 
            className="h-5 w-5 rounded bg-white/10 border-white/20 focus:ring-primary focus:ring-2" 
          />
          <label htmlFor="is_active" className="text-white font-semibold">Is Active</label>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
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
            ) : 'Save Testimonial'}
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}