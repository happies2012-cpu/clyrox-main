import { useEffect, useState, useCallback } from 'react';
import { MapPin, Briefcase, Clock, ArrowRight, Search } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase, Career } from '../lib/supabase';
import { motion } from 'framer-motion';

export default function CareerPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [loading, setLoading] = useState(true);

  // Get unique departments
  const departments = ['all', ...new Set(careers.map(job => job.department).filter(Boolean))] as string[];

  useEffect(() => {
    loadCareers();
  }, []);

  const filterCareers = useCallback(() => {
    let result = careers;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.requirements && job.requirements.some(req => 
          typeof req === 'string' ? req.toLowerCase().includes(searchQuery.toLowerCase()) : false
        )) ||
        (job.responsibilities && job.responsibilities.some(resp => 
          typeof resp === 'string' ? resp.toLowerCase().includes(searchQuery.toLowerCase()) : false
        ))
      );
    }
    
    // Filter by department
    if (selectedDepartment !== 'all') {
      result = result.filter(job => job.department === selectedDepartment);
    }
    
    setFilteredCareers(result);
  }, [careers, searchQuery, selectedDepartment]);

  useEffect(() => {
    filterCareers();
  }, [careers, searchQuery, selectedDepartment, filterCareers]);

  const loadCareers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (data) {
      setCareers(data);
      setFilteredCareers(data);
    }
    if (error) {
      console.error('Error loading careers:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <PageHero
        title="Join Our Team"
        subtitle="Build your career with us and make an impact"
        image="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Why Work With Us?
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Join a team of passionate professionals dedicated to excellence and innovation
            </motion.p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: 'Growth Opportunities',
                description: 'Continuous learning and career development programs',
                icon: '📈',
                image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200'
              },
              {
                title: 'Work-Life Balance',
                description: 'Flexible schedules and remote work options',
                icon: '⚖️',
                image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200'
              },
              {
                title: 'Competitive Benefits',
                description: 'Comprehensive health coverage and retirement plans',
                icon: '💼',
                image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200'
              },
            ].map((benefit, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <GlassCard className="p-8 text-center overflow-hidden">
                    <div className="overflow-hidden rounded-xl mb-6 -mx-8 -mt-8">
                      <motion.img
                        src={benefit.image}
                        alt={benefit.title}
                        className="w-full h-40 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="text-5xl mb-4">{benefit.icon}</div>
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      {benefit.title}
                    </motion.h3>
                    <motion.p 
                      className="text-white/70"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {benefit.description}
                    </motion.p>
                  </GlassCard>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <AnimatedSection className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-4 rounded-full focus:outline-none focus:border-white/40 pl-14"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" />
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="backdrop-blur-xl bg-white/10 border border-white/20 text-white px-6 py-4 rounded-full focus:outline-none focus:border-white/40 min-w-[200px]"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="bg-slate-800">
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </AnimatedSection>
          </div>

          {loading ? (
            <AnimatedSection>
              <div className="flex justify-center items-center h-64">
                <div className="text-white">Loading job openings...</div>
              </div>
            </AnimatedSection>
          ) : filteredCareers.length === 0 ? (
            <AnimatedSection>
              <GlassCard className="p-12 text-center">
                <p className="text-xl text-white/70">
                  {searchQuery || selectedDepartment !== 'all' 
                    ? 'No job openings found matching your criteria. Try adjusting your search or filters.' 
                    : 'We don\'t have any open positions at the moment, but we\'re always looking for talented individuals. Feel free to send us your resume at careers@clyrox.com'}
                </p>
              </GlassCard>
            </AnimatedSection>
          ) : (
            <div className="space-y-6">
              {filteredCareers.map((job, index) => (
                <AnimatedSection key={job.id} delay={index * 0.05}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GlassCard className="p-8 hover:bg-white/15 transition-all">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-grow">
                          <motion.h3 
                            className="text-2xl font-bold text-white mb-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                          >
                            {job.title}
                          </motion.h3>
                          <div className="flex flex-wrap gap-4 text-white/70 mb-4">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{job.employment_type}</span>
                            </div>
                          </div>
                          {job.description && (
                            <motion.p 
                              className="text-white/70 line-clamp-2"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 }}
                            >
                              {job.description}
                            </motion.p>
                          )}
                        </div>
                        <motion.a
                          href={`/career/${job.id}`}
                          className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold border border-white/30 transition-all whitespace-nowrap"
                          whileHover={{ scale: 1.05, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details <ArrowRight className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </GlassCard>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-800 to-black">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Don't See the Right Position?
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We're always interested in meeting talented individuals. Send us your resume and let's talk.
            </motion.p>
            <motion.a
              href="/contact"
              className="inline-block backdrop-blur-xl bg-white text-slate-900 px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get in Touch
            </motion.a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}