"use client";

import { useState, use } from "react";
import { cn, getInitials } from "@/lib/utils";
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
  Zap,
  Trophy,
  Flame,
  Star,
  CircleCheck,
  FileQuestion,
  PenTool,
} from "lucide-react";
import { courses } from "@/lib/data";
import { useAppState } from "@/lib/app-state";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = use(params);
  const course = courses.find((c) => c.id === id);
  if (!course) notFound();

  const { courseLessons, learningStats, completeLesson } = useAppState();
  const lessons = courseLessons[id] || courseLessons["default"];
  const allLessons = lessons.flatMap((m) => m.items);
  const firstIncomplete = allLessons.find((l) => !l.completed && !l.locked);

  const [activeLesson, setActiveLesson] = useState(firstIncomplete?.id || allLessons[0].id);
  const [expandedModules, setExpandedModules] = useState<string[]>(
    lessons.map((m) => m.module)
  );
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const toggleModule = (module: string) => {
    setExpandedModules((prev) =>
      prev.includes(module)
        ? prev.filter((m) => m !== module)
        : [...prev, module]
    );
  };

  const currentLesson = allLessons.find((l) => l.id === activeLesson);
  const currentModule = lessons.find((m) =>
    m.items.some((l) => l.id === activeLesson)
  );
  const currentIndex = allLessons.findIndex((l) => l.id === activeLesson);
  const completedCount = allLessons.filter((l) => l.completed).length;
  const totalXpInCourse = allLessons.reduce((sum, l) => sum + l.xp, 0);
  const earnedXpInCourse = allLessons
    .filter((l) => l.completed)
    .reduce((sum, l) => sum + l.xp, 0);

  const handleComplete = () => {
    if (!currentLesson || currentLesson.completed) return;
    completeLesson(id, currentLesson.id);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (quizAnswer === 1 && currentLesson) {
      completeLesson(id, currentLesson.id);
      setTimeout(() => {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }, 500);
    }
  };

  const getLessonIcon = (lesson: typeof allLessons[0]) => {
    if (lesson.completed) return <Check className="h-3 w-3" />;
    if (lesson.locked) return <Lock className="h-3 w-3" />;
    if (lesson.type === "quiz") return <FileQuestion className="h-3 w-3" />;
    if (lesson.type === "exercise") return <PenTool className="h-3 w-3" />;
    return <Play className="h-3 w-3" />;
  };

  const getLessonIconStyle = (lesson: typeof allLessons[0]) => {
    if (lesson.completed) return "bg-green-500 text-white";
    if (lesson.locked) return "bg-gray-100 text-gray-400";
    if (activeLesson === lesson.id) return "bg-blue-600 text-white";
    if (lesson.type === "quiz") return "border-2 border-purple-400 text-purple-500";
    if (lesson.type === "exercise") return "border-2 border-orange-400 text-orange-500";
    return "border border-gray-300 text-gray-400";
  };

  return (
    <div className="flex h-screen bg-gray-50">
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

              {/* XP Progress */}
              <div className="mt-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 font-medium text-blue-700">
                    <Zap className="h-3.5 w-3.5" />
                    {earnedXpInCourse} / {totalXpInCourse} XP
                  </span>
                  <span className="text-gray-500">
                    {completedCount}/{allLessons.length} lessons
                  </span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                    style={{ width: `${(completedCount / allLessons.length) * 100}%` }}
                  />
                </div>
                {course.badge && (
                  <p className="mt-2 text-xs text-gray-500">
                    Complete to earn: <span className="font-medium">{course.badge.emoji} {course.badge.name}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Lessons List */}
            <nav className="flex-1 overflow-y-auto">
              {lessons.map((module, moduleIndex) => {
                const moduleCompleted = module.items.every((l) => l.completed);
                const moduleXp = module.items.reduce((sum, l) => sum + l.xp, 0);
                return (
                  <div key={module.module} className="border-b border-gray-100">
                    <button
                      onClick={() => toggleModule(module.module)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2">
                        {moduleCompleted ? (
                          <CircleCheck className="h-4 w-4 text-green-500" />
                        ) : (
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-[10px] font-medium text-gray-600">
                            {moduleIndex + 1}
                          </span>
                        )}
                        <span className="text-sm font-medium text-gray-900">
                          {module.module}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-0.5 text-xs text-gray-400">
                          <Zap className="h-3 w-3" />
                          {moduleXp}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-gray-400 transition-transform",
                            expandedModules.includes(module.module) && "rotate-180"
                          )}
                        />
                      </div>
                    </button>
                    {expandedModules.includes(module.module) && (
                      <div className="pb-2">
                        {module.items.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => !lesson.locked && setActiveLesson(lesson.id)}
                            disabled={lesson.locked}
                            className={cn(
                              "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                              lesson.locked
                                ? "opacity-50 cursor-not-allowed"
                                : activeLesson === lesson.id
                                ? "bg-blue-50"
                                : "hover:bg-gray-50"
                            )}
                          >
                            <div
                              className={cn(
                                "flex h-6 w-6 items-center justify-center rounded-full flex-shrink-0",
                                getLessonIconStyle(lesson)
                              )}
                            >
                              {getLessonIcon(lesson)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={cn(
                                  "text-sm truncate",
                                  lesson.completed
                                    ? "text-gray-500"
                                    : activeLesson === lesson.id
                                    ? "font-medium text-blue-600"
                                    : "text-gray-700"
                                )}
                              >
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2">
                                <p className="text-xs text-gray-400">
                                  {lesson.duration}
                                </p>
                                <span className="flex items-center gap-0.5 text-xs text-amber-500">
                                  <Zap className="h-2.5 w-2.5" />
                                  +{lesson.xp}
                                </span>
                              </div>
                            </div>
                            {lesson.completed && (
                              <span className="text-xs text-green-500 font-medium">Done</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Streak Footer */}
            <div className="border-t border-gray-100 p-4">
              <div className="flex items-center justify-between rounded-lg bg-orange-50 p-3">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-semibold text-orange-700">
                      {learningStats.currentStreak} day streak!
                    </p>
                    <p className="text-xs text-orange-500">Keep it going!</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-2.5 w-2.5 rounded-full",
                        i < learningStats.currentStreak
                          ? "bg-orange-400"
                          : "bg-orange-200"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
            <div className="mx-auto max-w-4xl p-6">
              {/* Celebration Overlay */}
              {showCelebration && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="animate-bounce rounded-2xl bg-white p-8 text-center shadow-2xl">
                    <div className="text-5xl">🎉</div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">
                      Lesson Complete!
                    </h2>
                    <div className="mt-2 flex items-center justify-center gap-1 text-lg font-semibold text-amber-500">
                      <Zap className="h-5 w-5" />
                      +{currentLesson?.xp} XP earned
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Keep going to maintain your streak!
                    </p>
                    <button
                      onClick={() => setShowCelebration(false)}
                      className="mt-4 rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Course Info */}
              <div className="mb-4 lg:hidden">
                <Link
                  href="/courses"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to Courses
                </Link>
                <h2 className="mt-2 text-lg font-semibold text-gray-900">
                  {course.title}
                </h2>
                {/* Mobile XP Bar */}
                <div className="mt-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-medium text-blue-700">
                      <Zap className="h-3.5 w-3.5" />
                      {earnedXpInCourse} / {totalXpInCourse} XP
                    </span>
                    <span className="flex items-center gap-1 text-orange-600">
                      <Flame className="h-3.5 w-3.5" />
                      {learningStats.currentStreak} day streak
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                      style={{ width: `${(completedCount / allLessons.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Lesson Type Badge */}
              {currentLesson && (
                <div className="mb-4 flex items-center gap-2">
                  <span className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                    currentLesson.type === "quiz"
                      ? "bg-purple-100 text-purple-700"
                      : currentLesson.type === "exercise"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                  )}>
                    {currentLesson.type === "quiz" && <FileQuestion className="h-3 w-3" />}
                    {currentLesson.type === "exercise" && <PenTool className="h-3 w-3" />}
                    {currentLesson.type === "video" && <Play className="h-3 w-3" />}
                    {currentLesson.type === "video" ? "Video Lesson" : currentLesson.type === "quiz" ? "Knowledge Check" : "Hands-on Exercise"}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-amber-500">
                    <Zap className="h-3 w-3" />
                    +{currentLesson.xp} XP
                  </span>
                </div>
              )}

              {/* Video Player / Quiz / Exercise */}
              {currentLesson?.type === "quiz" && !showQuiz ? (
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex flex-col items-center justify-center text-white">
                  <FileQuestion className="h-16 w-16 mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold">Knowledge Check</h3>
                  <p className="mt-2 text-purple-200">Test what you have learned so far</p>
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-purple-700 hover:bg-purple-50"
                  >
                    Start Quiz
                  </button>
                </div>
              ) : currentLesson?.type === "quiz" && showQuiz ? (
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <FileQuestion className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {currentLesson.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 font-medium mb-4">
                    What is the most important first step when validating a startup idea?
                  </p>
                  <div className="space-y-3">
                    {[
                      "Build a full product first",
                      "Talk to potential customers",
                      "Create a detailed business plan",
                      "Raise funding immediately",
                    ].map((option, i) => (
                      <button
                        key={i}
                        onClick={() => !quizSubmitted && setQuizAnswer(i)}
                        disabled={quizSubmitted}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all",
                          quizSubmitted && i === 1
                            ? "border-green-500 bg-green-50"
                            : quizSubmitted && quizAnswer === i && i !== 1
                            ? "border-red-400 bg-red-50"
                            : quizAnswer === i
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-100 hover:border-gray-200"
                        )}
                      >
                        <span className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium",
                          quizSubmitted && i === 1
                            ? "bg-green-500 text-white"
                            : quizAnswer === i
                            ? "bg-purple-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        )}>
                          {quizSubmitted && i === 1 ? <Check className="h-4 w-4" /> : String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm text-gray-700">{option}</span>
                      </button>
                    ))}
                  </div>
                  {!quizSubmitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={quizAnswer === null}
                      className={cn(
                        "mt-6 w-full rounded-full py-3 text-sm font-semibold transition-all",
                        quizAnswer !== null
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <div className={cn(
                      "mt-4 rounded-lg p-4",
                      quizAnswer === 1 ? "bg-green-50" : "bg-red-50"
                    )}>
                      <p className={cn(
                        "text-sm font-medium",
                        quizAnswer === 1 ? "text-green-700" : "text-red-700"
                      )}>
                        {quizAnswer === 1
                          ? "Correct! Customer validation is the most critical first step."
                          : "Not quite. The best first step is talking to potential customers to validate the problem."}
                      </p>
                    </div>
                  )}
                </div>
              ) : currentLesson?.type === "exercise" ? (
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex flex-col items-center justify-center text-white">
                  <PenTool className="h-16 w-16 mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold">Hands-on Exercise</h3>
                  <p className="mt-2 text-orange-100">Apply what you have learned</p>
                  <div className="mt-4 flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm">
                    <Star className="h-4 w-4" />
                    <span>Worth {currentLesson.xp} XP</span>
                  </div>
                </div>
              ) : (
                <div className="aspect-video rounded-2xl bg-gray-900 flex items-center justify-center">
                  <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
                    <Play className="h-8 w-8 ml-1" />
                  </button>
                </div>
              )}

              {/* Lesson Info */}
              <div className="mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Module: {currentModule?.module}</span>
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
                  Welcome to this lesson! In this section, we will cover the
                  essential concepts you need to understand before moving
                  forward with the course.
                </p>
                <p>
                  Make sure to take notes and complete the exercises. Each
                  completed lesson earns you XP toward unlocking the next
                  module and earning your course badge.
                </p>
                <h2>Key Takeaways</h2>
                <ul>
                  <li>Understanding the core principles</li>
                  <li>Setting up your workspace correctly</li>
                  <li>Building a strong foundation for future lessons</li>
                </ul>
              </div>

              {/* Complete Lesson Button */}
              {currentLesson && !currentLesson.completed && !currentLesson.locked && currentLesson.type !== "quiz" && (
                <button
                  onClick={handleComplete}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 py-3.5 text-sm font-semibold text-white shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  <Check className="h-5 w-5" />
                  Mark as Complete
                  <span className="flex items-center gap-0.5 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                    <Zap className="h-3 w-3" />+{currentLesson.xp} XP
                  </span>
                </button>
              )}

              {currentLesson?.completed && (
                <div className="mt-6 flex items-center justify-center gap-2 rounded-full bg-green-50 border border-green-200 py-3.5 text-sm font-semibold text-green-700">
                  <CircleCheck className="h-5 w-5" />
                  Lesson Completed — {currentLesson.xp} XP earned
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
                <button
                  onClick={() => {
                    if (currentIndex > 0) {
                      const prev = allLessons[currentIndex - 1];
                      if (!prev.locked) setActiveLesson(prev.id);
                    }
                  }}
                  disabled={currentIndex === 0}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-colors",
                    currentIndex === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (currentIndex < allLessons.length - 1) {
                      const next = allLessons[currentIndex + 1];
                      if (!next.locked) setActiveLesson(next.id);
                    }
                  }}
                  disabled={currentIndex === allLessons.length - 1 || allLessons[currentIndex + 1]?.locked}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    currentIndex === allLessons.length - 1 || allLessons[currentIndex + 1]?.locked
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                >
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
