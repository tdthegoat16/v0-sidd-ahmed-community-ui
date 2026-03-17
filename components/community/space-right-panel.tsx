"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { communityMembers } from "@/lib/data";

interface SpaceRightPanelProps {
  space: string;
}

export function SpaceRightPanel({ space }: SpaceRightPanelProps) {
  const sidd = communityMembers[0]; // Founder

  return (
    <div className="p-4 space-y-6">
      {/* About Space */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          About this space
        </h3>
        <p className="text-sm text-gray-600">
          Welcome to the {space} space. Explore content, insights, and
          resources curated by Sidd Ahmed.
        </p>
      </div>

      {/* Hosted By */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Hosted by
        </h3>
        <div className="flex items-center gap-3 rounded-lg p-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sidd.avatar} alt={sidd.name} />
            <AvatarFallback className="bg-tribe-600 text-white text-xs">
              SA
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-900">{sidd.name}</p>
            <p className="text-xs text-gray-500">{sidd.role}</p>
          </div>
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
          <li>Keep discussions on topic</li>
        </ul>
      </div>
    </div>
  );
}
