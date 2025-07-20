import React, { useState } from 'react';
import { Mail, Phone, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { branches } from '../data/branches';
import { motion } from 'framer-motion';

export function Branches() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [expandedBranch, setExpandedBranch] = useState<string | null>(null);

  const toggleBranch = (branchId: string) => {
    setExpandedBranch(expandedBranch === branchId ? null : branchId);
  };

  const getHierarchyColor = (hierarchy: number) => {
    if (hierarchy <= 2) return 'bg-gradient-to-r from-blue-600 to-blue-800';
    if (hierarchy <= 5) return 'bg-gradient-to-r from-purple-600 to-purple-800';
    return 'bg-gradient-to-r from-green-600 to-green-800';
  };

  const getHierarchyLabel = (hierarchy: number) => {
    if (hierarchy <= 2) return language === 'am' ? 'ከፍተኛ አመራር' : 'Executive Leadership';
    if (hierarchy <= 5) return language === 'am' ? 'የሥራ አመራር' : 'Operational Leadership';
    return language === 'am' ? 'የአገልግሎት ቅርንጫፎች' : 'Service Branches';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${language === 'am' ? 'font-ethiopic' : ''}`}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'am' ? 'የተማሪዎች ማህበር ቅርንጫፎች' : 'Student Union Branches'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'am' 
              ? 'የደብረ ብርሃን ዩኒቨርስቲ የተማሪዎች ማህበር የተደራጀ አወቃቀር እና የእያንዳንዱ ቅርንጫፍ ሃላፊነቶች'
              : 'Organizational structure of Debre Berhan University Student Union and responsibilities of each branch'}
          </p>
        </motion.div>
      </div>

      {/* Organizational Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <h2 className={`text-xl font-semibold text-gray-900 mb-6 text-center ${language === 'am' ? 'font-ethiopic' : ''}`}>
          {language === 'am' ? 'የአመራር አወቃቀር' : 'Leadership Structure'}
        </h2>
        
        <div className="space-y-6">
          {/* Group branches by hierarchy */}
          {[
            { range: [1, 2], label: language === 'am' ? 'ከፍተኛ አመራር' : 'Executive Leadership' },
            { range: [3, 5], label: language === 'am' ? 'የሥራ አመራር' : 'Operational Leadership' },
            { range: [6, 10], label: language === 'am' ? 'የአገልግሎት ቅርንጫፎች' : 'Service Branches' }
          ].map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-4">
              <h3 className={`text-lg font-medium text-gray-800 border-b border-gray-200 pb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                {group.label}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {branches
                  .filter(branch => branch.hierarchy >= group.range[0] && branch.hierarchy <= group.range[1])
                  .map((branch, index) => (
                    <motion.div
                      key={branch.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                      className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                      onClick={() => toggleBranch(branch.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-8 h-8 ${getHierarchyColor(branch.hierarchy)} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                          {branch.hierarchy}
                        </div>
                        {expandedBranch === branch.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      
                      <h4 className={`font-semibold text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                        {language === 'am' ? branch.nameAm : branch.nameEn}
                      </h4>
                      
                      <p className={`text-sm text-gray-600 mb-3 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                        {language === 'am' ? branch.descriptionAm : branch.description}
                      </p>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        <span>{branch.contact}</span>
                      </div>
                      
                      {expandedBranch === branch.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-200"
                        >
                          <h5 className={`font-medium text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                            {language === 'am' ? 'ሃላፊነቶች:' : 'Responsibilities:'}
                          </h5>
                          <ul className="space-y-1">
                            {(language === 'am' ? branch.responsibilitiesAm : branch.responsibilities).map((responsibility, idx) => (
                              <li key={idx} className={`text-sm text-gray-600 flex items-start ${language === 'am' ? 'font-ethiopic' : ''}`}>
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {responsibility}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6"
      >
        <div className="text-center">
          <h3 className={`text-xl font-semibold text-gray-900 mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
            {language === 'am' ? 'ለበለጠ መረጃ' : 'For More Information'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">info@dbu.edu.et</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">+251-11-XXX-XXXX</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className={`text-gray-700 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                {language === 'am' ? '12,547 ተማሪዎች' : '12,547 Students'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Admin Actions */}
      {(user?.role === 'president' || user?.role === 'student_din') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
            {language === 'am' ? 'የአስተዳደር እርምጃዎች' : 'Administrative Actions'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
              <h4 className={`font-medium text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                {language === 'am' ? 'ቅርንጫፍ መረጃ ያዘምኑ' : 'Update Branch Information'}
              </h4>
              <p className={`text-sm text-gray-600 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                {language === 'am' ? 'የቅርንጫፍ ዝርዝሮች እና ሃላፊነቶች ያርትዑ' : 'Edit branch details and responsibilities'}
              </p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left">
              <h4 className={`font-medium text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                {language === 'am' ? 'አመራር ይመድቡ' : 'Assign Leadership'}
              </h4>
              <p className={`text-sm text-gray-600 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                {language === 'am' ? 'ለቅርንጫፎች አዲስ መሪዎች ይመድቡ' : 'Assign new leaders to branches'}
              </p>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}