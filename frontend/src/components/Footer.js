import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-ocean-blue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Oceara</h3>
            <p className="text-sm">Empowering individuals to make a positive impact on our oceans and environment.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
              <li><Link to="/leaderboard" className="hover:text-gray-300">Leaderboard</Link></li>
              <li><Link to="/profile" className="hover:text-gray-300">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Blog</a></li>
              <li><a href="#" className="hover:text-gray-300">FAQs</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-gray-300"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-gray-300"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-gray-300"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 Oceara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;