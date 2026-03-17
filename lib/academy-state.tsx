"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { bundledCatalog, getAllCourses, getCourseLessons } from "./academy-catalog";
import type {
  Catalog,
  Lesson,
  Course,
  LessonProgress,
  CourseProgress,
  AcademyPurchaseState,
} from "./academy-schema";

// ─── Types ────────────────────────────────────────────────────────────────

interface AcademyState {
  catalog: Catalog;

  // Progress
  lessonProgress: Record<string, LessonProgress>; // keyed by lessonId
  courseProgress: Record<string, CourseProgress>; // keyed by courseId
  getCourseCompletionPercent: (courseId: string) => number;
  getContinueLearning: () => (CourseProgress & { course: Course; nextLesson: Lesson | null })[];
  completeAcademyLesson: (courseId: string, lessonId: string) => void;
  toggleChecklistItem: (lessonId: string, itemIndex: number) => void;
  saveReflection: (lessonId: string, answer: string) => void;

  // Saved / Bookmarks
  savedCourseIds: string[];
  savedLessonIds: string[];
  toggleSaveCourse: (courseId: string) => void;
  toggleSaveLesson: (lessonId: string) => void;
  isCourseSaved: (courseId: string) => boolean;
  isLessonSaved: (lessonId: string) => boolean;

  // Purchases / Paywall
  purchases: AcademyPurchaseState;
  unlockPro: (plan: "monthly" | "yearly" | "lifetime") => void;
  restorePurchases: () => void;
  canAccessLesson: (lesson: { isFree: boolean }) => boolean;
  canAccessCourse: (course: { isFree: boolean }) => boolean;

  // Settings
  privacyMode: boolean;
  togglePrivacyMode: () => void;
}

const AcademyContext = createContext<AcademyState | null>(null);

export function useAcademy() {
  const ctx = useContext(AcademyContext);
  if (!ctx)
    throw new Error("useAcademy must be used within AcademyProvider");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────

export function AcademyProvider({ children }: { children: ReactNode }) {
  const [catalog] = useState<Catalog>(bundledCatalog);

  // Progress
  const [lessonProgress, setLessonProgress] = useState<
    Record<string, LessonProgress>
  >({});
  const [courseProgress, setCourseProgress] = useState<
    Record<string, CourseProgress>
  >({});

  // Saved
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>([]);
  const [savedLessonIds, setSavedLessonIds] = useState<string[]>([]);

  // Purchases
  const [purchases, setPurchases] = useState<AcademyPurchaseState>({
    isPro: false,
  });

  // Settings
  const [privacyMode, setPrivacyMode] = useState(false);

  // ─── Progress Actions ──────────────────────────────────────────────────

  const getCourseCompletionPercent = useCallback(
    (courseId: string) => {
      const course = getAllCourses(catalog).find((c) => c.id === courseId);
      if (!course) return 0;
      const lessons = getCourseLessons(course);
      const completed = lessons.filter(
        (l) => lessonProgress[l.id]?.completed
      ).length;
      return lessons.length > 0
        ? Math.round((completed / lessons.length) * 100)
        : 0;
    },
    [catalog, lessonProgress]
  );

  const getContinueLearning = useCallback(() => {
    const allCourses = getAllCourses(catalog);
    const result: (CourseProgress & { course: Course; nextLesson: Lesson | null })[] = [];

    for (const cp of Object.values(courseProgress)) {
      const course = allCourses.find((c) => c.id === cp.courseId);
      if (!course) continue;

      const lessons = getCourseLessons(course);
      const completedCount = lessons.filter(
        (l) => lessonProgress[l.id]?.completed
      ).length;

      // Skip if fully completed
      if (completedCount >= lessons.length) continue;

      const nextLesson =
        lessons.find((l) => !lessonProgress[l.id]?.completed) || null;

      result.push({
        ...cp,
        lessonsCompleted: completedCount,
        totalLessons: lessons.length,
        course,
        nextLesson,
      });
    }

    // Sort by lastAccessedAt (most recent first)
    return result.sort(
      (a, b) =>
        new Date(b.lastAccessedAt).getTime() -
        new Date(a.lastAccessedAt).getTime()
    );
  }, [catalog, courseProgress, lessonProgress]);

  const completeAcademyLesson = useCallback(
    (courseId: string, lessonId: string) => {
      const now = new Date().toISOString();

      setLessonProgress((prev) => ({
        ...prev,
        [lessonId]: {
          ...(prev[lessonId] || {
            lessonId,
            courseId,
            checklistItems: {},
          }),
          completed: true,
          completedAt: now,
          lessonId,
          courseId,
        },
      }));

      setCourseProgress((prev) => {
        const existing = prev[courseId];
        const course = getAllCourses(catalog).find(
          (c) => c.id === courseId
        );
        const totalLessons = course
          ? getCourseLessons(course).length
          : 0;

        return {
          ...prev,
          [courseId]: {
            courseId,
            startedAt: existing?.startedAt || now,
            lastAccessedAt: now,
            lastLessonId: lessonId,
            lessonsCompleted: (existing?.lessonsCompleted || 0) + 1,
            totalLessons,
          },
        };
      });
    },
    [catalog]
  );

  const toggleChecklistItem = useCallback(
    (lessonId: string, itemIndex: number) => {
      setLessonProgress((prev) => {
        const existing = prev[lessonId] || {
          lessonId,
          courseId: "",
          completed: false,
          checklistItems: {},
        };
        return {
          ...prev,
          [lessonId]: {
            ...existing,
            checklistItems: {
              ...existing.checklistItems,
              [itemIndex]: !existing.checklistItems[itemIndex],
            },
          },
        };
      });
    },
    []
  );

  const saveReflection = useCallback(
    (lessonId: string, answer: string) => {
      setLessonProgress((prev) => {
        const existing = prev[lessonId] || {
          lessonId,
          courseId: "",
          completed: false,
          checklistItems: {},
        };
        return {
          ...prev,
          [lessonId]: {
            ...existing,
            reflectionAnswer: answer,
          },
        };
      });
    },
    []
  );

  // ─── Saved Actions ────────────────────────────────────────────────────

  const toggleSaveCourse = useCallback((courseId: string) => {
    setSavedCourseIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  }, []);

  const toggleSaveLesson = useCallback((lessonId: string) => {
    setSavedLessonIds((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  }, []);

  const isCourseSaved = useCallback(
    (courseId: string) => savedCourseIds.includes(courseId),
    [savedCourseIds]
  );

  const isLessonSaved = useCallback(
    (lessonId: string) => savedLessonIds.includes(lessonId),
    [savedLessonIds]
  );

  // ─── Purchase Actions ─────────────────────────────────────────────────

  const unlockPro = useCallback((plan: "monthly" | "yearly" | "lifetime") => {
    setPurchases({
      isPro: true,
      purchasedAt: new Date().toISOString(),
      plan,
    });
  }, []);

  const restorePurchases = useCallback(() => {
    // Simulate restore — in production, check IAP receipts
    // For now, just verify existing state
  }, []);

  const canAccessLesson = useCallback(
    (lesson: { isFree: boolean }) => purchases.isPro || lesson.isFree,
    [purchases.isPro]
  );

  const canAccessCourse = useCallback(
    (course: { isFree: boolean }) => purchases.isPro || course.isFree,
    [purchases.isPro]
  );

  // ─── Settings Actions ─────────────────────────────────────────────────

  const togglePrivacyMode = useCallback(() => {
    setPrivacyMode((prev) => !prev);
  }, []);

  // ─── Provide ──────────────────────────────────────────────────────────

  return (
    <AcademyContext.Provider
      value={{
        catalog,
        lessonProgress,
        courseProgress,
        getCourseCompletionPercent,
        getContinueLearning,
        completeAcademyLesson,
        toggleChecklistItem,
        saveReflection,
        savedCourseIds,
        savedLessonIds,
        toggleSaveCourse,
        toggleSaveLesson,
        isCourseSaved,
        isLessonSaved,
        purchases,
        unlockPro,
        restorePurchases,
        canAccessLesson,
        canAccessCourse,
        privacyMode,
        togglePrivacyMode,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
}
