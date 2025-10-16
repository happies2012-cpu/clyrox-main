import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Briefcase, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner';
import { motion } from 'framer-motion';

// Define the Career interface locally
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

export default function CareerDetail() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);

  const loadJob = useCallback(async () => {
    setLoading(true);
    
    // Simulate loading job without Supabase
    setTimeout(() => {
      // Mock career data
      const mockCareers: Career[] = [
        {
          id: '1',
          title: 'Senior Business Consultant',
          department: 'Consulting',
          location: 'New York, NY',
          employment_type: 'Full-time',
          description: 'We are looking for an experienced business consultant to join our team and help clients achieve their strategic goals. The ideal candidate will have a strong background in business strategy, market analysis, and operational optimization. You will work closely with our clients to identify opportunities, address challenges, and implement solutions that drive measurable results.',
          requirements: [
            'MBA or advanced degree in business or related field',
            '5+ years of consulting experience',
            'Strong analytical and problem-solving skills',
            'Excellent communication and presentation abilities',
            'Proven track record of delivering successful client engagements',
            'Ability to work independently and manage multiple projects simultaneously'
          ],
          responsibilities: [
            'Lead client engagements and deliver strategic recommendations',
            'Conduct market research and competitive analysis',
            'Develop and present client proposals',
            'Mentor junior consultants and team members',
            'Manage project timelines and deliverables',
            'Coordinate with cross-functional teams to ensure project success'
          ],
          salary_range: '$120,000 - $150,000',
          is_active: true
        },
        {
          id: '2',
          title: 'HR Specialist',
          department: 'Human Resources',
          location: 'Los Angeles, CA',
          employment_type: 'Full-time',
          description: 'Join our HR team to support talent acquisition, employee relations, and organizational development initiatives. You will play a key role in creating a positive workplace culture and ensuring our employees have the support they need to succeed. This position requires strong interpersonal skills and attention to detail.',
          requirements: [
            'Bachelor\'s degree in Human Resources or related field',
            '3+ years of HR experience',
            'PHR or SPHR certification preferred',
            'Strong interpersonal and conflict resolution skills',
            'Proficiency in HRIS systems and Microsoft Office Suite',
            'Knowledge of employment law and regulations'
          ],
          responsibilities: [
            'Manage full-cycle recruitment process',
            'Administer employee benefits programs',
            'Handle employee relations issues',
            'Support performance management processes',
            'Maintain HR records and documentation',
            'Coordinate training and development programs'
          ],
          salary_range: '$70,000 - $90,000',
          is_active: true
        },
        {
          id: '3',
          title: 'Software Developer',
          department: 'Technology',
          location: 'San Francisco, CA',
          employment_type: 'Full-time',
          description: 'We are seeking a talented software developer to build innovative solutions for our clients and internal systems. You will work with a team of experienced developers to design, develop, and maintain web applications using modern technologies. This role requires strong technical skills and a passion for creating high-quality software.',
          requirements: [
            'Bachelor\'s degree in Computer Science or related field',
            '3+ years of experience with JavaScript/TypeScript',
            'Experience with React and Node.js',
            'Knowledge of cloud platforms (AWS, Azure, or GCP)',
            'Familiarity with version control systems (Git)',
            'Understanding of RESTful APIs and database design'
          ],
          responsibilities: [
            'Develop and maintain web applications',
            'Collaborate with design and product teams',
            'Write clean, testable code',
            'Participate in code reviews and technical discussions',
            'Troubleshoot and debug issues',
            'Document technical specifications and user guides'
          ],
          salary_range: '$100,000 - $130,000',
          is_active: true
        }
      ];
      
      // Find the job by id
      const foundJob = mockCareers.find(j => j.id === id) || null;
      setJob(foundJob);
      setLoading(false);
    }, 1000);
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
                {job.salary_range && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">${job.salary_range}</span>
                  </div>
                )}
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