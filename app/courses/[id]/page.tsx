"use client";

import { useState, use } from "react";
import { cn, getInitials } from "@/lib/utils";
import { IconRail } from "@/components/community/icon-rail";
import { TopNav } from "@/components/community/top-nav";
import { MobileNav } from "@/components/community/mobile-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Play,
  Lock,
  ChevronDown,
} from "lucide-react";
import { courses } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

const lessons = [
  {
    module: "Getting Started",
    items: [
      { id: "1", title: "Welcome & Course Overview", duration: "5:30", completed: true },
      { id: "2", title: "Setting Up Your Environment", duration: "12:45", completed: true },
      { id: "3", title: "Understanding the Fundamentals", duration: "18:20", completed: false },
    ],
  },
  {
    module: "Core Concepts",
    items: [
      { id: "4", title: "Building Your First Strategy", duration: "24:15", completed: false },
      { id: "5", title: "Advanced Techniques", duration: "32:00", completed: false },
      { id: "6", title: "Case Studies & Examples", duration: "28:30", completed: false },
    ],
  },
  {
    module: "Implementation",
    items: [
      { id: "7", title: "Creating Your Action Plan", duration: "20:45", completed: false },
      { id: "8", title: "Measuring Success", duration: "15:30", completed: false },
      { id: "9", title: "Final Project & Next Steps", duration: "10:00", completed: false },
    ],
  },
];

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = use(params);
  const course = courses.find((c) => c.id === id);
  if (!course) notFound();
  const [activeLesson, setActiveLesson] = useState("3");
  const [expandedModules, setExpandedModules] = useState<string[]>(["Getting Started"]);

  const toggleModule = (module: string) => {
    setExpandedModules((prev) =>
      prev.includes(module)
        ? prev.filter((m) => m !== module)
        : [...prev, module]
    );
  };

  const currentLesson = lessons
    .flatMap((m) => m.items)
    .find((l) => l.id === activeLesson);

  return (
    <div className="flex h-screen bg-gray-50">
      <IconRail />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />

        <div className="flex flex-1 overflow-hidden">
          {/* Lesson Sidebar */}
          <aside className="hidden lg:flex w-80 flex-col border-r border-gray-100 bg-white">
            {/* Course Header */}
            <div className="border-b border-gray-100 p-4">
              <Link
                href="/courses"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Courses
              </Link>
              <h2 className="mt-3 text-base font-semibold text-gray-900">
                {course.title}
              </h2>
              <div className="mt-2 flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                  />
                  <AvatarFallback
                    className={cn(course.instructor.color, "text-white text-[10px]")}
                  >
                    {getInitials(course.instructor.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">
                  {course.instructor.name}
                </span>
              </div>
              {/* Progress */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-gray-100">
                  <div
                    className="h-1.5 rounded-full bg-blue-600"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Lessons List */}
            <nav className="flex-1 overflow-y-auto">
              {lessons.map((module) => (
                <div key={module.module} className="border-b border-gray-100">
                  <button
                    onClick={() => toggleModule(module.module)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium text-gray-900">
                      {module.module}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-gray-400 transition-transform",
                        expandedModules.includes(module.module) && "rotate-180"
                      )}
                    />
                  </button>
                  {expandedModules.includes(module.module) && (
                    <div className="pb-2">
                      {module.items.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson.id)}
                          className={cn(
                            "flex w-full items-center gap-3 px-4 py-2 text-left transition-colors",
                            activeLesson === lesson.id
                              ? "bg-blue-50"
                              : "hover:bg-gray-50"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-full",
                              lesson.completed
                                ? "bg-green-500 text-white"
                                : activeLesson === lesson.id
                                ? "bg-blue-600 text-white"
                                : "border border-gray-300 text-gray-400"
                            )}
                          >
                            {lesson.completed ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Play className="h-3 w-3" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                "text-sm truncate",
                                activeLesson === lesson.id
                                  ? "font-medium text-blue-600"
                                  : "text-gray-700"
                              )}
                            >
                              {lesson.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              {lesson.duration}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
            <div className="mx-auto max-w-4xl p-6">
              {/* Video Player */}
              <div className="aspect-video rounded-2xl bg-gray-900 flex items-center justify-center">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <Play className="h-8 w-8 ml-1" />
                </button>
              </div>

              {/* Lesson Info */}
              <div className="mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Module: Getting Started</span>
                  <span>·</span>
                  <span>{currentLesson?.duration}</span>
                </div>
                <h1 className="mt-2 text-2xl font-bold text-gray-900">
                  {currentLesson?.title}
                </h1>
              </div>

              {/* Lesson Content */}
              <div className="mt-6 prose prose-gray max-w-none">
                <p>
                  Welcome to this lesson! In this video, we will cover the
                  essential concepts you need to understand before moving
                  forward with the course.
                </p>
                <p>
                  Make sure to take notes and complete the exercises at the end
                  of this lesson. If you have any questions, feel free to ask in
                  the community discussion area.
                </p>
                <h2>Key Takeaways</h2>
                <ul>
                  <li>Understanding the core principles</li>
                  <li>Setting up your workspace correctly</li>
                  <li>Building a strong foundation for future lessons</li>
                </ul>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
