import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner';
import { supabase, Service } from '../lib/supabase';
import { motion } from 'framer-motion';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const loadService = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();
    if (data) setService(data);
    setLoading(false);
  }, [slug]);

  const loadRelatedServices = useCallback(async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .neq('slug', slug)
      .eq('is_active', true)
      .order('order_index')
      .limit(3);
    if (data) setRelatedServices(data);
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
                    title: 'Strategic Planning',
                    description: 'Develop a customized strategy tailored to your goals',
                  },
                  {
                    step: '03',
                    title: 'Implementation',
                    description: 'Execute the plan with precision and attention to detail',
                  },
                  {
                    step: '04',
                    title: 'Ongoing Support',
                    description: 'Provide continuous support to ensure long-term success',
                  },
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex gap-6"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="backdrop-blur-xl bg-white/10 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-white">{item.step}</span>
                    </div>
                    <div>
                      <motion.h3 
                        className="text-xl font-bold text-white mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p 
                        className="text-white/70"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        {item.description}
                      </motion.p>
                    </div>
                  </motion.div>
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
                Explore our other offerings
              </motion.p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService, index) => (
                <AnimatedSection key={relatedService.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GlassCard className="p-8 h-full flex flex-col overflow-hidden">
                      <div className="overflow-hidden rounded-xl mb-6 -mx-8 -mt-8">
                        <motion.img
                          src={relatedService.hero_image}
                          alt={relatedService.title}
                          className="w-full h-40 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        {relatedService.title}
                      </motion.h3>
                      <motion.p 
                        className="text-white/70 mb-6 flex-grow"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        {relatedService.subtitle}
                      </motion.p>
                      <motion.a
                        href={`/services/${relatedService.slug}`}
                        className="inline-flex items-center gap-2 text-white hover:gap-4 transition-all"
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
              Let's discuss how {service.title.toLowerCase()} can benefit your organization
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
              Contact Us Today
            </motion.a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}