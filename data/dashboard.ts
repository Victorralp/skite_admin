export type SidebarItem = {
  label: string;
  active?: boolean;
  icon: string;
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

export const sidebarSections: SidebarSection[] = [
  {
    title: 'DASHBOARD',
    items: [
      { label: 'Dashboard', icon: 'dashboard', active: true },
      { label: 'Creators', icon: 'creators' },
      { label: 'Users', icon: 'users' },
      { label: 'Products', icon: 'products' },
      { label: 'Events & Live', icon: 'events' }
    ]
  },
  {
    title: 'OPERATIONS',
    items: [
      { label: 'Revenue', icon: 'revenue' },
      { label: 'Support Center', icon: 'support' },
      { label: 'Live Tools', icon: 'live' }
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Notifications', icon: 'notifications' },
      { label: 'Logs', icon: 'logs' },
      { label: 'Settings', icon: 'settings' }
    ]
  }
];

export const overviewMetrics = [
  {
    title: 'Total Platform Revenue',
    value: '₦28,450,000',
    delta: '+2.5% from last month'
  },
  {
    title: 'Processed Revenue',
    value: '₦113,240,000',
    delta: '+2.5% from last month'
  },
  {
    title: 'Active Creators',
    value: '3,842',
    delta: '+2.5% from last month'
  },
  {
    title: 'Total Users',
    value: '3,842',
    delta: '+2.5% from last month'
  },
  {
    title: 'Total Products',
    value: '7,614',
    delta: '+2.5% from last month'
  }
];

export const transactionVolume = [950, 1050, 1200, 1100, 800, 650, 450, 550, 700, 1150, 850, 750];

export const transactionLabels = [
  '00:00',
  '02:00',
  '04:00',
  '06:00',
  '08:00',
  '10:00',
  '12:00',
  '14:00',
  '16:00',
  '18:00',
  '20:00',
  '22:00'
];

export const pieLegend = [
  { label: 'Courses', value: '46%', color: '#4476a8' },
  { label: 'Digital Products', value: '22%', color: '#fa4d26' },
  { label: 'Classes', value: '18%', color: '#a7cf36' },
  { label: 'Groups', value: '14%', color: '#fccf03' },
  { label: '1-1 Calls', value: '14%', color: '#fa8c05' },
  { label: 'Paid DMs', value: '14%', color: '#f20574' }
];

export const activityCards = [
  {
    title: 'Messages',
    value: '12,635',
    meta: ['Text 67%', 'Files 18%', 'Links 12%']
  },
  {
    title: 'Live Sessions',
    value: '12',
    meta: ['1-1 Calls 3', 'Turnout 1,393']
  },
  {
    title: 'Sales',
    value: '623',
    meta: ['Abandoned Carts', '156 (12%)']
  },
  {
    title: 'Pageviews',
    value: '124,920',
    meta: ['Top Creator', '@SkitMaster']
  }
];

export const topCreators = [
  {
    rank: 1,
    name: 'Mfonobong Essien',
    username: '@SkitMaster',
    email: 'mfonobongessien@gmail.com',
    revenue: '₦1.1B'
  },
  {
    rank: 2,
    name: 'Tolulope Adebayo',
    username: '@paigelee',
    email: 'tolulopeadebayo4@gmail.com',
    revenue: '₦12.4M'
  },
  {
    rank: 3,
    name: 'Adesuwa Ighodaro',
    username: '@daisy',
    email: 'adesuwaighodaro@gmail.com',
    revenue: '₦10.23M'
  },
  {
    rank: 4,
    name: 'Yetunde Bakare',
    username: '@oliverking',
    email: 'yetundebakare@gmail.com',
    revenue: '₦5.3M'
  },
  {
    rank: 5,
    name: 'Chidi Nwachukwu',
    username: '@ellierose',
    email: 'chidinwachukwu22@gmail.com',
    revenue: '₦4.43M'
  }
];

// Extended Creator type for Creators page
export type Review = {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
};

export type Creator = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  revenue: string;
  revenueNumeric: number;
  products: number;
  salesCount: number;
  subscribers: number;
  hubViews: number;
  lastActive: string;
  status: 'Active' | 'Suspended' | 'Banned';
  bio: string;
  joinedDate: string;
  location?: string;
  gender?: string;
  dob?: string;
  reviews?: Review[];
};

export const allCreators: Creator[] = [
  {
    id: 'CR001',
    name: 'Mfonobong Essien',
    username: '@SkiteMaster',
    email: 'mfonobongessien@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    revenue: '₦1,845,000',
    revenueNumeric: 1845000,
    products: 23,
    salesCount: 242,
    subscribers: 3139,
    hubViews: 431,
    lastActive: '2 min ago',
    status: 'Active',
    bio: 'Digital content creator specializing in comedy skits and educational content',
    joinedDate: '2022-01-15',
    location: 'Toronto, Canada',
    gender: 'Male',
    dob: '08/06/1990',
    reviews: [
      {
        id: 'REV1',
        author: 'Annette Black',
        handle: '@evanlee',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        date: '1/15/12',
        content: 'They are a great partner on both Strategic and Implementation. They have proven to be fair and responsible.'
      },
      {
        id: 'REV2',
        author: 'Jane Cooper',
        handle: '@lucyliu',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4,
        date: '6/19/14',
        content: 'Very inspiring working experience with their representatives, responsible and active in communication.'
      },
      {
        id: 'REV3',
        author: 'Jacob Jones',
        handle: '@paigelee',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        date: '8/30/14',
        content: 'The partner been progressing well with the business change environment, talents of new skill set mindset.'
      }
    ]
  },
  {
    id: 'CR002',
    name: 'Tolulope Adebayo',
    username: '@apokjie',
    email: 'tolulopeadebayo@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    revenue: '₦12,420,000',
    revenueNumeric: 12420000,
    products: 45,
    salesCount: 890,
    subscribers: 12500,
    hubViews: 2100,
    lastActive: '3 min ago',
    status: 'Active',
    bio: 'Lifestyle coach and digital product creator',
    joinedDate: '2023-11-20'
  },
  {
    id: 'CR003',
    name: 'Adesuwa Ighodaro',
    username: '@daisy',
    email: 'adesuwaighodaro@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    revenue: '₦10,230,000',
    revenueNumeric: 10230000,
    products: 38,
    salesCount: 650,
    subscribers: 8900,
    hubViews: 1540,
    lastActive: '5 min ago',
    status: 'Active',
    bio: 'Fashion designer and online course instructor',
    joinedDate: '2024-02-10'
  },
  {
    id: 'CR004',
    name: 'Yetunde Bakare',
    username: '@cleverking',
    email: 'yetundebakare@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    revenue: '₦5,300,000',
    revenueNumeric: 5300000,
    products: 19,
    salesCount: 320,
    subscribers: 4500,
    hubViews: 890,
    lastActive: '11 min ago',
    status: 'Suspended',
    bio: 'Tech educator and software development mentor',
    joinedDate: '2024-03-05'
  },
  {
    id: 'CR005',
    name: 'Chidi Nwachukwu',
    username: '@ellerose',
    email: 'chidinwachukwu@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    revenue: '₦4,430,000',
    revenueNumeric: 4430000,
    products: 16,
    salesCount: 210,
    subscribers: 3200,
    hubViews: 650,
    lastActive: '14 min ago',
    status: 'Suspended',
    bio: 'Fitness coach and wellness content creator',
    joinedDate: '2023-12-12'
  },
  {
    id: 'CR006',
    name: 'Funmilayo Adeleke',
    username: '@funmi_creates',
    email: 'funmilayoadeleke@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    revenue: '₦8,920,000',
    revenueNumeric: 8920000,
    products: 31,
    salesCount: 540,
    subscribers: 7200,
    hubViews: 1200,
    lastActive: '18 min ago',
    status: 'Banned',
    bio: 'Graphic designer and brand consultant',
    joinedDate: '2024-01-08'
  },
  {
    id: 'CR007',
    name: 'Emeka Okonkwo',
    username: '@emeka_tech',
    email: 'emekaokonkwo@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    revenue: '₦6,750,000',
    revenueNumeric: 6750000,
    products: 27,
    salesCount: 410,
    subscribers: 5600,
    hubViews: 980,
    lastActive: '21 min ago',
    status: 'Active',
    bio: 'Software engineer teaching coding bootcamps',
    joinedDate: '2023-10-22'
  },
  {
    id: 'CR008',
    name: 'Blessing Okafor',
    username: '@blessingwrites',
    email: 'blessingokafor@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    revenue: '₦3,280,000',
    revenueNumeric: 3280000,
    products: 14,
    salesCount: 180,
    subscribers: 2400,
    hubViews: 540,
    lastActive: '23 min ago',
    status: 'Active',
    bio: 'Content writer and storytelling instructor',
    joinedDate: '2024-04-17'
  },
  {
    id: 'CR009',
    name: 'Kehinde Ajayi',
    username: '@kehinde_chef',
    email: 'kehindeajayi@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
    revenue: '₦5,670,000',
    revenueNumeric: 5670000,
    products: 22,
    salesCount: 350,
    subscribers: 4800,
    hubViews: 820,
    lastActive: '25 min ago',
    status: 'Active',
    bio: 'Professional chef and cooking class instructor',
    joinedDate: '2024-02-28'
  },
  {
    id: 'CR010',
    name: 'Ngozi Eze',
    username: '@ngozi_beauty',
    email: 'ngozieze@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
    revenue: '₦7,890,000',
    revenueNumeric: 7890000,
    products: 34,
    salesCount: 490,
    subscribers: 6100,
    hubViews: 1100,
    lastActive: '27 min ago',
    status: 'Active',
    bio: 'Beauty and makeup artist offering masterclasses',
    joinedDate: '2023-09-14'
  },
  {
    id: 'CR011',
    name: 'Ibrahim Mohammed',
    username: '@ibrahim_photo',
    email: 'ibrahimmohammed@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
    revenue: '₦4,120,000',
    revenueNumeric: 4120000,
    products: 18,
    salesCount: 230,
    subscribers: 3100,
    hubViews: 680,
    lastActive: '30 min ago',
    status: 'Suspended',
    bio: 'Photographer teaching digital photography',
    joinedDate: '2024-01-30'
  },
  {
    id: 'CR012',
    name: 'Amara Nwosu',
    username: '@amara_design',
    email: 'amaranwosu@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop&crop=face',
    revenue: '₦9,340,000',
    revenueNumeric: 9340000,
    products: 29,
    salesCount: 580,
    subscribers: 7500,
    hubViews: 1300,
    lastActive: '35 min ago',
    status: 'Active',
    bio: 'UI/UX designer and design thinking facilitator',
    joinedDate: '2023-11-05'
  },
  {
    id: 'CR013',
    name: 'Oluwaseun Bello',
    username: '@seun_music',
    email: 'oluwaseunbello@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=face',
    revenue: '₦6,210,000',
    revenueNumeric: 6210000,
    products: 25,
    salesCount: 390,
    subscribers: 5200,
    hubViews: 900,
    lastActive: '40 min ago',
    status: 'Active',
    bio: 'Music producer and audio engineering instructor',
    joinedDate: '2024-03-22'
  },
  {
    id: 'CR014',
    name: 'Chioma Onwuka',
    username: '@chioma_biz',
    email: 'chiomaonwuka@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=100&h=100&fit=crop&crop=face',
    revenue: '₦11,560,000',
    revenueNumeric: 11560000,
    products: 42,
    salesCount: 720,
    subscribers: 9800,
    hubViews: 1800,
    lastActive: '46 min ago',
    status: 'Active',
    bio: 'Business coach and entrepreneurship mentor',
    joinedDate: '2023-08-18'
  },
  {
    id: 'CR015',
    name: 'Adeyemi Ogunleye',
    username: '@adeyemi_fit',
    email: 'adeyemiogunleye@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507081323647-4d250478b919?w=100&h=100&fit=crop&crop=face',
    revenue: '₦5,890,000',
    revenueNumeric: 5890000,
    products: 21,
    salesCount: 360,
    subscribers: 5000,
    hubViews: 850,
    lastActive: '49 min ago',
    status: 'Active',
    bio: 'Personal trainer and nutrition specialist',
    joinedDate: '2024-02-14'
  },
  {
    id: 'CR016',
    name: 'Fatima Abdullahi',
    username: '@fatima_lang',
    email: 'fatimaabdullahi@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=100&h=100&fit=crop&crop=face',
    revenue: '₦4,780,000',
    revenueNumeric: 4780000,
    products: 20,
    salesCount: 290,
    subscribers: 3900,
    hubViews: 710,
    lastActive: '53 min ago',
    status: 'Active',
    bio: 'Language tutor teaching French and Spanish',
    joinedDate: '2024-04-01'
  },
  {
    id: 'CR017',
    name: 'Victor Obi',
    username: '@victor_market',
    email: 'victorobi@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face',
    revenue: '₦8,430,000',
    revenueNumeric: 8430000,
    products: 33,
    salesCount: 520,
    subscribers: 6900,
    hubViews: 1150,
    lastActive: '58 min ago',
    status: 'Active',
    bio: 'Digital marketing expert and social media strategist',
    joinedDate: '2023-12-03'
  },
  {
    id: 'CR018',
    name: 'Nneka Okoro',
    username: '@nneka_art',
    email: 'nnekaokoro@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=100&h=100&fit=crop&crop=face',
    revenue: '₦3,920,000',
    revenueNumeric: 3920000,
    products: 15,
    salesCount: 200,
    subscribers: 2800,
    hubViews: 590,
    lastActive: '1 hr ago',
    status: 'Active',
    bio: 'Digital artist teaching illustration and design',
    joinedDate: '2024-03-10'
  }
];


export const recentTransactions = [
  {
    id: 'TXN12IUD',
    product: 'Emerge - Modern and Adaptive Web Template',
    creator: 'Mfonobong Essien',
    buyer: 'Mfonobong Essien',
    amount: '₦12,920.99',
    date: '12.03.2025 00:23',
    status: 'Success'
  },
  {
    id: 'TXN12IUD',
    product: 'Visionary - Futuristic Web Design Template',
    creator: 'Tolulope Adebayo',
    buyer: 'Tolulope Adebayo',
    amount: '₦12,920.99',
    date: '12.03.2025 00:23',
    status: 'Pending'
  },
  {
    id: 'TXN12IUD',
    product: 'LuxeTheme - Stylish Theme for Entrepreneurs',
    creator: 'Adesuwa Ighodaro',
    buyer: 'Adesuwa Ighodaro',
    amount: '₦12,920.99',
    date: '12.03.2025 00:23',
    status: 'Flagged'
  },
  {
    id: 'TXN12IUD',
    product: 'Envision - Futuristic Business Web Template',
    creator: 'Yetunde Bakare',
    buyer: 'Yetunde Bakare',
    amount: '₦12,920.99',
    date: '12.03.2025 00:23',
    status: 'Success'
  },
  {
    id: 'TXN12IUD',
    product: 'MotionFlow - Animated Web Design',
    creator: 'Chidi Nwachukwu',
    buyer: 'Chidi Nwachukwu',
    amount: '₦12,920.99',
    date: '12.03.2025 00:23',
    status: 'Success'
  },
  {
    id: 'TXN12IUD',
    product: 'Digital Course',
    creator: 'Kelechi Uche',
    buyer: 'Kelechi Uche',
    amount: '₦12,920.99',
    date: '12.03.2025 00:23',
    status: 'Success'
  }
];

export type Product = {
  id: string;
  detailId?: string | null;
  name: string;
  thumbnail: string;
  image?: string; // Alias for thumbnail for backward compatibility
  price: number;
  sales: number;
  revenue: number;
  status: 'Active' | 'Draft' | 'Archived' | 'active' | 'rejected' | 'inactive'; // Support both cases
  dateCreated: string;
  creatorId: string;
  type?: string; // Product type (eBook, Course, etc.)
  creator?: { // Creator info for display
    name: string;
    username: string;
  };
};

// Comprehensive Products Data for Products Page
export const allProducts: Product[] = [
  {
    id: 'PROD-001',
    name: 'Skit Editing Masterclass',
    thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 21000,
    sales: 242,
    revenue: 5082000,
    status: 'active',
    dateCreated: '2 min ago',
    creatorId: 'CR001',
    type: 'Course',
    creator: { name: 'Mfonobong Essien', username: '@SkiteMaster' }
  },
  {
    id: 'PROD-002',
    name: 'Digital Marketing Blueprint',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 15600,
    sales: 189,
    revenue: 2948400,
    status: 'active',
    dateCreated: '3 min ago',
    creatorId: 'CR002',
    type: 'eBook',
    creator: { name: 'Tolulope Adebayo', username: '@apokjie' }
  },
  {
    id: 'PROD-003',
    name: 'Fashion Design Fundamentals',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 18000,
    sales: 156,
    revenue: 2808000,
    status: 'active',
    dateCreated: '5 min ago',
    creatorId: 'CR003',
    type: 'Course',
    creator: { name: 'Adesuwa Ighodaro', username: '@fashionista' }
  },
  {
    id: 'PROD-004',
    name: 'Python Programming Course',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 25000,
    sales: 134,
    revenue: 3350000,
    status: 'active',
    dateCreated: '11 min ago',
    creatorId: 'CR004',
    type: 'Course',
    creator: { name: 'Yetunde Bakare', username: '@codequeen' }
  },
  {
    id: 'PROD-005',
    name: 'Fitness Training Program',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 12000,
    sales: 98,
    revenue: 1176000,
    status: 'rejected',
    dateCreated: '14 min ago',
    creatorId: 'CR005',
    type: 'Program',
    creator: { name: 'Chidi Nwachukwu', username: '@fitlife' }
  },
  {
    id: 'PROD-006',
    name: 'Graphic Design Templates Pack',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 8500,
    sales: 312,
    revenue: 2652000,
    status: 'active',
    dateCreated: '23 min ago',
    creatorId: 'CR006',
    type: 'Digital Product',
    creator: { name: 'Funmilayo Adeleke', username: '@designpro' }
  },
  {
    id: 'PROD-007',
    name: 'Web Development Bootcamp',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 45000,
    sales: 87,
    revenue: 3915000,
    status: 'active',
    dateCreated: '27 min ago',
    creatorId: 'CR007',
    type: 'Course',
    creator: { name: 'Adebayo Ogunlesi', username: '@webdev' }
  },
  {
    id: 'PROD-008',
    name: 'Content Writing Masterclass',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 16000,
    sales: 145,
    revenue: 2320000,
    status: 'active',
    dateCreated: '31 min ago',
    creatorId: 'CR008',
    type: 'Course',
    creator: { name: 'Ngozi Okafor', username: '@writer' }
  },
  {
    id: 'PROD-009',
    name: 'Nigerian Cuisine eBook',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 9500,
    sales: 223,
    revenue: 2118500,
    status: 'active',
    dateCreated: '35 min ago',
    creatorId: 'CR009',
    type: 'eBook',
    creator: { name: 'Amaka Nwosu', username: '@chef' }
  },
  {
    id: 'PROD-010',
    name: 'Makeup Artistry Course',
    thumbnail: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 22000,
    sales: 167,
    revenue: 3674000,
    status: 'inactive',
    dateCreated: '46 min ago',
    creatorId: 'CR010',
    type: 'Course',
    creator: { name: 'Kemi Adetiba', username: '@makeup' }
  },
  {
    id: 'PROD-011',
    name: 'Photography Basics',
    thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 19000,
    sales: 92,
    revenue: 1748000,
    status: 'inactive',
    dateCreated: '49 min ago',
    creatorId: 'CR011',
    type: 'Course',
    creator: { name: 'Tunde Kelani', username: '@photographer' }
  },
  {
    id: 'PROD-012',
    name: 'UI/UX Design Principles',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 28000,
    sales: 178,
    revenue: 4984000,
    status: 'rejected',
    dateCreated: '53 min ago',
    creatorId: 'CR012',
    type: 'Course',
    creator: { name: 'Ola Rotimi', username: '@designer' }
  },
  {
    id: 'PROD-013',
    name: 'Music Production 101',
    thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 32000,
    sales: 124,
    revenue: 3968000,
    status: 'active',
    dateCreated: '58 min ago',
    creatorId: 'CR013',
    type: 'Course',
    creator: { name: 'Seun Kuti', username: '@musicpro' }
  },
  {
    id: 'PROD-014',
    name: 'Business Strategy Guide',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 24000,
    sales: 201,
    revenue: 4824000,
    status: 'active',
    dateCreated: '1 hr ago',
    creatorId: 'CR014',
    type: 'eBook',
    creator: { name: 'Aliko Dangote Jr', username: '@business' }
  },
  {
    id: 'PROD-015',
    name: 'Personal Training Certification',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 35000,
    sales: 89,
    revenue: 3115000,
    status: 'active',
    dateCreated: '1 hr ago',
    creatorId: 'CR015',
    type: 'Certification',
    creator: { name: 'Blessing Okagbare', username: '@trainer' }
  },
  {
    id: 'PROD-016',
    name: 'French Language Course',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 18500,
    sales: 156,
    revenue: 2886000,
    status: 'active',
    dateCreated: '1 hr ago',
    creatorId: 'CR016',
    type: 'Course',
    creator: { name: 'Pierre Nkurunziza', username: '@french' }
  },
  {
    id: 'PROD-017',
    name: 'Social Media Marketing',
    thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 17000,
    sales: 234,
    revenue: 3978000,
    status: 'active',
    dateCreated: '2 hr ago',
    creatorId: 'CR017',
    type: 'Course',
    creator: { name: 'Linda Ikeji', username: '@socialmedia' }
  },
  {
    id: 'PROD-018',
    name: 'Digital Illustration Guide',
    thumbnail: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=100&h=100&fit=crop',
    image: '/image.png',
    price: 14000,
    sales: 178,
    revenue: 2492000,
    status: 'active',
    dateCreated: '2 hr ago',
    creatorId: 'CR018',
    type: 'eBook',
    creator: { name: 'Laolu Senbanjo', username: '@illustrator' }
  }
];

// Legacy export for backward compatibility
export const creatorProducts: Product[] = allProducts.slice(0, 6);

export type Hub = {
  id: string;
  name: string;
  thumbnail: string;
  members: number;
  posts: number;
  status: 'Active' | 'Inactive';
  dateCreated: string;
};

export const creatorHubs: Hub[] = [
  {
    id: 'HUB-001',
    name: 'Eco-Friendly Enthusiasts',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
    members: 24656,
    posts: 34,
    status: 'Active',
    dateCreated: '10.01.2024'
  },
  {
    id: 'HUB-002',
    name: 'Sustainable Living Advocates',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=100&h=100&fit=crop',
    members: 24656,
    posts: 34,
    status: 'Active',
    dateCreated: '15.02.2024'
  },
  {
    id: 'HUB-003',
    name: 'Artistic Minds Collective',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&h=100&fit=crop',
    members: 24656,
    posts: 34,
    status: 'Inactive',
    dateCreated: '05.03.2024'
  },
  {
    id: 'HUB-004',
    name: 'Science & Innovation Hub',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
    members: 24656,
    posts: 34,
    status: 'Active',
    dateCreated: '10.01.2024'
  },
  {
    id: 'HUB-005',
    name: 'Culture & Heritage Society',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=100&h=100&fit=crop',
    members: 24656,
    posts: 34,
    status: 'Active',
    dateCreated: '15.02.2024'
  },
  {
    id: 'HUB-006',
    name: 'Artisan Crafts Community',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&h=100&fit=crop',
    members: 24656,
    posts: 34,
    status: 'Active',
    dateCreated: '05.03.2024'
  }
];

export type Class = {
  id: string;
  title: string;
  thumbnail: string;
  students: number;
  price: number;
  status: 'Active' | 'Draft' | 'Archived';
  dateCreated: string;
};

export const creatorClasses: Class[] = [
  {
    id: 'CLS-001',
    title: 'Mastering Web Design 2024',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop',
    students: 1540,
    price: 45000.00,
    status: 'Active',
    dateCreated: '10.01.2024'
  },
  {
    id: 'CLS-002',
    title: 'UI/UX Fundamentals',
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?w=100&h=100&fit=crop',
    students: 890,
    price: 30000.00,
    status: 'Active',
    dateCreated: '15.02.2024'
  },
  {
    id: 'CLS-003',
    title: 'Advanced Figma Techniques',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
    students: 420,
    price: 25000.00,
    status: 'Draft',
    dateCreated: '05.03.2024'
  },
  {
    id: 'CLS-004',
    title: 'Freelancing 101 for Designers',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=100&h=100&fit=crop',
    students: 2100,
    price: 15000.00,
    status: 'Archived',
    dateCreated: '12.11.2023'
  }
];

export type CreatorTransaction = {
  id: string;
  product: string;
  buyer: string;
  amount: number;
  date: string;
  status: 'Success' | 'Pending' | 'Flagged';
};

export const creatorTransactions: CreatorTransaction[] = [
  {
    id: 'TXN-8832',
    product: 'Emerge - Modern Web Template',
    buyer: 'Sarah Jenkins',
    amount: 12920.99,
    date: '12.03.2025 14:30',
    status: 'Success'
  },
  {
    id: 'TXN-8833',
    product: 'UI/UX Fundamentals',
    buyer: 'Michael Chen',
    amount: 30000.00,
    date: '12.03.2025 12:15',
    status: 'Success'
  },
  {
    id: 'TXN-8834',
    product: 'Freelancing 101',
    buyer: 'Jessica Williams',
    amount: 15000.00,
    date: '11.03.2025 09:45',
    status: 'Pending'
  },
  {
    id: 'TXN-8835',
    product: 'Advanced Figma Techniques',
    buyer: 'David Miller',
    amount: 25000.00,
    date: '10.03.2025 16:20',
    status: 'Success'
  },
  {
    id: 'TXN-8836',
    product: 'Consultation Call',
    buyer: 'Emily Wilson',
    amount: 50000.00,
    date: '09.03.2025 11:00',
    status: 'Flagged'
  },
  {
    id: 'TXN-8837',
    product: 'Web Designers Community',
    buyer: 'Robert Taylor',
    amount: 5000.00,
    date: '08.03.2025 15:30',
    status: 'Success'
  },
  {
    id: 'TXN-8838',
    product: 'Photography Essentials',
    buyer: 'Lisa Anderson',
    amount: 15000.00,
    date: '08.03.2025 10:15',
    status: 'Success'
  }
];

export type ComplianceItem = {
  id: string;
  title: string;
  type: 'Identity' | 'Financial' | 'Legal';
  status: 'Approved' | 'Pending' | 'Rejected' | 'Expired';
  date: string;
  description: string;
};

export const creatorCompliance: ComplianceItem[] = [
  {
    id: 'COMP-001',
    title: 'Identity Verification (KYC)',
    type: 'Identity',
    status: 'Approved',
    date: '15.01.2024',
    description: 'Passport verification completed successfully.'
  },
  {
    id: 'COMP-002',
    title: 'Anti-Money Laundering (AML) Check',
    type: 'Financial',
    status: 'Approved',
    date: '15.01.2024',
    description: 'Global watchlist screening passed.'
  },
  {
    id: 'COMP-003',
    title: 'Tax Residency Certificate',
    type: 'Financial',
    status: 'Pending',
    date: '20.02.2025',
    description: 'Document submitted, awaiting review.'
  },
  {
    id: 'COMP-004',
    title: 'Terms of Service Agreement',
    type: 'Legal',
    status: 'Approved',
    date: '10.01.2024',
    description: 'Signed digital agreement v2.4.'
  },
  {
    id: 'COMP-005',
    title: 'Business Registration',
    type: 'Legal',
    status: 'Expired',
    date: '01.01.2023',
    description: 'Document expired. Renewal required.'
  }
];

// Revenue Page Data
export const revenueStats = [
  {
    title: 'Total Revenue',
    value: '₦128,450,000',
    delta: '+18% MoM',
    deltaType: 'positive' as const
  },
  {
    title: 'Creator Payouts Pending',
    value: '₦8.7M',
    delta: '1,284 creators',
    deltaType: 'positive' as const
  },
  {
    title: 'Refunds Issued',
    value: '₦2.1M',
    delta: 'Above target',
    deltaType: 'negative' as const
  },
  {
    title: 'Net Platform Profit',
    value: '₦9.2M',
    delta: 'After refunds/fees',
    deltaType: 'neutral' as const
  }
];


// User Type and Data for Users Page
export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  joined: string;
  purchases: number;
  spent: number;
  subscriptions: number;
  lastActive: string;
  status: 'Active' | 'Inactive' | 'Pending';
};

export const allUsers: User[] = [
  {
    id: 'USR-001',
    name: 'Temilade Odunsi',
    username: '@temilade_o',
    email: 'temilade.odunsi@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    joined: '2 min ago',
    purchases: 15,
    spent: 342000,
    subscriptions: 8,
    lastActive: '12.03.2025 14:23',
    status: 'Active'
  },
  {
    id: 'USR-002',
    name: 'Emeka Onwudiwe',
    username: '@emeka_tech',
    email: 'emeka.onwudiwe@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    joined: '3 min ago',
    purchases: 23,
    spent: 567000,
    subscriptions: 12,
    lastActive: '12.03.2025 13:45',
    status: 'Active'
  },
  {
    id: 'USR-003',
    name: 'Blessing Okon',
    username: '@blessing_b',
    email: 'blessing.okon@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    joined: '5 min ago',
    purchases: 8,
    spent: 156000,
    subscriptions: 4,
    lastActive: '12.03.2025 12:10',
    status: 'Active'
  },
  {
    id: 'USR-004',
    name: 'Yahaya Ibrahim',
    username: '@yahaya_i',
    email: 'yahaya.ibrahim@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    joined: '11 min ago',
    purchases: 19,
    spent: 423000,
    subscriptions: 9,
    lastActive: '12.03.2025 11:30',
    status: 'Active'
  },
  {
    id: 'USR-005',
    name: 'Fatima Musa',
    username: '@fatima_m',
    email: 'fatima.musa@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    joined: '14 min ago',
    purchases: 5,
    spent: 89000,
    subscriptions: 2,
    lastActive: '11.03.2025 18:45',
    status: 'Inactive'
  },
  {
    id: 'USR-006',
    name: 'Nnamdi Kalu',
    username: '@nnamdi_k',
    email: 'nnamdi.kalu@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    joined: '23 min ago',
    purchases: 31,
    spent: 789000,
    subscriptions: 15,
    lastActive: '12.03.2025 14:00',
    status: 'Active'
  },
  {
    id: 'USR-007',
    name: 'Iretiola Osho',
    username: '@iretiola_o',
    email: 'iretiola.osho@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    joined: '27 min ago',
    purchases: 12,
    spent: 234000,
    subscriptions: 6,
    lastActive: '12.03.2025 10:15',
    status: 'Active'
  },
  {
    id: 'USR-008',
    name: 'Chidi Nwachukwu',
    username: '@chidi_fitness',
    email: 'chidi.nwachukwu@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    joined: '31 min ago',
    purchases: 7,
    spent: 145000,
    subscriptions: 3,
    lastActive: '12.03.2025 09:30',
    status: 'Active'
  },
  {
    id: 'USR-009',
    name: 'Kayode Ajayi',
    username: '@kayode_a',
    email: 'kayode.ajayi@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
    joined: '35 min ago',
    purchases: 26,
    spent: 612000,
    subscriptions: 11,
    lastActive: '12.03.2025 08:45',
    status: 'Active'
  },
  {
    id: 'USR-010',
    name: 'Tolulope Adebayo',
    username: '@tolulope_a',
    email: 'tolulope.adebayo@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
    joined: '46 min ago',
    purchases: 3,
    spent: 45000,
    subscriptions: 1,
    lastActive: '12.03.2025 07:20',
    status: 'Pending'
  },
  {
    id: 'USR-011',
    name: 'Ishaya Tanko',
    username: '@ishaya_t',
    email: 'ishaya.tanko@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
    joined: '49 min ago',
    purchases: 2,
    spent: 28000,
    subscriptions: 1,
    lastActive: '11.03.2025 22:10',
    status: 'Pending'
  },
  {
    id: 'USR-012',
    name: 'Yetunde Bakare',
    username: '@yetunde_b',
    email: 'yetunde.bakare@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop&crop=face',
    joined: '53 min ago',
    purchases: 4,
    spent: 67000,
    subscriptions: 2,
    lastActive: '10.03.2025 16:30',
    status: 'Inactive'
  },
  {
    id: 'USR-013',
    name: 'Adebola Ogunleye',
    username: '@adebola_o',
    email: 'adebola.ogunleye@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?w=100&h=100&fit=crop&crop=face',
    joined: '58 min ago',
    purchases: 18,
    spent: 456000,
    subscriptions: 7,
    lastActive: '12.03.2025 13:20',
    status: 'Active'
  },
  {
    id: 'USR-014',
    name: 'Chioma Okeke',
    username: '@chioma_o',
    email: 'chioma.okeke@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=100&h=100&fit=crop&crop=face',
    joined: '1 hr ago',
    purchases: 22,
    spent: 534000,
    subscriptions: 10,
    lastActive: '12.03.2025 12:45',
    status: 'Active'
  },
  {
    id: 'USR-015',
    name: 'Oluwaseun Bello',
    username: '@seun_music',
    email: 'oluwaseun.bello@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop&crop=face',
    joined: '1 hr ago',
    purchases: 9,
    spent: 178000,
    subscriptions: 4,
    lastActive: '12.03.2025 11:10',
    status: 'Active'
  },
  {
    id: 'USR-016',
    name: 'Ngozi Eze',
    username: '@ngozi_beauty',
    email: 'ngozi.eze@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=100&h=100&fit=crop&crop=face',
    joined: '1 hr ago',
    purchases: 14,
    spent: 312000,
    subscriptions: 6,
    lastActive: '12.03.2025 10:30',
    status: 'Active'
  },
  {
    id: 'USR-017',
    name: 'Ibrahim Mohammed',
    username: '@ibrahim_photo',
    email: 'ibrahim.mohammed@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=face',
    joined: '2 hr ago',
    purchases: 6,
    spent: 123000,
    subscriptions: 3,
    lastActive: '11.03.2025 20:15',
    status: 'Inactive'
  },
  {
    id: 'USR-018',
    name: 'Amara Nwosu',
    username: '@amara_design',
    email: 'amara.nwosu@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    joined: '2 hr ago',
    purchases: 28,
    spent: 678000,
    subscriptions: 13,
    lastActive: '12.03.2025 14:10',
    status: 'Active'
  }
];
