import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarVariants = {
    top: { backgroundColor: 'rgba(0, 105, 148, 0.6)' },
    scrolled: { backgroundColor: 'rgba(0, 105, 148, 1)' },
  };

  const linkVariants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <motion.nav 
      className="fixed w-full z-50 transition-colors duration-300"
      initial="top"
      animate={scrollY > 20 ? 'scrolled' : 'top'}
      variants={navbarVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img className="h-8 w-auto mr-2" src="../logo.png" alt="Oceara" />
            <span className="text-white font-bold text-xl">Oceara</span>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {['Home', 'Dashboard', 'Leaderboard'].map((item, index) => (
                <motion.div key={item} variants={linkVariants} initial="initial" animate="animate" transition={{ delay: index * 0.1 }}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={`text-gray-300 hover:bg-ocean-blue-dark hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'bg-ocean-blue-dark text-white' : ''
                    }`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              {isAuthenticated && (
                <motion.div variants={linkVariants} initial="initial" animate="animate" transition={{ delay: 0.3 }}>
                  <Link to="/profile" className="text-gray-300 hover:bg-ocean-blue-dark hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Profile
                  </Link>
                </motion.div>
              )}
              {isAuthenticated ? (
                <motion.div variants={linkVariants} initial="initial" animate="animate" transition={{ delay: 0.4 }}>
                  <button 
                    onClick={() => logout({ returnTo: window.location.origin })}
                    className="text-gray-300 hover:bg-ocean-blue-dark hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Log Out
                  </button>
                </motion.div>
              ) : (
                <motion.div variants={linkVariants} initial="initial" animate="animate" transition={{ delay: 0.3 }}>
                  <button 
                    onClick={() => loginWithRedirect()}
                    className="bg-coral text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition duration-300"
                  >
                    Log In
                  </button>
                </motion.div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-ocean-blue-dark inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-ocean-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ocean-blue-dark focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Home', 'Dashboard', 'Leaderboard', 'Profile'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-gray-300 hover:bg-ocean-blue-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {item}
              </Link>
            ))}
            {isAuthenticated ? (
              <button 
                onClick={() => logout({ returnTo: window.location.origin })}
                className="text-gray-300 hover:bg-ocean-blue-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Log Out
              </button>
            ) : (
              <button 
                onClick={() => loginWithRedirect()}
                className="bg-coral text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-opacity-90 transition duration-300"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;