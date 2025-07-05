"use client";

import { CertificateGenerator } from "@/components/gemification/certificate-generator";

export default function StudentCertificates() {
  return (
    <div className="container mx-auto p-6">
      <CertificateGenerator
        courseId="course-1"
        courseName="React Masterclass 2024"
        studentId="current-user"
        studentName="Current User"
        instructorName="Dr. Michael Chen"
        completionDate="2024-01-15"
        finalGrade={95}
        courseDuration="40 hours"
        skills={["React", "JavaScript", "Redux", "TypeScript"]}
      />
    </div>
  );
}
