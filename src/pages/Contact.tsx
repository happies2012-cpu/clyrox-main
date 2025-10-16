import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import EnhancedLoadingSpinner from '../components/EnhancedLoadingSpinner';
import { FormValidator, ValidationError, getErrorMessage, hasError } from '../utils/formValidation';
import { NotificationManager, notify } from '../utils/notifications';
import { supabase, ContactSubmission } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState<Partial<ContactSubmission>>({
    name: '',
    email: '',
    phone: '',
    service_interest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateForm = () => {
    const validator = FormValidator.create()
      .required(formData.name, 'name', 'Name is required')
      .required(formData.email, 'email', 'Email is required')
      .email(formData.email, 'email')
      .required(formData.message, 'message', 'Message is required')
      .minLength(formData.message, 'message', 10);

    if (formData.phone) {
      validator.pattern(formData.phone, 'phone', /^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number');
    }

    const result = validator.validate();
    setErrors(result.errors);
    return result.isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      notify.error.validation('Please fix the errors in the form');
      return;
    }
    
    const toastId = notify.loading.saving();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contact_submissions').insert([formData]);

      if (error) throw error;

      NotificationManager.dismiss(toastId);
      notify.success.send();
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_interest: '',
        message: '',
      });
      setErrors([]);
    } catch (error) {
      NotificationManager.dismiss(toastId);
      console.error('Error submitting contact form:', error);
      notify.error.network();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (hasError(errors, name)) {
      setErrors(errors.filter(err => err.field !== name));
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <EnhancedLoadingSpinner type="pulse" size="lg" color="text-white" message="Sending your message..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHero
        title="Get in Touch"
        subtitle="We'd love to hear from you"
        image="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Mail,
                title: 'Email Us',
                content: 'info@clyrox.com',
                link: 'mailto:info@clyrox.com',
                image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200'
              },
              {
                icon: Phone,
                title: 'Call Us',
                content: '+1 (234) 567-890',
                link: 'tel:+1234567890',
                image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200'
              },
              {
                icon: MapPin,
                title: 'Visit Us',
                content: '123 Business Street, Suite 100',
                link: '#',
                image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200'
              },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <GlassCard className="p-8 text-center h-full overflow-hidden">
                    <div className="overflow-hidden rounded-xl mb-6 -mx-8 -mt-8">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-40 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="backdrop-blur-xl bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <motion.h3 
                      className="text-xl font-bold text-white mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.a
                      href={item.link}
                      className="text-white/70 hover:text-white transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {item.content}
                    </motion.a>
                  </GlassCard>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Send Us a Message
              </motion.h2>
              <motion.p 
                className="text-xl text-white/70 mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Fill out the form below and we'll get back to you as soon as possible.
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2 font-semibold">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full backdrop-blur-xl bg-white/10 border ${
                      hasError(errors, 'name') ? 'border-red-500' : 'border-white/20'
                    } text-white placeholder-white/50 px-6 py-4 rounded-xl focus:outline-none focus:border-white/40`}
                    placeholder="Your full name"
                  />
                  {hasError(errors, 'name') && (
                    <p className="text-red-400 text-sm mt-1">{getErrorMessage(errors, 'name')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-2 font-semibold">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full backdrop-blur-xl bg-white/10 border ${
                      hasError(errors, 'email') ? 'border-red-500' : 'border-white/20'
                    } text-white placeholder-white/50 px-6 py-4 rounded-xl focus:outline-none focus:border-white/40`}
                    placeholder="your.email@example.com"
                  />
                  {hasError(errors, 'email') && (
                    <p className="text-red-400 text-sm mt-1">{getErrorMessage(errors, 'email')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white mb-2 font-semibold">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full backdrop-blur-xl bg-white/10 border ${
                      hasError(errors, 'phone') ? 'border-red-500' : 'border-white/20'
                    } text-white placeholder-white/50 px-6 py-4 rounded-xl focus:outline-none focus:border-white/40`}
                    placeholder="+1 (234) 567-890"
                  />
                  {hasError(errors, 'phone') && (
                    <p className="text-red-400 text-sm mt-1">{getErrorMessage(errors, 'phone')}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="service_interest" className="block text-white mb-2 font-semibold">
                    Service Interest
                  </label>
                  <select
                    id="service_interest"
                    name="service_interest"
                    value={formData.service_interest}
                    onChange={handleChange}
                    className="w-full backdrop-blur-xl bg-white/10 border border-white/20 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-white/40"
                  >
                    <option value="" className="bg-slate-800">Select a service</option>
                    <option value="Business Consulting" className="bg-slate-800">Business Consulting</option>
                    <option value="Employment Consulting" className="bg-slate-800">Employment Consulting</option>
                    <option value="Visa Consulting" className="bg-slate-800">Visa Consulting</option>
                    <option value="Design & Development" className="bg-slate-800">Design & Development</option>
                    <option value="Staffing Services" className="bg-slate-800">Staffing Services</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white mb-2 font-semibold">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full backdrop-blur-xl bg-white/10 border ${
                      hasError(errors, 'message') ? 'border-red-500' : 'border-white/20'
                    } text-white placeholder-white/50 px-6 py-4 rounded-xl focus:outline-none focus:border-white/40 resize-none`}
                    placeholder="Tell us about your needs... (minimum 10 characters)"
                  />
                  {hasError(errors, 'message') && (
                    <p className="text-red-400 text-sm mt-1">{getErrorMessage(errors, 'message')}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <EnhancedLoadingSpinner type="spinner" size="sm" color="text-white" />
                      <span className="ml-2">Sending...</span>
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GlassCard className="p-8 lg:sticky lg:top-24">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    Business Hours
                  </motion.h3>
                  <motion.div 
                    className="space-y-4 text-white/70 mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-white">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-white">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-white">Closed</span>
                    </div>
                  </motion.div>

                  <div className="border-t border-white/10 pt-8">
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      Connect With Us
                    </motion.h3>
                    <motion.p 
                      className="text-white/70 mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      Follow us on social media for updates, insights, and industry news.
                    </motion.p>
                    <motion.div 
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((platform) => (
                        <motion.a
                          key={platform}
                          href="#"
                          className="backdrop-blur-xl bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all text-white"
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {platform}
                        </motion.a>
                      ))}
                    </motion.div>
                  </div>

                  <div className="border-t border-white/10 pt-8 mt-8">
                    <motion.img
                      src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Office"
                      className="rounded-xl w-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}