"use client";

import { useState } from "react";
import { CommunityLayout } from "@/components/community/community-layout";
import { cn } from "@/lib/utils";
import { courses } from "@/lib/data";
import { Sparkles } from "lucide-react";
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
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <CommunityLayout title="Courses">
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
            <p className="mt-1 text-gray-500">
              Learn from Sidd Ahmed and level up your career, business, and mindset
            </p>
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
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
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
              className="group rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <Sparkles className="h-12 w-12 text-white/30" />
                {course.isNew && (
                  <span className="absolute left-3 top-3 rounded bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                    NEW
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-blue-600">
                    {course.category}
                  </span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-xs text-gray-500">
                    {course.lessons} lessons
                  </span>
                </div>
                <h3 className="mt-2 text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">{course.startDate}</p>

                {/* Progress Bar */}
                {course.progress > 0 && (
                  <div className="mt-3">
                    <div className="h-1.5 rounded-full bg-gray-100">
                      <div
                        className={cn(
                          "h-1.5 rounded-full",
                          course.progress === 100
                            ? "bg-green-500"
                            : "bg-blue-600"
                        )}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {course.progress}% complete
                    </p>
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
