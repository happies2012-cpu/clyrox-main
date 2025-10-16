import { useEffect, useState, useCallback } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import EnhancedServiceCard from '../components/EnhancedServiceCard';
import { motion } from 'framer-motion';

// Define the Service interface locally
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

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const filterServices = useCallback(() => {
    if (!searchQuery) {
      setFilteredServices(services);
      return;
    }

    const filtered = services.filter(service => 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.features && service.features.some(feature => 
        feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchQuery.toLowerCase())
      ))
    );

    setFilteredServices(filtered);
  }, [services, searchQuery]);

  useEffect(() => {
    filterServices();
  }, [services, searchQuery, filterServices]);

  const loadServices = async () => {
    setLoading(true);
    
    // Simulate loading services without Supabase
    setTimeout(() => {
      const mockServices: Service[] = [
        {
          id: '1',
          slug: 'business-consulting',
          title: 'Business Consulting',
          subtitle: 'Strategic business solutions',
          description: 'Our expert consultants provide comprehensive business strategy development, market analysis, and operational optimization to help your organization achieve sustainable growth and competitive advantage.',
          icon: '',
          hero_image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920',
          features: [
            { title: 'Strategy Development', description: 'Comprehensive business strategy formulation' },
            { title: 'Market Analysis', description: 'In-depth market research and analysis' },
            { title: 'Operational Efficiency', description: 'Process optimization and efficiency improvements' },
            { title: 'Financial Planning', description: 'Strategic financial planning and analysis' }
          ],
          order_index: 1,
          is_active: true
        },
        {
          id: '2',
          slug: 'employment-consulting',
          title: 'Employment Consulting',
          subtitle: 'Career and talent solutions',
          description: 'We help professionals navigate their career paths and assist organizations in finding and retaining top talent through our comprehensive employment consulting services.',
          icon: '',
          hero_image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920',
          features: [
            { title: 'Career Coaching', description: 'Personalized career development coaching' },
            { title: 'Talent Acquisition', description: 'Strategic recruitment and hiring solutions' },
            { title: 'Skills Assessment', description: 'Comprehensive skills evaluation and development' },
            { title: 'Job Placement', description: 'Effective job matching and placement services' }
          ],
          order_index: 2,
          is_active: true
        },
        {
          id: '3',
          slug: 'visa-consulting',
          title: 'Visa Consulting',
          subtitle: 'Immigration and visa services',
          description: 'Our specialized visa consultants provide expert guidance on immigration processes, visa applications, and compliance with international regulations to ensure smooth transitions.',
          icon: '',
          hero_image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1920',
          features: [
            { title: 'Visa Applications', description: 'Complete visa application assistance' },
            { title: 'Immigration Law', description: 'Expert immigration law guidance' },
            { title: 'Document Preparation', description: 'Comprehensive document preparation services' },
            { title: 'Compliance Support', description: 'Regulatory compliance assistance' }
          ],
          order_index: 3,
          is_active: true
        },
        {
          id: '4',
          slug: 'design-development',
          title: 'Design & Development',
          subtitle: 'Creative and technical solutions',
          description: 'Our creative and technical team delivers innovative design and development solutions that transform your ideas into reality with cutting-edge technology and artistic excellence.',
          icon: '',
          hero_image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920',
          features: [
            { title: 'UI/UX Design', description: 'User-centered interface and experience design' },
            { title: 'Web Development', description: 'Modern web application development' },
            { title: 'Mobile Apps', description: 'Cross-platform mobile application development' },
            { title: 'Brand Identity', description: 'Comprehensive brand identity creation' }
          ],
          order_index: 4,
          is_active: true
        },
        {
          id: '5',
          slug: 'staffing-services',
          title: 'Staffing Services',
          subtitle: 'Talent acquisition and management',
          description: 'We provide comprehensive staffing solutions to help organizations find, hire, and retain the right talent for their specific needs and business objectives.',
          icon: '',
          hero_image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920',
          features: [
            { title: 'Temporary Staffing', description: 'Flexible temporary staffing solutions' },
            { title: 'Permanent Placement', description: 'Direct hire permanent placement services' },
            { title: 'Contract Recruitment', description: 'Specialized contract recruitment services' },
            { title: 'Workforce Management', description: 'Comprehensive workforce management solutions' }
          ],
          order_index: 5,
          is_active: true
        },
        {
          id: '6',
          slug: 'digital-marketing',
          title: 'Digital Marketing',
          subtitle: 'Online presence and growth',
          description: 'Our digital marketing experts help businesses establish and grow their online presence through strategic SEO, content marketing, social media management, and data-driven campaigns.',
          icon: '',
          hero_image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920',
          features: [
            { title: 'SEO Optimization', description: 'Search engine optimization strategies' },
            { title: 'Social Media', description: 'Comprehensive social media management' },
            { title: 'Content Marketing', description: 'Strategic content creation and distribution' },
            { title: 'Analytics & Reporting', description: 'Data-driven analytics and reporting' }
          ],
          order_index: 6,
          is_active: true
        }
      ];
      
      setServices(mockServices);
      setFilteredServices(mockServices);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <PageHero
        title="Our Services"
        subtitle="Comprehensive solutions to drive your success"
        image="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-12">
            <div className="max-w-2xl mx-auto relative mb-8">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-4 rounded-full focus:outline-none focus:border-white/40 pl-14"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" />
            </div>
            
            <p className="text-xl text-white/70 text-center max-w-3xl mx-auto">
              We offer a comprehensive range of services designed to meet your business needs at every stage of
              growth. From strategic consulting to talent acquisition, we're here to help you succeed.
            </p>
          </AnimatedSection>

          {loading ? (
            <AnimatedSection>
              <div className="flex justify-center items-center h-64">
                <div className="text-white">Loading services...</div>
              </div>
            </AnimatedSection>
          ) : filteredServices.length === 0 ? (
            <AnimatedSection>
              <GlassCard className="p-12 text-center">
                <p className="text-xl text-white/70">
                  {searchQuery 
                    ? 'No services found matching your search. Try different keywords.' 
                    : 'No services available at the moment.'}
                </p>
              </GlassCard>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <EnhancedServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  subtitle={service.subtitle}
                  description={service.description}
                  hero_image={service.hero_image}
                  slug={service.slug}
                  delay={index * 0.1}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-black">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Need a Custom Solution?
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              We understand that every business is unique. Let's discuss how we can tailor our services to your
              specific needs.
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