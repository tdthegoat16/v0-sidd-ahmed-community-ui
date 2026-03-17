"use client";

import { useState } from "react";
import { Search, Bell, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { NotificationsDropdown } from "./notifications-dropdown";
import { useAppState } from "@/lib/app-state";

interface MobileHeaderProps {
  title?: string;
  onMenuClick?: () => void;
}

export function MobileHeader({ title, onMenuClick }: MobileHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const { searchQuery, setSearchQuery, searchOpen, setSearchOpen, unreadNotificationCount } = useAppState();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 lg:hidden">
      {/* Left: Menu + Title */}
      <div className="flex items-center gap-3">
        {!searchOpen && (
          <>
            <button
              onClick={onMenuClick}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:bg-gray-800"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-tribe-800">✦</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {title || "Positive Tribe"}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Search bar (mobile) */}
      {searchOpen ? (
        <div className="flex flex-1 items-center gap-2">
          <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent dark:bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
          />
          <button
            onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-400"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        /* Right: Actions */
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 hidden dark:block" />
            <Moon className="h-5 w-5 block dark:hidden" />
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:bg-gray-800"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:bg-gray-800"
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
        </div>
      )}
    </header>
  );
}
