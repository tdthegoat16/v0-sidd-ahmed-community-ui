"use client";

import { cn } from "@/lib/utils";
import {
  Home,
  MessageSquare,
  GraduationCap,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Courses", href: "/courses", icon: GraduationCap },
  { name: "Events", href: "/events", icon: CalendarDays },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[64px]",
                isActive ? "text-blue-600" : "text-gray-400"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "stroke-[2.5px]")} />
              <span className={cn(
                "text-[10px]",
                isActive ? "font-semibold" : "font-medium"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
