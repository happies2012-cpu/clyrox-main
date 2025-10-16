import { useEffect, useState, useCallback } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase, Service } from '../lib/supabase';
import { motion } from 'framer-motion';

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
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('order_index');
    if (data) {
      setServices(data);
      setFilteredServices(data);
    }
    if (error) {
      console.error('Error loading services:', error);
    }
    setLoading(false);
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
                <AnimatedSection key={service.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <GlassCard className="p-8 h-full flex flex-col overflow-hidden">
                      <div className="overflow-hidden rounded-xl mb-6 -mx-8 -mt-8">
                        <motion.img
                          src={service.hero_image || "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920"}
                          alt={service.title}
                          className="w-full h-48 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-white/60 mb-4">{service.subtitle}</p>
                      <p className="text-white/70 mb-6 flex-grow line-clamp-3">{service.description}</p>

                      {service.features && service.features.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                          {service.features.slice(0, 4).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-white/80">{feature.title}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <motion.a
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-white hover:gap-4 transition-all font-semibold mt-auto"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More <ArrowRight className="w-5 h-5" />
                      </motion.a>
                    </GlassCard>
                  </motion.div>
                </AnimatedSection>
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