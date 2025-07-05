"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StudentProgressCard } from "./student-progress-card";
import { CoursePerformanceChart } from "./course-performance-chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Clock,
  Award,
  Eye,
  MessageSquare,
  Star,
  Download,
  Filter,
  Calendar,
  Target,
  Activity,
  Zap,
  AlertTriangle,
} from "lucide-react";

interface AnalyticsDashboardProps {
  instructorId?: string;
  timeRange?: string;
}

// Mock data - replace with real API calls
const mockData = {
  overview: {
    totalStudents: 1247,
    totalCourses: 12,
    totalRevenue: 45680,
    avgRating: 4.7,
    completionRate: 78,
    totalWatchTime: 2340,
  },
  students: [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/avatars/sarah.jpg",
      course: "React Masterclass 2024",
      progress: 85,
      lastActive: "2 hours ago",
      completedLessons: 17,
      totalLessons: 20,
      timeSpent: 24.5,
      quizScores: [85, 92, 78, 88],
      status: "active" as const,
      engagementTrend: "up" as const,
      messagesCount: 3,
      lastQuizScore: 88,
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@example.com",
      avatar: "/avatars/michael.jpg",
      course: "Advanced JavaScript",
      progress: 92,
      lastActive: "1 day ago",
      completedLessons: 23,
      totalLessons: 25,
      timeSpent: 31.2,
      quizScores: [90, 88, 95, 87],
      status: "active" as const,
      engagementTrend: "up" as const,
      messagesCount: 1,
      lastQuizScore: 87,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily@example.com",
      avatar: "/avatars/emily.jpg",
      course: "Node.js Backend Development",
      progress: 45,
      lastActive: "3 days ago",
      completedLessons: 9,
      totalLessons: 20,
      timeSpent: 15.8,
      quizScores: [75, 82, 70],
      status: "struggling" as const,
      engagementTrend: "down" as const,
      messagesCount: 7,
      lastQuizScore: 70,
    },
  ],
  courses: [
    {
      id: 1,
      title: "React Masterclass 2024",
      students: 324,
      revenue: 15840,
      rating: 4.8,
      completionRate: 85,
      watchTime: 890,
      enrollments: 340,
      refunds: 16,
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      students: 298,
      revenue: 11920,
      rating: 4.6,
      completionRate: 72,
      watchTime: 720,
      enrollments: 315,
      refunds: 17,
    },
  ],
};

export function AnalyticsDashboard({
  instructorId,
  timeRange = "30d",
}: AnalyticsDashboardProps) {
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [studentFilter, setStudentFilter] = useState("all");
  const [currentTimeRange, setCurrentTimeRange] = useState(timeRange);

  const handleContactStudent = (studentId: number) => {
    console.log("Contact student:", studentId);
    // Implement contact functionality
  };

  const handleViewStudentDetails = (studentId: number) => {
    console.log("View student details:", studentId);
    // Implement view details functionality
  };

  const handleViewCourseDetails = (courseId: number) => {
    console.log("View course details:", courseId);
    // Implement course details functionality
  };

  const filteredStudents = mockData.students.filter((student) => {
    if (studentFilter === "all") return true;
    return student.status === studentFilter;
  });

  const strugglingStudents = mockData.students.filter(
    (s) => s.status === "struggling"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track student progress and course performance
          </p>
        </div>

        <div className="flex gap-3">
          <Select value={currentTimeRange} onValueChange={setCurrentTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Alert for Struggling Students */}
      {strugglingStudents.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-semibold text-yellow-800 dark:text-yellow-200">
                  {strugglingStudents.length} student
                  {strugglingStudents.length > 1 ? "s" : ""} need attention
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Consider reaching out to provide additional support
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.overview.totalStudents.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockData.overview.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.overview.avgRating}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.2</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.overview.completionRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="students">Student Progress</TabsTrigger>
          <TabsTrigger value="courses">Course Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {mockData.courses.map((course) => (
                  <SelectItem key={course.id} value={course.id.toString()}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={studentFilter} onValueChange={setStudentFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="struggling">Struggling</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <StudentProgressCard
                key={student.id}
                student={student}
                onContactStudent={handleContactStudent}
                onViewDetails={handleViewStudentDetails}
              />
            ))}
          </div>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <div className="space-y-6">
            {mockData.courses.map((course) => (
              <CoursePerformanceChart
                key={course.id}
                course={course}
                onViewDetails={handleViewCourseDetails}
              />
            ))}
          </div>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Video Views
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Quiz Attempts
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Forum Posts
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">456</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Session
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24m</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3m</span> from last week
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
