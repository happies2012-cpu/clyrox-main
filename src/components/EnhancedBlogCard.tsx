import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import GlassCard from './GlassCard';

interface EnhancedBlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  published_at: string;
  category: string;
  featured_image?: string;
  slug: string;
  delay?: number;
}

export default function EnhancedBlogCard({ 
  id, 
  title, 
  excerpt, 
  author, 
  published_at, 
  category, 
  featured_image,
  slug,
  delay = 0 
}: EnhancedBlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <GlassCard className="overflow-hidden h-full flex flex-col">
        <div className="overflow-hidden">
          <motion.img
            src={featured_image || `https://source.unsplash.com/random/600x400?business,technology,${id}`}
            alt={title}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
              {category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{title}</h3>
          <p className="text-white/70 mb-4 flex-grow line-clamp-3">{excerpt}</p>
          <div className="flex items-center justify-between text-sm text-white/60 mt-auto">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(published_at)}</span>
            </div>
          </div>
          <motion.a
            href={`/blog/${slug}`}
            className="inline-block mt-4 text-primary hover:text-primary-light font-semibold transition-colors"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Read More
          </motion.a>
        </div>
      </GlassCard>
    </motion.div>
  );
}