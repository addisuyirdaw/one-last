import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Vote, 
  Users, 
  MessageSquare, 
  Building, 
  Award,
  ArrowRight,
  TrendingUp,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { PublicLayout } from '../components/Layout/PublicLayout';

export function Home() {
  const { language } = useLanguage();
  const { user } = useAuth();

  const features = [
    {
      icon: Vote,
      title: 'Democratic Elections',
      titleAm: 'ዲሞክራሲያዊ ምርጫዎች',
      description: 'Participate in secure, transparent student elections',
      descriptionAm: 'በአስተማማኝ እና ግልጽ የተማሪዎች ምርጫዎች ይሳተፉ',
      link: '/elections'
    },
    {
      icon: Users,
      title: 'Student Clubs',
      titleAm: 'የተማሪ ክለቦች',
      description: 'Join or create clubs and associations',
      descriptionAm: 'ክለቦችን እና ማህበራትን ይቀላቀሉ ወይም ይፍጠሩ',
      link: '/clubs'
    },
    {
      icon: MessageSquare,
      title: 'Voice Your Concerns',
      titleAm: 'ቅሬታዎችዎን ያቅርቡ',
      description: 'Submit complaints and track their resolution',
      descriptionAm: 'ቅሬታዎችን ያቅርቡ እና መፍትሄያቸውን ይከታተሉ',
      link: '/complaints'
    },
    {
      icon: Building,
      title: 'Branch Services',
      titleAm: 'የቅርንጫፍ አገልግሎቶች',
      description: 'Access specialized services from different branches',
      descriptionAm: 'ከተለያዩ ቅርንጫፎች ልዩ አገልግሎቶችን ያግኙ',
      link: '/branches'
    }
  ];

  const stats = [
    { number: '12,547', label: 'Active Students', labelAm: 'ንቁ ተማሪዎች' },
    { number: '47', label: 'Student Clubs', labelAm: 'የተማሪ ክለቦች' },
    { number: '10', label: 'Service Branches', labelAm: 'የአገልግሎት ቅርንጫፎች' },
    { number: '95%', label: 'Satisfaction Rate', labelAm: 'የእርካታ መጠን' }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Student Union President Election 2024',
      titleAm: 'የ2024 የተማሪዎች ማህበር ፕሬዚደንት ምርጫ',
      date: '2024-02-01',
      urgent: true
    },
    {
      id: 2,
      title: 'Annual Cultural Festival Registration Open',
      titleAm: 'ዓመታዊ የባህል ፌስቲቫል ምዝገባ ተከፍቷል',
      date: '2024-01-25',
      urgent: false
    },
    {
      id: 3,
      title: 'New Club Registration Guidelines Updated',
      titleAm: 'አዲስ የክለብ ምዝገባ መመሪያዎች ተዘምነዋል',
      date: '2024-01-20',
      urgent: false
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center mb-8">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                  <span className="text-3xl font-bold">DBU</span>
                </div>
                <div className={`text-center sm:text-left ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  <h1 className="text-4xl md:text-6xl font-bold mb-2">
                    {language === 'am' ? 'የተማሪዎች ማህበር' : 'Student Union'}
                  </h1>
                  <p className="text-xl text-blue-100">
                    {language === 'am' ? 'ደብረ ብርሃን ዩኒቨርስቲ' : 'Debre Berhan University'}
                  </p>
                </div>
              </div>
              
              <p className={`text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto ${language === 'am' ? 'font-ethiopic' : ''}`}>
                {language === 'am' 
                  ? 'የተማሪዎች ድምጽ፣ የተማሪዎች ምርጫ፣ የተማሪዎች ወደፊት' 
                  : 'Your Voice, Your Choice, Your Future'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                {!user ? (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/login"
                      className={`inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl ${language === 'am' ? 'font-ethiopic' : ''}`}
                    >
                      {language === 'am' ? 'ይግቡ' : 'Get Started'}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/dashboard"
                      className={`inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl ${language === 'am' ? 'font-ethiopic' : ''}`}
                    >
                      {language === 'am' ? 'ወደ ዳሽቦርድ' : 'Go to Dashboard'}
                    </Link>
                  </motion.div>
                )}
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/about"
                    className={`inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition-all duration-200 backdrop-blur-sm ${language === 'am' ? 'font-ethiopic' : ''}`}
                  >
                    {language === 'am' ? 'ስለ እኛ' : 'Learn More'}
                  </Link>
                </motion.div>
              </div>

              {/* Hero Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                  >
                    <div className="text-2xl md:text-3xl font-bold mb-2">
                      {stat.number}
                    </div>
                    <div className={`text-blue-100 text-sm ${language === 'am' ? 'font-ethiopic' : ''}`}>
                      {language === 'am' ? stat.labelAm : stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'የእኛ አገልግሎቶች' : 'Our Services'}
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' 
                ? 'የተማሪዎች ማህበር የሚያቀርባቸው ዋና ዋና አገልግሎቶች' 
                : 'Comprehensive services designed to enhance your university experience'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-3 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? feature.titleAm : feature.title}
                </h3>
                <p className={`text-gray-600 mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? feature.descriptionAm : feature.description}
                </p>
                <Link
                  to={feature.link}
                  className={`inline-flex items-center text-blue-600 hover:text-blue-700 font-medium ${language === 'am' ? 'font-ethiopic' : ''}`}
                >
                  {language === 'am' ? 'ተጨማሪ' : 'Learn More'}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'ማስታወቂያዎች' : 'Latest Announcements'}
            </h2>
            <Link
              to="/announcements"
              className={`text-blue-600 hover:text-blue-700 font-medium ${language === 'am' ? 'font-ethiopic' : ''}`}
            >
              {language === 'am' ? 'ሁሉንም ይመልከቱ' : 'View All'}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl p-6 hover:shadow-md transition-shadow ${
                  announcement.urgent ? 'border-l-4 border-red-500' : ''
                }`}
              >
                {announcement.urgent && (
                  <span className={`inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mb-3 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'አስቸኳይ' : 'Urgent'}
                  </span>
                )}
                <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? announcement.titleAm : announcement.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(announcement.date).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
            {language === 'am' ? 'የተማሪዎች ማህበር አባል ይሁኑ' : 'Join the Student Union Community'}
          </h2>
          <p className={`text-xl text-blue-100 mb-8 max-w-3xl mx-auto ${language === 'am' ? 'font-ethiopic' : ''}`}>
            {language === 'am' 
              ? 'ድምጽዎን ያሰሙ፣ ለውጥ ያምጡ፣ የዩኒቨርስቲ ህይወትዎን ያሻሽሉ' 
              : 'Make your voice heard, drive change, and enhance your university experience'}
          </p>
          {!user && (
            <Link
              to="/login"
              className={`bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors inline-flex items-center ${language === 'am' ? 'font-ethiopic' : ''}`}
            >
              {language === 'am' ? 'ዛሬ ይጀምሩ' : 'Get Started Today'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}