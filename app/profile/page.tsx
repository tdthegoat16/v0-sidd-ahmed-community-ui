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
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Sparkles,
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
          {/* Cover - Blue Gradient */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-600 to-blue-500" />

          {/* Profile Info */}
          <div className="relative px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <Avatar className="absolute -top-12 sm:-top-16 h-24 w-24 sm:h-32 sm:w-32 ring-4 ring-white ring-offset-2 ring-offset-blue-600">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback
                    className="bg-blue-600 text-white text-3xl"
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

            {/* Bio */}
            <p className="mt-6 text-gray-600 max-w-2xl">{currentUser.bio}</p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {currentUser.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-4 flex items-center gap-3">
              <a href={currentUser.socials?.instagram} className="text-gray-400 hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={currentUser.socials?.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={currentUser.socials?.youtube} className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href={currentUser.socials?.twitter} className="text-gray-400 hover:text-gray-900 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>

            {/* Stats */}
            <div className="mt-6 flex items-center gap-8 border-t border-gray-100 pt-6">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">
                  {currentUser.postsCount}
                </p>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">
                  {currentUser.coursesCreated}
                </p>
                <p className="text-sm text-gray-500">Courses Created</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">
                  {currentUser.membersMentored}+
                </p>
                <p className="text-sm text-gray-500">Members Mentored</p>
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
              value="activity"
              className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              {/* Info */}
              <div className="space-y-3">
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
                Courses by Sidd Ahmed
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {courses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-video bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                      <Sparkles className="h-10 w-10 text-white/30" />
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-medium text-blue-600">
                        {course.category}
                      </span>
                      <h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {course.lessons} lessons
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                  <div>
                    <p className="text-sm text-gray-900">
                      Posted in <span className="font-medium">Announcements</span>
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <p className="text-sm text-gray-900">
                      Added a new lesson to <span className="font-medium">Career Acceleration Blueprint</span>
                    </p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
                  <div>
                    <p className="text-sm text-gray-900">
                      Hosted <span className="font-medium">Positive Tribe Monthly Q&A</span>
                    </p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CommunityLayout>
  );
}
