import { courses } from "@/lib/data";
import CourseDetailClient from "./course-detail-client";

export function generateStaticParams() {
  return courses.map((course) => ({ id: course.id }));
}

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <CourseDetailClient params={params} />;
}
