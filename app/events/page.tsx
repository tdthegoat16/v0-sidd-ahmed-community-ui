"use client";

import { useState } from "react";
import { CommunityLayout } from "@/components/community/community-layout";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Video, MapPin, Check } from "lucide-react";
import { events } from "@/lib/data";
import Link from "next/link";

const filterTabs = ["Upcoming", "Workshops", "Fitness", "More Topics"];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  return (
    <CommunityLayout>
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Events</h1>
            <p className="mt-1 text-gray-500">
              Join live sessions, workshops, and community meetups
            </p>
          </div>
          <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
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
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="mt-8 space-y-4">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="w-full sm:w-32 h-24 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0" />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
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
                          {event.host.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-500">
                        {event.host.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {event.date} · {event.time}
                  </div>
                  <span
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                      event.type === "Live stream"
                        ? "bg-red-100 text-red-700"
                        : event.type === "Workshop"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    )}
                  >
                    {event.type === "Live stream" ? (
                      <Video className="h-3 w-3" />
                    ) : event.type === "In person" ? (
                      <MapPin className="h-3 w-3" />
                    ) : null}
                    {event.type}
                  </span>
                </div>
              </div>

              {/* RSVP Button */}
              <div className="flex items-center">
                {event.isGoing ? (
                  <button className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                    <Check className="h-4 w-4" />
                    Going
                  </button>
                ) : (
                  <button className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                    RSVP
                  </button>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </CommunityLayout>
  );
}
