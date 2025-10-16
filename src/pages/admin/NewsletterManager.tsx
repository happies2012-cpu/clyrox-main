import { useState } from 'react';
import { Trash2, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../../components/GlassCard';
import AnimatedSection from '../../components/AnimatedSection';
import { motion } from 'framer-motion';

// Define the NewsletterSubscription interface
interface NewsletterSubscription {
  id: string;
  created_at: string;
  email: string;
  is_subscribed: boolean;
}

export default function NewsletterManager() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscription[]>([
    {
      id: '1',
      created_at: new Date().toISOString(),
      email: 'subscriber@example.com',
      is_subscribed: true
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove the subscriber from state
    setSubscribers(subscribers.filter(subscriber => subscriber.id !== id));
    toast.success('Subscriber removed successfully');
  };

  const filteredSubscribers = subscribers.filter(subscriber => 
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Newsletter Subscribers
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <input
          type="text"
          placeholder="Search subscribers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-white/40 transition-all"
        />
      </motion.div>

      {filteredSubscribers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8 text-center">
            <p className="text-xl text-white/70">No subscribers found.</p>
          </GlassCard>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-lg p-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-semibold text-white/80">
              <div>Email</div>
              <div>Subscription Date</div>
              <div>Actions</div>
            </div>
          </motion.div>
          {filteredSubscribers.map((subscriber, index) => (
            <AnimatedSection key={subscriber.id} delay={index * 0.05}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/5 border border-white/10 rounded-lg p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-white/50" />
                    <span className="text-white">{subscriber.email}</span>
                  </div>
                  <div className="text-white/70">
                    {new Date(subscriber.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDelete(subscriber.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-md transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4 text-red-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
}