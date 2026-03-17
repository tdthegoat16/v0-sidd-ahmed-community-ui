"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  GraduationCap,
  Calendar,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <aside
      className={cn(
        "hidden md:flex w-60 flex-col border-r border-gray-100 bg-white",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">
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
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
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
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
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
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
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
        <div className="mt-6 pt-4 border-t border-gray-100">
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
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 p-4">
        <p className="text-xs text-gray-400 text-center">Positive Tribe</p>
      </div>
    </aside>
  );
}
