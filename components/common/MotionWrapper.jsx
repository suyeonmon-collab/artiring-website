'use client';

import { motion } from 'framer-motion';

export function MotionWrapper({ 
  children, 
  className = '',
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.6 },
  whileInView,
  viewport = { once: true, amount: 0.2 }
}) {
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.2
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ 
  children, 
  className = ''
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}


