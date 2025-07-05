import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CourseDetail } from "@/components/courses/course-detail";
import { mockCourses } from "@/lib/mock-data";

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return mockCourses.map((course) => ({
    id: course.id,
  }));
}

interface CourseDetailPageProps {
  params: {
    id: string;
  };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  return (
    <DashboardLayout>
      <CourseDetail courseId={params.id} />
    </DashboardLayout>
  );
}
