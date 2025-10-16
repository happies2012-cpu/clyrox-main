import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, Heart } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';

export default function About() {
  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '500+', label: 'Happy Clients' },
    { value: '1000+', label: 'Projects Completed' },
    { value: '50+', label: 'Team Members' },
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, delivering quality that exceeds expectations.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and building strong partnerships with our clients.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We embrace innovation and continuously seek new ways to solve complex challenges.',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We conduct business with honesty, transparency, and respect for all stakeholders.',
      image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHero
        title="About Clyrox"
        subtitle="Empowering businesses with innovative solutions since 2014"
        image="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <GlassCard className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</h3>
                      <p className="text-white/70">{stat.label}</p>
                    </motion.div>
                  </GlassCard>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <AnimatedSection>
              <motion.img
                src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Our Story"
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
                Our Story
              </motion.h2>
              <motion.div 
                className="space-y-4 text-white/70 text-lg"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p>
                  Founded in 2014, Clyrox began with a simple mission: to help businesses thrive in an increasingly
                  complex world. What started as a small consulting firm has grown into a comprehensive service
                  provider offering solutions across multiple domains.
                </p>
                <p>
                  Today, we're proud to serve clients across the globe, helping them navigate challenges in business
                  strategy, talent acquisition, immigration, digital transformation, and workforce management.
                </p>
                <p>
                  Our success is built on a foundation of trust, expertise, and an unwavering commitment to our
                  clients' success. Every project we undertake is an opportunity to demonstrate our values and make
                  a meaningful impact.
                </p>
              </motion.div>
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
              Our Values
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The principles that guide everything we do
            </motion.p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <GlassCard className="p-8 overflow-hidden">
                    <div className="overflow-hidden rounded-xl mb-6 -mx-8 -mt-8">
                      <motion.img
                        src={value.image}
                        alt={value.title}
                        className="w-full h-40 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="backdrop-blur-xl bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      {value.title}
                    </motion.h3>
                    <motion.p 
                      className="text-white/70 text-lg"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {value.description}
                    </motion.p>
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
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Our Team"
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
                Meet Our Team
              </motion.h2>
              <motion.div 
                className="space-y-4 text-white/70 text-lg mb-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p>
                  Our team is composed of experienced professionals from diverse backgrounds, each bringing unique
                  expertise and perspectives to the table.
                </p>
                <p>
                  From seasoned consultants and HR specialists to immigration experts and digital innovators, our
                  team members share a common passion for helping clients succeed.
                </p>
                <p>
                  We invest in continuous learning and development, ensuring our team stays at the forefront of
                  industry trends and best practices.
                </p>
              </motion.div>
              <motion.a
                href="/career"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold border border-white/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join Our Team
              </motion.a>
            </AnimatedSection>
          </div>
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
              Let's Work Together
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ready to take your business to the next level? Get in touch with us today.
            </motion.p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block backdrop-blur-xl bg-white text-slate-900 px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-all"
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