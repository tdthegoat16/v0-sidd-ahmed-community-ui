"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import {
  posts as initialPosts,
  chatMessages as initialChatMessages,
  events as initialEvents,
  notifications as initialNotifications,
  communityMembers,
  courseLessons as initialCourseLessons,
  learningStats as initialLearningStats,
} from "./data";

// ─── Types ───────────────────────────────────────────────────────────────

interface Comment {
  id: string;
  author: typeof communityMembers[0];
  text: string;
  timestamp: string;
}

interface AppPost {
  id: string;
  author: typeof communityMembers[0];
  title: string;
  body: string;
  image: string | null;
  likes: number;
  comments: number;
  likedBy: typeof communityMembers;
  timestamp: string;
  isPinned: boolean;
  space: string;
  isLiked: boolean;
  isBookmarked: boolean;
  commentsList: Comment[];
}

interface ChatMessage {
  id: string;
  author: typeof communityMembers[0];
  message: string;
  timestamp: string;
  reactions: { emoji: string; count: number }[];
}

interface AppEvent {
  id: string;
  title: string;
  host: typeof communityMembers[0];
  thumbnail: string;
  date: string;
  time: string;
  type: string;
  isGoing: boolean;
  attendees: number;
  price: string;
}

interface AppNotification {
  id: string;
  type: string;
  actor: typeof communityMembers[0] | null;
  message: string;
  target: string | null;
  timestamp: string;
  category: "today" | "earlier";
  isRead: boolean;
}

interface LessonItem {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  xp: number;
  locked: boolean;
  type: "video" | "quiz" | "exercise";
}

interface LessonModule {
  module: string;
  items: LessonItem[];
}

interface LearningStats {
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  coursesCompleted: number;
  lessonsCompleted: number;
  quizzesPassed: number;
  level: number;
  levelName: string;
  xpToNextLevel: number;
  xpForCurrentLevel: number;
  xpForNextLevel: number;
  badges: { name: string; emoji: string; earned: boolean; description: string }[];
}

interface AppState {
  // Posts
  posts: AppPost[];
  createPost: (title: string, body: string, space?: string) => void;
  toggleLike: (postId: string) => void;
  toggleBookmark: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  getBookmarkedPosts: () => AppPost[];

  // Chat
  chatMessages: Record<string, ChatMessage[]>;
  sendMessage: (channelId: string, text: string) => void;
  toggleReaction: (channelId: string, messageId: string, emoji: string) => void;

  // Events
  events: AppEvent[];
  toggleRsvp: (eventId: string) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationCount: number;

  // Courses
  courseLessons: Record<string, LessonModule[]>;
  learningStats: LearningStats;
  completeLesson: (courseId: string, lessonId: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // Bookmarks panel
  bookmarksOpen: boolean;
  setBookmarksOpen: (open: boolean) => void;
}

const AppStateContext = createContext<AppState | null>(null);

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

// ─── Helper ──────────────────────────────────────────────────────────────

function now() {
  return "Just now";
}

function deepCloneLessons(
  src: Record<string, { module: string; items: { id: string; title: string; duration: string; completed: boolean; xp: number; locked: boolean; type: "video" | "quiz" | "exercise" }[] }[]>
): Record<string, LessonModule[]> {
  const out: Record<string, LessonModule[]> = {};
  for (const [k, modules] of Object.entries(src)) {
    out[k] = modules.map((m) => ({
      module: m.module,
      items: m.items.map((l) => ({ ...l })),
    }));
  }
  return out;
}

// ─── Provider ────────────────────────────────────────────────────────────

export function AppStateProvider({ children }: { children: ReactNode }) {
  // Posts
  const [posts, setPosts] = useState<AppPost[]>(() =>
    initialPosts.map((p) => ({
      ...p,
      isLiked: false,
      isBookmarked: false,
      commentsList: [],
    }))
  );

  // Chat — keyed by channel id
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(() => ({
    "daily-wins": initialChatMessages.map((m) => ({ ...m })),
  }));

  // Events
  const [events, setEvents] = useState<AppEvent[]>(() =>
    initialEvents.map((e) => ({ ...e }))
  );

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    initialNotifications.map((n) => ({ ...n }))
  );

  // Courses
  const [courseLessons, setCourseLessons] = useState<Record<string, LessonModule[]>>(() =>
    deepCloneLessons(initialCourseLessons)
  );

  const [learningStats, setLearningStats] = useState<LearningStats>(() => ({
    ...initialLearningStats,
    badges: initialLearningStats.badges.map((b) => ({ ...b })),
  }));

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  // Bookmarks
  const [bookmarksOpen, setBookmarksOpen] = useState(false);

  // ─── Post Actions ────────────────────────────────────────────────────

  const createPost = useCallback((title: string, body: string, space = "Open Discussions") => {
    const newPost: AppPost = {
      id: `post-${Date.now()}`,
      author: communityMembers[0], // currentUser maps to communityMembers[0]
      title,
      body,
      image: null,
      likes: 0,
      comments: 0,
      likedBy: [],
      timestamp: now(),
      isPinned: false,
      space,
      isLiked: false,
      isBookmarked: false,
      commentsList: [],
    };
    setPosts((prev) => [newPost, ...prev]);
  }, []);

  const toggleLike = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1,
          likedBy: isLiked
            ? [...p.likedBy, communityMembers[0]]
            : p.likedBy.filter((u) => u.id !== communityMembers[0].id),
        };
      })
    );
  }, []);

  const toggleBookmark = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p
      )
    );
  }, []);

  const addComment = useCallback((postId: string, text: string) => {
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: communityMembers[0],
      text,
      timestamp: now(),
    };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: p.comments + 1, commentsList: [...p.commentsList, comment] }
          : p
      )
    );
  }, []);

  const getBookmarkedPosts = useCallback(() => {
    return posts.filter((p) => p.isBookmarked);
  }, [posts]);

  // ─── Chat Actions ────────────────────────────────────────────────────

  const sendMessage = useCallback((channelId: string, text: string) => {
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      author: communityMembers[0],
      message: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      reactions: [],
    };
    setChatMessages((prev) => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []), msg],
    }));
  }, []);

  const toggleReaction = useCallback((channelId: string, messageId: string, emoji: string) => {
    setChatMessages((prev) => {
      const channelMsgs = prev[channelId] || [];
      return {
        ...prev,
        [channelId]: channelMsgs.map((m) => {
          if (m.id !== messageId) return m;
          const existing = m.reactions.find((r) => r.emoji === emoji);
          if (existing) {
            return {
              ...m,
              reactions: existing.count <= 1
                ? m.reactions.filter((r) => r.emoji !== emoji)
                : m.reactions.map((r) => r.emoji === emoji ? { ...r, count: r.count - 1 } : r),
            };
          }
          return { ...m, reactions: [...m.reactions, { emoji, count: 1 }] };
        }),
      };
    });
  }, []);

  // ─── Event Actions ───────────────────────────────────────────────────

  const toggleRsvp = useCallback((eventId: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              isGoing: !e.isGoing,
              attendees: e.isGoing ? e.attendees - 1 : e.attendees + 1,
            }
          : e
      )
    );
  }, []);

  // ─── Notification Actions ────────────────────────────────────────────

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  // ─── Course Actions ──────────────────────────────────────────────────

  const completeLesson = useCallback((courseId: string, lessonId: string) => {
    setCourseLessons((prev) => {
      const key = prev[courseId] ? courseId : "default";
      const modules = prev[key];
      if (!modules) return prev;

      let xpGained = 0;
      const updated = modules.map((mod) => ({
        ...mod,
        items: mod.items.map((l) => {
          if (l.id === lessonId && !l.completed) {
            xpGained = l.xp;
            return { ...l, completed: true };
          }
          return l;
        }),
      }));

      // Unlock next locked lesson
      const allItems = updated.flatMap((m) => m.items);
      const completedUpTo = allItems.findIndex((l) => !l.completed);
      if (completedUpTo >= 0 && allItems[completedUpTo].locked) {
        allItems[completedUpTo].locked = false;
      }

      if (xpGained > 0) {
        setLearningStats((s) => ({
          ...s,
          totalXp: s.totalXp + xpGained,
          lessonsCompleted: s.lessonsCompleted + 1,
          xpToNextLevel: Math.max(0, s.xpToNextLevel - xpGained),
        }));
      }

      return { ...prev, [key]: updated };
    });
  }, []);

  // ─── Provide ─────────────────────────────────────────────────────────

  return (
    <AppStateContext.Provider
      value={{
        posts,
        createPost,
        toggleLike,
        toggleBookmark,
        addComment,
        getBookmarkedPosts,
        chatMessages,
        sendMessage,
        toggleReaction,
        events,
        toggleRsvp,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationCount,
        courseLessons,
        learningStats,
        completeLesson,
        searchQuery,
        setSearchQuery,
        searchOpen,
        setSearchOpen,
        bookmarksOpen,
        setBookmarksOpen,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}
