import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  message?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'text-white',
  message,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const borderSize = {
    sm: 'border-2',
    md: 'border-4',
    lg: 'border-4'
  };

  const borderColorClass = color === 'text-white' 
    ? 'border-t-white border-r-white border-b-transparent border-l-transparent'
    : 'border-t-current border-r-current border-b-transparent border-l-transparent';

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`${sizeClasses[size]} ${borderSize[size]} ${borderColorClass} rounded-full`}
      />
      {message && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`mt-3 ${color} ${size === 'sm' ? 'text-sm' : 'text-base'}`}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}