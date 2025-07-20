export interface User {
  id: string;
  name: string;
  email: string;
  studentId?: string;
  role: UserRole;
  branch?: string;
  profileImage?: string;
  isVerified: boolean;
}

export type UserRole = 'student' | 'branch_leader' | 'president' | 'student_din';

export interface Branch {
  id: string;
  nameEn: string;
  nameAm: string;
  description: string;
  descriptionAm: string;
  responsibilities: string[];
  responsibilitiesAm: string[];
  contact: string;
  hierarchy: number;
  leader?: User;
}

export interface Club {
  id: string;
  name: string;
  nameAm: string;
  description: string;
  descriptionAm: string;
  category: string;
  members: number;
  status: 'active' | 'pending' | 'suspended';
  documents: ClubDocument[];
  events: ClubEvent[];
  advisorEmail?: string;
  foundingMembers?: string[];
  constitution?: string;
}

export interface ClubDocument {
  id: string;
  name: string;
  type: 'budget' | 'attendance' | 'proposal' | 'report';
  url: string;
  uploadedAt: Date;
  validationStatus: 'pending' | 'approved' | 'rejected';
  validationNotes?: string;
  validationErrors?: string[];
}

export interface ClubEvent {
  id: string;
  title: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
  date: Date;
  location: string;
  attendees: number;
}

export interface Election {
  id: string;
  title: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
  startDate: Date;
  endDate: Date;
  status: 'upcoming' | 'active' | 'completed';
  candidates: Candidate[];
  totalVotes: number;
  eligibleVoters: number;
}

export interface Candidate {
  id: string;
  name: string;
  nameAm: string;
  position: string;
  positionAm: string;
  bio: string;
  bioAm: string;
  profileImage: string;
  votes: number;
  platform: string[];
  platformAm: string[];
}

export interface Vote {
  id: string;
  electionId: string;
  candidateId: string;
  voterId: string;
  timestamp: Date;
  verified: boolean;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'submitted' | 'under_review' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  submittedBy: string;
  assignedTo?: string;
  submittedAt: Date;
  updatedAt: Date;
  evidence: Evidence[];
  responses: ComplaintResponse[];
  branch?: string;
  isGeneral?: boolean;
}

export interface Evidence {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'document';
  url: string;
  uploadedAt: Date;
}

export interface ComplaintResponse {
  id: string;
  message: string;
  author: string;
  timestamp: Date;
  isOfficial: boolean;
}

export interface Notification {
  id: string;
  title: string;
  titleAm: string;
  message: string;
  messageAm: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: Date;
  action?: {
    label: string;
    labelAm: string;
    url: string;
  };
}

export interface DocumentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  requiredSections: string[];
  foundSections: string[];
}

export interface OTPVerification {
  email: string;
  code: string;
  expiresAt: Date;
  verified: boolean;
}

export interface StudentVerification {
  studentId: string;
  isValid: boolean;
  status: 'active' | 'inactive' | 'suspended';
  enrollmentYear: number;
}