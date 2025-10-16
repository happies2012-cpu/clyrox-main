import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AnimatedSection from './AnimatedSection';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error('Please enter your email address.');
      setLoading(false);
      return;
    }

    // Simulate newsletter subscription without Supabase
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-slate-900 to-black">
      <div className="max-w-5xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-xl text-white/70 mb-10">
            Subscribe to our newsletter for the latest insights and industry news.
          </p>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 px-6 py-4 rounded-full focus:outline-none focus:border-white/40"
              />
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold transition-all whitespace-nowrap disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}