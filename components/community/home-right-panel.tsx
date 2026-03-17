"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Instagram, Linkedin, Youtube, Twitter, Sparkles } from "lucide-react";
import { events, courses, currentUser } from "@/lib/data";
import Link from "next/link";

export function HomeRightPanel() {
  const upcomingEvents = events.slice(0, 3);
  const featuredCourse = courses[0];

  return (
    <div className="p-4 space-y-6">
      {/* Sidd Ahmed Founder Card */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-14 w-14 ring-2 ring-gray-900 dark:ring-tribe-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="bg-gray-900 text-white font-semibold">
                SA
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{currentUser.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser.role}</p>
          </div>
        </div>
        <Link
          href="/events"
          className="mt-4 block w-full rounded-lg bg-tribe-600 py-2.5 text-center text-sm font-semibold text-gray-900 hover:bg-tribe-700 transition-colors"
        >
          Book a Session
        </Link>
        <div className="mt-4 flex items-center justify-center gap-4">
          <a href={currentUser.socials?.instagram} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 dark:text-gray-400">
            <Instagram className="h-5 w-5" />
          </a>
          <a href={currentUser.socials?.linkedin} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 dark:text-gray-400">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href={currentUser.socials?.youtube} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 dark:text-gray-400">
            <Youtube className="h-5 w-5" />
          </a>
          <a href={currentUser.socials?.twitter} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 dark:text-gray-400">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Upcoming Events
          </h3>
          <Link
            href="/events"
            className="text-xs text-tribe-800 hover:text-tribe-900"
          >
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tribe-50 dark:bg-tribe-900/30 text-tribe-800 dark:text-tribe-400">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {event.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {event.date} · {event.time}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Course */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Featured Course
        </h3>
        <Link
          href={`/courses/${featuredCourse.id}`}
          className="block rounded-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
            <Sparkles className="h-10 w-10 text-white/30" />
          </div>
          <div className="p-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
              {featuredCourse.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {featuredCourse.lessons} lessons
            </p>
            {featuredCourse.progress > 0 && (
              <div className="mt-2">
                <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700">
                  <div
                    className="h-1.5 rounded-full bg-tribe-600"
                    style={{ width: `${featuredCourse.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
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
