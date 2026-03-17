"use client";

import { useState, use } from "react";
import { CommunityLayout } from "@/components/community/community-layout";
import { useAcademy } from "@/lib/academy-state";
import { getCourseLessons } from "@/lib/academy-catalog";
import { ProBadge, FreeBadge } from "@/components/academy/pro-badge";
import { PaywallModal } from "@/components/academy/paywall-modal";
import {
  Sparkles,
  Zap,
  ChevronLeft,
  BookOpen,
  Clock,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

interface PillarPageProps {
  params: Promise<{ pillarId: string }>;
}

export default function PillarPage({ params }: PillarPageProps) {
  const { pillarId } = use(params);
  const {
    catalog,
    getCourseCompletionPercent,
    toggleSaveCourse,
    isCourseSaved,
    canAccessCourse,
  } = useAcademy();

  const pillar = catalog.pillars.find((p) => p.id === pillarId);
  if (!pillar) notFound();

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [durationFilter, setDurationFilter] = useState<string>("Any");
  const [typeFilter, setTypeFilter] = useState<string>("All Types");
  const [paywallOpen, setPaywallOpen] = useState(false);

  const difficultyFilters = ["All", "Beginner", "Intermediate", "Advanced"];
  const durationFilters = ["Any", "< 4h", "4-8h", "8h+"];
  const typeFilters = ["All Types", "Video", "Text", "Mixed"];

  const filteredCourses = pillar.courses.filter((course) => {
    if (activeFilter !== "All" && course.difficulty !== activeFilter)
      return false;
    if (durationFilter === "< 4h" && course.estimatedHours >= 4) return false;
    if (
      durationFilter === "4-8h" &&
      (course.estimatedHours < 4 || course.estimatedHours > 8)
    )
      return false;
    if (durationFilter === "8h+" && course.estimatedHours < 8) return false;
    if (typeFilter !== "All Types") {
      const lessons = getCourseLessons(course);
      const hasVideo = lessons.some((l) => l.type === "video");
      const hasText = lessons.some((l) => l.type === "text");
      if (typeFilter === "Video" && !hasVideo) return false;
      if (typeFilter === "Text" && !hasText) return false;
      if (typeFilter === "Mixed" && !(hasVideo && hasText)) return false;
    }
    return true;
  });

  return (
    <CommunityLayout title={pillar.title}>
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Back Nav */}
        <Link
          href="/academy"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        {/* Pillar Hero */}
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl p-8 text-white shadow-lg"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              pillar.color
            )}
          />
          <div className="relative">
            <span className="text-4xl">{pillar.emoji}</span>
            <h1 className="mt-4 text-3xl font-bold">{pillar.title}</h1>
            <p className="mt-2 max-w-2xl text-white/80">
              {pillar.description}
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {pillar.courses.length} courses
              </span>
              <span>
                {pillar.courses.reduce(
                  (sum, c) => sum + getCourseLessons(c).length,
                  0
                )}{" "}
                lessons
              </span>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mt-6 space-y-3">
          {/* Difficulty */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-1">
              Level:
            </span>
            {difficultyFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  activeFilter === filter
                    ? "bg-tribe-600 text-gray-900"
                    : "bg-white dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Duration */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-1">
              Duration:
            </span>
            {durationFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setDurationFilter(filter)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  durationFilter === filter
                    ? "bg-tribe-600 text-gray-900"
                    : "bg-white dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Content Type */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-1">
              Type:
            </span>
            {typeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setTypeFilter(filter)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  typeFilter === filter
                    ? "bg-tribe-600 text-gray-900"
                    : "bg-white dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Course List */}
        <div className="mt-8 space-y-4">
          {filteredCourses.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No courses match your filters
              </p>
            </div>
          ) : (
            filteredCourses.map((course) => {
              const lessons = getCourseLessons(course);
              const percent = getCourseCompletionPercent(course.id);
              const saved = isCourseSaved(course.id);

              return (
                <div
                  key={course.id}
                  className="group rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Thumbnail */}
                    <Link
                      href={`/academy/pillar/${pillarId}/${course.id}`}
                      className="relative aspect-video sm:aspect-auto sm:w-48 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center flex-shrink-0"
                    >
                      <Sparkles className="h-10 w-10 text-white/30" />
                      {course.isNew && (
                        <span className="absolute left-2 top-2 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          NEW
                        </span>
                      )}
                    </Link>

                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-[10px] font-medium",
                                course.difficulty === "Beginner"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                  : course.difficulty === "Intermediate"
                                  ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                  : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                              )}
                            >
                              {course.difficulty}
                            </span>
                            {course.isFree ? <FreeBadge /> : <ProBadge />}
                            <span className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                              <Zap className="h-3 w-3" />
                              {course.xpReward} XP
                            </span>
                          </div>
                          <Link href={`/academy/pillar/${pillarId}/${course.id}`}>
                            <h3 className="mt-2 text-base font-semibold text-gray-900 dark:text-white group-hover:text-tribe-800 transition-colors">
                              {course.title}
                            </h3>
                          </Link>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {course.description}
                          </p>
                        </div>

                        {/* Save Button */}
                        <button
                          onClick={() => toggleSaveCourse(course.id)}
                          className="flex-shrink-0 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          {saved ? (
                            <BookmarkCheck className="h-5 w-5 text-tribe-800" />
                          ) : (
                            <Bookmark className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>

                      {/* Meta */}
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {lessons.length} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />~{course.estimatedHours}h
                        </span>
                        {course.badge && (
                          <span>
                            {course.badge.emoji} {course.badge.name}
                          </span>
                        )}
                      </div>

                      {/* Progress Bar */}
                      {percent > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 flex-1 rounded-full bg-gray-100 dark:bg-gray-700">
                              <div
                                className={cn(
                                  "h-1.5 rounded-full transition-all",
                                  percent === 100
                                    ? "bg-green-500"
                                    : "bg-tribe-600"
                                )}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-500">
                              {percent}%
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <PaywallModal open={paywallOpen} onClose={() => setPaywallOpen(false)} />
    </CommunityLayout>
  );
}
