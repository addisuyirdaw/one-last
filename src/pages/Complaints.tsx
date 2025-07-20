import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Paperclip,
  Send,
  Filter,
  Search
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { mockComplaints, generateCaseId } from '../data/mockData';
import { branches } from '../data/branches';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export function Complaints() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'all' | 'my' | 'pending'>('all');
  const [showNewComplaint, setShowNewComplaint] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [newComplaintForm, setNewComplaintForm] = useState({
    title: '',
    description: '',
    category: '',
    branch: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    evidence: [] as File[],
    isGeneral: false
  });

  const [responseMessage, setResponseMessage] = useState('');

  const complaintCategories = [
    { value: 'academic', label: 'Academic Affairs', labelAm: 'የትምህርት ጉዳዮች' },
    { value: 'dining', label: 'Dining Services', labelAm: 'ምግብ ቤት' },
    { value: 'housing', label: 'Housing', labelAm: 'መኖሪያ' },
    { value: 'facilities', label: 'Facilities', labelAm: 'መገልገያዎች' },
    { value: 'disciplinary', label: 'Disciplinary', labelAm: 'ዲሲፕሊን' },
    { value: 'general', label: 'General', labelAm: 'አጠቃላይ' }
  ];

  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesTab = selectedTab === 'all' || 
                      (selectedTab === 'my' && complaint.submittedBy === user?.id) ||
                      (selectedTab === 'pending' && complaint.status === 'submitted');
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComplaintForm.title || !newComplaintForm.description) {
      toast.error(language === 'am' ? 'እባክዎ ሁሉንም አስፈላጊ መስኮች ይሙሉ' : 'Please fill all required fields');
      return;
    }

    const caseId = generateCaseId();
    
    // Simulate API call
    toast.success(
      language === 'am' 
        ? `ቅሬታዎ ተልኳል። የጉዳይ መለያ: ${caseId}` 
        : `Complaint submitted. Case ID: ${caseId}`
    );
    
    setShowNewComplaint(false);
    setNewComplaintForm({
      title: '',
      description: '',
      category: '',
      branch: '',
      priority: 'medium',
      evidence: [],
      isGeneral: false
    });
  };

  const handleSendResponse = (complaintId: string) => {
    if (!responseMessage.trim()) return;
    
    toast.success(language === 'am' ? 'ምላሽ ተልኳል' : 'Response sent');
    setResponseMessage('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'under_review': return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case 'resolved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'closed': return <CheckCircle className="w-5 h-5 text-gray-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className={`${language === 'am' ? 'font-ethiopic' : ''}`}>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'am' ? 'ቅሬታዎች እና ይግባኝ ጥያቄዎች' : 'Complaints & Appeals'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'am' 
              ? 'ቅሬታዎችን ያቅርቡ እና ሁኔታን ይከታተሉ' 
              : 'Submit complaints and track their status'}
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowNewComplaint(true)}
          className={`mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
        >
          <Plus className="w-4 h-4 inline mr-2" />
          {language === 'am' ? 'አዲስ ቅሬታ' : 'New Complaint'}
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={language === 'am' ? 'ቅሬታዎችን ይፈልጉ...' : 'Search complaints...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">{language === 'am' ? 'ሁሉም ሁኔታዎች' : 'All Status'}</option>
                <option value="submitted">{language === 'am' ? 'ቀርቧል' : 'Submitted'}</option>
                <option value="under_review">{language === 'am' ? 'በምርመራ ላይ' : 'Under Review'}</option>
                <option value="resolved">{language === 'am' ? 'ተፈትቷል' : 'Resolved'}</option>
                <option value="closed">{language === 'am' ? 'ተዘግቷል' : 'Closed'}</option>
              </select>
            </div>

            {/* Tab Filter */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { key: 'all', label: 'All', labelAm: 'ሁሉም' },
                { key: 'my', label: 'My Complaints', labelAm: 'የኔ ቅሬታዎች' },
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

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint, index) => (
          <motion.div
            key={complaint.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                  <span className="text-sm text-gray-500">#{complaint.id}</span>
                </div>
                <p className="text-gray-600 mb-3">{complaint.description}</p>
                
                <div className="flex items-center space-x-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {getStatusIcon(complaint.status)}
                    <span className="ml-1">{complaint.status.replace('_', ' ')}</span>
                  </span>
                  
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority} priority
                  </span>
                  
                  <span className="text-gray-500">
                    {complaint.submittedAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedComplaint(selectedComplaint === complaint.id ? null : complaint.id)}
                className={`px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
              >
                {selectedComplaint === complaint.id 
                  ? (language === 'am' ? 'ዝጋ' : 'Close')
                  : (language === 'am' ? 'ዝርዝር' : 'Details')
                }
              </button>
            </div>

            {/* Expanded Details */}
            {selectedComplaint === complaint.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200 pt-4 mt-4"
              >
                {/* Responses */}
                <div className="space-y-4 mb-4">
                  <h4 className={`font-medium text-gray-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ምላሾች:' : 'Responses:'}
                  </h4>
                  
                  {complaint.responses.map((response) => (
                    <div key={response.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{response.author}</span>
                        <span className="text-sm text-gray-500">
                          {response.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{response.message}</p>
                    </div>
                  ))}
                </div>

                {/* Response Form (for admins) */}
                {(user?.role === 'branch_leader' || user?.role === 'president' || user?.role === 'student_din') && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        placeholder={language === 'am' ? 'ምላሽ ይጻፉ...' : 'Write a response...'}
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={() => handleSendResponse(complaint.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* New Complaint Modal */}
      {showNewComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold text-gray-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? 'አዲስ ቅሬታ ያቅርቡ' : 'Submit New Complaint'}
                </h2>
                <button
                  onClick={() => setShowNewComplaint(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitComplaint} className="space-y-6">
                {/* Complaint Type */}
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-3 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'የቅሬታ አይነት' : 'Complaint Type'}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300">
                      <input
                        type="radio"
                        name="complaintType"
                        checked={!newComplaintForm.isGeneral}
                        onChange={() => setNewComplaintForm(prev => ({ ...prev, isGeneral: false }))}
                        className="mr-3"
                      />
                      <div>
                        <div className={`font-medium text-gray-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                          {language === 'am' ? 'ለቅርንጫፍ ተኮር' : 'Branch-Specific'}
                        </div>
                        <div className={`text-sm text-gray-600 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                          {language === 'am' ? 'ለተወሰነ ቅርንጫፍ ቅሬታ' : 'Complaint for specific branch'}
                        </div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300">
                      <input
                        type="radio"
                        name="complaintType"
                        checked={newComplaintForm.isGeneral}
                        onChange={() => setNewComplaintForm(prev => ({ ...prev, isGeneral: true }))}
                        className="mr-3"
                      />
                      <div>
                        <div className={`font-medium text-gray-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                          {language === 'am' ? 'አጠቃላይ' : 'General'}
                        </div>
                        <div className={`text-sm text-gray-600 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                          {language === 'am' ? 'ወደ የተማሪዎች ዲን' : 'Direct to Student Din'}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Category and Branch Selection */}
                {!newComplaintForm.isGeneral && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                        {language === 'am' ? 'ምድብ' : 'Category'}
                      </label>
                      <select
                        required
                        value={newComplaintForm.category}
                        onChange={(e) => setNewComplaintForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">{language === 'am' ? 'ምድብ ይምረጡ' : 'Select Category'}</option>
                        {complaintCategories.filter(cat => cat.value !== 'general').map(category => (
                          <option key={category.value} value={category.value}>
                            {language === 'am' ? category.labelAm : category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                        {language === 'am' ? 'ቅርንጫፍ' : 'Branch'}
                      </label>
                      <select
                        required
                        value={newComplaintForm.branch}
                        onChange={(e) => setNewComplaintForm(prev => ({ ...prev, branch: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">{language === 'am' ? 'ቅርንጫፍ ይምረጡ' : 'Select Branch'}</option>
                        {branches.filter(branch => branch.hierarchy > 5).map(branch => (
                          <option key={branch.id} value={branch.id}>
                            {language === 'am' ? branch.nameAm : branch.nameEn}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ርዕስ' : 'Title'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newComplaintForm.title}
                    onChange={(e) => setNewComplaintForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={language === 'am' ? 'የቅሬታዎ አጭር ርዕስ' : 'Brief title of your complaint'}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ዝርዝር መግለጫ' : 'Detailed Description'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newComplaintForm.description}
                    onChange={(e) => setNewComplaintForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={language === 'am' ? 'ቅሬታዎን በዝርዝር ይግለጹ...' : 'Describe your complaint in detail...'}
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ቅድሚያ' : 'Priority'}
                  </label>
                  <select
                    value={newComplaintForm.priority}
                    onChange={(e) => setNewComplaintForm(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">{language === 'am' ? 'ዝቅተኛ' : 'Low'}</option>
                    <option value="medium">{language === 'am' ? 'መካከለኛ' : 'Medium'}</option>
                    <option value="high">{language === 'am' ? 'ከፍተኛ' : 'High'}</option>
                  </select>
                </div>

                {/* Evidence Upload */}
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ማስረጃ (አማራጭ)' : 'Evidence (Optional)'}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className={`text-gray-600 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                      {language === 'am' ? 'ፋይሎችን ይጎትቱ ወይም ይምረጡ' : 'Drag files here or click to select'}
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewComplaint(false)}
                    className={`flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
                  >
                    {language === 'am' ? 'ሰርዝ' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className={`flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
                  >
                    {language === 'am' ? 'ቅሬታ ያቅርቡ' : 'Submit Complaint'}
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