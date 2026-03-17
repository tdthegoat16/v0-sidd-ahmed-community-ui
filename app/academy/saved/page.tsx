"use client";

import { CommunityLayout } from "@/components/community/community-layout";
import { useAcademy } from "@/lib/academy-state";
import { getAllCourses, getCourseLessons } from "@/lib/academy-catalog";
import { ProBadge, FreeBadge } from "@/components/academy/pro-badge";
import {
  ChevronLeft,
  BookmarkCheck,
  Zap,
  BookOpen,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AcademySavedPage() {
  const { catalog, savedCourseIds, savedLessonIds, getCourseCompletionPercent } =
    useAcademy();

  const allCourses = getAllCourses(catalog);
  const savedCourses = allCourses.filter((c) => savedCourseIds.includes(c.id));

  // Get saved lessons with their course context
  const savedLessonsWithContext = savedLessonIds
    .map((lessonId) => {
      for (const course of allCourses) {
        const lessons = getCourseLessons(course);
        const lesson = lessons.find((l) => l.id === lessonId);
        if (lesson) {
          const pillar = catalog.pillars.find((p) =>
            p.courses.some((c) => c.id === course.id)
          );
          return { lesson, course, pillar };
        }
      }
      return null;
    })
    .filter(Boolean) as { lesson: ReturnType<typeof getCourseLessons>[0]; course: ReturnType<typeof getAllCourses>[0]; pillar: NonNullable<ReturnType<typeof catalog.pillars.find>> }[];

  return (
    <CommunityLayout title="Saved">
      <div className="mx-auto max-w-4xl px-4 py-6">
        <Link
          href="/academy"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Saved Content
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Your bookmarked courses and lessons
        </p>

        {/* Saved Courses */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Saved Courses ({savedCourses.length})
          </h2>
          {savedCourses.length === 0 ? (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-8 text-center">
              <BookmarkCheck className="mx-auto h-8 w-8 text-gray-300 dark:text-gray-600" />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                No saved courses yet. Browse the Academy to save courses.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {savedCourses.map((course) => {
                const pillar = catalog.pillars.find((p) =>
                  p.courses.some((c) => c.id === course.id)
                );
                const percent = getCourseCompletionPercent(course.id);
                const lessons = getCourseLessons(course);
                return (
                  <Link
                    key={course.id}
                    href={`/academy/pillar/${pillar?.id}/${course.id}`}
                    className="group rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                      <Sparkles className="h-10 w-10 text-white/30" />
                      <span className="absolute right-2 top-2">
                        {course.isFree ? <FreeBadge /> : <ProBadge />}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-tribe-800 font-medium">
                        {pillar?.title}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-tribe-800 transition-colors">
                        {course.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {lessons.length} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />~{course.estimatedHours}h
                        </span>
                      </div>
                      {percent > 0 && (
                        <div className="mt-2">
                          <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700">
                            <div
                              className="h-1.5 rounded-full bg-tribe-600"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            {percent}% complete
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Saved Lessons */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Saved Lessons ({savedLessonsWithContext.length})
          </h2>
          {savedLessonsWithContext.length === 0 ? (
            <div className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-8 text-center">
              <BookmarkCheck className="mx-auto h-8 w-8 text-gray-300 dark:text-gray-600" />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                No saved lessons yet. Save lessons while learning to revisit later.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {savedLessonsWithContext.map(({ lesson, course, pillar }) => (
                <Link
                  key={lesson.id}
                  href={`/academy/pillar/${pillar.id}/${course.id}/${lesson.id}`}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-4 hover:shadow-md transition-shadow"
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0",
                      lesson.type === "video"
                        ? "bg-tribe-50 dark:bg-tribe-900/30 text-tribe-800"
                        : lesson.type === "quiz"
                        ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600"
                        : lesson.type === "text"
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600"
                        : "bg-orange-50 dark:bg-orange-900/30 text-orange-600"
                    )}
                  >
                    <span className="text-xs font-bold uppercase">
                      {lesson.type.slice(0, 3)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {course.title} · {lesson.duration}
                    </p>
                  </div>
                  <span className="flex items-center gap-0.5 text-xs text-amber-500 font-medium flex-shrink-0">
                    <Zap className="h-3 w-3" />
                    {lesson.xp} XP
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </CommunityLayout>
  );
}
