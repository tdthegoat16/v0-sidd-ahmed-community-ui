import { events } from "@/lib/data";
import EventDetailClient from "./event-detail-client";

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <EventDetailClient params={params} />;
}
