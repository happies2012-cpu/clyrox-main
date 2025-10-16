import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase, Service } from '../../lib/supabase';
import ContentForm from '../../components/ContentForm';
import { notify } from '../../utils/notifications';
import { motion } from 'framer-motion';

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
    if (!id) return;
    
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error loading service:', error);
      notify.error.load();
      return;
    }
    
    if (data) {
      setInitialValues({
        ...data,
        features: data.features || [],
      });
    }
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
      
      if (id) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update(serviceData)
          .eq('id', id);
        
        if (error) throw error;
        notify.success.update();
      } else {
        // Create new service
        const { error } = await supabase
          .from('services')
          .insert([serviceData]);
        
        if (error) throw error;
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