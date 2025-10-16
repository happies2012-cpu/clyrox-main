import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
}

export default function GlassCard({ 
  children, 
  className = '', 
  onClick,
  role,
  tabIndex,
  'aria-label': ariaLabel
}: GlassCardProps) {
  const baseClasses = "backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl";
  
  // If onClick is provided, make it interactive
  const interactiveProps = onClick ? {
    onClick,
    role: role || 'button',
    tabIndex: tabIndex || 0,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    },
    'aria-label': ariaLabel,
  } : {};
  
  // If it's interactive but no specific role is given, default to button
  const finalRole = interactiveProps.role || role;
  
  return (
    <div 
      className={`${baseClasses} ${className}`}
      {...interactiveProps}
      role={finalRole}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}