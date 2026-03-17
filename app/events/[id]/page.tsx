"use client";

import { use } from "react";
import { CommunityLayout } from "@/components/community/community-layout";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Check,
  Users,
} from "lucide-react";
import { useAppState } from "@/lib/app-state";
import { notFound } from "next/navigation";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = use(params);
  const { events, toggleRsvp } = useAppState();
  const event = events.find((e) => e.id === id);
  if (!event) notFound();

  return (
    <CommunityLayout>
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Hero Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white overflow-hidden">
          <div className="relative z-10">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
                event.type === "Live stream"
                  ? "bg-red-500/20 text-white"
                  : event.type === "Workshop"
                  ? "bg-purple-500/20 text-white"
                  : "bg-green-500/20 text-white"
              )}
            >
              {event.type === "Live stream" ? (
                <Video className="h-3 w-3" />
              ) : event.type === "In person" ? (
                <MapPin className="h-3 w-3" />
              ) : null}
              {event.type}
            </span>
            <h1 className="mt-4 text-3xl font-bold">{event.title}</h1>
            <div className="mt-4 flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-white/20">
                <AvatarImage src={event.host.avatar} alt={event.host.name} />
                <AvatarFallback className={cn(event.host.color, "text-white text-sm")}>
                  {getInitials(event.host.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Hosted by</p>
                <p className="text-sm text-gray-300">{event.host.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                About this event
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Join us for an engaging session where we will dive deep into
                strategies and tactics for growing your business. This is a
                great opportunity to learn from experts and connect with other
                community members.
              </p>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Whether you are just starting out or looking to scale, you will
                find valuable insights and actionable tips that you can apply
                immediately.
              </p>
              <h3 className="mt-6 text-base font-semibold text-gray-900 dark:text-white">
                What you will learn
              </h3>
              <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  Proven strategies for business growth
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  How to build a strong personal brand
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  Networking tips and best practices
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5" />
                <span className="text-sm">Like</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-tribe-800 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">Comment</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-tribe-800 transition-colors">
                <Bookmark className="h-5 w-5" />
                <span className="text-sm">Save</span>
              </button>
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="flex items-center gap-2 text-gray-500 hover:text-tribe-800 transition-colors"
              >
                <Share2 className="h-5 w-5" />
                <span className="text-sm">Share</span>
              </button>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Date & Time Card */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tribe-50 dark:bg-tribe-900/30 text-tribe-800 dark:text-tribe-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {event.date}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tribe-50 dark:bg-tribe-900/30 text-tribe-800 dark:text-tribe-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {event.time}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-tribe-50 dark:bg-tribe-900/30 text-tribe-800 dark:text-tribe-400">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {event.attendees} attending
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Attendees</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{event.price}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Event ticket</p>
              </div>

              {event.isGoing ? (
                <button
                  onClick={() => toggleRsvp(event.id)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-green-50 border border-green-200 py-3 text-sm font-semibold text-green-700 hover:bg-green-100 transition-colors"
                >
                  <Check className="h-4 w-4" />
                  You are going!
                </button>
              ) : (
                <button
                  onClick={() => toggleRsvp(event.id)}
                  className="mt-4 w-full rounded-full bg-tribe-600 py-3 text-sm font-semibold text-gray-900 hover:bg-tribe-700 transition-colors"
                >
                  RSVP Now
                </button>
              )}
            </div>

            {/* Host Card */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Host</h3>
              <div className="mt-4 flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={event.host.avatar} alt={event.host.name} />
                  <AvatarFallback className={cn(event.host.color, "text-white text-sm")}>
                    {getInitials(event.host.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {event.host.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{event.host.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}
