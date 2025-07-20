export interface Branch {
  id: string;
  nameEn: string;
  nameAm: string;
  responsibilities: string[];
  responsibilitiesAm: string[];
  contact: string;
  description: string;
  descriptionAm: string;
  hierarchy: number;
}

export const branches: Branch[] = [
  {
    id: 'student_din',
    nameEn: 'Student Din',
    nameAm: 'የተማሪዎች ዲን',
    responsibilities: [
      'Supreme authority for all student matters',
      'Direct liaison to university administration',
      'Final arbiter in disputes',
      'Emergency decision-making authority'
    ],
    responsibilitiesAm: [
      'ለሁሉም የተማሪ ጉዳዮች ከፍተኛ ሥልጣን',
      'ከዩኒቨርስቲ አስተዳደር ጋር ቀጥተኛ ግንኙነት',
      'በክርክሮች ውስጥ የመጨረሻ ፈራጅ',
      'የአደጋ ጊዜ የውሳኔ አሰጣጥ ሥልጣን'
    ],
    contact: 'din@dbu.edu.et',
    description: 'Highest authority in student affairs with direct university liaison',
    descriptionAm: 'በተማሪ ጉዳዮች ውስጥ ከፍተኛ ሥልጣን ያለው ከዩኒቨርስቲ ጋር ቀጥተኛ ግንኙነት',
    hierarchy: 1
  },
  {
    id: 'president',
    nameEn: 'President',
    nameAm: 'ፕሬዝዳንት',
    responsibilities: [
      'Overall strategic leadership',
      'Emergency decision-making',
      'System superadmin privileges',
      'Inter-branch coordination'
    ],
    responsibilitiesAm: [
      'አጠቃላይ ስትራቴጂካዊ አመራር',
      'የአደጋ ጊዜ ውሳኔ አሰጣጥ',
      'የስርዓት ሱፐር አድሚን መብቶች',
      'የቅርንጫፍ ማስተባበር'
    ],
    contact: 'president@dbu.edu.et',
    description: 'Chief executive officer of the student union',
    descriptionAm: 'የተማሪዎች ማህበር ዋና ሥራ አስፈፃሚ',
    hierarchy: 2
  },
  {
    id: 'vice_president',
    nameEn: 'Vice President',
    nameAm: 'ምክትል ፕሬዝዳንት',
    responsibilities: [
      'Assists president',
      'Coordinates inter-branch activities',
      'Manages daily operations',
      'Acts as president when absent'
    ],
    responsibilitiesAm: [
      'ፕሬዚደንትን ይረዳል',
      'የቅርንጫፍ እንቅስቃሴዎችን ያስተባብራል',
      'የዕለት ተዕለት ሥራዎችን ያስተዳድራል',
      'ፕሬዚደንት በሌለበት ጊዜ ይሠራል'
    ],
    contact: 'vicepresident@dbu.edu.et',
    description: 'Deputy to the president and operational coordinator',
    descriptionAm: 'የፕሬዚደንት ምክትል እና የሥራ አስተባባሪ',
    hierarchy: 3
  },
  {
    id: 'secretary',
    nameEn: 'Secretary',
    nameAm: 'ሴክሬተር',
    responsibilities: [
      'Documents all meetings',
      'Maintains union records',
      'Manages correspondence',
      'Archives important documents'
    ],
    responsibilitiesAm: [
      'ሁሉንም ስብሰባዎች ይመዘግባል',
      'የማህበር መዝገቦችን ይይዛል',
      'ደብዳቤዎችን ያስተዳድራል',
      'አስፈላጊ ሰነዶችን ያስቀምጣል'
    ],
    contact: 'secretary@dbu.edu.et',
    description: 'Records keeper and documentation manager',
    descriptionAm: 'የመዝገብ ጠባቂ እና የሰነድ አስተዳዳሪ',
    hierarchy: 4
  },
  {
    id: 'speaker',
    nameEn: 'Speaker',
    nameAm: 'አፈ ጉባኤ',
    responsibilities: [
      'Leads general assemblies',
      'Moderates discussions',
      'Represents student voice',
      'Facilitates democratic processes'
    ],
    responsibilitiesAm: [
      'አጠቃላይ ጉባኤዎችን ይመራል',
      'ውይይቶችን ያስተባብራል',
      'የተማሪዎችን ድምጽ ይወክላል',
      'ዲሞክራሲያዊ ሂደቶችን ያመቻቻል'
    ],
    contact: 'speaker@dbu.edu.et',
    description: 'Parliamentary leader and student voice representative',
    descriptionAm: 'የፓርላማ መሪ እና የተማሪዎች ድምጽ ተወካይ',
    hierarchy: 5
  },
  {
    id: 'academic_affairs',
    nameEn: 'Academic Affairs',
    nameAm: 'የትምህርት ጉዳዮች',
    responsibilities: [
      'Handles grade appeals',
      'Addresses exam concerns',
      'Liaises with faculty',
      'Academic policy advocacy'
    ],
    responsibilitiesAm: [
      'የውጤት ይግባኝ ጥያቄዎችን ያስተናግዳል',
      'የፈተና ጉዳዮችን ይፈታል',
      'ከመምህራን ጋር ይገናኛል',
      'የትምህርት ፖሊሲ ተሟጋች'
    ],
    contact: 'academic@dbu.edu.et',
    description: 'Academic issues and faculty relations',
    descriptionAm: 'የትምህርት ጉዳዮች እና የመምህራን ግንኙነት',
    hierarchy: 6
  },
  {
    id: 'general_service',
    nameEn: 'General Service',
    nameAm: 'አጠቃላይ አገልግሎት',
    responsibilities: [
      'Manages campus facilities',
      'Oversees logistics',
      'Handles lost/found items',
      'Infrastructure maintenance coordination'
    ],
    responsibilitiesAm: [
      'የካምፓስ መገልገያዎችን ያስተዳድራል',
      'ሎጂስቲክስን ይቆጣጠራል',
      'የጠፉ/የተገኙ ዕቃዎችን ያስተናግዳል',
      'የመሠረተ ልማት ጥገና ማስተባበር'
    ],
    contact: 'service@dbu.edu.et',
    description: 'Campus services and facility management',
    descriptionAm: 'የካምፓስ አገልግሎቶች እና የመገልገያ አስተዳደር',
    hierarchy: 7
  },
  {
    id: 'dining_services',
    nameEn: 'Dining Services',
    nameAm: 'ምግብ ቤት',
    responsibilities: [
      'Monitors food quality',
      'Addresses cafeteria issues',
      'Manages meal plans',
      'Food safety oversight'
    ],
    responsibilitiesAm: [
      'የምግብ ጥራትን ይቆጣጠራል',
      'የካፌቴሪያ ጉዳዮችን ይፈታል',
      'የምግብ እቅዶችን ያስተዳድራል',
      'የምግብ ደህንነት ቁጥጥር'
    ],
    contact: 'dining@dbu.edu.et',
    description: 'Food services and dining facility management',
    descriptionAm: 'የምግብ አገልግሎቶች እና የምግብ ቤት አስተዳደር',
    hierarchy: 8
  },
  {
    id: 'sports_culture',
    nameEn: 'Sports & Culture',
    nameAm: 'ስፖርት እና ባህል',
    responsibilities: [
      'Organizes tournaments',
      'Plans cultural events',
      'Manages equipment',
      'Promotes student wellness'
    ],
    responsibilitiesAm: [
      'ውድድሮችን ያዘጋጃል',
      'የባህል ዝግጅቶችን ያቅዳል',
      'መሳሪያዎችን ያስተዳድራል',
      'የተማሪዎች ደህንነትን ያበረታታል'
    ],
    contact: 'sports@dbu.edu.et',
    description: 'Athletic and cultural activities coordination',
    descriptionAm: 'የአትሌቲክስ እና የባህል እንቅስቃሴዎች ማስተባበር',
    hierarchy: 9
  },
  {
    id: 'clubs_associations',
    nameEn: 'Clubs & Associations',
    nameAm: 'ክለቦች እና ማህበራት',
    responsibilities: [
      'Approves new clubs (6+ groups)',
      'Oversees club budgets',
      'Validates event proposals',
      'Manages club documentation'
    ],
    responsibilitiesAm: [
      'አዲስ ክለቦችን ያፀድቃል (6+ ቡድኖች)',
      'የክለብ በጀቶችን ይቆጣጠራል',
      'የዝግጅት ሀሳቦችን ያረጋግጣል',
      'የክለብ ሰነዶችን ያስተዳድራል'
    ],
    contact: 'clubs@dbu.edu.et',
    description: 'Student organizations and extracurricular activities',
    descriptionAm: 'የተማሪ ድርጅቶች እና ተጨማሪ እንቅስቃሴዎች',
    hierarchy: 10
  }
];