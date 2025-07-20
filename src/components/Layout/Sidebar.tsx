import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Vote, 
  Users, 
  MessageSquare, 
  Building, 
  User,
  Settings,
  Shield,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';

interface NavItem {
  name: string;
  nameAm: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    nameAm: 'ዳሽቦርድ',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['student', 'branch_leader', 'president', 'student_din', 'vice_president', 'secretary', 'speaker', 'academic_affairs', 'general_service', 'dining_services', 'sports_culture', 'clubs_associations']
  },
  {
    name: 'Admin Panel',
    nameAm: 'የአስተዳደር ፓነል',
    href: '/admin',
    icon: Shield,
    roles: ['president', 'student_din', 'vice_president', 'secretary', 'speaker', 'academic_affairs', 'general_service', 'dining_services', 'sports_culture', 'clubs_associations']
  },
  {
    name: 'Elections',
    nameAm: 'ምርጫዎች',
    href: '/elections',
    icon: Vote,
    roles: ['student', 'branch_leader', 'president', 'student_din', 'vice_president', 'secretary', 'speaker', 'academic_affairs', 'general_service', 'dining_services', 'sports_culture', 'clubs_associations']
  },
  {
    name: 'Clubs & Associations',
    nameAm: 'ክለቦች እና ማህበራት',
    href: '/clubs',
    icon: Users,
    roles: ['student', 'branch_leader', 'president', 'student_din', 'vice_president', 'secretary', 'speaker', 'academic_affairs', 'general_service', 'dining_services', 'sports_culture', 'clubs_associations']
  },
  {
    name: 'Complaints',
    nameAm: 'ቅሬታዎች',
    href: '/complaints',
    icon: MessageSquare,
    roles: ['student', 'branch_leader', 'president', 'student_din', 'vice_president', 'secretary', 'speaker', 'academic_affairs', 'general_service', 'dining_services', 'sports_culture', 'clubs_associations']
  },
  {
    name: 'Branches',
    nameAm: 'ቅርንጫፎች',
    href: '/branches',
    icon: Building,
    roles: ['branch_leader', 'president', 'student_din', 'vice_president', 'secretary', 'speaker', 'academic_affairs', 'general_service', 'dining_services', 'sports_culture', 'clubs_associations']
  },
  {
    name: 'Analytics',
    nameAm: 'ትንታኔ',
    href: '/analytics',
    icon: BarChart3,
    roles: ['president', 'student_din']
  }
];

export function Sidebar() {
  const { user } = useAuth();
  const { language } = useLanguage();

  const filteredNavigation = navigation.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:top-16">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
        <nav className="flex-1 px-4 pb-4 space-y-1">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <motion.div
                  className="flex items-center w-full"
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  <span className={`${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? item.nameAm : item.name}
                  </span>
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <NavLink
            to="/profile"
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <User className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
            <span className={`${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'መገለጫ' : 'Profile'}
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}