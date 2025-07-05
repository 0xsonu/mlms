"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/auth-context";
import { useTenant } from "@/lib/contexts/tenant-context";
import { mockCourses, mockEnrollments } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  Star,
  Search,
  Play,
  Edit,
  Users,
  BarChart3,
  Plus,
  Filter,
  Calendar,
  Award,
} from "lucide-react";
import Link from "next/link";

export function MyCourses() {
  const { user } = useAuth();
  const { currentTenant } = useTenant();
  const [searchQuery, setSearchQuery] = useState("");

  // Get courses based on user role
  const getUserCourses = () => {
    if (user?.role === "instructor") {
      // Instructor sees courses they created
      return mockCourses.filter((course) => course.instructorId === user.id);
    } else if (user?.role === "learner") {
      // Learner sees enrolled courses
      const enrolledCourseIds = mockEnrollments
        .filter((enrollment) => enrollment.userId === user.id)
        .map((enrollment) => enrollment.courseId);
      return mockCourses.filter((course) =>
        enrolledCourseIds.includes(course.id)
      );
    }
    return [];
  };

  const userCourses = getUserCourses();
  const userEnrollments = mockEnrollments.filter(
    (enrollment) => enrollment.userId === user?.id
  );

  const filteredCourses = userCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getEnrollmentForCourse = (courseId: string) => {
    return userEnrollments.find(
      (enrollment) => enrollment.courseId === courseId
    );
  };

  const InstructorCourseCard = ({ course }: { course: any }) => {
    const enrollmentCount = mockEnrollments.filter(
      (e) => e.courseId === course.id
    ).length;
    const avgRating = 4.8; // Mock rating

    return (
      <Card className="group hover:shadow-lg transition-all duration-300">
        <div className="relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 left-4">
            <Badge variant={course.isPublished ? "default" : "secondary"}>
              {course.isPublished ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{enrollmentCount} students</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{avgRating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>
                  {Math.floor(course.duration / 60)}h {course.duration % 60}m
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link
              href={`/dashboard/courses/${course.id}/edit`}
              className="flex-1"
            >
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Link href={`/dashboard/courses/${course.id}`} className="flex-1">
              <Button className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  };

  const LearnerCourseCard = ({ course }: { course: any }) => {
    const enrollment = getEnrollmentForCourse(course.id);

    return (
      <Card className="group hover:shadow-lg transition-all duration-300">
        <div className="relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="outline" className="bg-black/70 text-white">
              {course.category}
            </Badge>
          </div>
          {enrollment && (
            <div className="absolute bottom-4 right-4">
              <Badge
                variant={
                  enrollment.status === "completed" ? "default" : "secondary"
                }
              >
                {enrollment.status === "completed"
                  ? "Completed"
                  : "In Progress"}
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="pb-3">
          <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </CardHeader>

        <CardContent className="pt-0">
          {enrollment && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{enrollment.progress}%</span>
              </div>
              <Progress value={enrollment.progress} className="h-2" />
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>
                  {Math.floor(course.duration / 60)}h {course.duration % 60}m
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>{course.lessons?.length || 0} lessons</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.8</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link href={`/dashboard/courses/${course.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
            <Link
              href={`/dashboard/courses/${course.id}/learn`}
              className="flex-1"
            >
              <Button className="w-full">
                <Play className="h-4 w-4 mr-2" />
                {enrollment?.progress === 100 ? "Review" : "Continue"}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
          <p className="text-muted-foreground">
            {user?.role === "instructor"
              ? "Manage and track your course performance"
              : "Continue your learning journey"}
          </p>
        </div>

        {user?.role === "instructor" && (
          <Link href="/dashboard/courses/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </Link>
        )}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search your courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Tabs for Learners */}
      {user?.role === "learner" && (
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              All Courses ({filteredCourses.length})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress (
              {userEnrollments.filter((e) => e.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed (
              {userEnrollments.filter((e) => e.status === "completed").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {filteredCourses.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No courses found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    You haven&apos;t enrolled in any courses yet.
                  </p>
                  <Link href="/dashboard/browse">
                    <Button>
                      <Search className="h-4 w-4 mr-2" />
                      Browse Courses
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <LearnerCourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses
                .filter((course) => {
                  const enrollment = getEnrollmentForCourse(course.id);
                  return enrollment?.status === "active";
                })
                .map((course) => (
                  <LearnerCourseCard key={course.id} course={course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses
                .filter((course) => {
                  const enrollment = getEnrollmentForCourse(course.id);
                  return enrollment?.status === "completed";
                })
                .map((course) => (
                  <LearnerCourseCard key={course.id} course={course} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Course Grid for Instructors */}
      {user?.role === "instructor" && (
        <div className="space-y-6">
          {filteredCourses.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No courses created yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start creating your first course to share your knowledge.
                </p>
                <Link href="/dashboard/courses/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Course
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <InstructorCourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Stats for Instructors */}
      {user?.role === "instructor" && filteredCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{filteredCourses.length}</div>
              <div className="text-sm text-muted-foreground">Total Courses</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {
                  mockEnrollments.filter((e) =>
                    filteredCourses.some((c) => c.id === e.courseId)
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">
                Total Students
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
