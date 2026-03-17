"use client";

import { useState } from "react";
import { CommunityLayout } from "@/components/community/community-layout";
import { cn } from "@/lib/utils";
import { courses } from "@/lib/data";
import { useAppState } from "@/lib/app-state";
import { Sparkles, Zap, Flame, Trophy, Star } from "lucide-react";
import Link from "next/link";

const categories = [
  "All",
  "Entrepreneurship",
  "Career Growth",
  "Mindset",
  "Leadership",
  "More",
];

export default function CoursesPage() {
  const { learningStats } = useAppState();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  const totalXp = courses.reduce((sum, c) => sum + c.xpEarned, 0);
  const levelProgress = ((learningStats.totalXp - learningStats.xpForCurrentLevel) / (learningStats.xpForNextLevel - learningStats.xpForCurrentLevel)) * 100;

  return (
    <CommunityLayout title="Courses">
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Courses</h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Learn from Sidd Ahmed and level up your career, business, and mindset
            </p>
          </div>
        </div>

        {/* Learning Stats Banner */}
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-5 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Level Badge */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <span className="text-2xl font-bold">{learningStats.level}</span>
              </div>
              <div>
                <p className="text-sm text-gray-300">Level {learningStats.level}</p>
                <p className="text-lg font-bold">{learningStats.levelName}</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-1.5 w-24 rounded-full bg-white/20">
                    <div
                      className="h-1.5 rounded-full bg-white transition-all"
                      style={{ width: `${levelProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-300">
                    {learningStats.xpToNextLevel} XP to next level
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Zap className="h-4 w-4 text-amber-300" />
                  <span className="text-xl font-bold">{learningStats.totalXp.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-300">Total XP</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Flame className="h-4 w-4 text-orange-300" />
                  <span className="text-xl font-bold">{learningStats.currentStreak}</span>
                </div>
                <p className="text-xs text-gray-300">Day Streak</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Trophy className="h-4 w-4 text-yellow-300" />
                  <span className="text-xl font-bold">
                    {learningStats.badges.filter((b) => b.earned).length}
                  </span>
                </div>
                <p className="text-xs text-gray-300">Badges</p>
              </div>
            </div>
          </div>

          {/* Earned Badges */}
          <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
            <span className="text-xs text-gray-300 mr-1">Badges:</span>
            {learningStats.badges
              .filter((b) => b.earned)
              .map((badge) => (
                <span
                  key={badge.name}
                  className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur-sm"
                  title={badge.description}
                >
                  {badge.emoji} {badge.name}
                </span>
              ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeCategory === category
                  ? "bg-tribe-600 text-gray-900"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-800"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <Sparkles className="h-12 w-12 text-white/30" />
                {course.isNew && (
                  <span className="absolute left-3 top-3 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                    NEW
                  </span>
                )}
                {/* Badge Preview */}
                {course.badge && (
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-xs text-white backdrop-blur-sm">
                    {course.badge.emoji} {course.badge.name}
                  </span>
                )}
                {/* XP Reward */}
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-1 text-xs font-medium text-white">
                  <Zap className="h-3 w-3" />
                  {course.xpReward} XP
                </span>
                {/* Difficulty */}
                <span className={cn(
                  "absolute bottom-3 left-3 rounded-full px-2 py-1 text-xs font-medium",
                  course.difficulty === "Beginner"
                    ? "bg-green-500/90 text-white"
                    : course.difficulty === "Intermediate"
                    ? "bg-tribe-500/90 text-white"
                    : "bg-purple-500/90 text-white"
                )}>
                  {course.difficulty}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-tribe-800">
                    {course.category}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {course.lessons} lessons
                  </span>
                  {course.estimatedHours && (
                    <>
                      <span className="text-xs text-gray-400 dark:text-gray-500">·</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ~{course.estimatedHours}h
                      </span>
                    </>
                  )}
                </div>
                <h3 className="mt-2 text-base font-semibold text-gray-900 dark:text-white group-hover:text-tribe-800 transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{course.startDate}</p>

                {/* Progress Bar */}
                {course.progress > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500 dark:text-gray-400">{course.progress}% complete</span>
                      <span className="flex items-center gap-0.5 text-amber-500 font-medium">
                        <Zap className="h-3 w-3" />
                        {course.xpEarned}/{course.xpReward}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all",
                          course.progress === 100
                            ? "bg-gradient-to-r from-green-400 to-emerald-500"
                            : "bg-gradient-to-r from-tribe-500 to-tribe-600"
                        )}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    {course.progress === 100 && (
                      <div className="mt-2 flex items-center gap-1 text-xs font-medium text-green-600">
                        <Star className="h-3 w-3 fill-green-500" />
                        Course Completed — Badge Earned!
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </CommunityLayout>
  );
}
