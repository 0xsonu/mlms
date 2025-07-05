import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProfileSettings } from '@/components/shared/profile-settings';

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <ProfileSettings />
    </DashboardLayout>
  );
}