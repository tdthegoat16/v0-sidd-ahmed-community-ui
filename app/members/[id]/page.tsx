"use client";

import { useState, use } from "react";
import { CommunityLayout } from "@/components/community/community-layout";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/community/post-card";
import {
  MapPin,
  Mail,
  Calendar,
  MessageCircle,
  UserPlus,
  MoreHorizontal,
} from "lucide-react";
import { communityMembers, posts } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

interface MemberProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function MemberProfilePage({ params }: MemberProfilePageProps) {
  const { id } = use(params);
  const member = communityMembers.find((m) => m.id === id);
  if (!member) notFound();
  const memberPosts = posts.filter((p) => p.author.id === member.id);

  return (
    <CommunityLayout>
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Profile Header */}
        <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
          {/* Cover */}
          <div className={cn("h-32 sm:h-40", member.color)} />

          {/* Profile Info */}
          <div className="relative px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <Avatar
                  className={cn(
                    "absolute -top-12 sm:-top-16 h-24 w-24 sm:h-32 sm:w-32 ring-4 ring-white",
                    member.isOnline && "ring-green-500"
                  )}
                >
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback
                    className={cn(member.color, "text-white text-3xl")}
                  >
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="pt-14 sm:pt-0 sm:ml-36">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {member.name}
                    </h1>
                    {member.isOnline && (
                      <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Online
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  Message
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <UserPlus className="h-4 w-4" />
                  Follow
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 hover:bg-gray-50">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 flex items-center gap-6">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">
                  {member.postsCount}
                </p>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">
                  {member.commentsCount}
                </p>
                <p className="text-sm text-gray-500">Comments</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">
                  {member.spacesJoined}
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
              value="comments"
              className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
            >
              Comments
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
                <p className="mt-2 text-gray-600">{member.bio}</p>
              </div>

              {/* Info */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{member.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Member since {member.memberSince}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900">
                  Interests & Skills
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {member.tags.map((tag) => (
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
            {memberPosts.length > 0 ? (
              memberPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <p className="text-gray-500">No posts yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="comments" className="mt-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">No comments yet</p>
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
