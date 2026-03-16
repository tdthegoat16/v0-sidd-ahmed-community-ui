"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, ChevronRight } from "lucide-react";
import { events, communityMembers, courses } from "@/lib/data";
import Link from "next/link";

export function HomeRightPanel() {
  const upcomingEvents = events.slice(0, 3);
  const activeMembers = communityMembers.filter((m) => m.isOnline).slice(0, 6);
  const featuredCourse = courses[0];

  return (
    <div className="p-4 space-y-6">
      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">
            Upcoming Events
          </h3>
          <Link
            href="/events"
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {event.title}
                </p>
                <p className="text-xs text-gray-500">
                  {event.date} · {event.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Members */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">
            Active Members
          </h3>
          <Link
            href="/members"
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {activeMembers.map((member) => (
            <Link
              key={member.id}
              href={`/members/${member.id}`}
              className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-gray-50 transition-colors"
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className={cn(member.color, "text-white text-xs")}>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
              </div>
              <span className="text-xs text-gray-600 text-center truncate w-full">
                {member.name.split(" ")[0]}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Course */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Featured Course
        </h3>
        <Link
          href={`/courses/${featuredCourse.id}`}
          className="block rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600" />
          <div className="p-3">
            <p className="text-sm font-medium text-gray-900">
              {featuredCourse.title}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {featuredCourse.lessons} lessons
            </p>
            {featuredCourse.progress > 0 && (
              <div className="mt-2">
                <div className="h-1.5 rounded-full bg-gray-100">
                  <div
                    className="h-1.5 rounded-full bg-blue-600"
                    style={{ width: `${featuredCourse.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {featuredCourse.progress}% complete
                </p>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
