"use client";

import { useState, use } from "react";
import { useAcademy } from "@/lib/academy-state";
import { getCourseLessons } from "@/lib/academy-catalog";
import { TopNav } from "@/components/community/top-nav";
import { MobileNav } from "@/components/community/mobile-nav";
import { PaywallModal } from "@/components/academy/paywall-modal";
import { ProBadge, FreeBadge } from "@/components/academy/pro-badge";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Play,
  FileQuestion,
  PenTool,
  FileText,
  Zap,
  Bookmark,
  BookmarkCheck,
  Lightbulb,
  ListChecks,
  MessageSquare,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

interface LessonPlayerProps {
  params: Promise<{ pillarId: string; courseId: string; lessonId: string }>;
}

export default function LessonPlayerPage({ params }: LessonPlayerProps) {
  const { pillarId, courseId, lessonId } = use(params);
  const {
    catalog,
    lessonProgress,
    completeAcademyLesson,
    toggleChecklistItem,
    saveReflection,
    toggleSaveLesson,
    isLessonSaved,
    canAccessLesson,
  } = useAcademy();

  const pillar = catalog.pillars.find((p) => p.id === pillarId);
  const course = pillar?.courses.find((c) => c.id === courseId);
  if (!pillar || !course) notFound();

  const allLessons = getCourseLessons(course);
  const lessonIndex = allLessons.findIndex((l) => l.id === lessonId);
  const lesson = allLessons[lessonIndex];
  if (!lesson) notFound();

  const accessible = canAccessLesson(lesson);
  const progress = lessonProgress[lessonId];
  const completed = progress?.completed ?? false;
  const saved = isLessonSaved(lessonId);

  const [reflectionText, setReflectionText] = useState(
    progress?.reflectionAnswer || ""
  );
  const [showCelebration, setShowCelebration] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);

  // Quiz state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;

  const currentModule = course.modules.find((m) =>
    m.lessons.some((l) => l.id === lessonId)
  );

  const handleComplete = () => {
    if (completed) return;
    completeAcademyLesson(courseId, lessonId);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    // Correct answer is always index 1 for demo
    if (quizAnswer === 1) {
      completeAcademyLesson(courseId, lessonId);
      setTimeout(() => {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }, 500);
    }
  };

  const handleSaveReflection = () => {
    saveReflection(lessonId, reflectionText);
  };

  // If locked behind paywall
  if (!accessible) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopNav />
          <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
            <div className="mx-auto max-w-4xl p-6">
              <Link
                href={`/academy/pillar/${pillarId}/${courseId}`}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300 mb-4"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Course
              </Link>
              <div className="rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-12 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <Lock className="h-8 w-8 text-amber-600" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                  Pro Content
                </h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  This lesson requires Sid Academy Pro access.
                </p>
                <button
                  onClick={() => setPaywallOpen(true)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 text-sm font-bold text-white hover:from-amber-600 hover:to-yellow-600 transition-all"
                >
                  Unlock Pro
                </button>
              </div>
            </div>
          </main>
          <MobileNav />
        </div>
        <PaywallModal
          open={paywallOpen}
          onClose={() => setPaywallOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />

        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <div className="mx-auto max-w-4xl p-6">
            {/* Celebration Overlay */}
            {showCelebration && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="animate-bounce rounded-2xl bg-white dark:bg-gray-800 p-8 text-center shadow-2xl">
                  <div className="text-5xl">🎉</div>
                  <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                    Lesson Complete!
                  </h2>
                  <div className="mt-2 flex items-center justify-center gap-1 text-lg font-semibold text-amber-500">
                    <Zap className="h-5 w-5" />+{lesson.xp} XP earned
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Keep going to maintain your streak!
                  </p>
                  <button
                    onClick={() => setShowCelebration(false)}
                    className="mt-4 rounded-full bg-tribe-600 px-6 py-2 text-sm font-semibold text-gray-900 hover:bg-tribe-700"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4 flex-wrap">
              <Link
                href={`/academy/pillar/${pillarId}/${courseId}`}
                className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <ChevronLeft className="h-4 w-4" />
                {course.title}
              </Link>
            </div>

            {/* Lesson Type Badge + Save */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                    lesson.type === "quiz"
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                      : lesson.type === "exercise"
                      ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                      : lesson.type === "text"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                      : "bg-tribe-100 dark:bg-tribe-900/30 text-tribe-800"
                  )}
                >
                  {lesson.type === "quiz" && (
                    <FileQuestion className="h-3 w-3" />
                  )}
                  {lesson.type === "exercise" && (
                    <PenTool className="h-3 w-3" />
                  )}
                  {lesson.type === "video" && <Play className="h-3 w-3" />}
                  {lesson.type === "text" && <FileText className="h-3 w-3" />}
                  {lesson.type === "video"
                    ? "Video Lesson"
                    : lesson.type === "quiz"
                    ? "Knowledge Check"
                    : lesson.type === "exercise"
                    ? "Hands-on Exercise"
                    : "Reading"}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-amber-500">
                  <Zap className="h-3 w-3" />+{lesson.xp} XP
                </span>
                {lesson.isFree ? <FreeBadge /> : <ProBadge />}
              </div>
              <button
                onClick={() => toggleSaveLesson(lessonId)}
                className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {saved ? (
                  <BookmarkCheck className="h-5 w-5 text-tribe-800" />
                ) : (
                  <Bookmark className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            {/* Video Player / Text Reader / Quiz / Exercise */}
            {lesson.type === "video" && (
              <div className="aspect-video rounded-2xl bg-gray-900 flex items-center justify-center">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <Play className="h-8 w-8 ml-1" />
                </button>
              </div>
            )}

            {lesson.type === "text" && lesson.markdownBody && (
              <div className="rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-6 shadow-sm prose prose-gray dark:prose-invert max-w-none">
                {lesson.markdownBody.split("\n").map((line, i) => {
                  if (line.startsWith("# "))
                    return (
                      <h1 key={i} className="text-2xl font-bold mt-6 mb-3">
                        {line.slice(2)}
                      </h1>
                    );
                  if (line.startsWith("## "))
                    return (
                      <h2 key={i} className="text-xl font-semibold mt-5 mb-2">
                        {line.slice(3)}
                      </h2>
                    );
                  if (line.trim() === "") return <br key={i} />;
                  return (
                    <p key={i} className="my-1">
                      {line}
                    </p>
                  );
                })}
              </div>
            )}

            {lesson.type === "quiz" && !quizSubmitted && (
              <div className="rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FileQuestion className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {lesson.title}
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-4">
                  What is the most important principle from this section?
                </p>
                <div className="space-y-3">
                  {[
                    "Skip the basics and jump to advanced topics",
                    "Apply the core concept consistently before moving on",
                    "Memorize everything without practice",
                    "Wait until you feel 100% ready",
                  ].map((option, i) => (
                    <button
                      key={i}
                      onClick={() => setQuizAnswer(i)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all",
                        quizAnswer === i
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                          : "border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium",
                          quizAnswer === i
                            ? "bg-purple-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        )}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleQuizSubmit}
                  disabled={quizAnswer === null}
                  className={cn(
                    "mt-6 w-full rounded-full py-3 text-sm font-semibold transition-all",
                    quizAnswer !== null
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  )}
                >
                  Submit Answer
                </button>
              </div>
            )}

            {lesson.type === "quiz" && quizSubmitted && (
              <div
                className={cn(
                  "rounded-2xl p-6",
                  quizAnswer === 1
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                )}
              >
                <p
                  className={cn(
                    "text-sm font-medium",
                    quizAnswer === 1
                      ? "text-green-700 dark:text-green-400"
                      : "text-red-700 dark:text-red-400"
                  )}
                >
                  {quizAnswer === 1
                    ? "Correct! Consistent application of core concepts is the key to mastery."
                    : "Not quite. The best approach is to apply the core concept consistently before moving on."}
                </p>
              </div>
            )}

            {lesson.type === "exercise" && (
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex flex-col items-center justify-center text-white">
                <PenTool className="h-16 w-16 mb-4 opacity-80" />
                <h3 className="text-2xl font-bold">Hands-on Exercise</h3>
                <p className="mt-2 text-orange-100">
                  Apply what you have learned
                </p>
                <div className="mt-4 flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm">
                  <Zap className="h-4 w-4" />
                  <span>Worth {lesson.xp} XP</span>
                </div>
              </div>
            )}

            {/* Lesson Info */}
            <div className="mt-6">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Module: {currentModule?.title}</span>
                <span>·</span>
                <span>{lesson.duration}</span>
              </div>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                {lesson.title}
              </h1>
            </div>

            {/* Key Takeaways */}
            {lesson.keyTakeaways.length > 0 && (
              <div className="mt-6 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <h2 className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                    Key Takeaways
                  </h2>
                </div>
                <ul className="space-y-2">
                  {lesson.keyTakeaways.map((takeaway, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-300"
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Checklist */}
            {lesson.actionChecklist.length > 0 && (
              <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ListChecks className="h-5 w-5 text-tribe-800" />
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Action Checklist
                  </h2>
                </div>
                <div className="space-y-2">
                  {lesson.actionChecklist.map((item, i) => {
                    const checked =
                      progress?.checklistItems[i] ?? false;
                    return (
                      <button
                        key={i}
                        onClick={() => toggleChecklistItem(lessonId, i)}
                        className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded border-2 flex-shrink-0 transition-colors",
                            checked
                              ? "border-green-500 bg-green-500 text-white"
                              : "border-gray-300 dark:border-gray-600"
                          )}
                        >
                          {checked && <Check className="h-3 w-3" />}
                        </div>
                        <span
                          className={cn(
                            "text-sm",
                            checked
                              ? "text-gray-400 line-through"
                              : "text-gray-700 dark:text-gray-300"
                          )}
                        >
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reflection Prompt */}
            {lesson.reflectionPrompt && (
              <div className="mt-6 rounded-xl border border-purple-200 dark:border-purple-800/50 bg-purple-50 dark:bg-purple-900/20 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                    Reflection
                  </h2>
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">
                  {lesson.reflectionPrompt}
                </p>
                <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="Write your reflection here..."
                  rows={3}
                  className="w-full rounded-lg border border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  onClick={handleSaveReflection}
                  className="mt-2 rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-700 transition-colors"
                >
                  Save Reflection
                </button>
              </div>
            )}

            {/* Complete Lesson Button */}
            {!completed && lesson.type !== "quiz" && (
              <button
                onClick={handleComplete}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 py-3.5 text-sm font-semibold text-white shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all"
              >
                <Check className="h-5 w-5" />
                Mark as Complete
                <span className="flex items-center gap-0.5 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                  <Zap className="h-3 w-3" />+{lesson.xp} XP
                </span>
              </button>
            )}

            {completed && (
              <div className="mt-6 flex items-center justify-center gap-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 py-3.5 text-sm font-semibold text-green-700 dark:text-green-400">
                <Check className="h-5 w-5" />
                Lesson Completed — {lesson.xp} XP earned
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-6">
              {prevLesson ? (
                <Link
                  href={`/academy/pillar/${pillarId}/${courseId}/${prevLesson.id}`}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Link>
              ) : (
                <div />
              )}
              {nextLesson ? (
                <Link
                  href={`/academy/pillar/${pillarId}/${courseId}/${nextLesson.id}`}
                  className="flex items-center gap-2 rounded-lg bg-tribe-600 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-tribe-700 transition-colors"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href={`/academy/pillar/${pillarId}/${courseId}`}
                  className="flex items-center gap-2 rounded-lg bg-tribe-600 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-tribe-700 transition-colors"
                >
                  Back to Course
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
