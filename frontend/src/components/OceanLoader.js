import React from 'react';
import { motion } from 'framer-motion';

const OceanLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-ocean-blue bg-opacity-80 z-50">
      <div className="relative w-40 h-40">
        <motion.div
          className="absolute inset-0 border-4 border-white rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-4 border-4 border-coral rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-8 bg-seagreen rounded-full"
          animate={{
            scale: [1, 0.9, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <p className="absolute mt-32 text-white text-xl font-semibold">Diving into the ocean...</p>
    </div>
  );
};

export default OceanLoader;