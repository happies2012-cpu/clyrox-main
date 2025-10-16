import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Target, Zap } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { supabase, Service } from '../lib/supabase';
import Testimonials from '../components/Testimonials';
import LogoCloud from '../components/LogoCloud';
import NewsletterSignup from '../components/NewsletterSignup';

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('order_index');
    if (data) setServices(data);
  };

  return (
    <div className="min-h-screen">
      {/* Static Hero Section - Previous Version */}
      <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Empower Your Business
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-2xl text-white/90 mb-8"
            >
              Comprehensive consulting solutions for business growth and success
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="/services"
                className="inline-block backdrop-blur-xl bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-all"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Services
              </motion.a>
              <motion.a
                href="/contact"
                className="inline-block backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold border border-white/30 transition-all"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1920')] opacity-5 bg-cover bg-center" />

        <div className="relative max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
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
                    <p className="text-white/70 mb-6 flex-grow">{service.subtitle}</p>
                    <motion.a
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-primary-light hover:gap-4 transition-all font-semibold"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Service <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  </GlassCard>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <motion.img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="About Us"
                className="rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Who We Are
              </motion.h2>
              <motion.p 
                className="text-xl text-white/70 mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                We are a multi-service consulting firm dedicated to empowering businesses with innovative solutions and personalized service. Our mission is to help you navigate complexity and achieve sustainable growth.
              </motion.p>

              <div className="space-y-4">
                {[
                  'Expert team with industry-leading experience',
                  'Tailored solutions for your unique needs',
                  'Proven track record of success',
                  '24/7 dedicated support',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                    whileHover={{ x: 5 }}
                  >
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-white/80 text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="/about"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-8 bg-primary/20 hover:bg-primary/30 text-primary-light px-8 py-4 rounded-full font-semibold border border-primary/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Learn More About Us
              </motion.a>
            </AnimatedSection>
          </div>
        </div>
      </section>

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
              Our Process
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              A systematic methodology designed to deliver exceptional results
            </motion.p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Discovery',
                description: 'We start by understanding your goals, challenges, and vision',
                image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1200'
              },
              {
                icon: Zap,
                title: 'Strategy',
                description: 'Develop a comprehensive plan tailored to your specific needs',
                image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200'
              },
              {
                icon: CheckCircle,
                title: 'Execution',
                description: 'Implement solutions with precision and ongoing support',
                image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200'
              },
            ].map((step, index) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <GlassCard className="p-8 text-center overflow-hidden">
                    <div className="overflow-hidden rounded-xl mb-6 -mx-8 -mt-8">
                      <motion.img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-40 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="backdrop-blur-xl bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <step.icon className="w-10 h-10 text-primary" />
                    </div>
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p 
                      className="text-white/70"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {step.description}
                    </motion.p>
                  </GlassCard>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <LogoCloud />
      <NewsletterSignup />
    </div>
  );
}