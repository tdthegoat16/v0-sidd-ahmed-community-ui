"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, MoreHorizontal, Pin } from "lucide-react";
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
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
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
              {post.isPinned && (
                <Pin className="h-3 w-3 text-gray-400" />
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

      {/* Image */}
      {post.image && (
        <div className="mt-4">
          <div className="aspect-video rounded-xl bg-gray-100" />
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
