"use client";

import { CommunityLayout } from "@/components/community/community-layout";
import { HomeRightPanel } from "@/components/community/home-right-panel";
import { PostCard } from "@/components/community/post-card";
import { PostComposer } from "@/components/community/post-composer";
import { useAppState } from "@/lib/app-state";
import { useAcademy } from "@/lib/academy-state";
import { getNewestCourses } from "@/lib/academy-catalog";
import { ProBadge, FreeBadge } from "@/components/academy/pro-badge";
import { Play, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { posts, searchQuery } = useAppState();
  const { catalog, getContinueLearning, getCourseCompletionPercent } =
    useAcademy();

  const filteredPosts = searchQuery
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  const continueLearning = getContinueLearning();
  const newestCourses = getNewestCourses(catalog, 3);

  return (
    <CommunityLayout rightPanel={<HomeRightPanel />}>
      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Hero Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white shadow-lg">
          <h1 className="text-2xl font-bold">
            Welcome to the Positive Tribe
          </h1>
          <p className="mt-1 text-gray-300">
            A community of dreamers building purpose-driven lives alongside Sidd Ahmed.
          </p>
        </div>

        {/* Continue Learning Row */}
        {continueLearning.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                Continue Learning
              </h2>
              <Link
                href="/academy"
                className="flex items-center gap-1 text-xs text-tribe-800 hover:text-tribe-900"
              >
                View all
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {continueLearning.slice(0, 2).map((item) => {
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
                    className="flex items-center gap-3 rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tribe-50 dark:bg-tribe-900/30 text-tribe-800 flex-shrink-0">
                      <Play className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.course.title}
                      </p>
                      {item.nextLesson && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          Next: {item.nextLesson.title}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="h-1.5 w-16 rounded-full bg-gray-100 dark:bg-gray-700">
                        <div
                          className="h-1.5 rounded-full bg-tribe-600"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{percent}%</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Newest Releases Row */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Newest in Sid Academy
            </h2>
            <Link
              href="/academy"
              className="flex items-center gap-1 text-xs text-tribe-800 hover:text-tribe-900"
            >
              Explore
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {newestCourses.map((course) => {
              const pillar = catalog.pillars.find((p) =>
                p.courses.some((c) => c.id === course.id)
              );
              return (
                <Link
                  key={course.id}
                  href={`/academy/pillar/${pillar?.id}/${course.id}`}
                  className="group rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white/30" />
                    <span className="absolute right-1.5 top-1.5">
                      {course.isFree ? <FreeBadge /> : <ProBadge />}
                    </span>
                  </div>
                  <div className="p-2">
                    <p className="text-[10px] text-tribe-800 font-medium">
                      {pillar?.title}
                    </p>
                    <h3 className="mt-0.5 text-xs font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-tribe-800 transition-colors">
                      {course.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Post Composer */}
        <PostComposer />

        {/* Feed */}
        <div className="mt-6 space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-8 text-center shadow-sm">
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery ? "No posts match your search" : "No posts yet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </CommunityLayout>
  );
}
