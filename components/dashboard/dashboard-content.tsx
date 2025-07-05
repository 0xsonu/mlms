'use client';

import { useAuth } from '@/lib/contexts/auth-context';
import { useTenant } from '@/lib/contexts/tenant-context';
import { AdminDashboard } from './admin-dashboard';
import { InstructorDashboard } from './instructor-dashboard';
import { LearnerDashboard } from './learner-dashboard';

export function DashboardContent() {
  const { user } = useAuth();
  const { currentTenant } = useTenant();

  if (!user || !currentTenant) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'instructor':
      return <InstructorDashboard />;
    case 'learner':
      return <LearnerDashboard />;
    default:
      return <div>Unknown role</div>;
  }
}