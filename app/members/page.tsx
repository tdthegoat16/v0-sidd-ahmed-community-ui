"use client";

import { useState } from "react";
import { CommunityLayout } from "@/components/community/community-layout";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Filter } from "lucide-react";
import { communityMembers } from "@/lib/data";
import Link from "next/link";

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = communityMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CommunityLayout title="Members">
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Members</h1>
            <p className="mt-1 text-gray-500">
              Connect with {communityMembers.length} community members
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <MapPin className="h-4 w-4" />
              Location
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Members Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <Link
              key={member.id}
              href={`/members/${member.id}`}
              className="group rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Cover/Background */}
              <div className={cn("h-24", member.color)} />

              {/* Profile Content */}
              <div className="relative px-4 pb-4">
                <Avatar className="absolute -top-8 left-4 h-16 w-16 ring-4 ring-white">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className={cn(member.color, "text-white text-lg")}>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="pt-10">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    {member.isOnline && (
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{member.role}</p>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {member.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </CommunityLayout>
  );
}
