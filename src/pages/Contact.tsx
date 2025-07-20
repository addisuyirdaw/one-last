import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  User,
  Building
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      titleAm: 'ኢሜይል',
      value: 'info@dbu.edu.et',
      description: 'Send us an email anytime',
      descriptionAm: 'በማንኛውም ጊዜ ኢሜይል ይላኩልን'
    },
    {
      icon: Phone,
      title: 'Phone',
      titleAm: 'ስልክ',
      value: '+251-11-XXX-XXXX',
      description: 'Call us during office hours',
      descriptionAm: 'በቢሮ ሰዓት ውስጥ ይደውሉልን'
    },
    {
      icon: MapPin,
      title: 'Address',
      titleAm: 'አድራሻ',
      value: 'Debre Berhan University',
      description: 'Student Union Building, Room 201',
      descriptionAm: 'የተማሪዎች ማህበር ህንጻ፣ ክፍል 201'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      titleAm: 'የቢሮ ሰዓት',
      value: 'Mon - Fri: 8:00 AM - 5:00 PM',
      description: 'Saturday: 9:00 AM - 1:00 PM',
      descriptionAm: 'ቅዳሜ: ከጠዋቱ 9:00 - ከሰዓት በኋላ 1:00'
    }
  ];

  const branches = [
    { value: 'academic', label: 'Academic Affairs', labelAm: 'የትምህርት ጉዳዮች', email: 'academic@dbu.edu.et' },
    { value: 'clubs', label: 'Clubs & Associations', labelAm: 'ክለቦች እና ማህበራት', email: 'clubs@dbu.edu.et' },
    { value: 'dining', label: 'Dining Services', labelAm: 'ምግብ ቤት', email: 'dining@dbu.edu.et' },
    { value: 'sports', label: 'Sports & Culture', labelAm: 'ስፖርት እና ባህል', email: 'sports@dbu.edu.et' },
    { value: 'general', label: 'General Inquiry', labelAm: 'አጠቃላይ ጥያቄ', email: 'info@dbu.edu.et' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(language === 'am' ? 'እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ' : 'Please fill all required fields');
      return;
    }

    // Simulate sending message
    toast.success(language === 'am' ? 'መልእክትዎ ተልኳል!' : 'Your message has been sent!');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'ያግኙን' : 'Contact Us'}
            </h1>
            <p className={`text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' 
                ? 'ጥያቄዎች፣ አስተያየቶች ወይም ሀሳቦች አሉዎት? እኛ እዚህ ነን እርስዎን ለመርዳት!' 
                : 'Have questions, feedback, or suggestions? We\'re here to help and listen to your concerns.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'የመገናኛ መረጃ' : 'Get in Touch'}
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' 
                ? 'በተለያዩ መንገዶች ማግኘት ይችላሉ። የሚመቸዎትን ይምረጡ።' 
                : 'Reach out to us through any of these channels. We\'re always ready to assist you.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? info.titleAm : info.title}
                </h3>
                <p className="text-lg font-medium text-blue-600 mb-2">
                  {info.value}
                </p>
                <p className={`text-gray-600 text-sm ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? info.descriptionAm : info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                {language === 'am' ? 'መልእክት ይላኩ' : 'Send us a Message'}
              </h2>
              <p className={`text-gray-600 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                {language === 'am' 
                  ? 'ከታች ያለውን ቅጽ በመሙላት መልእክትዎን ይላኩልን' 
                  : 'Fill out the form below and we\'ll get back to you as soon as possible'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ሙሉ ስም' : 'Full Name'} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder={language === 'am' ? 'የእርስዎ ሙሉ ስም' : 'Your full name'}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ኢሜይል አድራሻ' : 'Email Address'} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder={language === 'am' ? 'your.email@dbu.edu.et' : 'your.email@dbu.edu.et'}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label htmlFor="category" className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ምድብ' : 'Category'}
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">{language === 'am' ? 'ምድብ ይምረጡ' : 'Select a category'}</option>
                      {branches.map(branch => (
                        <option key={branch.value} value={branch.value}>
                          {language === 'am' ? branch.labelAm : branch.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ርዕስ' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder={language === 'am' ? 'የመልእክትዎ ርዕስ' : 'Brief subject of your message'}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? 'መልእክት' : 'Message'} *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder={language === 'am' ? 'የእርስዎን መልእክት እዚህ ይጻፉ...' : 'Write your message here...'}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors inline-flex items-center ${language === 'am' ? 'font-ethiopic' : ''}`}
                >
                  <Send className="w-5 h-5 mr-2" />
                  {language === 'am' ? 'መልእክት ላክ' : 'Send Message'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Branch Contacts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'የቅርንጫፍ ኢሜይሎች' : 'Branch Contacts'}
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' 
                ? 'ለተወሰነ ጉዳይ ቀጥተኛ ግንኙነት ይፈልጋሉ? ተገቢውን ቅርንጫፍ ያግኙ።' 
                : 'Need direct contact for specific issues? Reach out to the appropriate branch.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.slice(0, -1).map((branch, index) => (
              <motion.div
                key={branch.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? branch.labelAm : branch.label}
                </h3>
                <a
                  href={`mailto:${branch.email}`}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {branch.email}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'የእኛ አካባቢ' : 'Our Location'}
            </h2>
            <p className={`text-xl text-gray-600 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' 
                ? 'በደብረ ብርሃን ዩኒቨርስቲ ካምፓስ ውስጥ ይገኛል' 
                : 'Located within Debre Berhan University campus'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className={`text-gray-600 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? 'የካርታ ማሳያ እዚህ ይቀመጣል' : 'Interactive map would be placed here'}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Debre Berhan University<br />
                  Student Union Building, Room 201<br />
                  Debre Berhan, Ethiopia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}