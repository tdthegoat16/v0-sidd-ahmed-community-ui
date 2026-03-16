import { CommunityLayout } from "@/components/community/community-layout";
import { SpaceRightPanel } from "@/components/community/space-right-panel";
import { PostCard } from "@/components/community/post-card";
import { AvatarStack } from "@/components/community/avatar-stack";
import { posts, communityMembers, currentUser } from "@/lib/data";
import { Plus } from "lucide-react";

const spaceNames: Record<string, string> = {
  "start-here": "Start Here",
  "say-hello": "Say Hello",
  "announcements": "Announcements",
  "resources": "Resources",
  "discussions": "Discussions",
  "wins": "Wins",
  "recordings": "Recordings",
};

interface SpacePageProps {
  params: Promise<{ space: string }>;
}

export default async function SpacePage({ params }: SpacePageProps) {
  const { space } = await params;
  const spaceName = spaceNames[space] || "Space";
  const spacePosts = posts.filter(
    (p) => p.space.toLowerCase() === spaceName.toLowerCase() || space === "discussions"
  );
  const spaceMembers = communityMembers.slice(0, 8);

  return (
    <CommunityLayout rightPanel={<SpaceRightPanel space={spaceName} />}>
      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Space Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">{spaceName}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <AvatarStack users={spaceMembers} max={4} />
              <span className="text-sm text-gray-500">
                {spaceMembers.length} members
              </span>
            </div>
            <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
              New post
            </button>
          </div>
        </div>

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
              placeholder="Start a post..."
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="mt-6 space-y-4">
          {spacePosts.length > 0 ? (
            spacePosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">No posts yet in this space</p>
              <button className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                Be the first to post
              </button>
            </div>
          )}
        </div>
      </div>
    </CommunityLayout>
  );
}

export function generateStaticParams() {
  return [
    { space: "start-here" },
    { space: "say-hello" },
    { space: "announcements" },
    { space: "resources" },
    { space: "discussions" },
    { space: "wins" },
    { space: "recordings" },
  ];
}
