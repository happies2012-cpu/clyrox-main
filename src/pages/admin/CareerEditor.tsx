import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContentForm from '../../components/ContentForm';
import { notify } from '../../utils/notifications';
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

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'content' | 'image';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  defaultValue?: any;
}

export default function CareerEditor() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Partial<Career>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadCareer = useCallback(async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!id) return;
    
    // Mock data for editing
    const mockCareer: Career = {
      id: id,
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      employment_type: 'Full-time',
      description: 'We are looking for a skilled Frontend Developer to join our team.',
      requirements: ['Experience with React', 'Knowledge of TypeScript'],
      responsibilities: ['Develop user interfaces', 'Collaborate with design team'],
      is_active: true
    };
    
    setInitialValues({
      ...mockCareer,
      requirements: mockCareer.requirements || [],
      responsibilities: mockCareer.responsibilities || [],
    });
  }, [id]);

  useEffect(() => {
    if (id) {
      loadCareer();
    } else {
      setInitialValues({
        is_active: true,
        requirements: [],
        responsibilities: [],
      });
    }
  }, [id, loadCareer]);

  const handleSubmit = async (values: Record<string, any>) => {
    setIsSubmitting(true);
    
    try {
      const careerData = {
        ...values,
        requirements: values.requirements || [],
        responsibilities: values.responsibilities || [],
      };
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (id) {
        notify.success.update();
      } else {
        notify.success.create();
      }
      
      navigate('/admin/careers');
    } catch (error) {
      console.error('Error saving career:', error);
      notify.error.save();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/careers');
  };

  const formFields: FormField[] = [
    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Enter job title' },
    { name: 'department', label: 'Department', type: 'text', required: true, placeholder: 'Enter department' },
    { name: 'location', label: 'Location', type: 'text', required: true, placeholder: 'Enter job location' },
    { 
      name: 'employment_type', 
      label: 'Employment Type', 
      type: 'select', 
      options: [
        { value: 'Full-time', label: 'Full-time' },
        { value: 'Part-time', label: 'Part-time' },
        { value: 'Contract', label: 'Contract' },
        { value: 'Internship', label: 'Internship' },
      ],
      required: true 
    },
    { name: 'salary_range', label: 'Salary Range', type: 'text', placeholder: 'e.g., $80,000 - $120,000' },
    { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Enter job description' },
    { name: 'requirements', label: 'Requirements', type: 'content', placeholder: 'Enter one requirement per line' },
    { name: 'responsibilities', label: 'Responsibilities', type: 'content', placeholder: 'Enter one responsibility per line' },
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
        {id ? 'Edit Career' : 'Create Career'}
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
          submitLabel={id ? 'Update Career' : 'Create Career'}
          isSubmitting={isSubmitting}
        />
      </motion.div>
    </motion.div>
  );
}