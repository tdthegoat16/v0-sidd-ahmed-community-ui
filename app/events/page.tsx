"use client";

import { useState } from "react";
import { CommunityLayout } from "@/components/community/community-layout";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Video, MapPin, Check, Globe } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import Link from "next/link";

const filterTabs = ["Upcoming", "Workshops", "Keynotes", "Q&A Sessions", "Replays"];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const { events, toggleRsvp } = useAppState();

  const filteredEvents = activeTab === "Upcoming"
    ? events
    : activeTab === "Workshops"
    ? events.filter((e) => e.type === "Workshop")
    : activeTab === "Q&A Sessions"
    ? events.filter((e) => e.title.toLowerCase().includes("q&a"))
    : events;

  return (
    <CommunityLayout title="Events">
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Events</h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Join live sessions, workshops, and Q&A with Sidd Ahmed
            </p>
          </div>
          <button className="rounded-full bg-tribe-600 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-tribe-700 transition-colors">
            Create Event
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "bg-tribe-600 text-gray-900"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 dark:bg-gray-700/50 dark:hover:bg-gray-800"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="mt-8 space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <Link href={`/events/${event.id}`} className="w-full sm:w-32 h-24 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 flex-shrink-0" />

              {/* Content */}
              <Link href={`/events/${event.id}`} className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage
                          src={event.host.avatar}
                          alt={event.host.name}
                        />
                        <AvatarFallback
                          className={cn(event.host.color, "text-white text-[8px]")}
                        >
                          {getInitials(event.host.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Hosted by {event.host.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    {event.date} · {event.time}
                  </div>
                  <span
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                      event.type === "Live stream"
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                        : event.type === "Workshop"
                        ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                        : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    )}
                  >
                    {event.type === "Live stream" ? (
                      <Video className="h-3 w-3" />
                    ) : event.type === "Online" ? (
                      <Globe className="h-3 w-3" />
                    ) : event.type === "Workshop" ? (
                      <MapPin className="h-3 w-3" />
                    ) : null}
                    {event.type}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {event.attendees} attending
                  </span>
                  <span className={cn(
                    "text-sm font-medium",
                    event.price === "Free" || event.price?.includes("Free")
                      ? "text-green-600"
                      : "text-gray-900 dark:text-white"
                  )}>
                    {event.price}
                  </span>
                </div>
              </Link>

              {/* RSVP Button */}
              <div className="flex items-center">
                {event.isGoing ? (
                  <button
                    onClick={() => toggleRsvp(event.id)}
                    className="flex items-center gap-1.5 rounded-full border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30 px-4 py-2 text-sm font-medium text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                  >
                    <Check className="h-4 w-4" />
                    Going
                  </button>
                ) : (
                  <button
                    onClick={() => toggleRsvp(event.id)}
                    className="rounded-full border border-tribe-200 bg-white px-4 py-2 text-sm font-medium text-tribe-800 hover:bg-tribe-50 transition-colors"
                  >
                    RSVP
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CommunityLayout>
  );
}
