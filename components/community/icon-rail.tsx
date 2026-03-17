"use client";

import { cn } from "@/lib/utils";

const communities = [
  { id: "1", name: "SA", color: "bg-tribe-600" },
  { id: "2", name: "BC", color: "bg-green-500" },
  { id: "3", name: "MC", color: "bg-purple-500" },
];

export function IconRail() {
  return (
    <div className="hidden md:flex w-14 flex-col items-center gap-3 border-r border-gray-100 bg-white py-4">
      {communities.map((community, index) => (
        <button
          key={community.id}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold text-white transition-all hover:rounded-2xl",
            community.color,
            index === 0 && "ring-2 ring-tribe-600 ring-offset-2"
          )}
        >
          {community.name}
        </button>
      ))}
      <div className="mt-2 h-px w-8 bg-gray-200" />
      <button className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-gray-400 transition-colors hover:border-gray-400 hover:text-gray-500">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}
