import React from 'react';
import { motion } from 'framer-motion';

export const Wave = () => (
  <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
    <motion.path
      initial={{ d: "M0,320L48,298.7C96,277,192,235,288,224C384,213,480,235,576,245.3C672,256,768,256,864,240C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
      animate={{
        d: [
          "M0,320L48,298.7C96,277,192,235,288,224C384,213,480,235,576,245.3C672,256,768,256,864,240C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
          "M0,320L48,304C96,288,192,256,288,245.3C384,235,480,245,576,240C672,235,768,213,864,213.3C960,213,1056,235,1152,245.3C1248,256,1344,256,1392,256L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ]
      }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 10 }}
      fill="#3b82f6"
      fillOpacity="0.8"
    />
  </svg>
);

export const Ship = () => (
  <motion.div
    className="absolute top-1/4 left-0"
    animate={{
      x: ["0%", "100%"],
      rotate: [0, 5, 0, -5, 0]
    }}
    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
  >
    <span role="img" aria-label="ship" className="text-6xl">🚢</span>
  </motion.div>
);

export const Fish = () => (
  <motion.div
    className="absolute bottom-1/4 right-0"
    animate={{
      x: ["0%", "-100%"],
      y: [0, -20, 0, 20, 0]
    }}
    transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
  >
    <span role="img" aria-label="fish" className="text-4xl">🐠</span>
  </motion.div>
);

export const Seaweed = () => (
  <motion.div
    className="absolute bottom-0 left-1/4"
    animate={{
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ duration: 3, repeat: Infinity }}
  >
    <span role="img" aria-label="seaweed" className="text-5xl">🌿</span>
  </motion.div>
);