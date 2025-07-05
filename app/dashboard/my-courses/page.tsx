import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { MyCourses } from '@/components/courses/my-courses';

export default function MyCoursesPage() {
  return (
    <DashboardLayout>
      <MyCourses />
    </DashboardLayout>
  );
}