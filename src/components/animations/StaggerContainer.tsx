import React from 'react';
import { motion } from 'framer-motion';

interface StaggerContainerProps {
  children: React.ReactNode;
  delayChildren?: number;
  staggerBy?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({ 
  children, 
  delayChildren = 0, 
  staggerBy = 0.1,
  className 
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren,
            staggerChildren: staggerBy,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
