"use client";

import { use } from "react";
import { CommunityLayout } from "@/components/community/community-layout";
import { useAcademy } from "@/lib/academy-state";
import { getCourseLessons } from "@/lib/academy-catalog";
import { ProBadge, FreeBadge } from "@/components/academy/pro-badge";
import {
  ChevronLeft,
  ChevronDown,
  Zap,
  BookOpen,
  Clock,
  Play,
  FileQuestion,
  PenTool,
  FileText,
  Check,
  Lock,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CourseOverviewProps {
  params: Promise<{ pillarId: string; courseId: string }>;
}

export default function CourseOverviewPage({ params }: CourseOverviewProps) {
  const { pillarId, courseId } = use(params);
  const {
    catalog,
    lessonProgress,
    getCourseCompletionPercent,
    toggleSaveCourse,
    isCourseSaved,
    canAccessLesson,
  } = useAcademy();

  const pillar = catalog.pillars.find((p) => p.id === pillarId);
  const course = pillar?.courses.find((c) => c.id === courseId);
  if (!pillar || !course) notFound();

  const allLessons = getCourseLessons(course);
  const percent = getCourseCompletionPercent(courseId);
  const completedCount = allLessons.filter(
    (l) => lessonProgress[l.id]?.completed
  ).length;
  const saved = isCourseSaved(courseId);

  const [expandedModules, setExpandedModules] = useState<string[]>(
    course.modules.map((m) => m.id)
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-3.5 w-3.5" />;
      case "quiz":
        return <FileQuestion className="h-3.5 w-3.5" />;
      case "exercise":
        return <PenTool className="h-3.5 w-3.5" />;
      case "text":
        return <FileText className="h-3.5 w-3.5" />;
      default:
        return <Play className="h-3.5 w-3.5" />;
    }
  };

  return (
    <CommunityLayout title={course.title}>
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 flex-wrap">
          <Link
            href="/academy"
            className="hover:text-gray-700 dark:hover:text-gray-300"
          >
            Academy
          </Link>
          <span>/</span>
          <Link
            href={`/academy/pillar/${pillarId}`}
            className="hover:text-gray-700 dark:hover:text-gray-300"
          >
            {pillar.title}
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium truncate">
            {course.title}
          </span>
        </div>

        {/* Course Header */}
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 overflow-hidden shadow-sm">
          {/* Thumbnail */}
          <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
            <div className="text-center text-white">
              <span className="text-5xl">{course.badge?.emoji || pillar.emoji}</span>
              <h1 className="mt-4 text-2xl font-bold px-4">{course.title}</h1>
            </div>
            {course.isNew && (
              <span className="absolute left-3 top-3 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                NEW
              </span>
            )}
            <span className="absolute right-3 top-3">
              {course.isFree ? <FreeBadge /> : <ProBadge />}
            </span>
          </div>

          {/* Info */}
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300">
              {course.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {allLessons.length} lessons
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />~{course.estimatedHours}h
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-medium",
                  course.difficulty === "Beginner"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : course.difficulty === "Intermediate"
                    ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                    : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                )}
              >
                {course.difficulty}
              </span>
              <span className="flex items-center gap-1 text-amber-500 font-medium">
                <Zap className="h-4 w-4" />
                {course.xpReward} XP
              </span>
              {course.badge && (
                <span>
                  Earn: {course.badge.emoji} {course.badge.name}
                </span>
              )}
            </div>

            {/* Progress + Actions */}
            <div className="mt-4 flex items-center gap-3">
              {percent > 0 && (
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      {completedCount}/{allLessons.length} lessons completed
                    </span>
                    <span className="font-medium">{percent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                    <div
                      className={cn(
                        "h-2 rounded-full transition-all",
                        percent === 100 ? "bg-green-500" : "bg-tribe-600"
                      )}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )}
              <button
                onClick={() => toggleSaveCourse(courseId)}
                className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {saved ? (
                  <BookmarkCheck className="h-4 w-4 text-tribe-800" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>

        {/* Modules & Lessons */}
        <div className="mt-6 space-y-2">
          {course.modules.map((module, moduleIndex) => {
            const moduleLessons = module.lessons;
            const moduleCompleted = moduleLessons.every(
              (l) => lessonProgress[l.id]?.completed
            );
            const moduleXp = moduleLessons.reduce((sum, l) => sum + l.xp, 0);

            return (
              <div
                key={module.id}
                className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 overflow-hidden"
              >
                <button
                  onClick={() => toggleModule(module.id)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex items-center gap-3">
                    {moduleCompleted ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                        <Check className="h-3 w-3" />
                      </div>
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600 text-xs font-medium text-gray-600 dark:text-gray-300">
                        {moduleIndex + 1}
                      </div>
                    )}
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {module.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 text-xs text-amber-500">
                      <Zap className="h-3 w-3" />
                      {moduleXp} XP
                    </span>
                    <span className="text-xs text-gray-400">
                      {moduleLessons.length} lessons
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-400 transition-transform",
                        expandedModules.includes(module.id) && "rotate-180"
                      )}
                    />
                  </div>
                </button>

                {expandedModules.includes(module.id) && (
                  <div className="border-t border-gray-100 dark:border-gray-700/50">
                    {moduleLessons.map((lesson) => {
                      const completed = lessonProgress[lesson.id]?.completed;
                      const accessible = canAccessLesson(lesson);

                      return (
                        <Link
                          key={lesson.id}
                          href={
                            accessible
                              ? `/academy/pillar/${pillarId}/${courseId}/${lesson.id}`
                              : "#"
                          }
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 transition-colors",
                            accessible
                              ? "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                              : "opacity-60 cursor-not-allowed"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0",
                              completed
                                ? "bg-green-500 text-white"
                                : !accessible
                                ? "bg-gray-100 dark:bg-gray-700 text-gray-400"
                                : lesson.type === "quiz"
                                ? "border-2 border-purple-400 text-purple-500"
                                : lesson.type === "exercise"
                                ? "border-2 border-orange-400 text-orange-500"
                                : lesson.type === "text"
                                ? "border-2 border-blue-400 text-blue-500"
                                : "border border-gray-300 dark:border-gray-600 text-gray-400"
                            )}
                          >
                            {completed ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : !accessible ? (
                              <Lock className="h-3.5 w-3.5" />
                            ) : (
                              getLessonIcon(lesson.type)
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                "text-sm truncate",
                                completed
                                  ? "text-gray-500 dark:text-gray-400 line-through"
                                  : "text-gray-900 dark:text-white"
                              )}
                            >
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                              <span>{lesson.duration}</span>
                              <span className="flex items-center gap-0.5 text-amber-500">
                                <Zap className="h-2.5 w-2.5" />+{lesson.xp}
                              </span>
                              {!lesson.isFree && <ProBadge />}
                            </div>
                          </div>
                          {completed && (
                            <span className="text-xs text-green-500 font-medium">
                              Done
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </CommunityLayout>
  );
}
