import { CommunityLayout } from "@/components/community/community-layout";
import { SpaceRightPanel } from "@/components/community/space-right-panel";
import { PostCard } from "@/components/community/post-card";
import { posts, spaces, spaceNamesBySlug } from "@/lib/data";

interface SpacePageProps {
  params: Promise<{ space: string }>;
}

export default async function SpacePage({ params }: SpacePageProps) {
  const { space } = await params;
  const spaceName = spaceNamesBySlug[space] || "Space";
  const spacePosts = posts.filter(
    (p) => p.space.toLowerCase() === spaceName.toLowerCase()
  );

  return (
    <CommunityLayout title={spaceName} rightPanel={<SpaceRightPanel space={spaceName} />}>
      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Space Header */}
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">{spaceName}</h1>
        </div>

        {/* Posts Feed */}
        <div className="mt-6 space-y-4">
          {spacePosts.length > 0 ? (
            spacePosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
              <p className="text-gray-500">No posts yet in this space</p>
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
