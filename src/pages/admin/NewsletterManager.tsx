import { useEffect, useState } from 'react';
import { supabase, NewsletterSubscription } from '../../lib/supabase';
import { Trash2, Mail, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function NewsletterManager() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    const { data } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setSubscriptions(data);
  };

  const handleDelete = async (id: string) => {
    // Automatically confirm deletion instead of prompting user
    const { error } = await supabase.from('newsletter_subscriptions').delete().eq('id', id);
    if (error) {
      toast.error('Error deleting subscription: ' + error.message);
    } else {
      toast.success('Subscription deleted successfully');
      loadSubscriptions();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold text-white mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Newsletter Subscribers
      </motion.h1>

      <motion.div 
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <table className="w-full text-left text-white/80">
          <thead className="bg-white/10">
            <tr>
              <th className="p-4 flex items-center gap-2"><Mail className="w-4 h-4" /> Email</th>
              <th className="p-4 flex items-center gap-2"><Calendar className="w-4 h-4" /> Subscribed On</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription, index) => (
              <motion.tr 
                key={subscription.id} 
                className="border-b border-white/10 last:border-b-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                <td className="p-4">{subscription.email}</td>
                <td className="p-4">{formatDate(subscription.created_at)}</td>
                <td className="p-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(subscription.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-md"
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Trash2 className="w-4 h-4 text-red-300" />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}