import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CourseBuilder } from "@/components/courses/course-builder";
import { mockCourses } from "@/lib/mock-data";

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return mockCourses.map((course) => ({
    id: course.id,
  }));
}

interface EditCoursePageProps {
  params: {
    id: string;
  };
}

export default function EditCoursePage({ params }: EditCoursePageProps) {
  return (
    <DashboardLayout>
      <CourseBuilder courseId={params.id} />
    </DashboardLayout>
  );
}
