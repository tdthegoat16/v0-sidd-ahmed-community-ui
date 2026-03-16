import { CommunityLayout } from "@/components/community/community-layout";
import { SpaceRightPanel } from "@/components/community/space-right-panel";
import { PostCard } from "@/components/community/post-card";
import { AvatarStack } from "@/components/community/avatar-stack";
import { PostComposer } from "@/components/community/post-composer";
import { posts, communityMembers, spaces, spaceNamesBySlug } from "@/lib/data";

interface SpacePageProps {
  params: Promise<{ space: string }>;
}

export default async function SpacePage({ params }: SpacePageProps) {
  const { space } = await params;
  const spaceName = spaceNamesBySlug[space] || "Space";
  const spacePosts = posts.filter(
    (p) => p.space.toLowerCase() === spaceName.toLowerCase()
  );
  const spaceMembers = communityMembers.slice(0, 8);

  return (
    <CommunityLayout title={spaceName} rightPanel={<SpaceRightPanel space={spaceName} />}>
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
        <PostComposer placeholder="Start a post..." />

        {/* Posts Feed */}
        <div className="mt-6 space-y-4">
          {spacePosts.length > 0 ? (
            spacePosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">No posts yet in this space</p>
              <button className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors" aria-label="Create the first post in this space">
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
  return spaces.flatMap((group) =>
    group.items.map((item) => ({ space: item.id }))
  );
}
