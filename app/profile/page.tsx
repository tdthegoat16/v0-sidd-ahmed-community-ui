"use client";

import { CommunityLayout } from "@/components/community/community-layout";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/community/post-card";
import {
  MapPin,
  Mail,
  Calendar,
  Settings,
  Edit,
} from "lucide-react";
import { currentUser, posts, courses } from "@/lib/data";
import Link from "next/link";

export default function ProfilePage() {
  const userPosts = posts.slice(0, 2);
  const userCourses = courses.filter((c) => c.progress > 0);

  return (
    <CommunityLayout>
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Profile Header */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
          {/* Cover */}
          <div className={cn("h-32 sm:h-40", currentUser.color)} />

          {/* Profile Info */}
          <div className="relative px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <Avatar className="absolute -top-12 sm:-top-16 h-24 w-24 sm:h-32 sm:w-32 ring-4 ring-white">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback
                    className={cn(currentUser.color, "text-white text-3xl")}
                  >
                    {currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="pt-14 sm:pt-0 sm:ml-36">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {currentUser.name}
                  </h1>
                  <p className="text-gray-500">{currentUser.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 hover:bg-gray-50">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 flex items-center gap-6">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">
                  {currentUser.postsCount}
                </p>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">
                  {currentUser.commentsCount}
                </p>
                <p className="text-sm text-gray-500">Comments</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">
                  {currentUser.spacesJoined}
                </p>
                <p className="text-sm text-gray-500">Spaces</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="about" className="mt-6">
          <TabsList className="w-full justify-start rounded-xl border border-gray-100 bg-white p-1">
            <TabsTrigger
              value="about"
              className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value="posts"
              className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="spaces"
              className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              Spaces
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              {/* Bio */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Bio</h2>
                <p className="mt-2 text-gray-600">{currentUser.bio}</p>
              </div>

              {/* Info */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{currentUser.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{currentUser.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">
                    Member since {currentUser.memberSince}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900">
                  Interests & Skills
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {currentUser.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="posts" className="mt-6 space-y-4">
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Course Progress
              </h2>
              <div className="mt-4 space-y-4">
                {userCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="flex items-center gap-4 rounded-lg border border-gray-100 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="h-16 w-24 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {course.lessons} lessons
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-gray-100">
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
                        <span className="text-xs text-gray-500">
                          {course.progress}%
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="spaces" className="mt-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                {["Announcements", "Discussions", "Wins", "Resources"].map(
                  (space) => (
                    <Link
                      key={space}
                      href={`/community/${space.toLowerCase()}`}
                      className="flex items-center gap-3 rounded-lg border border-gray-100 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <span className="text-sm font-semibold">
                          {space[0]}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {space}
                      </span>
                    </Link>
                  )
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CommunityLayout>
  );
}
