"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiMonitor } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Guide', href: '/guide' },
    { name: 'Troubleshooting', href: '/troubleshooting' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center"
              >
                <div className="w-8 h-8 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-2">
                  <FiMonitor className="text-white" size={18} />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  ScreenView
                </span>
              </motion.div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navigation.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`text-gray-300 hover:text-white transition-colors ${
                  pathname === item.href ? 'text-white' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                className="absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-800 py-3 px-4 md:hidden"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <div className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    <Link 
                      key={item.name}
                      href={item.href}
                      className={`text-gray-300 hover:text-white transition-colors ${
                        pathname === item.href ? 'text-white' : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          variants={menuVariants}
          className="md:hidden bg-gray-900 border-b border-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <motion.div variants={itemVariants}>
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-800"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/guide"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={toggleMenu}
              >
                Guide
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={toggleMenu}
              >
                About
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <a
                href="https://github.com/aass0810"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={toggleMenu}
              >
                GitHub
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 