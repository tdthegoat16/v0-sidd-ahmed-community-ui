"use client";

import { Crown, Lock } from "lucide-react";

export function ProBadge({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-2 py-0.5 text-[10px] font-bold text-white ${className || ""}`}
    >
      <Crown className="h-2.5 w-2.5" />
      PRO
    </span>
  );
}

export function FreeBadge({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:text-green-400 ${className || ""}`}
    >
      FREE
    </span>
  );
}

export function LockOverlay({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-[2px] rounded-2xl"
    >
      <div className="flex flex-col items-center gap-2 text-white">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <Lock className="h-5 w-5" />
        </div>
        <span className="text-xs font-semibold">Pro Only</span>
      </div>
    </button>
  );
}
