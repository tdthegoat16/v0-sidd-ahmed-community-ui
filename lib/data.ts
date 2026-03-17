// Mock data for the Positive Tribe community platform

export type CommunityMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  location: string;
  email: string;
  bio: string;
  memberSince: string;
  tags: string[];
  postsCount: number;
  commentsCount: number;
  spacesJoined: number;
  isOnline: boolean;
  color: string;
  isAdmin?: boolean;
};

export type Post = {
  id: string;
  author: CommunityMember;
  title: string;
  body: string;
  image: string | null;
  likes: number;
  comments: number;
  likedBy: CommunityMember[];
  timestamp: string;
  isPinned: boolean;
  space: string;
};

export const communityMembers: CommunityMember[] = [
  {
    id: "1",
    name: "Sidd Ahmed",
    role: "Founder & CEO, VDart Group",
    avatar: "/avatars/sidd.jpg",
    location: "Dallas, TX",
    email: "sidd@vdart.com",
    bio: "Empowering visionaries to build purpose-driven success stories. Speaker. Mentor. Entrepreneur. Founder of Positive Tribe.",
    memberSince: "Jan 2024",
    tags: ["CEO", "Speaker", "Mentor", "VDart", "Positive Tribe"],
    postsCount: 156,
    commentsCount: 312,
    spacesJoined: 12,
    isOnline: true,
    color: "bg-blue-600",
    isAdmin: true,
  },
  {
    id: "2",
    name: "Priya Nair",
    role: "Tech Recruiter",
    avatar: "/avatars/priya.jpg",
    location: "Atlanta, GA",
    email: "priya@example.com",
    bio: "Connecting talented professionals with amazing opportunities. Passionate about building diverse teams.",
    memberSince: "Feb 2024",
    tags: ["Recruiting", "Tech", "Hiring"],
    postsCount: 32,
    commentsCount: 95,
    spacesJoined: 6,
    isOnline: true,
    color: "bg-purple-500",
  },
  {
    id: "3",
    name: "Marcus Thompson",
    role: "Startup Founder",
    avatar: "/avatars/marcus.jpg",
    location: "Austin, TX",
    email: "marcus@example.com",
    bio: "Building the future of fintech. Serial entrepreneur with 3 exits. Always learning, always growing.",
    memberSince: "Mar 2024",
    tags: ["Entrepreneur", "Fintech", "Startups"],
    postsCount: 28,
    commentsCount: 67,
    spacesJoined: 5,
    isOnline: false,
    color: "bg-green-500",
  },
  {
    id: "4",
    name: "Anya Patel",
    role: "Career Coach",
    avatar: "/avatars/anya.jpg",
    location: "New York, NY",
    email: "anya@example.com",
    bio: "Helping professionals navigate career transitions with confidence. Certified ICF Coach.",
    memberSince: "Apr 2024",
    tags: ["Career", "Coaching", "Leadership"],
    postsCount: 45,
    commentsCount: 128,
    spacesJoined: 8,
    isOnline: true,
    color: "bg-orange-500",
  },
  {
    id: "5",
    name: "Devon Williams",
    role: "Software Engineer",
    avatar: "/avatars/devon.jpg",
    location: "Remote",
    email: "devon@example.com",
    bio: "Full-stack developer passionate about clean code and mentoring junior devs. Open source contributor.",
    memberSince: "Jan 2024",
    tags: ["Engineering", "Tech", "Mentorship"],
    postsCount: 19,
    commentsCount: 42,
    spacesJoined: 4,
    isOnline: true,
    color: "bg-teal-500",
  },
  {
    id: "6",
    name: "Keisha Brown",
    role: "Content Creator & Brand Strategist",
    avatar: "/avatars/keisha.jpg",
    location: "Los Angeles, CA",
    email: "keisha@example.com",
    bio: "Building personal brands that stand out. Storytelling enthusiast and digital marketing expert.",
    memberSince: "May 2024",
    tags: ["Marketing", "Branding", "Content"],
    postsCount: 38,
    commentsCount: 89,
    spacesJoined: 7,
    isOnline: false,
    color: "bg-pink-500",
  },
  {
    id: "7",
    name: "Raj Mehta",
    role: "MBA Student, turning entrepreneur",
    avatar: "/avatars/raj.jpg",
    location: "Chicago, IL",
    email: "raj@example.com",
    bio: "MBA candidate exploring the intersection of business and technology. Future founder in the making.",
    memberSince: "Jun 2024",
    tags: ["MBA", "Entrepreneur", "Learning"],
    postsCount: 12,
    commentsCount: 34,
    spacesJoined: 5,
    isOnline: true,
    color: "bg-indigo-500",
  },
];

export const posts = [
  {
    id: "1",
    author: communityMembers[0],
    title: "Welcome to the Positive Tribe — Read This First",
    body: "Welcome to our community of dreamers building purpose-driven lives. Here's everything you need to know to get started and make the most of your membership...",
    image: null,
    likes: 156,
    comments: 89,
    likedBy: [communityMembers[1], communityMembers[2], communityMembers[3]],
    timestamp: "Pinned",
    isPinned: true,
    space: "Announcements",
  },
  {
    id: "2",
    author: communityMembers[2],
    title: "How Sidd's mentorship framework changed my hiring strategy",
    body: "After implementing the frameworks from the Career Acceleration Blueprint, I completely transformed how I approach building my team. The results have been incredible...",
    image: null,
    likes: 47,
    comments: 23,
    likedBy: [communityMembers[0], communityMembers[4], communityMembers[5]],
    timestamp: "2h ago",
    isPinned: false,
    space: "Career & Mentorship",
  },
  {
    id: "3",
    author: communityMembers[3],
    title: "Just closed my first $10k client!",
    body: "I can't believe it! After 6 months of building my coaching practice with the help of this amazing community, I finally landed my first five-figure client. Thank you all for the support!",
    image: null,
    likes: 89,
    comments: 42,
    likedBy: [communityMembers[0], communityMembers[1], communityMembers[6]],
    timestamp: "5h ago",
    isPinned: false,
    space: "Wins & Milestones",
  },
  {
    id: "4",
    author: communityMembers[4],
    title: "The one mindset shift that unlocked my growth",
    body: "For years, I was stuck in a scarcity mindset. Then I heard Sidd talk about 'aspiring more than what life has planned for you' and everything clicked. Here's what changed...",
    image: null,
    likes: 34,
    comments: 18,
    likedBy: [communityMembers[0], communityMembers[2], communityMembers[5]],
    timestamp: "1d ago",
    isPinned: false,
    space: "Mindset & Growth",
  },
  {
    id: "5",
    author: communityMembers[5],
    title: "Sharing my resume template — got 3 interviews this week!",
    body: "Based on Sidd's Career Acceleration Blueprint, I've created a resume template that's been working incredibly well. Download link inside. Would love your feedback!",
    image: null,
    likes: 67,
    comments: 31,
    likedBy: [communityMembers[1], communityMembers[3], communityMembers[6]],
    timestamp: "2d ago",
    isPinned: false,
    space: "Career & Mentorship",
  },
];

export const spaces = [
  {
    category: "Welcome",
    items: [
      { id: "start-here", name: "Start Here", icon: "map-pin", emoji: "📍", href: "/community/start-here" },
    ],
  },
  {
    category: "Positive Tribe",
    items: [
      { id: "announcements", name: "Announcements", icon: "megaphone", emoji: "📢", href: "/community/announcements" },
      { id: "open-discussions", name: "Open Discussions", icon: "message-circle", emoji: "💬", href: "/community/open-discussions" },
      { id: "wins-milestones", name: "Wins & Milestones", icon: "trophy", emoji: "🏆", href: "/community/wins-milestones" },
      { id: "mindset-growth", name: "Mindset & Growth", icon: "brain", emoji: "🧠", href: "/community/mindset-growth" },
      { id: "business-entrepreneurship", name: "Business & Entrepreneurship", icon: "briefcase", emoji: "💼", href: "/community/business-entrepreneurship" },
      { id: "career-mentorship", name: "Career & Mentorship", icon: "target", emoji: "🎯", href: "/community/career-mentorship" },
      { id: "resources-playbooks", name: "Resources & Playbooks", icon: "book", emoji: "📚", href: "/community/resources-playbooks" },
    ],
  },
  {
    category: "Events",
    items: [{ id: "replay-vault", name: "Replay Vault", icon: "video", emoji: "🎥", href: "/community/replay-vault" }],
  },
];

// Derive space name lookup from canonical spaces data
export const spaceNamesBySlug: Record<string, string> = Object.fromEntries(
  spaces.flatMap((group) => group.items.map((item) => [item.id, item.name]))
);

export const chatChannels = [
  {
    category: "General",
    channels: [
      { id: "welcome", name: "welcome", unread: 0 },
      { id: "daily-wins", name: "daily-wins", unread: 3 },
      { id: "accountability", name: "accountability", unread: 1 },
    ],
  },
  {
    category: "Business",
    channels: [
      { id: "entrepreneurship", name: "entrepreneurship", unread: 0 },
      { id: "startup-advice", name: "startup-advice", unread: 2 },
      { id: "vdart-opportunities", name: "vdart-opportunities", unread: 5 },
    ],
  },
  {
    category: "Community",
    channels: [
      { id: "off-topic", name: "off-topic", unread: 0 },
      { id: "book-club", name: "book-club", unread: 0 },
      { id: "sidd-qa", name: "sidd-qa", unread: 1, isAI: true },
    ],
  },
];

export const chatMessages = [
  {
    id: "1",
    author: communityMembers[1],
    message: "Good morning Tribe! What's everyone working on today?",
    timestamp: "9:15 AM",
    reactions: [
      { emoji: "👋", count: 4 },
      { emoji: "☀️", count: 2 },
    ],
  },
  {
    id: "2",
    author: communityMembers[2],
    message: "Just submitted my pitch deck for the accelerator program! Nervous but excited. Thanks for all the feedback from this community!",
    timestamp: "9:32 AM",
    reactions: [
      { emoji: "🙌", count: 8 },
      { emoji: "🎉", count: 5 },
      { emoji: "🚀", count: 3 },
    ],
  },
  {
    id: "3",
    author: communityMembers[0],
    message: "That's amazing Marcus! Remember — aspire more than what life has planned for you. You've got this! 💪",
    timestamp: "9:45 AM",
    reactions: [
      { emoji: "❤️", count: 12 },
      { emoji: "🙏", count: 6 },
    ],
  },
  {
    id: "4",
    author: communityMembers[4],
    message: "Congrats Marcus! Can't wait to hear how it goes. Anyone up for the afternoon accountability check-in?",
    timestamp: "10:02 AM",
    reactions: [{ emoji: "✅", count: 4 }],
  },
];

export const courses = [
  {
    id: "1",
    title: "Startup Foundations: Build Before You're Ready",
    category: "Entrepreneurship",
    thumbnail: "/courses/startup-foundations.jpg",
    lessons: 12,
    startDate: "Started Jan 15",
    progress: 65,
    isNew: false,
    instructor: communityMembers[0],
    description: "Learn the essential frameworks for launching your startup without waiting for perfect conditions.",
    xpReward: 1200,
    xpEarned: 780,
    badge: { name: "Startup Builder", emoji: "🚀" },
    difficulty: "Intermediate" as const,
    estimatedHours: 6,
  },
  {
    id: "2",
    title: "Enterprise Thinking for Emerging Leaders",
    category: "Leadership",
    thumbnail: "/courses/enterprise-thinking.jpg",
    lessons: 16,
    startDate: "Starts Apr 1",
    progress: 0,
    isNew: true,
    instructor: communityMembers[0],
    description: "Develop the strategic mindset needed to lead at scale in enterprise organizations.",
    xpReward: 1600,
    xpEarned: 0,
    badge: { name: "Enterprise Leader", emoji: "🏢" },
    difficulty: "Advanced" as const,
    estimatedHours: 8,
  },
  {
    id: "3",
    title: "Career Acceleration Blueprint",
    category: "Career Growth",
    thumbnail: "/courses/career-acceleration.jpg",
    lessons: 10,
    startDate: "Started Feb 1",
    progress: 100,
    isNew: false,
    instructor: communityMembers[0],
    description: "Sidd's proven resume, interview, and career advancement framework.",
    xpReward: 1000,
    xpEarned: 1000,
    badge: { name: "Career Pro", emoji: "🎯" },
    difficulty: "Beginner" as const,
    estimatedHours: 5,
  },
  {
    id: "4",
    title: "The Positive Mindset Operating System",
    category: "Mindset",
    thumbnail: "/courses/mindset-os.jpg",
    lessons: 8,
    startDate: "Started Mar 1",
    progress: 45,
    isNew: false,
    instructor: communityMembers[0],
    description: "Transform your thinking patterns to unlock consistent growth and resilience.",
    xpReward: 800,
    xpEarned: 360,
    badge: { name: "Mindset Master", emoji: "🧠" },
    difficulty: "Beginner" as const,
    estimatedHours: 4,
  },
  {
    id: "5",
    title: "Business Acceleration: Scaling with Purpose",
    category: "Entrepreneurship",
    thumbnail: "/courses/business-acceleration.jpg",
    lessons: 20,
    startDate: "Starts May 1",
    progress: 0,
    isNew: true,
    instructor: communityMembers[0],
    description: "Advanced strategies for scaling your business while maintaining your values.",
    xpReward: 2000,
    xpEarned: 0,
    badge: { name: "Growth Hacker", emoji: "📈" },
    difficulty: "Advanced" as const,
    estimatedHours: 10,
  },
  {
    id: "6",
    title: "Motivational Storytelling for Leaders",
    category: "Leadership",
    thumbnail: "/courses/storytelling.jpg",
    lessons: 6,
    startDate: "Starts Apr 15",
    progress: 0,
    isNew: true,
    instructor: communityMembers[0],
    description: "Master the art of inspiring others through powerful storytelling techniques.",
    xpReward: 600,
    xpEarned: 0,
    badge: { name: "Storyteller", emoji: "📖" },
    difficulty: "Beginner" as const,
    estimatedHours: 3,
  },
];

export const courseLessons: Record<string, { module: string; items: { id: string; title: string; duration: string; completed: boolean; xp: number; locked: boolean; type: "video" | "quiz" | "exercise"; }[]; }[]> = {
  "1": [
    {
      module: "Getting Started",
      items: [
        { id: "1-1", title: "Welcome & Course Overview", duration: "5:30", completed: true, xp: 50, locked: false, type: "video" },
        { id: "1-2", title: "The Startup Mindset", duration: "12:45", completed: true, xp: 100, locked: false, type: "video" },
        { id: "1-3", title: "Quiz: Are You Ready?", duration: "5 min", completed: true, xp: 150, locked: false, type: "quiz" },
        { id: "1-4", title: "Finding Your Idea", duration: "18:20", completed: true, xp: 100, locked: false, type: "video" },
      ],
    },
    {
      module: "Validation & MVP",
      items: [
        { id: "1-5", title: "Validating Your Idea", duration: "24:15", completed: true, xp: 100, locked: false, type: "video" },
        { id: "1-6", title: "Building Your MVP", duration: "32:00", completed: true, xp: 100, locked: false, type: "video" },
        { id: "1-7", title: "Exercise: MVP Blueprint", duration: "15 min", completed: true, xp: 180, locked: false, type: "exercise" },
        { id: "1-8", title: "Quiz: Validation Mastery", duration: "5 min", completed: false, xp: 150, locked: false, type: "quiz" },
      ],
    },
    {
      module: "Launch & Growth",
      items: [
        { id: "1-9", title: "Pre-Launch Checklist", duration: "20:45", completed: false, xp: 100, locked: true, type: "video" },
        { id: "1-10", title: "Launch Day Strategy", duration: "28:30", completed: false, xp: 100, locked: true, type: "video" },
        { id: "1-11", title: "Growth Hacking Basics", duration: "15:30", completed: false, xp: 100, locked: true, type: "video" },
        { id: "1-12", title: "Final Project: Launch Plan", duration: "30 min", completed: false, xp: 250, locked: true, type: "exercise" },
      ],
    },
  ],
  default: [
    {
      module: "Getting Started",
      items: [
        { id: "d-1", title: "Welcome & Course Overview", duration: "5:30", completed: true, xp: 50, locked: false, type: "video" },
        { id: "d-2", title: "Setting Up Your Environment", duration: "12:45", completed: true, xp: 100, locked: false, type: "video" },
        { id: "d-3", title: "Understanding the Fundamentals", duration: "18:20", completed: false, xp: 100, locked: false, type: "video" },
      ],
    },
    {
      module: "Core Concepts",
      items: [
        { id: "d-4", title: "Building Your First Strategy", duration: "24:15", completed: false, xp: 100, locked: false, type: "video" },
        { id: "d-5", title: "Quiz: Core Concepts Check", duration: "5 min", completed: false, xp: 150, locked: false, type: "quiz" },
        { id: "d-6", title: "Case Studies & Examples", duration: "28:30", completed: false, xp: 100, locked: true, type: "video" },
      ],
    },
    {
      module: "Implementation",
      items: [
        { id: "d-7", title: "Creating Your Action Plan", duration: "20:45", completed: false, xp: 100, locked: true, type: "video" },
        { id: "d-8", title: "Exercise: Build Your Plan", duration: "20 min", completed: false, xp: 200, locked: true, type: "exercise" },
        { id: "d-9", title: "Final Project & Next Steps", duration: "10:00", completed: false, xp: 250, locked: true, type: "exercise" },
      ],
    },
  ],
};

export const learningStats = {
  totalXp: 2140,
  currentStreak: 5,
  longestStreak: 12,
  coursesCompleted: 1,
  lessonsCompleted: 14,
  quizzesPassed: 2,
  level: 4,
  levelName: "Rising Star",
  xpToNextLevel: 360,
  xpForCurrentLevel: 2000,
  xpForNextLevel: 2500,
  badges: [
    { name: "Career Pro", emoji: "🎯", earned: true, description: "Completed Career Acceleration Blueprint" },
    { name: "First Steps", emoji: "👣", earned: true, description: "Completed your first lesson" },
    { name: "Quiz Whiz", emoji: "🧩", earned: true, description: "Passed 2 quizzes" },
    { name: "On Fire", emoji: "🔥", earned: true, description: "5-day learning streak" },
    { name: "Startup Builder", emoji: "🚀", earned: false, description: "Complete Startup Foundations" },
    { name: "Mindset Master", emoji: "🧠", earned: false, description: "Complete Positive Mindset OS" },
    { name: "Enterprise Leader", emoji: "🏢", earned: false, description: "Complete Enterprise Thinking" },
    { name: "Dedicated Learner", emoji: "📚", earned: false, description: "Complete 3 courses" },
  ],
};

export const events = [
  {
    id: "1",
    title: "Positive Tribe Monthly Q&A with Sidd",
    host: communityMembers[0],
    thumbnail: "/events/monthly-qa.jpg",
    date: "Mar 20, 2026",
    time: "2:00 PM EST",
    type: "Live stream",
    isGoing: true,
    attendees: 156,
    price: "Free for members",
  },
  {
    id: "2",
    title: "Entrepreneurial Leadership Workshop",
    host: communityMembers[0],
    thumbnail: "/events/leadership-workshop.jpg",
    date: "Mar 25, 2026",
    time: "11:00 AM EST",
    type: "Live stream",
    isGoing: false,
    attendees: 89,
    price: "$49",
  },
  {
    id: "3",
    title: "Resume & Career Coaching Session",
    host: communityMembers[0],
    thumbnail: "/events/career-coaching.jpg",
    date: "Mar 28, 2026",
    time: "3:00 PM EST",
    type: "Workshop",
    isGoing: false,
    attendees: 45,
    price: "Free for members",
  },
  {
    id: "4",
    title: "VDart Hiring Event — Exclusive for Tribe Members",
    host: communityMembers[0],
    thumbnail: "/events/vdart-hiring.jpg",
    date: "Apr 5, 2026",
    time: "10:00 AM EST",
    type: "Online",
    isGoing: true,
    attendees: 234,
    price: "Free",
  },
];

export const notifications = [
  {
    id: "1",
    type: "lesson",
    actor: communityMembers[0],
    message: "posted a new lesson in",
    target: "Career Acceleration Blueprint",
    timestamp: "5m ago",
    category: "today" as const,
    isRead: false,
  },
  {
    id: "2",
    type: "event",
    actor: null,
    message: "Positive Tribe Monthly Q&A starts in 1 hour",
    target: null,
    timestamp: "3h ago",
    category: "today" as const,
    isRead: false,
  },
  {
    id: "3",
    type: "lesson",
    actor: communityMembers[0],
    message: "added new resources to",
    target: "Startup Foundations",
    timestamp: "Yesterday",
    category: "earlier" as const,
    isRead: true,
  },
  {
    id: "4",
    type: "event",
    actor: null,
    message: "New event: Entrepreneurial Leadership Workshop",
    target: null,
    timestamp: "Yesterday",
    category: "earlier" as const,
    isRead: true,
  },
];

export const currentUser = {
  id: "current",
  name: "Sidd Ahmed",
  role: "Founder & CEO, VDart Group",
  avatar: "/avatars/sidd.jpg",
  email: "sidd@vdart.com",
  location: "Dallas, TX",
  bio: "Empowering visionaries to build purpose-driven success stories. Speaker. Mentor. Entrepreneur. Founder of Positive Tribe.",
  memberSince: "Jan 2024",
  tags: ["CEO", "Speaker", "Mentor", "VDart", "Positive Tribe"],
  postsCount: 156,
  commentsCount: 312,
  spacesJoined: 12,
  isOnline: true,
  color: "bg-blue-600",
  coursesCreated: 6,
  membersMentored: 500,
  socials: {
    instagram: "https://instagram.com/siddahmed",
    linkedin: "https://linkedin.com/in/siddahmed",
    youtube: "https://youtube.com/@siddahmed",
    twitter: "https://x.com/siddahmed",
  },
};

export const leaderboard = [
  { rank: 1, member: communityMembers[0], points: 15420, badge: "gold" },
  { rank: 2, member: communityMembers[3], points: 8750, badge: "silver" },
  { rank: 3, member: communityMembers[5], points: 7230, badge: "bronze" },
  { rank: 4, member: communityMembers[1], points: 5890, badge: null },
  { rank: 5, member: communityMembers[4], points: 4560, badge: null },
  { rank: 6, member: communityMembers[2], points: 3210, badge: null },
  { rank: 7, member: communityMembers[6], points: 2840, badge: null },
];
