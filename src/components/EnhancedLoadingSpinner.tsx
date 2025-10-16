import { motion } from 'framer-motion';

interface EnhancedLoadingSpinnerProps {
  type?: 'spinner' | 'bars' | 'dots' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  message?: string;
  className?: string;
}

export default function EnhancedLoadingSpinner({ 
  type = 'spinner',
  size = 'md', 
  color = 'text-white',
  message,
  className = ''
}: EnhancedLoadingSpinnerProps) {
  const sizeClasses = {
    sm: { container: 'w-4 h-4', bar: 'w-1 h-4', dot: 'w-2 h-2', pulse: 'w-4 h-4' },
    md: { container: 'w-8 h-8', bar: 'w-2 h-8', dot: 'w-3 h-3', pulse: 'w-8 h-8' },
    lg: { container: 'w-12 h-12', bar: 'w-3 h-12', dot: 'w-4 h-4', pulse: 'w-12 h-12' }
  };

  const currentSize = sizeClasses[size];

  const renderSpinner = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
      className={`${currentSize.container} border-4 border-t-current border-r-current border-b-transparent border-l-transparent rounded-full ${color}`}
    />
  );

  const renderBars = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          animate={{ height: ['30%', '100%', '30%'] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1
          }}
          className={`${currentSize.bar} bg-current ${color} rounded-t`}
        />
      ))}
    </div>
  );

  const renderDots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2
          }}
          className={`${currentSize.dot} bg-current ${color} rounded-full`}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`${currentSize.pulse} bg-current ${color} rounded-full opacity-70`}
    />
  );

  const renderComponent = () => {
    switch (type) {
      case 'bars': return renderBars();
      case 'dots': return renderDots();
      case 'pulse': return renderPulse();
      default: return renderSpinner();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {renderComponent()}
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