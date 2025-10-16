import { useEffect, useState, useCallback } from 'react';
import { MapPin, Briefcase, Clock, ArrowRight, Search } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import EnhancedCareerCard from '../components/EnhancedCareerCard';
import { motion } from 'framer-motion';
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner';

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
    
    // Simulate loading careers without Supabase
    setTimeout(() => {
      const mockCareers: Career[] = [
        {
          id: '1',
          title: 'Senior Business Consultant',
          department: 'Consulting',
          location: 'New York, NY',
          employment_type: 'Full-time',
          description: 'We are looking for an experienced business consultant to join our team and help clients achieve their strategic goals.',
          requirements: [
            'MBA or advanced degree in business or related field',
            '5+ years of consulting experience',
            'Strong analytical and problem-solving skills',
            'Excellent communication and presentation abilities'
          ],
          responsibilities: [
            'Lead client engagements and deliver strategic recommendations',
            'Conduct market research and competitive analysis',
            'Develop and present client proposals',
            'Mentor junior consultants and team members'
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
          description: 'Join our HR team to support talent acquisition, employee relations, and organizational development initiatives.',
          requirements: [
            'Bachelor\'s degree in Human Resources or related field',
            '3+ years of HR experience',
            'PHR or SPHR certification preferred',
            'Strong interpersonal and conflict resolution skills'
          ],
          responsibilities: [
            'Manage full-cycle recruitment process',
            'Administer employee benefits programs',
            'Handle employee relations issues',
            'Support performance management processes'
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
          description: 'We are seeking a talented software developer to build innovative solutions for our clients and internal systems.',
          requirements: [
            'Bachelor\'s degree in Computer Science or related field',
            '3+ years of experience with JavaScript/TypeScript',
            'Experience with React and Node.js',
            'Knowledge of cloud platforms (AWS, Azure, or GCP)'
          ],
          responsibilities: [
            'Develop and maintain web applications',
            'Collaborate with design and product teams',
            'Write clean, testable code',
            'Participate in code reviews and technical discussions'
          ],
          salary_range: '$100,000 - $130,000',
          is_active: true
        },
        {
          id: '4',
          title: 'Marketing Manager',
          department: 'Marketing',
          location: 'Chicago, IL',
          employment_type: 'Full-time',
          description: 'Lead our marketing efforts to drive brand awareness, generate leads, and support business growth.',
          requirements: [
            'Bachelor\'s degree in Marketing or related field',
            '5+ years of marketing experience',
            'Proven track record in digital marketing',
            'Experience with marketing automation tools'
          ],
          responsibilities: [
            'Develop and execute marketing campaigns',
            'Manage digital marketing channels',
            'Analyze campaign performance and ROI',
            'Coordinate with sales and product teams'
          ],
          salary_range: '$85,000 - $110,000',
          is_active: true
        },
        {
          id: '5',
          title: 'Visa Specialist',
          department: 'Immigration',
          location: 'Washington, DC',
          employment_type: 'Full-time',
          description: 'Provide expert guidance on visa applications and immigration processes for our clients.',
          requirements: [
            'Bachelor\'s degree in Law, International Relations, or related field',
            '2+ years of experience in immigration services',
            'Knowledge of US immigration laws and regulations',
            'Excellent attention to detail and organizational skills'
          ],
          responsibilities: [
            'Prepare and submit visa applications',
            'Communicate with government agencies',
            'Advise clients on immigration options',
            'Maintain accurate case documentation'
          ],
          salary_range: '$65,000 - $80,000',
          is_active: true
        },
        {
          id: '6',
          title: 'UX Designer',
          department: 'Design',
          location: 'Remote',
          employment_type: 'Full-time',
          description: 'Create intuitive and engaging user experiences for our digital products and client projects.',
          requirements: [
            'Bachelor\'s degree in Design, HCI, or related field',
            '3+ years of UX design experience',
            'Proficiency with design tools (Figma, Sketch, Adobe XD)',
            'Portfolio demonstrating design thinking and problem-solving'
          ],
          responsibilities: [
            'Conduct user research and usability testing',
            'Create wireframes, prototypes, and design specifications',
            'Collaborate with development teams',
            'Participate in design sprints and workshops'
          ],
          salary_range: '$90,000 - $115,000',
          is_active: true
        }
      ];
      
      setCareers(mockCareers);
      setFilteredCareers(mockCareers);
      setLoading(false);
    }, 1000);
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
            <div className="flex justify-center items-center h-64">
              <EnhancedLoadingSpinner type="pulse" size="md" color="text-white" message="Loading career opportunities..." />
            </div>
          ) : filteredCareers.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <p className="text-xl text-white/70">
                {searchQuery 
                  ? 'No careers found matching your search. Try different keywords.' 
                  : 'No career opportunities available at the moment.'}
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCareers.map((career, index) => (
                <EnhancedCareerCard
                  key={career.id}
                  id={career.id}
                  title={career.title}
                  department={career.department}
                  location={career.location}
                  employment_type={career.employment_type}
                  salary_range={career.salary_range}
                  description={career.description}
                  delay={index * 0.1}
                />
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