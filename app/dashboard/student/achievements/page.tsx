"use client";

import { AchievementSystem } from "@/components/gemification/achievement-system";

export default function StudentAchievements() {
  return (
    <div className="container mx-auto p-6">
      <AchievementSystem userId="current-user" userRole="student" />
    </div>
  );
}
