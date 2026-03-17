"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Bookmark } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import { PostCard } from "./post-card";

export function BookmarksPanel() {
  const { bookmarksOpen, setBookmarksOpen, getBookmarkedPosts } = useAppState();
  const bookmarked = getBookmarkedPosts();

  return (
    <Sheet open={bookmarksOpen} onOpenChange={setBookmarksOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 overflow-y-auto">
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-800">
          <SheetTitle className="flex items-center gap-2 text-base">
            <Bookmark className="h-5 w-5 text-tribe-800" />
            Saved Posts
          </SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-4">
          {bookmarked.length > 0 ? (
            bookmarked.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bookmark className="h-10 w-10 text-gray-200 mb-3" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">No saved posts yet</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Posts you bookmark will appear here</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
