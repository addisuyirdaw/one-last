import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Shield,
  Activity,
  FileText,
  MessageSquare,
  Vote,
  Settings,
  Download,
  Eye,
  UserCheck,
  Calendar,
  TrendingUp,
  Bell,
  Lock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { hasPermission } from '../data/adminCredentials';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface AdminMetrics {
  complaints: { pending: number; resolved: number; total: number };
  elections: { active: number; completed: number; upcoming: number };
  clubs: { approved: number; pending: number; total: number };
  users: { active: number; total: number };
}

interface AdminLog {
  timestamp: string;
  adminEmail: string;
  adminName: string;
  role: string;
  action: string;
  ipAddress: string;
  permissions: string[];
}

export function AdminDashboard() {
  const { user, adminCredential } = useAuth();
  const { language } = useLanguage();
  const [metrics, setMetrics] = useState<AdminMetrics>({
    complaints: { pending: 23, resolved: 45, total: 68 },
    elections: { active: 3, completed: 5, upcoming: 2 },
    clubs: { approved: 47, pending: 8, total: 55 },
    users: { active: 12547, total: 13200 }
  });
  const [adminLogs, setAdminLogs] = useState<AdminLog[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  useEffect(() => {
    // Load admin logs
    const logs = JSON.parse(localStorage.getItem('admin_logs') || '[]');
    setAdminLogs(logs.slice(-10)); // Show last 10 entries
  }, []);

  const handleEmergencyOverride = (action: string) => {
    if (!adminCredential || !hasPermission(adminCredential, 'emergency_override')) {
      toast.error(language === 'am' ? 'ፍቃድ የለዎትም' : 'Permission denied');
      return;
    }

    toast.success(
      language === 'am' 
        ? `የአደጋ ጊዜ እርምጃ: ${action} ተፈጽሟል` 
        : `Emergency action: ${action} executed`
    );
  };

  const handleBulkApproval = (type: string) => {
    if (!adminCredential || (!hasPermission(adminCredential, 'all') && !hasPermission(adminCredential, 'club_approval'))) {
      toast.error(language === 'am' ? 'ፍቃድ የለዎትም' : 'Permission denied');
      return;
    }

    toast.success(
      language === 'am' 
        ? `የጅምላ ማጽደቅ: ${type} ተሳክቷል` 
        : `Bulk approval: ${type} completed`
    );
  };

  const canAccess = (permission: string): boolean => {
    return adminCredential ? hasPermission(adminCredential, permission) : false;
  };

  const renderPresidentDashboard = () => (
    <div className="space-y-6">
      {/* Emergency Override Panel */}
      {canAccess('emergency_override') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h3 className={`text-lg font-semibold text-red-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'የአደጋ ጊዜ ቁጥጥር ፓነል' : 'Emergency Override Panel'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleEmergencyOverride('Force Approve All Pending')}
              className={`p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
            >
              {language === 'am' ? 'ሁሉንም በጅምላ አጽድቅ' : 'Force Approve All'}
            </button>
            <button
              onClick={() => handleEmergencyOverride('System Announcement')}
              className={`p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
            >
              {language === 'am' ? 'የስርዓት ማስታወቂያ' : 'System Announcement'}
            </button>
            <button
              onClick={() => handleEmergencyOverride('Lock All Elections')}
              className={`p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
            >
              {language === 'am' ? 'ምርጫዎችን ቆልፍ' : 'Lock Elections'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Live Activity Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
          {language === 'am' ? 'የቀጥታ እንቅስቃሴ ካርታ' : 'Live Activity Map'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-900">{metrics.complaints.pending}</span>
            </div>
            <p className={`text-blue-700 font-medium ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'በመጠበቅ ላይ ያሉ ቅሬታዎች' : 'Pending Complaints'}
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Vote className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-green-900">{metrics.elections.active}</span>
            </div>
            <p className={`text-green-700 font-medium ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'ንቁ ምርጫዎች' : 'Active Elections'}
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Users className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-900">{metrics.clubs.pending}</span>
            </div>
            <p className={`text-purple-700 font-medium ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'በመጠበቅ ላይ ያሉ ክለቦች' : 'Pending Clubs'}
            </p>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Activity className="w-8 h-8 text-orange-600" />
              <span className="text-2xl font-bold text-orange-900">{metrics.users.active}</span>
            </div>
            <p className={`text-orange-700 font-medium ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'ንቁ ተጠቃሚዎች' : 'Active Users'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderStudentDinDashboard = () => (
    <div className="space-y-6">
      {/* Mediation Channel */}
      {canAccess('mediation') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
            <h3 className={`text-lg font-semibold text-blue-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'የመካከለኛ ቻናል' : 'Mediation Channel'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className={`font-medium text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                {language === 'am' ? 'ያልተፈቱ ቅሬታዎች' : 'Unresolved Complaints'}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Academic Issues</span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Dining Services</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">3</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h4 className={`font-medium text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                {language === 'am' ? 'የዩኒቨርስቲ ግንኙነት' : 'University Liaison'}
              </h4>
              <button className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}>
                {language === 'am' ? 'ወደ አስተዳደር ላክ' : 'Escalate to Administration'}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Council Performance Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
          {language === 'am' ? 'የምክር ቤት አፈጻጸም ዳሽቦርድ' : 'Council Performance Dashboard'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className={`font-medium text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'የቅርንጫፍ ምላሽ ጊዜ' : 'Branch Response Times'}
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Academic</span>
                <span className="text-sm font-medium text-green-600">2.3h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Clubs</span>
                <span className="text-sm font-medium text-yellow-600">4.1h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Dining</span>
                <span className="text-sm font-medium text-red-600">8.2h</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className={`font-medium text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'የተማሪ እርካታ ደረጃ' : 'Student Satisfaction'}
            </h4>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">87%</div>
              <div className="text-sm text-gray-600">Overall Rating</div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className={`font-medium text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'ወርሃዊ ትንታኔ' : 'Monthly Analytics'}
            </h4>
            <button className={`w-full bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors text-sm ${language === 'am' ? 'font-ethiopic' : ''}`}>
              <Download className="w-4 h-4 inline mr-2" />
              {language === 'am' ? 'ሪፖርት አውርድ' : 'Download Report'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderClubsBranchDashboard = () => (
    <div className="space-y-6">
      {/* Document Validation Console */}
      {canAccess('document_validation') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold text-gray-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'የሰነድ ማረጋገጫ ኮንሶል' : 'Document Validation Console'}
            </h3>
            <button
              onClick={() => handleBulkApproval('Documents')}
              className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}
            >
              {language === 'am' ? 'በጅምላ አጽድቅ' : 'Bulk Approve'}
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { club: 'Robotics Society', type: 'Constitution', status: 'pending', errors: ['Missing advisor signature'] },
              { club: 'Debate Club', type: 'Annual Report', status: 'approved', errors: [] },
              { club: 'Drama Society', type: 'Budget Proposal', status: 'needs_revision', errors: ['Budget exceeds limit', 'Missing itemization'] }
            ].map((doc, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{doc.club}</h4>
                    <p className="text-sm text-gray-600">{doc.type}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                      doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {doc.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {doc.errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded p-3 mt-2">
                    <p className="text-sm font-medium text-red-800 mb-1">Validation Errors:</p>
                    <ul className="text-sm text-red-700 space-y-1">
                      {doc.errors.map((error, i) => (
                        <li key={i}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex space-x-2 mt-3">
                  <button className={`flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'አጽድቅ' : 'Approve'}
                  </button>
                  <button className={`flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ውድቅ አድርግ' : 'Reject'}
                  </button>
                  <button className={`flex-1 bg-yellow-600 text-white py-2 px-3 rounded text-sm hover:bg-yellow-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}>
                    {language === 'am' ? 'ማሻሻያ ጠይቅ' : 'Request Revision'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderGenericBranchDashboard = () => (
    <div className="space-y-6">
      {/* Branch-Specific Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
          {language === 'am' ? 'የቅርንጫፍ ዳሽቦርድ' : 'Branch Dashboard'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-blue-900">12</span>
            </div>
            <p className={`text-blue-700 font-medium ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'አዲስ ቅሬታዎች' : 'New Complaints'}
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-green-900">34</span>
            </div>
            <p className={`text-green-700 font-medium ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'የተፈቱ ጉዳዮች' : 'Resolved Issues'}
            </p>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <Clock className="w-8 h-8 text-orange-600" />
              <span className="text-2xl font-bold text-orange-900">2.5h</span>
            </div>
            <p className={`text-orange-700 font-medium ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'አማካይ ምላሽ ጊዜ' : 'Avg Response Time'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Permission Restricted Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-50 border border-gray-200 rounded-xl p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Lock className="w-6 h-6 text-gray-600" />
          <h3 className={`text-lg font-semibold text-gray-900 ${language === 'am' ? 'font-ethiopic' : ''}`}>
            {language === 'am' ? 'የቅርንጫፍ ተኮር መዳረሻ' : 'Branch-Specific Access'}
          </h3>
        </div>
        <p className={`text-gray-600 ${language === 'am' ? 'font-ethiopic' : ''}`}>
          {language === 'am' 
            ? `እርስዎ የ${user?.role} ቅርንጫፍ አስተዳዳሪ ነዎት። የእርስዎ መዳረሻ ለዚህ ቅርንጫፍ ተኮር ተግባራት ብቻ ነው።`
            : `You are a ${user?.role} branch administrator. Your access is limited to branch-specific functions.`}
        </p>
        
        {adminCredential && (
          <div className="mt-4">
            <h4 className={`font-medium text-gray-900 mb-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
              {language === 'am' ? 'የእርስዎ ፍቃዶች:' : 'Your Permissions:'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {adminCredential.permissions.map((permission, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {permission.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderDashboardContent = () => {
    if (!adminCredential) {
      return (
        <div className="text-center py-12">
          <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">Invalid admin credentials</p>
        </div>
      );
    }

    switch (user?.role) {
      case 'president':
        return renderPresidentDashboard();
      case 'student_din':
        return renderStudentDinDashboard();
      case 'clubs_associations':
        return renderClubsBranchDashboard();
      default:
        return renderGenericBranchDashboard();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className={`${language === 'am' ? 'font-ethiopic' : ''}`}>
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'am' ? 'የአስተዳደር ዳሽቦርድ' : 'Admin Dashboard'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'am' 
              ? `እንኳን ደህና መጡ ${user?.name}` 
              : `Welcome, ${user?.name}`}
          </p>
          {adminCredential && (
            <p className="text-sm text-blue-600 mt-1">
              {language === 'am' 
                ? `ሚና: ${adminCredential.name} (${adminCredential.role})`
                : `Role: ${adminCredential.name} (${adminCredential.role})`}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">{language === 'am' ? 'ባለፉት 7 ቀናት' : 'Last 7 days'}</option>
            <option value="30d">{language === 'am' ? 'ባለፉት 30 ቀናት' : 'Last 30 days'}</option>
            <option value="90d">{language === 'am' ? 'ባለፉት 90 ቀናት' : 'Last 90 days'}</option>
          </select>
          
          <button className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ${language === 'am' ? 'font-ethiopic' : ''}`}>
            <Download className="w-4 h-4 inline mr-2" />
            {language === 'am' ? 'ሪፖርት አውርድ' : 'Export Report'}
          </button>
        </div>
      </div>

      {/* Role-Specific Dashboard Content */}
      {renderDashboardContent()}

      {/* Admin Activity Logs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${language === 'am' ? 'font-ethiopic' : ''}`}>
          {language === 'am' ? 'የአስተዳደር እንቅስቃሴ ምዝገባ' : 'Admin Activity Logs'}
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className={`text-left py-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? 'ጊዜ' : 'Time'}
                </th>
                <th className={`text-left py-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? 'አስተዳዳሪ' : 'Admin'}
                </th>
                <th className={`text-left py-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? 'እርምጃ' : 'Action'}
                </th>
                <th className={`text-left py-2 ${language === 'am' ? 'font-ethiopic' : ''}`}>
                  {language === 'am' ? 'IP አድራሻ' : 'IP Address'}
                </th>
              </tr>
            </thead>
            <tbody>
              {adminLogs.map((log, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="py-2">
                    <div>
                      <div className="font-medium">{log.adminName}</div>
                      <div className="text-xs text-gray-500">{log.adminEmail}</div>
                    </div>
                  </td>
                  <td className="py-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-2 text-gray-600">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}