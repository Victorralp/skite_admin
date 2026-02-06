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
    username: '@SkiteMaster',
    email: 'mfonobongessien@gmail.com',
    revenue: '₦1.8M'
  },
  {
    rank: 2,
    name: 'Tolulope Adebayo',
    username: '@apokjie',
    email: 'tolulopeadebayo@gmail.com',
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
    username: '@cleverking',
    email: 'yetundebakare@gmail.com',
    revenue: '₦5.3M'
  },
  {
    rank: 5,
    name: 'Chidi Nwachukwu',
    username: '@ellerose',
    email: 'chidinwachukwu@gmail.com',
    revenue: '₦4.43M'
  }
];

// Extended Creator type for Creators page
export type Creator = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  revenue: string;
  revenueNumeric: number;
  products: number;
  status: 'Active' | 'Suspended';
  bio: string;
  joinedDate: string;
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
    status: 'Active',
    bio: 'Digital content creator specializing in comedy skits and educational content',
    joinedDate: '2024-01-15'
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
    status: 'Active',
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
    status: 'Active',
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
