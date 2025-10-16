import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContentForm from '../../components/ContentForm';
import { notify } from '../../utils/notifications';
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

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'content' | 'image';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  defaultValue?: any;
}

export default function TestimonialEditor() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Partial<Testimonial>>({});
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadTestimonial = useCallback(async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!id) return;
    
    // Mock data for editing
    const mockTestimonial: Testimonial = {
      id: id,
      name: 'Alex Johnson',
      role: 'CEO',
      company: 'Tech Corp',
      content: 'Clyrox delivered an amazing website for our company. Highly recommended!',
      avatar_url: '/placeholder-avatar.jpg',
      rating: 5,
      is_featured: true
    };
    
    setInitialValues({
      name: mockTestimonial.name,
      role: mockTestimonial.role,
      company: mockTestimonial.company,
      content: mockTestimonial.content,
      avatar_url: mockTestimonial.avatar_url,
      is_featured: mockTestimonial.is_featured
    });
    setRating(mockTestimonial.rating);
  }, [id]);

  useEffect(() => {
    if (id) {
      loadTestimonial();
    } else {
      setInitialValues({
        is_featured: false,
      });
      setRating(5);
    }
  }, [id, loadTestimonial]);

  const handleSubmit = async (values: Record<string, any>) => {
    setIsSubmitting(true);
    
    try {
      const testimonialData = {
        ...values,
        rating: rating
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (id) {
        notify.success.update();
      } else {
        notify.success.create();
      }
      
      navigate('/admin/testimonials');
    } catch (error) {
      console.error('Error saving testimonial:', error);
      notify.error.save();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/testimonials');
  };

  const formFields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Enter client name' },
    { name: 'role', label: 'Role', type: 'text', required: true, placeholder: 'Enter client role' },
    { name: 'company', label: 'Company', type: 'text', required: true, placeholder: 'Enter company name' },
    { name: 'content', label: 'Testimonial', type: 'textarea', required: true, placeholder: 'Enter testimonial content' },
    { name: 'avatar_url', label: 'Avatar URL', type: 'image', placeholder: 'Enter avatar image URL' },
    { name: 'is_featured', label: 'Featured', type: 'checkbox' },
  ];

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
        {id ? 'Edit Testimonial' : 'Create Testimonial'}
      </motion.h1>
      
      <motion.div 
        className="max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
          <label className="block text-white mb-2 font-semibold">Rating</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
                aria-label={`Rate ${star} stars`}
              >
                {star <= rating ? '★' : '☆'}
              </button>
            ))}
            <span className="ml-2 text-white">{rating} star{rating !== 1 ? 's' : ''}</span>
          </div>
        </div>
        
        <ContentForm
          fields={formFields}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel={id ? 'Update Testimonial' : 'Create Testimonial'}
          isSubmitting={isSubmitting}
        />
      </motion.div>
    </motion.div>
  );
}