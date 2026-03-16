"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, MoreHorizontal, Pin, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { posts } from "@/lib/data";

interface PostCardProps {
  post: (typeof posts)[0];
}

export function PostCard({ post }: PostCardProps) {
  const [showAISummary, setShowAISummary] = useState(false);
  const isLongPost = post.body.length > 150;

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Pinned Badge */}
      {post.isPinned && (
        <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
          <Pin className="h-3 w-3" />
          <span>Pinned</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback className={cn(post.author.color, "text-white text-sm")}>
              {post.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">
                {post.author.name}
              </span>
              {post.author.isAdmin && (
                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-600">
                  Founder
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{post.author.role}</span>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-400">{post.timestamp}</span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save post</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="mt-3">
        <h3 className="text-base font-semibold text-gray-900">{post.title}</h3>
        <p className="mt-1.5 text-sm text-gray-600 line-clamp-3">{post.body}</p>
      </div>

      {/* AI Summary Badge - for long posts */}
      {isLongPost && (
        <button
          onClick={() => setShowAISummary(!showAISummary)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 transition-colors"
        >
          <Sparkles className="h-3 w-3" />
          AI Summary
          {showAISummary ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </button>
      )}

      {showAISummary && (
        <div className="mt-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
          <p>This post discusses key strategies and insights shared by the author about their journey and learnings in the community.</p>
        </div>
      )}

      {/* Image */}
      {post.image && (
        <div className="mt-4">
          <div className="aspect-video rounded-xl bg-gray-100" />
        </div>
      )}

      {/* Space Tag */}
      {post.space && (
        <div className="mt-3">
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            {post.space}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors">
            <Heart className="h-4 w-4" />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">{post.comments}</span>
          </button>
        </div>
        <div className="flex items-center">
          {/* Stacked avatars */}
          <div className="flex -space-x-2">
            {post.likedBy.slice(0, 3).map((user) => (
              <Avatar
                key={user.id}
                className="h-6 w-6 ring-2 ring-white"
              >
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className={cn(user.color, "text-white text-[10px]")}>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="ml-2 text-xs text-gray-500">
            {post.likes} likes · {post.comments} comments
          </span>
        </div>
      </div>
    </article>
  );
}
