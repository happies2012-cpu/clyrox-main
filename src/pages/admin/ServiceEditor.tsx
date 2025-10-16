import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContentForm from '../../components/ContentForm';
import { notify } from '../../utils/notifications';
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

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'content' | 'image';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  defaultValue?: any;
}

export default function ServiceEditor() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Partial<Service>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadService = useCallback(async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!id) return;
    
    // Mock data for editing
    const mockService: Service = {
      id: id,
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
    };
    
    setInitialValues({
      ...mockService,
      features: mockService.features || [],
    });
  }, [id]);

  useEffect(() => {
    if (id) {
      loadService();
    } else {
      setInitialValues({
        is_active: true,
        order_index: 0,
        features: [],
      });
    }
  }, [id, loadService]);

  const handleSubmit = async (values: Record<string, any>) => {
    setIsSubmitting(true);
    
    try {
      const serviceData = {
        ...values,
        features: values.features || [],
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (id) {
        notify.success.update();
      } else {
        notify.success.create();
      }
      
      navigate('/admin/services');
    } catch (error) {
      console.error('Error saving service:', error);
      notify.error.save();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/services');
  };

  const formFields: FormField[] = [
    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter service title' },
    { name: 'subtitle', label: 'Subtitle', type: 'text', required: true, placeholder: 'Enter service subtitle' },
    { name: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'Enter URL slug' },
    { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Enter service description' },
    { name: 'hero_image', label: 'Hero Image URL', type: 'image', placeholder: 'Enter hero image URL' },
    { 
      name: 'icon', 
      label: 'Icon', 
      type: 'select', 
      options: [
        { value: 'briefcase', label: 'Briefcase' },
        { value: 'users', label: 'Users' },
        { value: 'globe', label: 'Globe' },
        { value: 'code', label: 'Code' },
        { value: 'user-check', label: 'User Check' },
      ],
      required: true 
    },
    { name: 'order_index', label: 'Order Index', type: 'text', required: true },
    { name: 'is_active', label: 'Active', type: 'checkbox' },
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
        {id ? 'Edit Service' : 'Create Service'}
      </motion.h1>
      
      <motion.div 
        className="max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ContentForm
          fields={formFields}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel={id ? 'Update Service' : 'Create Service'}
          isSubmitting={isSubmitting}
        />
      </motion.div>
    </motion.div>
  );
}