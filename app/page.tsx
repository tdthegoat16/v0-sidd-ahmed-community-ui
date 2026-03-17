"use client";

import { CommunityLayout } from "@/components/community/community-layout";
import { HomeRightPanel } from "@/components/community/home-right-panel";
import { PostCard } from "@/components/community/post-card";
import { PostComposer } from "@/components/community/post-composer";
import { useAppState } from "@/lib/app-state";

export default function HomePage() {
  const { posts, searchQuery } = useAppState();

  const filteredPosts = searchQuery
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  return (
    <CommunityLayout rightPanel={<HomeRightPanel />}>
      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Hero Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-tribe-600 to-tribe-500 p-6 text-white shadow-lg">
          <h1 className="text-2xl font-bold">
            Welcome to the Positive Tribe
          </h1>
          <p className="mt-1 text-tribe-100">
            A community of dreamers building purpose-driven lives alongside Sidd Ahmed.
          </p>
        </div>

        {/* Post Composer */}
        <PostComposer />

        {/* Feed */}
        <div className="mt-6 space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">
                {searchQuery ? "No posts match your search" : "No posts yet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </CommunityLayout>
  );
}
