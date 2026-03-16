import { CommunityLayout } from "@/components/community/community-layout";
import { HomeRightPanel } from "@/components/community/home-right-panel";
import { PostCard } from "@/components/community/post-card";
import { PostComposer } from "@/components/community/post-composer";
import { posts } from "@/lib/data";
import { Plus } from "lucide-react";

export default function HomePage() {
  return (
    <CommunityLayout rightPanel={<HomeRightPanel />}>
      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Hero Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white shadow-lg">
          <h1 className="text-2xl font-bold">
            Welcome to the Positive Tribe 👋
          </h1>
          <p className="mt-1 text-blue-100">
            A community of dreamers building purpose-driven lives alongside Sidd Ahmed.
          </p>
          <button className="mt-4 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm transition-colors hover:bg-blue-50">
            Start a post
          </button>
        </div>

        {/* New Post Button (Mobile) */}
        <button
          className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg md:hidden"
          aria-label="Create new post"
        >
          <Plus className="h-6 w-6" />
        </button>

        {/* Post Composer */}
        <PostComposer />

        {/* Feed */}
        <div className="mt-6 space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </CommunityLayout>
  );
}
