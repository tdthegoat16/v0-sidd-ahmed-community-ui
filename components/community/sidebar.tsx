"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  GraduationCap,
  Calendar,
  Users,
  Trophy,
  MessageCircle,
  Rocket,
  Hand,
  Megaphone,
  Folder,
  Video as VideoIcon,
  Camera,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNav = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: GraduationCap },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Members", href: "/members", icon: Users },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Chatrooms", href: "/chatrooms", icon: MessageCircle },
];

const spaces = [
  {
    category: "Welcome",
    items: [
      { id: "start-here", name: "Start Here", icon: Rocket, href: "/community/start-here" },
      { id: "say-hello", name: "Say Hello", icon: Hand, href: "/community/say-hello" },
    ],
  },
  {
    category: "Community",
    items: [
      { id: "announcements", name: "Announcements", icon: Megaphone, href: "/community/announcements" },
      { id: "resources", name: "Resources", icon: Folder, href: "/community/resources" },
      { id: "discussions", name: "Discussions", icon: MessageCircle, href: "/community/discussions" },
      { id: "wins", name: "Wins", icon: Trophy, href: "/community/wins" },
    ],
  },
  {
    category: "Events",
    items: [
      { id: "recordings", name: "Recordings", icon: VideoIcon, href: "/community/recordings" },
    ],
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden lg:flex w-60 flex-col border-r border-gray-100 bg-white",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
          SA
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">
            Sidd Ahmed
          </span>
          <span className="text-xs text-gray-500">Community</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {mainNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-blue-600" : "text-gray-400"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Spaces */}
        <div className="mt-6 space-y-4">
          {spaces.map((group) => (
            <div key={group.category}>
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {group.category}
              </h3>
              <div className="space-y-1">
                {group.items.map((space) => {
                  const isActive = pathname === space.href;
                  return (
                    <Link
                      key={space.id}
                      href={space.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      )}
                      <space.icon
                        className={cn(
                          "h-4 w-4",
                          isActive ? "text-blue-600" : "text-gray-400",
                          isActive && "-ml-4"
                        )}
                      />
                      {space.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Go Live Button */}
      <div className="border-t border-gray-100 p-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          <Camera className="h-4 w-4" />
          Go Live
        </button>
      </div>
    </aside>
  );
}
