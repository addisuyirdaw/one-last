import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Upload, 
  CheckCircle, 
  Clock, 
  XCircle,
  FileText,
  Calendar,
  Search,
  Filter
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { mockClubs } from '../data/mockData';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export function Clubs() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'all' | 'my' | 'pending'>('all');
  const [showNewClubForm, setShowNewClubForm] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [newClubForm, setNewClubForm] = useState({
    name: '',
    nameAm: '',
    description: '',
    descriptionAm: '',
    category: '',
    advisorEmail: '',
    foundingMembers: [''],
    constitution: null as File | null
  });

  const categories = ['Academic', 'Arts', 'Technology', 'Sports', 'Cultural', 'Service'];

  const filteredClubs = mockClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.nameAm.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory;
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'my' && user?.role === 'branch_leader' && user?.branch === 'clubs_associations') ||
                      (selectedTab === 'pending' && club.status === 'pending');
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleNewClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newClubForm.name || !newClubForm.advisorEmail || !newClubForm.constitution) {
      toast.error(language === 'am' ? 'እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ' : 'Please fill all required fields');
      return;
    }

    if (newClubForm.foundingMembers.filter(member => member.trim()).length < 10) {
      toast.error(language === 'am' ? 'ቢያንስ 10 መስራች አባላት ያስፈልጋሉ' : 'At least 10 founding members required');
      return;
    }

    // Simulate API call
    toast.success(language === 'am' ? 'የክለብ ማመልከቻ ተልኳል' : 'Club application submitted');
    setShowNewClubForm(false);
    setNewClubForm({
      name: '',
      nameAm: '',
      description: '',
      descriptionAm: '',
      category: '',
      advisorEmail: '',
      foundingMembers: [''],
      constitution: null
    });
  };

  const handleDocumentUpload = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(language === 'am' ? 'ሰነድ ተሰቅሏል' : 'Document uploaded successfully');
    setShowDocumentUpload(false);
  };

  const addFoundingMember = () => {
    setNewClubForm(prev => ({
      ...prev,
      foundingMembers: [...prev.foundingMembers, '']
    }));
  };

  const updateFoundingMember = (index: number, value: string) => {
    setNewClubForm(prev => ({
      ...prev,
      foundingMembers: prev.foundingMembers.map((member, i) => i === index ? value : member)
    }));
  };

  const removeFoundingMember = (index: number) => {
    setNewClubForm(prev => ({
      ...prev,
      foundingMembers: prev.foundingMembers.filter((_, i) => i !== index)
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'suspended': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className={`${language === 'am' ? 'font-ethiopic' : ''}`}>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'am' ? 'ክለቦች እና ማህበራት' : 'Clubs & Associations'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'am' 
              ? 'የተማሪዎች ክለቦችን ያስተዳድሩ እና አዲስ ክለቦች ይፍጠሩ' 
              : 'Manage student clubs and create new organizations'}
          </p>
        </div>
        
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDocumentUpload(true)}
            className={`px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            {language === 'am' ? 'ሰነድ ይስቀሉ' : 'Upload Document'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowNewClubForm(true)}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            {language === 'am' ? 'አዲስ ክለብ' : 'New Club'}
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={language === 'am' ? 'ክለቦችን ይፈልጉ...' : 'Search clubs...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">{language === 'am' ? 'ሁሉም ምድቦች' : 'All Categories'}</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Tab Filter */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { key: 'all', label: 'All', labelAm: 'ሁሉም' },
                { key: 'my', label: 'My Clubs', labelAm: 'የኔ ክለቦች' },
                { key: 'pending', label: 'Pending', labelAm: 'በመጠበቅ ላይ' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key as any)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedTab === tab.key
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  } ${language === 'am' ? 'font-ethiopic' : ''}`}
                >
                  {language === 'am' ? tab.labelAm : tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club, index) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? club.nameAm : club.name}
                </h3>
                <p className={`text-gray-600 text-sm mb-3 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? club.descriptionAm : club.description}
                </p>
              </div>
              {getStatusIcon(club.status)}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(club.status)}`}>
                  {club.status}
                </span>
                <span className="text-sm text-gray-500">{club.category}</span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{club.members} {language === 'am' ? 'አባላት' : 'members'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>{club.documents.length} {language === 'am' ? 'ሰነዶች' : 'docs'}</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-3">
                <button className={`flex-1 py-2 px-3 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? 'ዝርዝር' : 'Details'}
                </button>
                {user?.role === 'branch_leader' && user?.branch === 'clubs_associations' && (
                  <button className={`flex-1 py-2 px-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ያስተዳድሩ' : 'Manage'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Club Form Modal */}
      {showNewClubForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold text-gray-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? 'አዲስ ክለብ ይመዝግቡ' : 'Register New Club'}
                </h2>
                <button
                  onClick={() => setShowNewClubForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleNewClubSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                      {language === 'am' ? 'የክለብ ስም (እንግሊዝኛ)' : 'Club Name (English)'}
                    </label>
                    <input
                      type="text"
                      required
                      value={newClubForm.name}
                      onChange={(e) => setNewClubForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                      {language === 'am' ? 'የክለብ ስም (አማርኛ)' : 'Club Name (Amharic)'}
                    </label>
                    <input
                      type="text"
                      value={newClubForm.nameAm}
                      onChange={(e) => setNewClubForm(prev => ({ ...prev, nameAm: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-ethiopic"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                      {language === 'am' ? 'መግለጫ (እንግሊዝኛ)' : 'Description (English)'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newClubForm.description}
                      onChange={(e) => setNewClubForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                      {language === 'am' ? 'መግለጫ (አማርኛ)' : 'Description (Amharic)'}
                    </label>
                    <textarea
                      rows={3}
                      value={newClubForm.descriptionAm}
                      onChange={(e) => setNewClubForm(prev => ({ ...prev, descriptionAm: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-ethiopic"
                    />
                  </div>
                </div>

                {/* Category and Advisor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                      {language === 'am' ? 'ምድብ' : 'Category'}
                    </label>
                    <select
                      required
                      value={newClubForm.category}
                      onChange={(e) => setNewClubForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">{language === 'am' ? 'ምድብ ይምረጡ' : 'Select Category'}</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                      {language === 'am' ? 'የአማካሪ ኢሜይል' : 'Advisor Email'}
                    </label>
                    <input
                      type="email"
                      required
                      value={newClubForm.advisorEmail}
                      onChange={(e) => setNewClubForm(prev => ({ ...prev, advisorEmail: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="advisor@dbu.edu.et"
                    />
                  </div>
                </div>

                {/* Founding Members */}
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'መስራች አባላት (ቢያንስ 10)' : 'Founding Members (Minimum 10)'}
                  </label>
                  <div className="space-y-2">
                    {newClubForm.foundingMembers.map((member, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="DBU-YYYY-XXXX"
                          value={member}
                          onChange={(e) => updateFoundingMember(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeFoundingMember(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFoundingMember}
                      className={`text-blue-600 hover:text-blue-800 text-sm ${language === 'am' ? 'font-ethiopic' : ''}`}
                    >
                      + {language === 'am' ? 'አባል ይጨምሩ' : 'Add Member'}
                    </button>
                  </div>
                </div>

                {/* Constitution Upload */}
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ሕገ መንግሥት (PDF)' : 'Constitution (PDF)'}
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    onChange={(e) => setNewClubForm(prev => ({ ...prev, constitution: e.target.files?.[0] || null }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewClubForm(false)}
                    className={`flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
                  >
                    {language === 'am' ? 'ሰርዝ' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className={`flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
                  >
                    {language === 'am' ? 'ማመልከቻ ይላኩ' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Document Upload Modal */}
      {showDocumentUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold text-gray-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? 'ሰነድ ይስቀሉ' : 'Upload Document'}
                </h2>
                <button
                  onClick={() => setShowDocumentUpload(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleDocumentUpload} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'የሰነድ አይነት' : 'Document Type'}
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="budget">{language === 'am' ? 'በጀት' : 'Budget'}</option>
                    <option value="report">{language === 'am' ? 'ሪፖርት' : 'Report'}</option>
                    <option value="proposal">{language === 'am' ? 'ሀሳብ' : 'Proposal'}</option>
                    <option value="attendance">{language === 'am' ? 'ተሳትፎ' : 'Attendance'}</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ፋይል' : 'File'}
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowDocumentUpload(false)}
                    className={`flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
                  >
                    {language === 'am' ? 'ሰርዝ' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className={`flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
                  >
                    {language === 'am' ? 'ይስቀሉ' : 'Upload'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}