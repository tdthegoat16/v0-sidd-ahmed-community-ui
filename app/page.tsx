import { CommunityLayout } from "@/components/community/community-layout";
import { HomeRightPanel } from "@/components/community/home-right-panel";
import { PostCard } from "@/components/community/post-card";
import { posts, currentUser } from "@/lib/data";
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
        <button className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg md:hidden">
          <Plus className="h-6 w-6" />
        </button>

        {/* Post Composer */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
              {currentUser.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <input
              type="text"
              placeholder="Share something with the Tribe..."
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

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
