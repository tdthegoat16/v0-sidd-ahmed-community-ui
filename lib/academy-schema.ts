import { z } from "zod";

// ─── Lesson Schema ────────────────────────────────────────────────────────
export const LessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  type: z.enum(["video", "text", "quiz", "exercise"]),
  duration: z.string(), // e.g. "12:45" for video, "8 min read" for text
  isFree: z.boolean(),
  videoUrl: z.string().url().optional(),
  markdownBody: z.string().optional(),
  keyTakeaways: z.array(z.string()).min(1),
  actionChecklist: z.array(z.string()),
  reflectionPrompt: z.string().optional(),
  xp: z.number().int().positive(),
  order: z.number().int().nonnegative(),
});

export type Lesson = z.infer<typeof LessonSchema>;

// ─── Module Schema ────────────────────────────────────────────────────────
export const ModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  order: z.number().int().nonnegative(),
  lessons: z.array(LessonSchema).min(1),
});

export type Module = z.infer<typeof ModuleSchema>;

// ─── Course Schema ────────────────────────────────────────────────────────
export const CourseSchema = z.object({
  id: z.string(),
  pillarId: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  instructorName: z.string(),
  instructorAvatar: z.string(),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  estimatedHours: z.number().positive(),
  isFree: z.boolean(),
  isNew: z.boolean(),
  publishedAt: z.string(), // ISO date string
  xpReward: z.number().int().positive(),
  badge: z.object({
    name: z.string(),
    emoji: z.string(),
  }).optional(),
  modules: z.array(ModuleSchema).min(1),
});

export type Course = z.infer<typeof CourseSchema>;

// ─── Pillar Schema ────────────────────────────────────────────────────────
export const PillarSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  emoji: z.string(),
  color: z.string(), // Tailwind gradient classes
  heroImage: z.string().optional(),
  courses: z.array(CourseSchema),
});

export type Pillar = z.infer<typeof PillarSchema>;

// ─── Catalog Schema ───────────────────────────────────────────────────────
export const CatalogSchema = z.object({
  version: z.string(),
  updatedAt: z.string(),
  pillars: z.array(PillarSchema).min(1),
});

export type Catalog = z.infer<typeof CatalogSchema>;

// ─── Validation Helper ───────────────────────────────────────────────────
export function validateCatalog(data: unknown): Catalog {
  return CatalogSchema.parse(data);
}

// ─── Progress Types ──────────────────────────────────────────────────────
export interface LessonProgress {
  lessonId: string;
  courseId: string;
  completed: boolean;
  completedAt?: string;
  checklistItems: Record<string, boolean>; // checklist item index → done
  reflectionAnswer?: string;
}

export interface CourseProgress {
  courseId: string;
  startedAt: string;
  lastAccessedAt: string;
  lastLessonId: string;
  lessonsCompleted: number;
  totalLessons: number;
}

export interface AcademyPurchaseState {
  isPro: boolean;
  purchasedAt?: string;
  plan?: "monthly" | "yearly" | "lifetime";
}
