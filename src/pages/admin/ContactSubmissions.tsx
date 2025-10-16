import { useEffect, useState } from 'react';
import { supabase, ContactSubmission } from '../../lib/supabase';
import { Trash2, Mail, Phone, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../../components/GlassCard';
import AnimatedSection from '../../components/AnimatedSection';
import { motion } from 'framer-motion';

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setSubmissions(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
      if (error) {
        toast.error('Error deleting submission: ' + error.message);
      } else {
        toast.success('Submission deleted successfully');
        loadSubmissions();
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Submissions
      </motion.h1>

      {submissions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center">
            <p className="text-xl text-white/70">No submissions yet.</p>
          </GlassCard>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {submissions.map((submission, index) => (
            <AnimatedSection key={submission.id} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GlassCard className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <motion.h2 
                        className="text-xl font-bold text-white"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {submission.name}
                      </motion.h2>
                      {submission.service_interest && (
                        <motion.p 
                          className="text-primary-light font-semibold"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {submission.service_interest}
                        </motion.p>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(submission.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-md"
                    >
                      <Trash2 className="w-4 h-4 text-red-300" />
                    </motion.button>
                  </div>
                  <motion.div 
                    className="border-t border-white/10 my-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  ></motion.div>
                  <motion.div 
                    className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <motion.a 
                        href={`mailto:${submission.email}`} 
                        className="hover:text-white"
                        whileHover={{ x: 5 }}
                      >
                        {submission.email}
                      </motion.a>
                    </div>
                    {submission.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{submission.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(submission.created_at)}</span>
                    </div>
                  </motion.div>
                  <motion.p 
                    className="text-white/80 whitespace-pre-wrap"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {submission.message}
                  </motion.p>
                </GlassCard>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}