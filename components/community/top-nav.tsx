"use client";

import { useState } from "react";
import { cn, getInitials } from "@/lib/utils";
import {
  Search,
  Bell,
  MessageCircle,
  Bookmark,
  ChevronDown,
  Menu,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationsDropdown } from "./notifications-dropdown";
import { currentUser } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navTabs = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Events", href: "/events" },
  { name: "Members", href: "/members" },
  { name: "Leaderboard", href: "/leaderboard" },
];

interface TopNavProps {
  onMenuClick?: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-gray-100 bg-white px-4">
      {/* Left: Community name + mobile menu */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-gray-700">
            ✦ Positive Tribe
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Community Settings</DropdownMenuItem>
            <DropdownMenuItem>Invite Members</DropdownMenuItem>
            <DropdownMenuItem>Leave Community</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Center: Navigation tabs (hidden on mobile) */}
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
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {tab.name}
            </Link>
          );
        })}
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100" aria-label="Search">
          <Search className="h-5 w-5" />
        </button>
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600" />
          </button>
          {showNotifications && (
            <NotificationsDropdown
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>
        <Link
          href="/chatrooms"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          aria-label="Chatrooms"
        >
          <MessageCircle className="h-5 w-5" />
        </Link>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100" aria-label="Bookmarks">
          <Bookmark className="h-5 w-5" />
        </button>
        <Link href="/profile">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="bg-blue-600 text-white text-xs">
              {getInitials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
