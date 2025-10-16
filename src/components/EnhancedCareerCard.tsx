import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import GlassCard from './GlassCard';

interface EnhancedCareerCardProps {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  salary_range?: string;
  description: string;
  delay?: number;
}

export default function EnhancedCareerCard({ 
  id, 
  title, 
  department, 
  location, 
  employment_type, 
  salary_range,
  description,
  delay = 0 
}: EnhancedCareerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <GlassCard className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-primary-light font-semibold">{department}</p>
          </div>
          {employment_type && (
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full">
              {employment_type}
            </span>
          )}
        </div>
        
        <p className="text-white/70 mb-6 flex-grow line-clamp-3">{description}</p>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-white/60">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          {salary_range && (
            <div className="flex items-center gap-2 text-white/60">
              <DollarSign className="w-4 h-4" />
              <span>{salary_range}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-white/60">
            <Clock className="w-4 h-4" />
            <span>Full-time</span>
          </div>
        </div>
        
        <motion.a
          href={`/career/${id}`}
          className="inline-block backdrop-blur-xl bg-white text-slate-900 px-4 py-2 rounded-lg text-center font-semibold hover:bg-white/90 transition-all mt-auto"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          View Details
        </motion.a>
      </GlassCard>
    </motion.div>
  );
}