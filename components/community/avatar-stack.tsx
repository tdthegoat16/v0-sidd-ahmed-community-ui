"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { communityMembers } from "@/lib/data";

interface AvatarStackProps {
  users?: (typeof communityMembers);
  max?: number;
  size?: "sm" | "md";
  showCount?: boolean;
}

export function AvatarStack({
  users = communityMembers,
  max = 4,
  size = "sm",
  showCount = true,
}: AvatarStackProps) {
  const displayUsers = users.slice(0, max);
  const remaining = users.length - max;

  const sizeClasses = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-8 w-8 text-xs",
  };

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {displayUsers.map((user) => (
          <Avatar
            key={user.id}
            className={cn(sizeClasses[size], "ring-2 ring-white")}
          >
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className={cn(user.color, "text-white")}>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        ))}
      </div>
      {showCount && remaining > 0 && (
        <span className="ml-2 text-xs text-gray-500">+{remaining}</span>
      )}
    </div>
  );
}
