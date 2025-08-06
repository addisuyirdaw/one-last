import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export function PublicHeader() {
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', nameAm: 'ዋና ገጽ', href: '/' },
    { name: 'About', nameAm: 'ስለ እኛ', href: '/about' },
    { name: 'Branches', nameAm: 'ቅርንጫፎች', href: '/branches' },
    { name: 'Contact', nameAm: 'ያግኙን', href: '/contact' }
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DBU</span>
              </div>
              <div className={`hidden sm:block ${language === 'am' ? 'font-ethiopic' : ''}`}>
                <div className={`font-semibold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                  {language === 'am' ? 'የተማሪዎች ማህበር' : 'Student Union'}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`font-medium transition-colors relative ${
                    isActive(item.href)
                      ? isScrolled 
                        ? 'text-blue-600' 
                        : 'text-white'
                      : isScrolled
                        ? 'text-gray-700 hover:text-blue-600'
                        : 'text-white/80 hover:text-white'
                  } ${language === 'am' ? 'font-ethiopic' : ''}`}
                >
                  {language === 'am' ? item.nameAm : item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                        isScrolled ? 'bg-blue-600' : 'bg-white'
                      }`}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white/80 hover:bg-white/10'
                } ${language === 'am' ? 'font-ethiopic' : ''}`}
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'አማ' : 'EN'}</span>
              </motion.button>

              {/* Login Button */}
              <Link
                to="/login"
                className={`hidden sm:inline-flex px-4 py-2 rounded-lg font-medium transition-colors ${
                  isScrolled
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                } ${language === 'am' ? 'font-ethiopic' : ''}`}
              >
                {language === 'am' ? 'ግባ' : 'Login'}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-4 py-4 space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    } ${language === 'am' ? 'font-ethiopic' : ''}`}
                  >
                    {language === 'am' ? item.nameAm : item.name}
                  </Link>
                ))}
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 bg-blue-600 text-white rounded-lg font-medium text-center hover:bg-blue-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
                >
                  {language === 'am' ? 'ግባ' : 'Login'}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16"></div>
    </>
  );
}