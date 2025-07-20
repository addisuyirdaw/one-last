import React from 'react';
import { Bell, User, Globe, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

export function Header() {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DBU</span>
              </div>
              <div className={`${language === 'am' ? 'font-ethiopic' : ''}`}>
                <h1 className="text-xl font-semibold text-gray-900">
                  {language === 'am' ? 'የተማሪዎች ማህበር' : 'Student Union Portal'}
                </h1>
                <p className="text-sm text-gray-500">
                  {language === 'am' ? 'ደብረ ብርሃን ዩኒቨርስቲ' : 'Debre Berhan University'}
                </p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'አማርኛ' : 'English'}</span>
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <div className="flex items-center space-x-3">
                <div className={`text-right ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500">
                    {user?.role === 'student_din' && (language === 'am' ? 'የተማሪዎች ዲን' : 'Student Din')}
                    {user?.role === 'president' && (language === 'am' ? 'ፕሬዚደንት' : 'President')}
                    {user?.role === 'branch_leader' && (language === 'am' ? 'የቅርንጫፍ መሪ' : 'Branch Leader')}
                    {user?.role === 'student' && (language === 'am' ? 'ተማሪ' : 'Student')}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}