import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner';
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

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const loadService = useCallback(async () => {
    setLoading(true);
    
    // Simulate loading service without Supabase
    setTimeout(() => {
      // Mock services data
      const mockServices: Service[] = [
        {
          id: '1',
          slug: 'business-consulting',
          title: 'Business Consulting',
          subtitle: 'Strategic business solutions',
          description: 'Our expert consultants provide comprehensive business strategy development, market analysis, and operational optimization to help your organization achieve sustainable growth and competitive advantage. We work closely with your team to identify opportunities, address challenges, and implement solutions that drive measurable results. Our approach combines industry expertise with innovative thinking to deliver tailored strategies that align with your unique business objectives.',
          icon: '',
          hero_image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920',
          features: [
            { title: 'Strategy Development', description: 'Comprehensive business strategy formulation tailored to your organization' },
            { title: 'Market Analysis', description: 'In-depth market research and competitive intelligence' },
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
          description: 'We help professionals navigate their career paths and assist organizations in finding and retaining top talent through our comprehensive employment consulting services. Our team of experts provides personalized guidance for career development while helping businesses build high-performing teams through strategic recruitment and retention strategies.',
          icon: '',
          hero_image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920',
          features: [
            { title: 'Career Coaching', description: 'Personalized career development coaching and guidance' },
            { title: 'Talent Acquisition', description: 'Strategic recruitment and hiring solutions' },
            { title: 'Skills Assessment', description: 'Comprehensive skills evaluation and development planning' },
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
          description: 'Our specialized visa consultants provide expert guidance on immigration processes, visa applications, and compliance with international regulations to ensure smooth transitions. We understand the complexities of global mobility and offer comprehensive support for individuals and businesses navigating visa requirements.',
          icon: '',
          hero_image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1920',
          features: [
            { title: 'Visa Applications', description: 'Complete visa application assistance and support' },
            { title: 'Immigration Law', description: 'Expert immigration law guidance and compliance' },
            { title: 'Document Preparation', description: 'Comprehensive document preparation services' },
            { title: 'Compliance Support', description: 'Regulatory compliance assistance and monitoring' }
          ],
          order_index: 3,
          is_active: true
        }
      ];
      
      // Find the service by slug
      const foundService = mockServices.find(s => s.slug === slug) || null;
      setService(foundService);
      
      // Set related services (all except the current one)
      const related = mockServices.filter(s => s.slug !== slug).slice(0, 3);
      setRelatedServices(related);
      
      setLoading(false);
    }, 1000);
  }, [slug]);

  const loadRelatedServices = useCallback(async () => {
    // This is now handled in loadService
  }, [slug]);

  useEffect(() => {
    if (slug) {
      loadService();
      loadRelatedServices();
    }
  }, [slug, loadService, loadRelatedServices]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <EnhancedLoadingSpinner type="pulse" size="lg" color="text-white" message="Loading service details..." />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-2xl">Service not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHero title={service.title} subtitle={service.subtitle} image={service.hero_image} />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <GlassCard className="p-12">
              <div className="overflow-hidden rounded-xl mb-8 -mx-12 -mt-12">
                <motion.img
                  src={service.hero_image}
                  alt={service.title}
                  className="w-full h-80 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Overview
              </motion.h2>
              <motion.p 
                className="text-xl text-white/70 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {service.description}
              </motion.p>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {service.features && service.features.length > 0 && (
        <section className="relative py-24 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Key Features
              </motion.h2>
              <motion.p 
                className="text-xl text-white/70"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                What makes our service exceptional
              </motion.p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.features.map((feature, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GlassCard className="p-8">
                      <CheckCircle className="w-12 h-12 text-emerald-400 mb-6" />
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        {feature.title}
                      </motion.h3>
                      <motion.p 
                        className="text-white/70 text-lg"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        {feature.description}
                      </motion.p>
                    </GlassCard>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <motion.img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Process"
                className="rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Our Process
              </motion.h2>
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {[
                  {
                    step: '01',
                    title: 'Initial Consultation',
                    description: 'We begin by understanding your specific needs and objectives',
                  },
                  {
                    step: '02',
                    title: 'Analysis & Strategy',
                    description: 'Our team conducts thorough analysis and develops a customized strategy',
                  },
                  {
                    step: '03',
                    title: 'Implementation',
                    description: 'We execute the plan with precision and ongoing support',
                  },
                  {
                    step: '04',
                    title: 'Review & Optimize',
                    description: 'We review results and optimize for continued success',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold">{item.step}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="relative py-24 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Related Services
              </motion.h2>
              <motion.p 
                className="text-xl text-white/70"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Explore other services that might interest you
              </motion.p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((relatedService, index) => (
                <AnimatedSection key={relatedService.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GlassCard className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3">{relatedService.title}</h3>
                      <p className="text-white/70 mb-4">{relatedService.subtitle}</p>
                      <motion.a
                        href={`/services/${relatedService.slug}`}
                        className="inline-flex items-center gap-2 text-primary-light hover:gap-4 transition-all font-semibold"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More <ArrowRight className="w-4 h-4" />
                      </motion.a>
                    </GlassCard>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

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
              Ready to Get Started?
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Contact us today to discuss how we can help you achieve your business goals.
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
              Contact Us
            </motion.a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}