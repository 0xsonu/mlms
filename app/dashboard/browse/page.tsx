import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { CourseCatalog } from '@/components/courses/course-catalog';

export default function BrowseCoursesPage() {
  return (
    <DashboardLayout>
      <CourseCatalog />
    </DashboardLayout>
  );
}