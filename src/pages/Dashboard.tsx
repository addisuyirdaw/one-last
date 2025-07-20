import React from 'react';
import { 
  Users, 
  Vote, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Bell,
  Award,
  Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

interface StatCard {
  title: string;
  titleAm: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const stats: StatCard[] = [
  {
    title: 'Active Students',
    titleAm: 'ንቁ ተማሪዎች',
    value: '12,547',
    change: '+12%',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'Ongoing Elections',
    titleAm: 'በመካሄድ ላይ ያሉ ምርጫዎች',
    value: '3',
    change: '2 ending soon',
    icon: Vote,
    color: 'bg-green-500'
  },
  {
    title: 'Active Clubs',
    titleAm: 'ንቁ ክለቦች',
    value: '47',
    change: '+5 this month',
    icon: Award,
    color: 'bg-purple-500'
  },
  {
    title: 'Pending Complaints',
    titleAm: 'በመጠበቅ ላይ ያሉ ቅሬታዎች',
    value: '23',
    change: '-8 resolved',
    icon: MessageSquare,
    color: 'bg-orange-500'
  }
];

const recentActivities = [
  {
    id: 1,
    title: 'New election started: Student Union President',
    titleAm: 'አዲስ ምርጫ ተጀመረ፦ የተማሪዎች ማህበር ፕሬዚደንት',
    time: '2 hours ago',
    timeAm: 'ከ2 ሰዓት በፊት',
    type: 'election'
  },
  {
    id: 2,
    title: 'Drama Club submitted monthly report',
    titleAm: 'የድራማ ክለብ ወርሃዊ ሪፖርት አቀረቡ',
    time: '4 hours ago',
    timeAm: 'ከ4 ሰዓት በፊት',
    type: 'club'
  },
  {
    id: 3,
    title: 'Complaint resolved: Library access issue',
    titleAm: 'ቅሬታ ተፈትቷል፦ የቤተ መፅሐፍት መዳረሻ ችግር',
    time: '1 day ago',
    timeAm: 'ከ1 ቀን በፊት',
    type: 'complaint'
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Annual Cultural Festival',
    titleAm: 'ዓመታዊ የባህል ፌስቲቫል',
    date: '2024-02-15',
    time: '09:00 AM',
    location: 'Main Campus',
    locationAm: 'ዋና ካምፓስ'
  },
  {
    id: 2,
    title: 'Student Council Meeting',
    titleAm: 'የተማሪዎች ምክር ቤት ስብሰባ',
    date: '2024-02-10',
    time: '02:00 PM',
    location: 'Conference Hall',
    locationAm: 'የጉባኤ አዳራሽ'
  }
];

export function Dashboard() {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'am') {
      if (hour < 12) return 'እንደምን አደሩ';
      if (hour < 17) return 'እንደምን ወትሩ';
      return 'እንደምን አመሸሉ';
    } else {
      if (hour < 12) return 'Good morning';
      if (hour < 17) return 'Good afternoon';
      return 'Good evening';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white"
      >
        <div className={`${language === 'am' ? 'font-ethiopic' : ''}`}>
          <h1 className="text-2xl font-bold mb-2">
            {getGreeting()}, {user?.name}!
          </h1>
          <p className="text-blue-100">
            {language === 'am' 
              ? 'ወደ የተማሪዎች ማህበር ፖርታልዎ እንኳን በደህና መጡ' 
              : 'Welcome to your Student Union Portal'}
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className={`${language === 'am' ? 'font-ethiopic' : ''}`}>
                <p className="text-sm font-medium text-gray-600">
                  {language === 'am' ? stat.titleAm : stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold text-gray-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'የቅርብ ጊዜ እንቅስቃሴ' : 'Recent Activity'}
            </h3>
            <Bell className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  activity.type === 'election' ? 'bg-green-500' :
                  activity.type === 'club' ? 'bg-purple-500' : 'bg-orange-500'
                }`}></div>
                <div className="flex-1">
                  <p className={`text-sm font-medium text-gray-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? activity.titleAm : activity.title}
                  </p>
                  <p className={`text-xs text-gray-500 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? activity.timeAm : activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold text-gray-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'የሚመጡ ዝግጅቶች' : 'Upcoming Events'}
            </h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <h4 className={`font-medium text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? event.titleAm : event.title}
                </h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                </div>
                <p className={`text-sm text-gray-500 mt-1 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? event.locationAm : event.location}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      {user?.role !== 'student' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
            {language === 'am' ? 'ፈጣን እርምጃዎች' : 'Quick Actions'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Vote className="w-5 h-5 text-blue-600" />
                </div>
                <div className={`${language === 'am' ? 'font-ethiopic' : ''}`}>
                  <p className="font-medium text-gray-900">
                    {language === 'am' ? 'አዲስ ምርጫ ጀምር' : 'Start New Election'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {language === 'am' ? 'የተማሪዎች ምርጫ ይፍጠሩ' : 'Create student election'}
                  </p>
                </div>
              </div>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div className={`${language === 'am' ? 'font-ethiopic' : ''}`}>
                  <p className="font-medium text-gray-900">
                    {language === 'am' ? 'ክለቦችን ያስተዳድሩ' : 'Manage Clubs'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {language === 'am' ? 'የክለብ ጥያቄዎችን ይገምግሙ' : 'Review club requests'}
                  </p>
                </div>
              </div>
            </button>

            <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div className={`${language === 'am' ? 'font-ethiopic' : ''}`}>
                  <p className="font-medium text-gray-900">
                    {language === 'am' ? 'ሪፖርቶችን ይመልከቱ' : 'View Reports'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {language === 'am' ? 'የተዋህዶ ትንታኔዎች' : 'Analytics and insights'}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}