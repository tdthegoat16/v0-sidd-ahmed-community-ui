"use client";

import { useState } from "react";
import { CommunityLayout } from "@/components/community/community-layout";
import { useAcademy } from "@/lib/academy-state";
import { useAppState } from "@/lib/app-state";
import { getNewestCourses, getAllCourses, getCourseLessons } from "@/lib/academy-catalog";
import { ProBadge, FreeBadge } from "@/components/academy/pro-badge";
import { PaywallModal } from "@/components/academy/paywall-modal";
import {
  Sparkles,
  Zap,
  Flame,
  Trophy,
  ChevronRight,
  Play,
  BookOpen,
  Crown,
  Bookmark,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AcademyPage() {
  const { catalog, getContinueLearning, getCourseCompletionPercent, purchases } =
    useAcademy();
  const { learningStats } = useAppState();
  const [paywallOpen, setPaywallOpen] = useState(false);

  const continueLearning = getContinueLearning();
  const newestCourses = getNewestCourses(catalog, 4);
  const levelProgress =
    ((learningStats.totalXp - learningStats.xpForCurrentLevel) /
      (learningStats.xpForNextLevel - learningStats.xpForCurrentLevel)) *
    100;

  return (
    <CommunityLayout title="Sid Academy">
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Sid Academy</h1>
                {purchases.isPro && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-2.5 py-1 text-xs font-bold text-white">
                    <Crown className="h-3 w-3" />
                    PRO
                  </span>
                )}
              </div>
              <p className="mt-1 text-gray-300">
                Learn from Sidd Ahmed — master your career, business, and mindset
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/academy/saved"
                className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <Bookmark className="h-4 w-4" />
                Saved
              </Link>
              <Link
                href="/academy/settings"
                className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-4 flex flex-wrap items-center gap-6 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                <span className="text-lg font-bold">{learningStats.level}</span>
              </div>
              <div>
                <p className="text-xs text-gray-400">Level {learningStats.level}</p>
                <p className="text-sm font-semibold">{learningStats.levelName}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-amber-300" />
                <span className="text-lg font-bold">
                  {learningStats.totalXp.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-gray-400">Total XP</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4 text-orange-300" />
                <span className="text-lg font-bold">{learningStats.currentStreak}</span>
              </div>
              <p className="text-xs text-gray-400">Day Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4 text-yellow-300" />
                <span className="text-lg font-bold">
                  {learningStats.badges.filter((b) => b.earned).length}
                </span>
              </div>
              <p className="text-xs text-gray-400">Badges</p>
            </div>
          </div>
        </div>

        {/* Pro Upsell Banner (if not pro) */}
        {!purchases.isPro && (
          <button
            onClick={() => setPaywallOpen(true)}
            className="mt-6 flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800/50 p-4 text-left hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Unlock All Content with Sid Academy Pro
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Get access to all courses, exercises, and exclusive content
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-amber-500" />
          </button>
        )}

        {/* Continue Learning */}
        {continueLearning.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Continue Learning
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {continueLearning.slice(0, 4).map((item) => {
                const percent = getCourseCompletionPercent(item.courseId);
                const pillar = catalog.pillars.find((p) =>
                  p.courses.some((c) => c.id === item.courseId)
                );
                return (
                  <Link
                    key={item.courseId}
                    href={
                      item.nextLesson
                        ? `/academy/pillar/${pillar?.id}/${item.courseId}/${item.nextLesson.id}`
                        : `/academy/pillar/${pillar?.id}/${item.courseId}`
                    }
                    className="flex items-center gap-4 rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tribe-50 dark:bg-tribe-900/30 text-tribe-800 flex-shrink-0">
                      <Play className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {item.course.title}
                      </p>
                      {item.nextLesson && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          Next: {item.nextLesson.title}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-gray-100 dark:bg-gray-700">
                          <div
                            className="h-1.5 rounded-full bg-tribe-600 transition-all"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {percent}%
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Newest Releases */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Newest Releases
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {newestCourses.map((course) => {
              const pillar = catalog.pillars.find((p) =>
                p.courses.some((c) => c.id === course.id)
              );
              return (
                <Link
                  key={course.id}
                  href={`/academy/pillar/${pillar?.id}/${course.id}`}
                  className="group rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                    <Sparkles className="h-10 w-10 text-white/30" />
                    {course.isNew && (
                      <span className="absolute left-2 top-2 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        NEW
                      </span>
                    )}
                    <span className="absolute right-2 top-2">
                      {course.isFree ? <FreeBadge /> : <ProBadge />}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-tribe-800 font-medium">{pillar?.title}</p>
                    <h3 className="mt-1 text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-tribe-800 transition-colors">
                      {course.title}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{course.difficulty}</span>
                      <span>·</span>
                      <span>~{course.estimatedHours}h</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Pillars */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Explore by Pillar
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {catalog.pillars.map((pillar) => {
              const totalCourses = pillar.courses.length;
              const totalLessons = pillar.courses.reduce(
                (sum, c) => sum + getCourseLessons(c).length,
                0
              );
              return (
                <Link
                  key={pillar.id}
                  href={`/academy/pillar/${pillar.id}`}
                  className="group relative overflow-hidden rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      pillar.color
                    )}
                  />
                  <div className="relative">
                    <span className="text-3xl">{pillar.emoji}</span>
                    <h3 className="mt-3 text-xl font-bold">{pillar.title}</h3>
                    <p className="mt-1 text-sm text-white/80 line-clamp-2">
                      {pillar.description}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-white/70">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {totalCourses} courses
                      </span>
                      <span>{totalLessons} lessons</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                      Explore
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <PaywallModal open={paywallOpen} onClose={() => setPaywallOpen(false)} />
    </CommunityLayout>
  );
}
