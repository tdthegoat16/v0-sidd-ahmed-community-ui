"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  GraduationCap,
  Calendar,
  MessageCircle,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { spaces } from "@/lib/data";

const mainNav = [
  { name: "Home", href: "/", icon: Home },
  { name: "Chat", href: "/chat", icon: MessageCircle },
  { name: "Courses", href: "/courses", icon: GraduationCap },
  { name: "Events", href: "/events", icon: Calendar },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <aside
      className={cn(
        "hidden md:flex w-60 flex-col border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 dark:bg-tribe-500 text-tribe-500 dark:text-gray-900">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Positive Tribe
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* Feed Link */}
        <div className="mb-4">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === "/"
                ? "bg-tribe-50 dark:bg-tribe-900/30 text-tribe-800 dark:text-tribe-400"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            <span className="text-base">📋</span>
            Feed
          </Link>
        </div>

        {/* Spaces */}
        <div className="space-y-4">
          {spaces.map((group) => (
            <div key={group.category}>
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {group.category}
              </h3>
              <div className="space-y-0.5">
                {group.items.map((space) => {
                  const isActive = pathname === space.href;
                  return (
                    <Link
                      key={space.id}
                      href={space.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-tribe-50 dark:bg-tribe-900/30 text-tribe-800 dark:text-tribe-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      )}
                    >
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-tribe-600" />
                      )}
                      <span className={cn("text-base", isActive && "-ml-4")}>
                        {space.emoji}
                      </span>
                      <span className="truncate">{space.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Main Nav Links */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="space-y-1">
            {mainNav.slice(1).map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-tribe-50 dark:bg-tribe-900/30 text-tribe-800 dark:text-tribe-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-tribe-800" : "text-gray-400 dark:text-gray-500"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 dark:border-gray-800 p-4 space-y-3">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Sun className="h-4 w-4 hidden dark:block" />
          <Moon className="h-4 w-4 block dark:hidden" />
          <span className="dark:hidden">Dark Mode</span>
          <span className="hidden dark:inline">Light Mode</span>
        </button>
        <p className="text-xs text-gray-400 text-center">Positive Tribe</p>
      </div>
    </aside>
  );
}
