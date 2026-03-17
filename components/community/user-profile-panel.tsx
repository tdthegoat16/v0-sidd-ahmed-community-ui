"use client";

import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  MapPin,
  Mail,
  Calendar,
  MessageSquare,
  FileText,
  Hash,
} from "lucide-react";
import { communityMembers } from "@/lib/data";

type Member = (typeof communityMembers)[0];

interface UserProfilePanelProps {
  user: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserProfilePanel({
  user,
  open,
  onOpenChange,
}: UserProfilePanelProps) {
  if (!user) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-80 sm:max-w-sm p-0 overflow-y-auto">
        <SheetHeader className="sr-only">
          <SheetTitle>{user.name}&apos;s Profile</SheetTitle>
        </SheetHeader>

        {/* Cover / Header */}
        <div className={cn("h-24 w-full", user.color)} />

        {/* Avatar overlapping the cover */}
        <div className="px-5 -mt-10">
          <Avatar className="h-20 w-20 ring-4 ring-white">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback
              className={cn(user.color, "text-white text-xl font-semibold")}
            >
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name & Role */}
        <div className="px-5 mt-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
            {user.isAdmin && (
              <span className="rounded bg-tribe-100 px-1.5 py-0.5 text-xs font-medium text-tribe-600">
                Founder
              </span>
            )}
            <span
              className={cn(
                "ml-auto h-2.5 w-2.5 rounded-full",
                user.isOnline ? "bg-green-500" : "bg-gray-300"
              )}
            />
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{user.role}</p>
        </div>

        {/* Bio */}
        <div className="px-5 mt-4">
          <p className="text-sm text-gray-600 leading-relaxed">{user.bio}</p>
        </div>

        {/* Info List */}
        <div className="px-5 mt-5 space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
            {user.location}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Mail className="h-4 w-4 text-gray-400 shrink-0" />
            {user.email}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
            Member since {user.memberSince}
          </div>
        </div>

        {/* Stats */}
        <div className="px-5 mt-5">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                <FileText className="h-3.5 w-3.5" />
              </div>
              <p className="text-lg font-bold text-gray-900">
                {user.postsCount}
              </p>
              <p className="text-xs text-gray-500">Posts</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                <MessageSquare className="h-3.5 w-3.5" />
              </div>
              <p className="text-lg font-bold text-gray-900">
                {user.commentsCount}
              </p>
              <p className="text-xs text-gray-500">Comments</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
                <Hash className="h-3.5 w-3.5" />
              </div>
              <p className="text-lg font-bold text-gray-900">
                {user.spacesJoined}
              </p>
              <p className="text-xs text-gray-500">Spaces</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="px-5 mt-5 pb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Tags
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {user.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
