"use client";

import { use } from "react";
import { CommunityLayout } from "@/components/community/community-layout";
import { SpaceRightPanel } from "@/components/community/space-right-panel";
import { PostCard } from "@/components/community/post-card";
import { PostComposer } from "@/components/community/post-composer";
import { spaceNamesBySlug } from "@/lib/data";
import { useAppState } from "@/lib/app-state";

interface SpacePageProps {
  params: Promise<{ space: string }>;
}

export default function SpacePage({ params }: SpacePageProps) {
  const { space } = use(params);
  const spaceName = spaceNamesBySlug[space] || "Space";
  const { posts } = useAppState();

  const spacePosts = posts.filter(
    (p) => p.space.toLowerCase() === spaceName.toLowerCase()
  );

  return (
    <CommunityLayout title={spaceName} rightPanel={<SpaceRightPanel space={spaceName} />}>
      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Space Header */}
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-tribe-600" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{spaceName}</h1>
        </div>

        {/* Post Composer */}
        <PostComposer placeholder="Share your thoughts..." space={spaceName} />

        {/* Posts Feed */}
        <div className="mt-6 space-y-4">
          {spacePosts.length > 0 ? (
            spacePosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center shadow-sm">
              <p className="text-gray-500 dark:text-gray-400">No posts yet in this space. Be the first to share!</p>
            </div>
          )}
        </div>
      </div>
    </CommunityLayout>
  );
}
