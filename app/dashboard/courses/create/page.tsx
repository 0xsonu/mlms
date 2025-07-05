import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { CourseBuilder } from '@/components/courses/course-builder';

export default function CreateCoursePage() {
  return (
    <DashboardLayout>
      <CourseBuilder />
    </DashboardLayout>
  );
}