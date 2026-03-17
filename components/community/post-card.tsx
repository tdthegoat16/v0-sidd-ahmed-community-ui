"use client";

import { useState } from "react";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, MoreHorizontal, Pin, Sparkles, ChevronDown, ChevronUp, Bookmark, Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfile } from "./profile-context";
import { useAppState } from "@/lib/app-state";

interface PostCardProps {
  post: {
    id: string;
    author: { id: string; name: string; role: string; avatar: string; color: string; isAdmin?: boolean };
    title: string;
    body: string;
    image: string | null;
    likes: number;
    comments: number;
    likedBy: { id: string; name: string; avatar: string; color: string }[];
    timestamp: string;
    isPinned: boolean;
    space: string;
    isLiked?: boolean;
    isBookmarked?: boolean;
    commentsList?: { id: string; author: { name: string; avatar: string; color: string }; text: string; timestamp: string }[];
  };
}

export function PostCard({ post }: PostCardProps) {
  const { openProfile } = useProfile();
  const { toggleLike, toggleBookmark, addComment } = useAppState();
  const [showAISummary, setShowAISummary] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const isLongPost = post.body.length > 150;

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addComment(post.id, commentText.trim());
    setCommentText("");
  };

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
          <button onClick={() => openProfile(post.author as any)} className="shrink-0 focus:outline-none focus:ring-2 focus:ring-tribe-400 rounded-full">
            <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-tribe-200 transition-shadow">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className={cn(post.author.color, "text-white text-sm")}>
                {getInitials(post.author.name)}
              </AvatarFallback>
            </Avatar>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <button onClick={() => openProfile(post.author as any)} className="text-sm font-semibold text-gray-900 hover:text-tribe-800 hover:underline transition-colors">
                {post.author.name}
              </button>
              {post.author.isAdmin && (
                <span className="rounded bg-tribe-100 px-1.5 py-0.5 text-xs font-medium text-tribe-800">
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
            <DropdownMenuItem onClick={() => toggleBookmark(post.id)}>
              {post.isBookmarked ? "Remove bookmark" : "Save post"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard?.writeText(window.location.href)}>
              Copy link
            </DropdownMenuItem>
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
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-tribe-50 px-3 py-1.5 text-xs font-medium text-tribe-800 hover:bg-tribe-100 transition-colors"
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
        <div className="mt-2 rounded-lg bg-tribe-50 p-3 text-sm text-tribe-800">
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
          <button
            onClick={() => toggleLike(post.id)}
            className={cn(
              "flex items-center gap-1.5 transition-colors",
              post.isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
            )}
            aria-label={`Like post, ${post.likes} likes`}
          >
            <Heart className={cn("h-4 w-4", post.isLiked && "fill-current")} />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className={cn(
              "flex items-center gap-1.5 transition-colors",
              showComments ? "text-tribe-800" : "text-gray-500 hover:text-tribe-800"
            )}
            aria-label={`Comment on post, ${post.comments} comments`}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button
            onClick={() => toggleBookmark(post.id)}
            className={cn(
              "flex items-center gap-1.5 transition-colors",
              post.isBookmarked ? "text-tribe-800" : "text-gray-500 hover:text-tribe-800"
            )}
            aria-label="Bookmark post"
          >
            <Bookmark className={cn("h-4 w-4", post.isBookmarked && "fill-current")} />
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
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="ml-2 text-xs text-gray-500">
            {post.likes} likes · {post.comments} comments
          </span>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          {/* Existing comments */}
          {post.commentsList && post.commentsList.length > 0 && (
            <div className="space-y-3 mb-4">
              {post.commentsList.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback className={cn(comment.author.color, "text-white text-[9px]")}>
                      {getInitials(comment.author.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 rounded-lg bg-gray-50 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-900">{comment.author.name}</span>
                      <span className="text-xs text-gray-400">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-0.5">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-tribe-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-tribe-500"
            />
            <button
              onClick={handleAddComment}
              disabled={!commentText.trim()}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                commentText.trim()
                  ? "bg-tribe-600 text-gray-900 hover:bg-tribe-700"
                  : "bg-gray-100 text-gray-400"
              )}
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
