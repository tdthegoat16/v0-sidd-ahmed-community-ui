"use client";

import { CommunityLayout } from "@/components/community/community-layout";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { communityMembers } from "@/lib/data";
import Link from "next/link";

const leaderboard = [...communityMembers]
  .sort((a, b) => b.postsCount + b.commentsCount - (a.postsCount + a.commentsCount))
  .map((member, index) => ({
    ...member,
    rank: index + 1,
    points: member.postsCount * 10 + member.commentsCount * 5,
  }));

export default function LeaderboardPage() {
  const topThree = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <CommunityLayout>
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
          <p className="mt-1 text-gray-500">
            Top contributors in the community
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {/* Second Place */}
          <div className="flex flex-col items-center pt-8">
            <div className="relative">
              <Avatar className="h-16 w-16 ring-4 ring-gray-300">
                <AvatarImage src={topThree[1]?.avatar} alt={topThree[1]?.name} />
                <AvatarFallback className={cn(topThree[1]?.color, "text-white text-lg")}>
                  {topThree[1]?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-700">
                <Medal className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold text-gray-900">
              {topThree[1]?.name}
            </p>
            <p className="text-xs text-gray-500">{topThree[1]?.points} pts</p>
            <div className="mt-2 h-24 w-full rounded-t-lg bg-gray-200" />
          </div>

          {/* First Place */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <Avatar className="h-20 w-20 ring-4 ring-yellow-400">
                <AvatarImage src={topThree[0]?.avatar} alt={topThree[0]?.name} />
                <AvatarFallback className={cn(topThree[0]?.color, "text-white text-xl")}>
                  {topThree[0]?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-yellow-800">
                <Trophy className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-4 text-sm font-bold text-gray-900">
              {topThree[0]?.name}
            </p>
            <p className="text-xs text-gray-500">{topThree[0]?.points} pts</p>
            <div className="mt-2 h-32 w-full rounded-t-lg bg-yellow-100" />
          </div>

          {/* Third Place */}
          <div className="flex flex-col items-center pt-12">
            <div className="relative">
              <Avatar className="h-14 w-14 ring-4 ring-orange-300">
                <AvatarImage src={topThree[2]?.avatar} alt={topThree[2]?.name} />
                <AvatarFallback className={cn(topThree[2]?.color, "text-white text-base")}>
                  {topThree[2]?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-orange-300 text-orange-700">
                <Award className="h-3.5 w-3.5" />
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold text-gray-900">
              {topThree[2]?.name}
            </p>
            <p className="text-xs text-gray-500">{topThree[2]?.points} pts</p>
            <div className="mt-2 h-20 w-full rounded-t-lg bg-orange-100" />
          </div>
        </div>

        {/* Rest of Leaderboard */}
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {rest.map((member) => (
              <Link
                key={member.id}
                href={`/members/${member.id}`}
                className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center text-sm font-semibold text-gray-400">
                  {member.rank}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className={cn(member.color, "text-white text-sm")}>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-semibold text-gray-900">
                    {member.points}
                  </span>
                  <span>pts</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* How Points Work */}
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            How points work
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <span className="text-sm font-bold">+10</span>
              </div>
              <span className="text-sm text-gray-600">Per post created</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <span className="text-sm font-bold">+5</span>
              </div>
              <span className="text-sm text-gray-600">Per comment</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <span className="text-sm font-bold">+2</span>
              </div>
              <span className="text-sm text-gray-600">Per like received</span>
            </div>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}
