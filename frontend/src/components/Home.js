import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';
import { Wave, Ship, Fish, Seaweed } from './OceanAnimations';

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-400 to-blue-900 overflow-hidden">
      <Wave />
      <Ship />
      <Fish />
      <Seaweed />
      
      <motion.div 
        className="container mx-auto px-4 py-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-6xl font-bold text-white mb-6 text-center">
          Welcome to Oceara
        </motion.h1>
        <motion.p variants={itemVariants} className="text-2xl mb-12 text-blue-100 text-center max-w-3xl mx-auto">
          Join our global community in the mission to clean our oceans, protect marine life, and preserve our planet for future generations.
        </motion.p>
        
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { title: 'Clean Oceans', icon: '🌊', description: 'Participate in beach cleanups and help remove waste from our oceans. Every piece of trash collected makes a difference.' },
            { title: 'Plant Trees', icon: '🌳', description: 'Contribute to reforestation efforts and help absorb CO2 from the atmosphere. Each tree planted is a step towards a greener future.' },
            { title: 'Track Impact', icon: '📊', description: 'Visualize your environmental impact and compete with others on the leaderboard. See how your actions are making a real difference.' },
          ].map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 transform hover:scale-105 transition duration-300">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h2 className="text-2xl font-semibold text-white mb-4">{item.title}</h2>
              <p className="text-blue-100 mb-4">{item.description}</p>
              <Link to="/dashboard" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">Learn More</Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join the Movement</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">Together, we can make a significant impact on our planet's health. Start your journey as an Ocean Guardian today!</p>
          {isAuthenticated ? (
            <Link to="/dashboard" className="inline-block bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300">Go to Dashboard</Link>
          ) : (
            <button onClick={() => loginWithRedirect()} className="inline-block bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-300">Get Started Now</button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;