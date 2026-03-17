import { spaces } from "@/lib/data";
import SpacePageClient from "./space-page-client";

export function generateStaticParams() {
  return spaces.flatMap((group) =>
    group.items.map((item) => ({ space: item.id }))
  );
}

export default function SpacePage({ params }: { params: Promise<{ space: string }> }) {
  return <SpacePageClient params={params} />;
}
