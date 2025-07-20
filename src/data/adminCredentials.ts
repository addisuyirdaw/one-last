export interface AdminCredential {
  email: string;
  role: string;
  name: string;
  branch?: string;
  permissions: string[];
}

// Predefined admin credentials - only these emails can access admin roles
export const adminCredentials: AdminCredential[] = [
  // Executive Leadership
  {
    email: 'president@dbu.edu.et',
    role: 'president',
    name: 'Bekele Mekonnen',
    permissions: ['all', 'emergency_override', 'system_admin', 'force_approve', 'user_management']
  },
  {
    email: 'studentdin@dbu.edu.et',
    role: 'student_din',
    name: 'Alemnesh Tadesse',
    permissions: ['all', 'mediation', 'university_liaison', 'override_decisions', 'audit_all']
  },
  {
    email: 'vicepresident@dbu.edu.et',
    role: 'vice_president',
    name: 'Dawit Alemayehu',
    permissions: ['coordination', 'daily_operations', 'branch_oversight']
  },

  // Operational Leadership
  {
    email: 'secretary@dbu.edu.et',
    role: 'secretary',
    name: 'Meron Tesfaye',
    permissions: ['documentation', 'records_management', 'correspondence']
  },
  {
    email: 'speaker@dbu.edu.et',
    role: 'speaker',
    name: 'Yohannes Kebede',
    permissions: ['assemblies', 'discussions', 'student_voice']
  },

  // Service Branches
  {
    email: 'academic@dbu.edu.et',
    role: 'academic_affairs',
    name: 'Dr. Hanna Getachew',
    branch: 'academic_affairs',
    permissions: ['academic_complaints', 'grade_appeals', 'faculty_liaison']
  },
  {
    email: 'service@dbu.edu.et',
    role: 'general_service',
    name: 'Tadesse Worku',
    branch: 'general_service',
    permissions: ['facilities', 'logistics', 'lost_found']
  },
  {
    email: 'dining@dbu.edu.et',
    role: 'dining_services',
    name: 'Almaz Bekele',
    branch: 'dining_services',
    permissions: ['food_quality', 'cafeteria_issues', 'meal_plans']
  },
  {
    email: 'sports@dbu.edu.et',
    role: 'sports_culture',
    name: 'Getnet Assefa',
    branch: 'sports_culture',
    permissions: ['tournaments', 'cultural_events', 'equipment_management']
  },
  {
    email: 'clubs@dbu.edu.et',
    role: 'clubs_associations',
    name: 'Hewan Tadesse',
    branch: 'clubs_associations',
    permissions: ['club_approval', 'document_validation', 'event_proposals', 'budget_oversight']
  }
];

// Function to validate admin credentials
export const validateAdminCredentials = (email: string, role: string): AdminCredential | null => {
  const admin = adminCredentials.find(
    cred => cred.email.toLowerCase() === email.toLowerCase() && cred.role === role
  );
  return admin || null;
};

// Function to get admin by email
export const getAdminByEmail = (email: string): AdminCredential | null => {
  return adminCredentials.find(
    cred => cred.email.toLowerCase() === email.toLowerCase()
  ) || null;
};

// Function to check if user has specific permission
export const hasPermission = (admin: AdminCredential, permission: string): boolean => {
  return admin.permissions.includes('all') || admin.permissions.includes(permission);
};

// Branch-specific permissions mapping
export const branchPermissions: Record<string, string[]> = {
  'academic_affairs': ['academic_complaints', 'grade_appeals', 'exam_issues'],
  'general_service': ['facilities', 'logistics', 'maintenance'],
  'dining_services': ['food_complaints', 'cafeteria_management', 'hygiene'],
  'sports_culture': ['sports_events', 'cultural_activities', 'equipment'],
  'clubs_associations': ['club_registration', 'document_approval', 'event_validation']
};