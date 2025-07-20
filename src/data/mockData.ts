import { User, Club, Election, Complaint } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alemnesh Tadesse',
    email: 'alemnesh.tadesse@dbu.edu.et',
    role: 'student_din',
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Bekele Mekonnen',
    email: 'bekele.mekonnen@dbu.edu.et',
    studentId: 'DBU-2021-001',
    role: 'president',
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Hanna Solomon',
    email: 'hanna.solomon@dbu.edu.et',
    studentId: 'DBU-2022-156',
    role: 'branch_leader',
    branch: 'clubs_associations',
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockClubs: Club[] = [
  {
    id: 'club-001',
    name: 'Debate Society',
    nameAm: 'የክርክር ማህበር',
    description: 'Developing critical thinking and public speaking skills',
    descriptionAm: 'ወሳኝ አስተሳሰብ እና የህዝብ ንግግር ክህሎቶችን ማዳበር',
    category: 'Academic',
    members: 45,
    status: 'active',
    documents: [
      {
        id: 'doc-001',
        name: 'Annual Budget 2024',
        type: 'budget',
        url: '/documents/debate-budget-2024.pdf',
        uploadedAt: new Date('2024-01-15'),
        validationStatus: 'approved'
      }
    ],
    events: [
      {
        id: 'event-001',
        title: 'Inter-University Debate Championship',
        titleAm: 'የዩኒቨርስቲዎች ክርክር ሻምፒዮንሺፕ',
        description: 'Annual debate competition with other universities',
        descriptionAm: 'ከሌሎች ዩኒቨርስቲዎች ጋር ዓመታዊ የክርክር ውድድር',
        date: new Date('2024-03-15'),
        location: 'Main Auditorium',
        attendees: 200
      }
    ]
  },
  {
    id: 'club-002',
    name: 'Drama Club',
    nameAm: 'የድራማ ክለብ',
    description: 'Theatrical performances and creative expression',
    descriptionAm: 'የቲያትር ትርኢቶች እና የፈጠራ አገላለጽ',
    category: 'Arts',
    members: 32,
    status: 'active',
    documents: [],
    events: []
  },
  {
    id: 'club-003',
    name: 'Robotics Society',
    nameAm: 'የሮቦቲክስ ማህበር',
    description: 'Innovation in robotics and automation',
    descriptionAm: 'በሮቦቲክስ እና አውቶሜሽን ውስጥ ፈጠራ',
    category: 'Technology',
    members: 28,
    status: 'pending',
    documents: [],
    events: []
  }
];

export const mockElections: Election[] = [
  {
    id: 'election-001',
    title: 'Student Union President Election 2024',
    titleAm: 'የ2024 የተማሪዎች ማህበር ፕሬዚደንት ምርጫ',
    description: 'Vote for the next Student Union President',
    descriptionAm: 'ቀጣዩን የተማሪዎች ማህበር ፕሬዚደንት ይምረጡ',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-07'),
    status: 'active',
    candidates: [
      {
        id: 'candidate-001',
        name: 'Hewan Tadesse',
        nameAm: 'ሔዋን ታደሰ',
        position: 'President',
        positionAm: 'ፕሬዚደንት',
        bio: 'Computer Science student with leadership experience',
        bioAm: 'የኮምፒውተር ሳይንስ ተማሪ የአመራር ልምድ ያለው',
        profileImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
        votes: 4523,
        platform: ['Student Welfare', 'Academic Excellence', 'Campus Infrastructure'],
        platformAm: ['የተማሪ ደህንነት', 'የአካዳሚክ ምርጥነት', 'የካምፓስ መሠረተ ልማት']
      },
      {
        id: 'candidate-002',
        name: 'Dawit Mekonnen',
        nameAm: 'ዳዊት መኮንን',
        position: 'President',
        positionAm: 'ፕሬዚደንት',
        bio: 'Engineering student focused on innovation',
        bioAm: 'በፈጠራ ላይ ያተኮረ የምህንድስና ተማሪ',
        profileImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
        votes: 4024,
        platform: ['Innovation Hub', 'Student Rights', 'Environmental Sustainability'],
        platformAm: ['የኢኖቬሽን ማዕከል', 'የተማሪ መብቶች', 'የአካባቢ ዘላቂነት']
      }
    ],
    totalVotes: 8547
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: 'COMP-2024-001',
    title: 'Library Access Issue',
    description: 'Unable to access digital library resources from dormitory',
    category: 'academic',
    status: 'under_review',
    priority: 'medium',
    submittedBy: 'student-001',
    assignedTo: 'academic@dbu.edu.et',
    submittedAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-22'),
    evidence: [],
    responses: [
      {
        id: 'response-001',
        message: 'We are investigating the network connectivity issues in the dormitory',
        author: 'Academic Affairs',
        timestamp: new Date('2024-01-22'),
        isOfficial: true
      }
    ]
  },
  {
    id: 'COMP-2024-002',
    title: 'Cafeteria Food Quality',
    description: 'Concerns about food quality and hygiene in the main cafeteria',
    category: 'dining',
    status: 'resolved',
    priority: 'high',
    submittedBy: 'student-002',
    assignedTo: 'dining@dbu.edu.et',
    submittedAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-25'),
    evidence: [],
    responses: [
      {
        id: 'response-002',
        message: 'We have implemented new hygiene protocols and improved food quality standards',
        author: 'Dining Services',
        timestamp: new Date('2024-01-25'),
        isOfficial: true
      }
    ]
  }
];

// Validation functions
export const validateStudentId = (id: string): boolean => {
  const pattern = /^DBU-\d{4}-\d{4}$/;
  return pattern.test(id);
};

export const validateEmail = (email: string): boolean => {
  return email.endsWith('@dbu.edu.et');
};

export const generateCaseId = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `COMP-${year}-${random}`;
};