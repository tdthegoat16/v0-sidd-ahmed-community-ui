"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  Bell,
  Bookmark,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationsDropdown } from "./notifications-dropdown";
import { useAppState } from "@/lib/app-state";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navTabs = [
  { name: "Home", href: "/" },
  { name: "Chat", href: "/chat" },
  { name: "Courses", href: "/courses" },
  { name: "Events", href: "/events" },
];

interface TopNavProps {
  onMenuClick?: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const { searchQuery, setSearchQuery, searchOpen, setSearchOpen, unreadNotificationCount, setBookmarksOpen } = useAppState();

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4">
      {/* Left: Community name + mobile menu */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        {!searchOpen && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              Positive Tribe
              <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Community Settings</DropdownMenuItem>
              <DropdownMenuItem>Invite Members</DropdownMenuItem>
              <DropdownMenuItem>Leave Community</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Center: Navigation tabs or Search bar */}
      {searchOpen ? (
        <div className="flex flex-1 items-center gap-2 mx-4">
          <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search posts, courses, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent dark:bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
          />
          <button
            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 dark:text-gray-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <nav className="hidden md:flex items-center gap-1">
          {navTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "text-tribe-800 bg-tribe-50 dark:bg-tribe-900/20"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-gray-50 dark:bg-gray-700/50 dark:hover:bg-gray-800"
                )}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      )}

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {!searchOpen && (
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        )}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-bold text-white">
                {unreadNotificationCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <NotificationsDropdown
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>
        <button
          onClick={() => setBookmarksOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Bookmarks"
        >
          <Bookmark className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
