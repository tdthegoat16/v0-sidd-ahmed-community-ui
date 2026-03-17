import { CommunityLayout } from "@/components/community/community-layout";
import { HomeRightPanel } from "@/components/community/home-right-panel";
import { PostCard } from "@/components/community/post-card";
import { posts } from "@/lib/data";

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
