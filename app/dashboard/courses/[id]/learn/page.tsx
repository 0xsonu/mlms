import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { LearningInterface } from "@/components/learning/learning-interface";
import { mockCourses } from "@/lib/mock-data";

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return mockCourses.map((course) => ({
    id: course.id,
  }));
}

interface LearnPageProps {
  params: {
    id: string;
  };
}

export default function LearnPage({ params }: LearnPageProps) {
  return (
    <DashboardLayout>
      <LearningInterface courseId={params.id} />
    </DashboardLayout>
  );
}
