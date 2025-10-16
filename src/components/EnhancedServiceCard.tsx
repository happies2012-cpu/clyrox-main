import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GlassCard from './GlassCard';

interface EnhancedServiceCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  hero_image?: string;
  slug: string;
  delay?: number;
}

export default function EnhancedServiceCard({ 
  id, 
  title, 
  subtitle, 
  description, 
  hero_image, 
  slug,
  delay = 0 
}: EnhancedServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <GlassCard className="p-8 h-full flex flex-col overflow-hidden">
        <div className="overflow-hidden rounded-xl mb-6 -mx-8 -mt-8">
          <motion.img
            src={hero_image || `https://source.unsplash.com/random/600x400?business,${id}`}
            alt={title}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/60 mb-4">{subtitle}</p>
        <p className="text-white/70 mb-6 flex-grow line-clamp-3">{description}</p>

        <motion.a
          href={`/services/${slug}`}
          className="inline-flex items-center gap-2 text-white hover:gap-4 transition-all font-semibold mt-auto"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More <ArrowRight className="w-5 h-5" />
        </motion.a>
      </GlassCard>
    </motion.div>
  );
}