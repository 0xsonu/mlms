"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Award,
  Download,
  Share2,
  Eye,
  Calendar,
  User,
  BookOpen,
  Star,
  CheckCircle,
  FileText,
  Printer,
  Mail,
  Link,
  Trophy,
} from "lucide-react";

interface Certificate {
  id: string;
  courseName: string;
  studentName: string;
  instructorName: string;
  completionDate: string;
  issueDate: string;
  certificateNumber: string;
  grade?: string;
  duration: string;
  skills: string[];
  verificationUrl: string;
  status: "issued" | "pending" | "revoked";
}

interface CertificateGeneratorProps {
  courseId: string;
  courseName: string;
  studentId: string;
  studentName: string;
  instructorName: string;
  completionDate: string;
  finalGrade?: number;
  courseDuration: string;
  skills: string[];
}

const mockCertificates: Certificate[] = [
  {
    id: "CERT-001",
    courseName: "React Masterclass 2024",
    studentName: "Sarah Johnson",
    instructorName: "Dr. Michael Chen",
    completionDate: "2024-01-15",
    issueDate: "2024-01-16",
    certificateNumber: "RC-2024-001-SJ",
    grade: "A+",
    duration: "40 hours",
    skills: ["React", "JavaScript", "Redux", "TypeScript"],
    verificationUrl: "https://eduplatform.com/verify/RC-2024-001-SJ",
    status: "issued",
  },
  {
    id: "CERT-002",
    courseName: "Advanced JavaScript",
    studentName: "Michael Chen",
    instructorName: "Sarah Williams",
    completionDate: "2024-01-10",
    issueDate: "2024-01-11",
    certificateNumber: "AJS-2024-002-MC",
    grade: "A",
    duration: "35 hours",
    skills: ["JavaScript", "ES6+", "Async Programming", "DOM Manipulation"],
    verificationUrl: "https://eduplatform.com/verify/AJS-2024-002-MC",
    status: "issued",
  },
];

export function CertificateGenerator({
  courseId,
  courseName,
  studentId,
  studentName,
  instructorName,
  completionDate,
  finalGrade,
  courseDuration,
  skills,
}: CertificateGeneratorProps) {
  const [certificates, setCertificates] =
    useState<Certificate[]>(mockCertificates);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const generateCertificate = async () => {
    setIsGenerating(true);

    // Simulate certificate generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newCertificate: Certificate = {
      id: `CERT-${Date.now()}`,
      courseName,
      studentName,
      instructorName,
      completionDate,
      issueDate: new Date().toISOString().split("T")[0],
      certificateNumber: `${courseName
        .substring(0, 3)
        .toUpperCase()}-2024-${Math.floor(Math.random() * 1000)}-${studentName
        .substring(0, 2)
        .toUpperCase()}`,
      grade: finalGrade ? getLetterGrade(finalGrade) : undefined,
      duration: courseDuration,
      skills,
      verificationUrl: `https://eduplatform.com/verify/${Date.now()}`,
      status: "issued",
    };

    setCertificates((prev) => [newCertificate, ...prev]);
    setSelectedCertificate(newCertificate);
    setIsGenerating(false);
  };

  const getLetterGrade = (score: number): string => {
    if (score >= 97) return "A+";
    if (score >= 93) return "A";
    if (score >= 90) return "A-";
    if (score >= 87) return "B+";
    if (score >= 83) return "B";
    if (score >= 80) return "B-";
    if (score >= 77) return "C+";
    if (score >= 73) return "C";
    if (score >= 70) return "C-";
    return "F";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "issued":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "revoked":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const CertificatePreview = ({
    certificate,
  }: {
    certificate: Certificate;
  }) => (
    <div className="bg-white p-8 border-4 border-yellow-400 rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Award className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Certificate of Completion
        </h1>
        <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
      </div>

      {/* Content */}
      <div className="text-center space-y-6">
        <p className="text-lg text-gray-600">This is to certify that</p>

        <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 inline-block">
          {certificate.studentName}
        </h2>

        <p className="text-lg text-gray-600">
          has successfully completed the course
        </p>

        <h3 className="text-2xl font-semibold text-blue-600">
          {certificate.courseName}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Completion Date</p>
            <p className="font-semibold">{certificate.completionDate}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Duration</p>
            <p className="font-semibold">{certificate.duration}</p>
          </div>
          {certificate.grade && (
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Grade</p>
              <p className="font-semibold text-green-600">
                {certificate.grade}
              </p>
            </div>
          )}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">Certificate ID</p>
            <p className="font-mono text-sm">{certificate.certificateNumber}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6">
          <p className="text-sm text-gray-500 mb-3">Skills Acquired</p>
          <div className="flex flex-wrap justify-center gap-2">
            {certificate.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-100 text-blue-800"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2">
              <p className="font-semibold">{certificate.instructorName}</p>
              <p className="text-sm text-gray-500">Course Instructor</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 pt-2">
              <p className="font-semibold">EduPlatform</p>
              <p className="text-sm text-gray-500">Learning Platform</p>
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">
            Verify this certificate at: {certificate.verificationUrl}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Certificates</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Generate and manage course completion certificates
          </p>
        </div>

        <Button onClick={generateCertificate} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating...
            </>
          ) : (
            <>
              <Award className="w-4 h-4 mr-2" />
              Generate Certificate
            </>
          )}
        </Button>
      </div>

      {/* Certificates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <Card
            key={certificate.id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {certificate.courseName}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {certificate.studentName}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(certificate.status)}>
                  {certificate.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Completed</p>
                  <p className="font-medium">{certificate.completionDate}</p>
                </div>
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-medium">{certificate.duration}</p>
                </div>
                {certificate.grade && (
                  <div>
                    <p className="text-gray-500">Grade</p>
                    <p className="font-medium text-green-600">
                      {certificate.grade}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-gray-500">Cert ID</p>
                  <p className="font-mono text-xs">
                    {certificate.certificateNumber}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {certificate.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {certificate.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{certificate.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Certificate Preview</DialogTitle>
                      <DialogDescription>
                        Preview of the completion certificate
                      </DialogDescription>
                    </DialogHeader>
                    <CertificatePreview certificate={certificate} />
                    <div className="flex justify-center gap-4 mt-6">
                      <Button>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline">
                        <Printer className="w-4 h-4 mr-2" />
                        Print
                      </Button>
                      <Button variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {certificates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
              No certificates generated yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-4">
              Complete a course to generate your first certificate
            </p>
            <Button onClick={generateCertificate} disabled={isGenerating}>
              <Award className="w-4 h-4 mr-2" />
              Generate Certificate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
