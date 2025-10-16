import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Briefcase, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner';
import { supabase, Career } from '../lib/supabase';
import { motion } from 'framer-motion';

export default function CareerDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);

  const loadJob = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('careers')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();
    if (data) setJob(data);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (id) {
      loadJob();
    }
  }, [id, loadJob]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <EnhancedLoadingSpinner type="dots" size="lg" color="text-white" message="Loading job details..." />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-2xl">Job not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHero
        title={job.title}
        subtitle={`${job.department} • ${job.location}`}
        image="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <GlassCard className="p-8 md:p-12">
              <motion.div 
                className="flex flex-wrap gap-x-8 gap-y-4 text-white/70 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{job.employment_type}</span>
                </div>
              </motion.div>

              <motion.div 
                className="prose prose-invert max-w-none text-white/80 text-lg leading-relaxed space-y-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div>
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    Job Description
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {job.description}
                  </motion.p>
                </div>

                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div>
                    <motion.h2 
                      className="text-2xl font-bold text-white mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      Responsibilities
                    </motion.h2>
                    <motion.ul 
                      className="space-y-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {job.responsibilities.map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                )}

                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <motion.h2 
                      className="text-2xl font-bold text-white mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      Requirements
                    </motion.h2>
                    <motion.ul 
                      className="space-y-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {job.requirements.map((item, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                )}
              </motion.div>

              <motion.div 
                className="mt-12 border-t border-white/20 pt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block backdrop-blur-xl bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all mr-6"
                >
                  Apply Now
                </motion.a>
                <motion.a
                  href="/career"
                  whileHover={{ x: -5 }}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Careers
                </motion.a>
              </motion.div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}