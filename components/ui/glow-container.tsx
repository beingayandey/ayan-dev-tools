import React from 'react';
import { motion } from 'framer-motion';

interface GlowContainerProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'primary' | 'success' | 'warning' | 'error';
  hoverEffect?: boolean;
  pulse?: boolean;
}

export const GlowContainer: React.FC<GlowContainerProps> = ({
  children,
  className = '',
  glowColor = 'primary',
  hoverEffect = true,
  pulse = false
}) => {
  const glowClass = `glow-${glowColor}`;
  const hoverClass = hoverEffect ? 'glow-on-hover' : '';
  const pulseClass = pulse ? 'animate-pulse' : '';

  return (
    <motion.div
      whileHover={hoverEffect ? { scale: 1.02 } : {}}
      whileTap={hoverEffect ? { scale: 0.98 } : {}}
      className={`${glowClass} ${hoverClass} ${pulseClass} transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};