import type { Catalog } from "./academy-schema";

/**
 * Bundled academy catalog — serves as the offline fallback.
 * Remote catalog fetch can override this when a newer version is available.
 */
export const bundledCatalog: Catalog = {
  version: "1.0.0",
  updatedAt: "2026-03-15T00:00:00Z",
  pillars: [
    // ─── Pillar 1: Education ─────────────────────────────────────────────
    {
      id: "education",
      title: "Education",
      slug: "education",
      description:
        "Master the skills that matter. From career acceleration to lifelong learning, these courses build your foundation for success.",
      emoji: "🎓",
      color: "from-blue-600 to-indigo-700",
      courses: [
        {
          id: "edu-career-blueprint",
          pillarId: "education",
          title: "Career Acceleration Blueprint",
          slug: "career-acceleration-blueprint",
          description:
            "Sidd's proven resume, interview, and career advancement framework used by 500+ professionals.",
          thumbnail: "/courses/career-acceleration.jpg",
          instructorName: "Sidd Ahmed",
          instructorAvatar: "/avatars/sidd.jpg",
          difficulty: "Beginner",
          estimatedHours: 5,
          isFree: true,
          isNew: false,
          publishedAt: "2025-11-01T00:00:00Z",
          xpReward: 1000,
          badge: { name: "Career Pro", emoji: "🎯" },
          modules: [
            {
              id: "ecb-m1",
              title: "Resume Mastery",
              order: 0,
              lessons: [
                {
                  id: "ecb-l1",
                  title: "Your Resume Is Your Brand",
                  slug: "your-resume-is-your-brand",
                  type: "video",
                  duration: "14:30",
                  isFree: true,
                  xp: 100,
                  order: 0,
                  keyTakeaways: [
                    "Your resume is a marketing document, not a history report",
                    "Lead with impact and outcomes, not responsibilities",
                    "Tailor every application to the specific role",
                  ],
                  actionChecklist: [
                    "Rewrite your current headline as an impact statement",
                    "Identify 3 quantifiable achievements from past roles",
                    "Remove any objective statements and replace with a summary",
                  ],
                  reflectionPrompt:
                    "What is the single biggest achievement you want a recruiter to remember from your resume?",
                },
                {
                  id: "ecb-l2",
                  title: "Quantifying Your Impact",
                  slug: "quantifying-your-impact",
                  type: "video",
                  duration: "18:15",
                  isFree: true,
                  xp: 100,
                  order: 1,
                  keyTakeaways: [
                    "Numbers catch attention — use them everywhere",
                    "Even non-revenue roles have measurable impact",
                    "Use the CAR method: Challenge, Action, Result",
                  ],
                  actionChecklist: [
                    "Convert 3 bullet points to CAR format",
                    "Add at least one metric to every experience entry",
                  ],
                },
                {
                  id: "ecb-l3",
                  title: "Quiz: Resume Fundamentals",
                  slug: "quiz-resume-fundamentals",
                  type: "quiz",
                  duration: "5 min",
                  isFree: true,
                  xp: 150,
                  order: 2,
                  keyTakeaways: [
                    "Test your understanding of resume best practices",
                  ],
                  actionChecklist: [],
                },
              ],
            },
            {
              id: "ecb-m2",
              title: "Interview Excellence",
              order: 1,
              lessons: [
                {
                  id: "ecb-l4",
                  title: "The STAR Method Deep Dive",
                  slug: "star-method-deep-dive",
                  type: "video",
                  duration: "22:00",
                  isFree: true,
                  xp: 100,
                  order: 0,
                  keyTakeaways: [
                    "STAR = Situation, Task, Action, Result",
                    "Prepare 5-7 STAR stories that cover common themes",
                    "Practice out loud — not just in your head",
                  ],
                  actionChecklist: [
                    "Write out 5 STAR stories from your experience",
                    "Practice each story in under 2 minutes",
                    "Record yourself and review",
                  ],
                  reflectionPrompt:
                    "Which STAR story are you most proud of, and why?",
                },
                {
                  id: "ecb-l5",
                  title: "Salary Negotiation Secrets",
                  slug: "salary-negotiation-secrets",
                  type: "video",
                  duration: "16:45",
                  isFree: false,
                  xp: 150,
                  order: 1,
                  keyTakeaways: [
                    "Never give the first number",
                    "Research market rates before every negotiation",
                    "Negotiate the full package, not just base salary",
                  ],
                  actionChecklist: [
                    "Research salary range for your target role",
                    "Prepare a counter-offer script",
                  ],
                },
                {
                  id: "ecb-l6",
                  title: "Exercise: Mock Interview Prep",
                  slug: "mock-interview-prep",
                  type: "exercise",
                  duration: "20 min",
                  isFree: false,
                  xp: 200,
                  order: 2,
                  keyTakeaways: [
                    "Practice makes permanent — get feedback early",
                  ],
                  actionChecklist: [
                    "Schedule a mock interview with a peer or mentor",
                    "Record the session for self-review",
                    "Note 3 areas for improvement",
                  ],
                  reflectionPrompt:
                    "What did you learn about yourself from the mock interview?",
                },
              ],
            },
          ],
        },
        {
          id: "edu-learning-mastery",
          pillarId: "education",
          title: "Learning How to Learn",
          slug: "learning-how-to-learn",
          description:
            "Science-backed strategies for accelerating your learning, building habits, and retaining knowledge.",
          thumbnail: "/courses/learning-mastery.jpg",
          instructorName: "Sidd Ahmed",
          instructorAvatar: "/avatars/sidd.jpg",
          difficulty: "Beginner",
          estimatedHours: 4,
          isFree: false,
          isNew: true,
          publishedAt: "2026-03-01T00:00:00Z",
          xpReward: 800,
          badge: { name: "Lifelong Learner", emoji: "📖" },
          modules: [
            {
              id: "elm-m1",
              title: "The Science of Learning",
              order: 0,
              lessons: [
                {
                  id: "elm-l1",
                  title: "How Your Brain Learns",
                  slug: "how-your-brain-learns",
                  type: "video",
                  duration: "15:20",
                  isFree: true,
                  xp: 100,
                  order: 0,
                  keyTakeaways: [
                    "Focused vs. diffuse modes of thinking",
                    "Sleep consolidates learning — protect it",
                    "Spaced repetition beats cramming every time",
                  ],
                  actionChecklist: [
                    "Set a regular study schedule with breaks",
                    "Try the Pomodoro technique for 1 week",
                  ],
                },
                {
                  id: "elm-l2",
                  title: "Building a Learning System",
                  slug: "building-a-learning-system",
                  type: "text",
                  duration: "10 min read",
                  isFree: false,
                  xp: 100,
                  order: 1,
                  markdownBody:
                    "# Building Your Personal Learning System\n\nA learning system is a repeatable process for acquiring new skills...\n\n## Step 1: Define Your Goal\nBe specific. Instead of 'learn coding', say 'build a personal website with React in 30 days'.\n\n## Step 2: Deconstruct the Skill\nBreak the skill into sub-skills and prioritize the 20% that delivers 80% of results.\n\n## Step 3: Practice Deliberately\nFocus on the hardest parts, not the parts you already know.\n\n## Step 4: Get Feedback\nWithout feedback, you practice your mistakes.",
                  keyTakeaways: [
                    "Systems beat goals — create a repeatable process",
                    "Deconstruct skills into sub-skills",
                    "Deliberate practice > mindless repetition",
                  ],
                  actionChecklist: [
                    "Write down 1 skill you want to learn this month",
                    "Break it into 5 sub-skills",
                    "Schedule 30 min of deliberate practice daily",
                  ],
                  reflectionPrompt:
                    "What skill have you been wanting to learn, and what has been holding you back?",
                },
                {
                  id: "elm-l3",
                  title: "Quiz: Learning Strategies",
                  slug: "quiz-learning-strategies",
                  type: "quiz",
                  duration: "5 min",
                  isFree: false,
                  xp: 150,
                  order: 2,
                  keyTakeaways: [
                    "Test your understanding of effective learning techniques",
                  ],
                  actionChecklist: [],
                },
              ],
            },
          ],
        },
      ],
    },

    // ─── Pillar 2: Workplace ────────────────────────────────────────────
    {
      id: "workplace",
      title: "Workplace",
      slug: "workplace",
      description:
        "Excel in the modern workplace. Navigate office dynamics, lead teams, and build the career you deserve.",
      emoji: "💼",
      color: "from-emerald-600 to-teal-700",
      courses: [
        {
          id: "wp-enterprise-thinking",
          pillarId: "workplace",
          title: "Enterprise Thinking for Emerging Leaders",
          slug: "enterprise-thinking",
          description:
            "Develop the strategic mindset needed to lead at scale in enterprise organizations.",
          thumbnail: "/courses/enterprise-thinking.jpg",
          instructorName: "Sidd Ahmed",
          instructorAvatar: "/avatars/sidd.jpg",
          difficulty: "Advanced",
          estimatedHours: 8,
          isFree: false,
          isNew: true,
          publishedAt: "2026-02-15T00:00:00Z",
          xpReward: 1600,
          badge: { name: "Enterprise Leader", emoji: "🏢" },
          modules: [
            {
              id: "wet-m1",
              title: "Strategic Thinking",
              order: 0,
              lessons: [
                {
                  id: "wet-l1",
                  title: "Thinking Like a CEO",
                  slug: "thinking-like-a-ceo",
                  type: "video",
                  duration: "20:00",
                  isFree: true,
                  xp: 150,
                  order: 0,
                  keyTakeaways: [
                    "CEOs think in systems, not silos",
                    "Every decision has second-order effects",
                    "Communicate up, down, and sideways",
                  ],
                  actionChecklist: [
                    "Map the key stakeholders in your organization",
                    "Identify 3 cross-team dependencies you can improve",
                  ],
                  reflectionPrompt:
                    "If you were CEO for a day, what's the first thing you would change?",
                },
                {
                  id: "wet-l2",
                  title: "Building Strategic Frameworks",
                  slug: "building-strategic-frameworks",
                  type: "video",
                  duration: "25:30",
                  isFree: false,
                  xp: 150,
                  order: 1,
                  keyTakeaways: [
                    "Frameworks simplify complex decisions",
                    "Use SWOT, Porter's Five Forces, and Jobs-to-be-Done",
                    "The best framework is the one your team actually uses",
                  ],
                  actionChecklist: [
                    "Apply SWOT analysis to your current team or project",
                    "Present your analysis to a peer for feedback",
                  ],
                },
                {
                  id: "wet-l3",
                  title: "Exercise: Strategic Proposal",
                  slug: "strategic-proposal",
                  type: "exercise",
                  duration: "30 min",
                  isFree: false,
                  xp: 250,
                  order: 2,
                  keyTakeaways: [
                    "Practice writing a strategic proposal for leadership",
                  ],
                  actionChecklist: [
                    "Draft a one-page strategic proposal",
                    "Include problem, analysis, options, and recommendation",
                    "Share with your manager for feedback",
                  ],
                  reflectionPrompt:
                    "What was the hardest part of writing the proposal?",
                },
              ],
            },
            {
              id: "wet-m2",
              title: "Leading at Scale",
              order: 1,
              lessons: [
                {
                  id: "wet-l4",
                  title: "From Manager to Leader",
                  slug: "from-manager-to-leader",
                  type: "video",
                  duration: "18:45",
                  isFree: false,
                  xp: 150,
                  order: 0,
                  keyTakeaways: [
                    "Managers handle tasks; leaders shape culture",
                    "Delegation is not abdication — stay involved at the right level",
                    "Your job is to make your team successful, not yourself",
                  ],
                  actionChecklist: [
                    "Identify one task you can delegate this week",
                    "Have a career development conversation with each direct report",
                  ],
                },
                {
                  id: "wet-l5",
                  title: "Quiz: Leadership Principles",
                  slug: "quiz-leadership-principles",
                  type: "quiz",
                  duration: "5 min",
                  isFree: false,
                  xp: 200,
                  order: 1,
                  keyTakeaways: [
                    "Validate your understanding of enterprise leadership",
                  ],
                  actionChecklist: [],
                },
              ],
            },
          ],
        },
        {
          id: "wp-storytelling",
          pillarId: "workplace",
          title: "Motivational Storytelling for Leaders",
          slug: "storytelling-for-leaders",
          description:
            "Master the art of inspiring others through powerful storytelling techniques.",
          thumbnail: "/courses/storytelling.jpg",
          instructorName: "Sidd Ahmed",
          instructorAvatar: "/avatars/sidd.jpg",
          difficulty: "Beginner",
          estimatedHours: 3,
          isFree: false,
          isNew: true,
          publishedAt: "2026-03-10T00:00:00Z",
          xpReward: 600,
          badge: { name: "Storyteller", emoji: "📖" },
          modules: [
            {
              id: "wst-m1",
              title: "The Power of Story",
              order: 0,
              lessons: [
                {
                  id: "wst-l1",
                  title: "Why Stories Move People",
                  slug: "why-stories-move-people",
                  type: "video",
                  duration: "12:00",
                  isFree: true,
                  xp: 100,
                  order: 0,
                  keyTakeaways: [
                    "Stories activate emotion and memory",
                    "Data tells, stories sell",
                    "Every great leader is a great storyteller",
                  ],
                  actionChecklist: [
                    "Write down your personal origin story in 3 paragraphs",
                    "Identify the emotional turning point in your story",
                  ],
                  reflectionPrompt:
                    "What story from your life has shaped who you are most?",
                },
                {
                  id: "wst-l2",
                  title: "The Story Framework",
                  slug: "the-story-framework",
                  type: "text",
                  duration: "8 min read",
                  isFree: false,
                  xp: 100,
                  order: 1,
                  markdownBody:
                    "# The Story Framework\n\nEvery compelling story follows a simple structure...\n\n## 1. The Hook\nOpen with something unexpected.\n\n## 2. The Struggle\nShare the challenge honestly.\n\n## 3. The Turning Point\nWhat changed everything?\n\n## 4. The Lesson\nWhat did you learn?\n\n## 5. The Call to Action\nWhat should the audience do next?",
                  keyTakeaways: [
                    "Follow the 5-part framework: Hook, Struggle, Turning Point, Lesson, CTA",
                    "Vulnerability creates connection",
                    "End every story with a clear takeaway",
                  ],
                  actionChecklist: [
                    "Rewrite your origin story using the 5-part framework",
                    "Practice telling it to someone in under 3 minutes",
                  ],
                },
                {
                  id: "wst-l3",
                  title: "Exercise: Your Leadership Story",
                  slug: "your-leadership-story",
                  type: "exercise",
                  duration: "15 min",
                  isFree: false,
                  xp: 150,
                  order: 2,
                  keyTakeaways: [
                    "Craft and deliver your signature leadership story",
                  ],
                  actionChecklist: [
                    "Write your leadership story using the framework",
                    "Record a 2-minute video of yourself telling it",
                    "Share with a trusted peer for feedback",
                  ],
                  reflectionPrompt:
                    "How did it feel to tell your story out loud?",
                },
              ],
            },
          ],
        },
      ],
    },

    // ─── Pillar 3: Entrepreneurship ─────────────────────────────────────
    {
      id: "entrepreneurship",
      title: "Entrepreneurship",
      slug: "entrepreneurship",
      description:
        "Build, launch, and scale your business. From idea validation to growth hacking, learn what they don't teach in business school.",
      emoji: "🚀",
      color: "from-orange-500 to-red-600",
      courses: [
        {
          id: "ent-startup-foundations",
          pillarId: "entrepreneurship",
          title: "Startup Foundations: Build Before You're Ready",
          slug: "startup-foundations",
          description:
            "Learn the essential frameworks for launching your startup without waiting for perfect conditions.",
          thumbnail: "/courses/startup-foundations.jpg",
          instructorName: "Sidd Ahmed",
          instructorAvatar: "/avatars/sidd.jpg",
          difficulty: "Intermediate",
          estimatedHours: 6,
          isFree: false,
          isNew: false,
          publishedAt: "2025-10-01T00:00:00Z",
          xpReward: 1200,
          badge: { name: "Startup Builder", emoji: "🚀" },
          modules: [
            {
              id: "esf-m1",
              title: "Getting Started",
              order: 0,
              lessons: [
                {
                  id: "esf-l1",
                  title: "Welcome & Course Overview",
                  slug: "welcome-overview",
                  type: "video",
                  duration: "5:30",
                  isFree: true,
                  xp: 50,
                  order: 0,
                  keyTakeaways: [
                    "What you'll learn in this course",
                    "How to get the most out of each lesson",
                    "The mindset shift required for entrepreneurship",
                  ],
                  actionChecklist: [
                    "Set your goal for completing this course",
                    "Join the #entrepreneurship channel in chat",
                  ],
                },
                {
                  id: "esf-l2",
                  title: "The Startup Mindset",
                  slug: "the-startup-mindset",
                  type: "video",
                  duration: "12:45",
                  isFree: true,
                  xp: 100,
                  order: 1,
                  keyTakeaways: [
                    "Embrace uncertainty — it's your competitive advantage",
                    "Speed of execution beats perfection",
                    "Your first idea will probably be wrong, and that's okay",
                  ],
                  actionChecklist: [
                    "Write down 3 fears holding you back from starting",
                    "For each fear, write a counter-argument",
                  ],
                  reflectionPrompt:
                    "What's the biggest risk you've ever taken, and what did you learn?",
                },
                {
                  id: "esf-l3",
                  title: "Quiz: Are You Ready?",
                  slug: "quiz-are-you-ready",
                  type: "quiz",
                  duration: "5 min",
                  isFree: true,
                  xp: 150,
                  order: 2,
                  keyTakeaways: [
                    "Assess your entrepreneurial readiness",
                  ],
                  actionChecklist: [],
                },
              ],
            },
            {
              id: "esf-m2",
              title: "Validation & MVP",
              order: 1,
              lessons: [
                {
                  id: "esf-l4",
                  title: "Validating Your Idea",
                  slug: "validating-your-idea",
                  type: "video",
                  duration: "24:15",
                  isFree: false,
                  xp: 100,
                  order: 0,
                  keyTakeaways: [
                    "Talk to 20 potential customers before building anything",
                    "Look for patterns in pain points, not feature requests",
                    "Willingness to pay is the ultimate validation",
                  ],
                  actionChecklist: [
                    "Identify 20 potential customers for your idea",
                    "Create a 5-question customer interview script",
                    "Conduct at least 5 interviews this week",
                  ],
                  reflectionPrompt:
                    "What surprised you most from your customer interviews?",
                },
                {
                  id: "esf-l5",
                  title: "Building Your MVP",
                  slug: "building-your-mvp",
                  type: "video",
                  duration: "32:00",
                  isFree: false,
                  xp: 100,
                  order: 1,
                  keyTakeaways: [
                    "An MVP is the smallest thing you can build to learn",
                    "Launch in weeks, not months",
                    "Measure what matters: engagement, retention, revenue",
                  ],
                  actionChecklist: [
                    "Define the ONE core feature of your MVP",
                    "Set a 2-week deadline to ship v1",
                  ],
                },
                {
                  id: "esf-l6",
                  title: "Exercise: MVP Blueprint",
                  slug: "mvp-blueprint",
                  type: "exercise",
                  duration: "15 min",
                  isFree: false,
                  xp: 180,
                  order: 2,
                  keyTakeaways: [
                    "Create a concrete plan for your minimum viable product",
                  ],
                  actionChecklist: [
                    "Fill out the MVP canvas template",
                    "Define success metrics for your launch",
                    "Share your blueprint in the community for feedback",
                  ],
                  reflectionPrompt:
                    "What feature was hardest to cut from your MVP?",
                },
              ],
            },
            {
              id: "esf-m3",
              title: "Launch & Growth",
              order: 2,
              lessons: [
                {
                  id: "esf-l7",
                  title: "Pre-Launch Checklist",
                  slug: "pre-launch-checklist",
                  type: "video",
                  duration: "20:45",
                  isFree: false,
                  xp: 100,
                  order: 0,
                  keyTakeaways: [
                    "Build anticipation before you launch",
                    "Email lists and waitlists are powerful launch tools",
                    "Have your metrics dashboard ready on day one",
                  ],
                  actionChecklist: [
                    "Create a pre-launch landing page",
                    "Set up analytics tracking",
                    "Draft 3 launch emails",
                  ],
                },
                {
                  id: "esf-l8",
                  title: "Growth Hacking Basics",
                  slug: "growth-hacking-basics",
                  type: "video",
                  duration: "15:30",
                  isFree: false,
                  xp: 100,
                  order: 1,
                  keyTakeaways: [
                    "Growth is a system, not a hack",
                    "Focus on the metrics that matter to your stage",
                    "Build virality into your product, not just your marketing",
                  ],
                  actionChecklist: [
                    "Identify your #1 growth channel",
                    "Run one growth experiment this week",
                  ],
                },
                {
                  id: "esf-l9",
                  title: "Final Project: Launch Plan",
                  slug: "launch-plan",
                  type: "exercise",
                  duration: "30 min",
                  isFree: false,
                  xp: 250,
                  order: 2,
                  keyTakeaways: [
                    "Consolidate everything into an actionable launch plan",
                  ],
                  actionChecklist: [
                    "Complete your full launch plan document",
                    "Set a launch date and share it publicly for accountability",
                    "Identify 3 potential launch partners or early adopters",
                  ],
                  reflectionPrompt:
                    "What excites you most about your launch plan?",
                },
              ],
            },
          ],
        },
        {
          id: "ent-business-scaling",
          pillarId: "entrepreneurship",
          title: "Business Acceleration: Scaling with Purpose",
          slug: "business-scaling",
          description:
            "Advanced strategies for scaling your business while maintaining your values and culture.",
          thumbnail: "/courses/business-acceleration.jpg",
          instructorName: "Sidd Ahmed",
          instructorAvatar: "/avatars/sidd.jpg",
          difficulty: "Advanced",
          estimatedHours: 10,
          isFree: false,
          isNew: true,
          publishedAt: "2026-03-05T00:00:00Z",
          xpReward: 2000,
          badge: { name: "Growth Hacker", emoji: "📈" },
          modules: [
            {
              id: "ebs-m1",
              title: "Scaling Fundamentals",
              order: 0,
              lessons: [
                {
                  id: "ebs-l1",
                  title: "When to Scale",
                  slug: "when-to-scale",
                  type: "video",
                  duration: "22:00",
                  isFree: true,
                  xp: 150,
                  order: 0,
                  keyTakeaways: [
                    "Premature scaling kills more startups than bad ideas",
                    "Product-market fit must come first",
                    "Scale the things that are already working",
                  ],
                  actionChecklist: [
                    "Assess your current product-market fit score",
                    "Identify which processes are ready to scale",
                  ],
                  reflectionPrompt:
                    "Is your business ready to scale, or do you need to optimize first?",
                },
                {
                  id: "ebs-l2",
                  title: "Building Systems That Scale",
                  slug: "building-systems-that-scale",
                  type: "video",
                  duration: "28:30",
                  isFree: false,
                  xp: 150,
                  order: 1,
                  keyTakeaways: [
                    "Document everything before you delegate",
                    "Automation should amplify humans, not replace them",
                    "Culture is the system you can't automate — protect it",
                  ],
                  actionChecklist: [
                    "Document your top 3 recurring processes",
                    "Identify one process to automate this month",
                  ],
                },
                {
                  id: "ebs-l3",
                  title: "Exercise: Scaling Roadmap",
                  slug: "scaling-roadmap",
                  type: "exercise",
                  duration: "25 min",
                  isFree: false,
                  xp: 250,
                  order: 2,
                  keyTakeaways: [
                    "Create a 90-day scaling roadmap for your business",
                  ],
                  actionChecklist: [
                    "Define 3 key scaling milestones",
                    "Assign owners and deadlines to each milestone",
                    "Share your roadmap with an accountability partner",
                  ],
                  reflectionPrompt:
                    "What's the biggest bottleneck preventing your business from scaling?",
                },
              ],
            },
          ],
        },
      ],
    },

    // ─── Pillar 4: Community Leadership ──────────────────────────────────
    {
      id: "community-leadership",
      title: "Community Leadership",
      slug: "community-leadership",
      description:
        "Lead with impact. Build communities, inspire movements, and create lasting positive change.",
      emoji: "🌟",
      color: "from-purple-600 to-pink-600",
      courses: [
        {
          id: "cl-positive-mindset",
          pillarId: "community-leadership",
          title: "The Positive Mindset Operating System",
          slug: "positive-mindset-os",
          description:
            "Transform your thinking patterns to unlock consistent growth and resilience.",
          thumbnail: "/courses/mindset-os.jpg",
          instructorName: "Sidd Ahmed",
          instructorAvatar: "/avatars/sidd.jpg",
          difficulty: "Beginner",
          estimatedHours: 4,
          isFree: true,
          isNew: false,
          publishedAt: "2025-12-01T00:00:00Z",
          xpReward: 800,
          badge: { name: "Mindset Master", emoji: "🧠" },
          modules: [
            {
              id: "cpm-m1",
              title: "Rewiring Your Mindset",
              order: 0,
              lessons: [
                {
                  id: "cpm-l1",
                  title: "The Power of Positive Thinking",
                  slug: "power-of-positive-thinking",
                  type: "video",
                  duration: "16:00",
                  isFree: true,
                  xp: 100,
                  order: 0,
                  keyTakeaways: [
                    "Your thoughts shape your reality — choose them wisely",
                    "Positivity is not ignoring problems, it's choosing your response",
                    "Daily gratitude rewires your brain over time",
                  ],
                  actionChecklist: [
                    "Start a daily gratitude journal — 3 things each morning",
                    "Catch yourself in negative self-talk 3 times today",
                    "Replace each negative thought with a constructive one",
                  ],
                  reflectionPrompt:
                    "What negative belief about yourself would you most like to change?",
                },
                {
                  id: "cpm-l2",
                  title: "Building Resilience",
                  slug: "building-resilience",
                  type: "video",
                  duration: "20:30",
                  isFree: true,
                  xp: 100,
                  order: 1,
                  keyTakeaways: [
                    "Resilience is a skill, not a trait",
                    "Failure is feedback — learn to extract the lesson",
                    "Surround yourself with people who lift you up",
                  ],
                  actionChecklist: [
                    "Write about a past failure and the lesson it taught you",
                    "Identify your top 3 support people",
                  ],
                  reflectionPrompt:
                    "What's a recent setback that you can now see as a learning opportunity?",
                },
                {
                  id: "cpm-l3",
                  title: "Quiz: Mindset Check",
                  slug: "quiz-mindset-check",
                  type: "quiz",
                  duration: "5 min",
                  isFree: true,
                  xp: 150,
                  order: 2,
                  keyTakeaways: [
                    "Assess your current mindset patterns",
                  ],
                  actionChecklist: [],
                },
              ],
            },
            {
              id: "cpm-m2",
              title: "Daily Practices",
              order: 1,
              lessons: [
                {
                  id: "cpm-l4",
                  title: "Morning Routines of Top Performers",
                  slug: "morning-routines",
                  type: "video",
                  duration: "14:15",
                  isFree: false,
                  xp: 100,
                  order: 0,
                  keyTakeaways: [
                    "Win the morning, win the day",
                    "Consistency matters more than complexity",
                    "Protect your first hour from distractions",
                  ],
                  actionChecklist: [
                    "Design your ideal morning routine (30-60 min)",
                    "Try it for 7 days straight",
                    "Track how you feel each day",
                  ],
                },
                {
                  id: "cpm-l5",
                  title: "Exercise: 30-Day Mindset Challenge",
                  slug: "mindset-challenge",
                  type: "exercise",
                  duration: "10 min",
                  isFree: false,
                  xp: 200,
                  order: 1,
                  keyTakeaways: [
                    "Commit to a 30-day transformation challenge",
                  ],
                  actionChecklist: [
                    "Commit to the 30-day challenge publicly",
                    "Set daily reminders",
                    "Post weekly updates in the community",
                  ],
                  reflectionPrompt:
                    "What does your ideal daily routine look like?",
                },
              ],
            },
          ],
        },
        {
          id: "cl-community-building",
          pillarId: "community-leadership",
          title: "Building Communities That Matter",
          slug: "building-communities",
          description:
            "Learn how to create, nurture, and scale communities that drive real impact.",
          thumbnail: "/courses/community-building.jpg",
          instructorName: "Sidd Ahmed",
          instructorAvatar: "/avatars/sidd.jpg",
          difficulty: "Intermediate",
          estimatedHours: 5,
          isFree: false,
          isNew: true,
          publishedAt: "2026-02-20T00:00:00Z",
          xpReward: 1000,
          badge: { name: "Community Builder", emoji: "🤝" },
          modules: [
            {
              id: "ccb-m1",
              title: "Community Foundations",
              order: 0,
              lessons: [
                {
                  id: "ccb-l1",
                  title: "Why Community Matters",
                  slug: "why-community-matters",
                  type: "video",
                  duration: "18:00",
                  isFree: true,
                  xp: 100,
                  order: 0,
                  keyTakeaways: [
                    "Community is the most powerful growth engine",
                    "People join for content, they stay for connection",
                    "Start small and go deep before going wide",
                  ],
                  actionChecklist: [
                    "Define the purpose of your community in one sentence",
                    "Identify your first 10 ideal members",
                  ],
                  reflectionPrompt:
                    "What community has had the biggest impact on your life, and why?",
                },
                {
                  id: "ccb-l2",
                  title: "Creating Your Community Playbook",
                  slug: "community-playbook",
                  type: "text",
                  duration: "12 min read",
                  isFree: false,
                  xp: 100,
                  order: 1,
                  markdownBody:
                    "# Your Community Playbook\n\n## Vision & Mission\nEvery great community starts with a clear 'why'.\n\n## Member Journey\nMap the path from newcomer to super-member.\n\n## Engagement Loops\nDesign rituals and recurring moments that bring people back.\n\n## Content Strategy\nBalance curated content with member-generated content.\n\n## Growth Levers\nWord of mouth, referrals, partnerships, and content marketing.",
                  keyTakeaways: [
                    "A playbook prevents community chaos",
                    "Map the member journey from day 1 to day 365",
                    "Rituals create belonging — weekly events, monthly themes",
                  ],
                  actionChecklist: [
                    "Write your community's vision statement",
                    "Map a 3-stage member journey",
                    "Design one recurring community ritual",
                  ],
                },
                {
                  id: "ccb-l3",
                  title: "Exercise: Launch Your Community",
                  slug: "launch-your-community",
                  type: "exercise",
                  duration: "20 min",
                  isFree: false,
                  xp: 200,
                  order: 2,
                  keyTakeaways: [
                    "Put your knowledge into action with a community launch plan",
                  ],
                  actionChecklist: [
                    "Choose your platform (Discord, Slack, Circle, etc.)",
                    "Create your welcome post",
                    "Invite your first 10 members personally",
                  ],
                  reflectionPrompt:
                    "What kind of community do you want to be known for building?",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ─── Catalog Helpers ──────────────────────────────────────────────────────

/** Flatten all courses from all pillars */
export function getAllCourses(catalog: Catalog) {
  return catalog.pillars.flatMap((p) => p.courses);
}

/** Flatten all lessons from a course */
export function getCourseLessons(course: { modules: { lessons: { id: string }[] }[] }) {
  return course.modules.flatMap((m) => m.lessons);
}

/** Get a specific course by ID across all pillars */
export function getCourseById(catalog: Catalog, courseId: string) {
  return getAllCourses(catalog).find((c) => c.id === courseId);
}

/** Get the pillar for a given course */
export function getPillarForCourse(catalog: Catalog, courseId: string) {
  return catalog.pillars.find((p) => p.courses.some((c) => c.id === courseId));
}

/** Get newest courses sorted by publishedAt */
export function getNewestCourses(catalog: Catalog, limit = 4) {
  return getAllCourses(catalog)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
