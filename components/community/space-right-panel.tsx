"use client";

import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { communityMembers } from "@/lib/data";
import Link from "next/link";

interface SpaceRightPanelProps {
  space: string;
}

export function SpaceRightPanel({ space }: SpaceRightPanelProps) {
  const admins = communityMembers.filter((m) => m.role.includes("Admin"));
  const recentMembers = communityMembers.slice(0, 6);

  return (
    <div className="p-4 space-y-6">
      {/* About Space */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          About this space
        </h3>
        <p className="text-sm text-gray-600">
          Welcome to the {space} space. Share your thoughts, ask questions, and
          connect with other community members.
        </p>
      </div>

      {/* Space Admins */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Space Admins
        </h3>
        <div className="space-y-2">
          {admins.map((admin) => (
            <Link
              key={admin.id}
              href={`/members/${admin.id}`}
              className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 transition-colors"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={admin.avatar} alt={admin.name} />
                <AvatarFallback className={cn(admin.color, "text-white text-xs")}>
                  {getInitials(admin.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                <p className="text-xs text-gray-500">{admin.role}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Members */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Recent Members
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {recentMembers.map((member) => (
            <Link
              key={member.id}
              href={`/members/${member.id}`}
              className="flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-gray-50 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className={cn(member.color, "text-white text-xs")}>
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-600 text-center truncate w-full">
                {member.name.split(" ")[0]}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Guidelines */}
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Community Guidelines
        </h3>
        <ul className="space-y-1 text-xs text-gray-600">
          <li>Be respectful and supportive</li>
          <li>Share valuable insights</li>
          <li>No spam or self-promotion</li>
          <li>Keep discussions on topic</li>
        </ul>
      </div>
    </div>
  );
}
