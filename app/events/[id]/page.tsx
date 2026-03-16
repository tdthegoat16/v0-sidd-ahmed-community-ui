import { CommunityLayout } from "@/components/community/community-layout";
import { cn } from "@/lib/utils";
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
import { events, communityMembers } from "@/lib/data";
import Link from "next/link";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = events.find((e) => e.id === id) || events[0];
  const attendees = communityMembers.slice(0, 6);

  return (
    <CommunityLayout>
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Hero Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white overflow-hidden">
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
                  {event.host.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Hosted by</p>
                <p className="text-sm text-blue-100">{event.host.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                About this event
              </h2>
              <p className="mt-3 text-gray-600">
                Join us for an engaging session where we will dive deep into
                strategies and tactics for growing your business. This is a
                great opportunity to learn from experts and connect with other
                community members.
              </p>
              <p className="mt-3 text-gray-600">
                Whether you are just starting out or looking to scale, you will
                find valuable insights and actionable tips that you can apply
                immediately.
              </p>
              <h3 className="mt-6 text-base font-semibold text-gray-900">
                What you will learn
              </h3>
              <ul className="mt-2 space-y-2 text-gray-600">
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
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">Comment</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                <Bookmark className="h-5 w-5" />
                <span className="text-sm">Save</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                <Share2 className="h-5 w-5" />
                <span className="text-sm">Share</span>
              </button>
            </div>

            {/* Attendees */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Attendees ({event.attendees})
                </h2>
                <Link
                  href="/members"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View all
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {attendees.map((attendee) => (
                  <Link
                    key={attendee.id}
                    href={`/members/${attendee.id}`}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={attendee.avatar} alt={attendee.name} />
                      <AvatarFallback className={cn(attendee.color, "text-white text-xs")}>
                        {attendee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {attendee.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {attendee.role}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Date & Time Card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {event.date}
                    </p>
                    <p className="text-xs text-gray-500">Date</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {event.time}
                    </p>
                    <p className="text-xs text-gray-500">Time</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {event.attendees} attending
                    </p>
                    <p className="text-xs text-gray-500">Attendees</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="text-2xl font-bold text-gray-900">Free</p>
                <p className="text-sm text-gray-500">Event ticket</p>
              </div>

              {event.isGoing ? (
                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-green-50 border border-green-200 py-3 text-sm font-semibold text-green-700">
                  <Check className="h-4 w-4" />
                  You are going!
                </button>
              ) : (
                <button className="mt-4 w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                  RSVP Now
                </button>
              )}
            </div>

            {/* Host Card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900">Host</h3>
              <Link
                href={`/members/${event.host.id}`}
                className="mt-4 flex items-center gap-3"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={event.host.avatar} alt={event.host.name} />
                  <AvatarFallback className={cn(event.host.color, "text-white text-sm")}>
                    {event.host.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {event.host.name}
                  </p>
                  <p className="text-xs text-gray-500">{event.host.role}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}
