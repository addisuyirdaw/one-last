import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function Footer() {
  const { language } = useLanguage();

  const quickLinks = [
    { name: 'About Us', nameAm: 'ስለ እኛ', href: '/about' },
    { name: 'Branches', nameAm: 'ቅርንጫፎች', href: '/branches' },
    { name: 'Elections', nameAm: 'ምርጫዎች', href: '/elections' },
    { name: 'Clubs', nameAm: 'ክለቦች', href: '/clubs' },
    { name: 'Contact', nameAm: 'ያግኙን', href: '/contact' }
  ];

  const services = [
    { name: 'Academic Support', nameAm: 'የትምህርት ድጋፍ' },
    { name: 'Student Counseling', nameAm: 'የተማሪ ምክር' },
    { name: 'Club Registration', nameAm: 'የክለብ ምዝገባ' },
    { name: 'Complaint Resolution', nameAm: 'የቅሬታ መፍትሄ' },
    { name: 'Event Planning', nameAm: 'የዝግጅት እቅድ' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">DBU</span>
              </div>
              <div className={`${language === 'am' ? 'font-ethiopic' : ''}`}>
                <div className="font-bold text-lg">
                  {language === 'am' ? 'የተማሪዎች ማህበር' : 'Student Union'}
                </div>
                <div className="text-gray-300 text-sm">
                  {language === 'am' ? 'ደብረ ብርሃን ዩኒቨርስቲ' : 'Debre Berhan University'}
                </div>
              </div>
            </div>
            <p className={`text-gray-300 text-sm leading-relaxed ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' 
                ? 'የተማሪዎችን ድምጽ የሚወክል እና የዩኒቨርስቲ ህይወትን የሚያሻሽል ድርጅት' 
                : 'Empowering students through leadership, service, and academic excellence at Debre Berhan University'}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold text-white mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'ፈጣን አገናኞች' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`text-gray-300 hover:text-white transition-colors text-sm ${language === 'am' ? 'font-ethiopic' : ''}`}
                  >
                    {language === 'am' ? link.nameAm : link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={`font-semibold text-white mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'አገልግሎቶች' : 'Services'}
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className={`text-gray-300 text-sm ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? service.nameAm : service.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`font-semibold text-white mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'ያግኙን' : 'Contact Us'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className={`text-gray-300 text-sm ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  <div>Student Union Building</div>
                  <div>Debre Berhan University</div>
                  <div>Debre Berhan, Ethiopia</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a href="mailto:info@dbu.edu.et" className="text-gray-300 hover:text-white text-sm transition-colors">
                  info@dbu.edu.et
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a href="tel:+251940414243" className="text-gray-300 hover:text-white text-sm transition-colors">
                  +251 940 414 243
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className={`text-gray-400 text-sm ${language === 'am' ? 'font-ethiopic' : ''}`}>
                © {new Date().getFullYear()} {language === 'am' ? 'ደብረ ብርሃን ዩኒቨርስቲ የተማሪዎች ማህበር። ሁሉም መብቶች የተጠበቁ ናቸው።' : 'Debre Berhan University Student Union. All rights reserved.'}
              </p>
              <div className="flex space-x-6 mt-4 sm:mt-0">
                <a href="#" className={`text-gray-400 hover:text-white text-sm transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? 'የግላዊነት ፖሊሲ' : 'Privacy Policy'}
                </a>
                <a href="#" className={`text-gray-400 hover:text-white text-sm transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? 'አጠቃቀም ውሎች' : 'Terms of Use'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}