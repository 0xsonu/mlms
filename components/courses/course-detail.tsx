"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/auth-context";
import { mockCourses, mockEnrollments, mockUsers } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Clock,
  Star,
  Users,
  Play,
  DollarSign,
  Award,
  CheckCircle,
  Lock,
  User,
  Calendar,
  Globe,
  Target,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

interface CourseDetailProps {
  courseId: string;
}

export function CourseDetail({ courseId }: CourseDetailProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Find course
  const course = mockCourses.find((c) => c.id === courseId);
  const instructor = mockUsers.find((u) => u.id === course?.instructorId);

  // Check enrollment status
  const userEnrollment = mockEnrollments.find(
    (e) => e.courseId === courseId && e.userId === user?.id
  );
  const isEnrolled = !!userEnrollment;

  // Mock additional data
  const totalEnrollments = Math.floor(Math.random() * 500) + 50;
  const rating = 4.8;
  const reviews = Math.floor(Math.random() * 100) + 20;

  if (!course) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
          <p className="text-muted-foreground">
            The course you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  const handleEnroll = async () => {
    // TODO: Replace with actual backend call
    // Example: await courseService.enrollUser(courseId, user.id)
    console.log("Enrolling in course:", courseId);
    alert("Successfully enrolled in course!");
  };

  const handleStartLearning = () => {
    // Navigate to first lesson
    window.location.href = `/dashboard/courses/${courseId}/learn`;
  };

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Course Info */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">
                        {course.title}
                      </h1>
                      <p className="text-lg text-muted-foreground">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{instructor?.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Updated{" "}
                        {new Date(course.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>English</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mt-4">
                    <Badge variant="outline">{course.category}</Badge>
                    <Badge
                      variant={
                        course.level === "beginner"
                          ? "default"
                          : course.level === "intermediate"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {course.level}
                    </Badge>
                    {isEnrolled && (
                      <Badge variant="default" className="bg-green-600">
                        Enrolled
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{totalEnrollments}</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {Math.floor(course.duration / 60)}h {course.duration % 60}m
                </div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {course.lessons?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{rating}</div>
                <div className="text-sm text-muted-foreground">
                  {reviews} reviews
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>What you&apos;ll learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Master the fundamentals of the subject
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Build real-world projects</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Apply best practices and industry standards
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        Prepare for advanced topics
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p>
                      This comprehensive course is designed to take you from
                      beginner to advanced level. You&apos;ll learn through
                      hands-on projects, real-world examples, and expert
                      guidance.
                    </p>
                    <p>
                      The course covers all essential topics with practical
                      exercises and assignments that will help you build a
                      strong foundation and develop practical skills.
                    </p>
                    <h4>Prerequisites:</h4>
                    <ul>
                      <li>Basic computer skills</li>
                      <li>Willingness to learn</li>
                      <li>No prior experience required</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {course.lessons?.length || 0} lessons •{" "}
                    {Math.floor(course.duration / 60)} hours total
                  </p>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {course.lessons?.map((lesson, index) => (
                      <AccordionItem key={lesson.id} value={lesson.id}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{lesson.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {lesson.duration} minutes
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {lesson.isPreview ? (
                                <Badge variant="outline">Preview</Badge>
                              ) : !isEnrolled ? (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Play className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-11 pr-4">
                            <p className="text-sm text-muted-foreground mb-3">
                              {lesson.description}
                            </p>
                            {(lesson.isPreview || isEnrolled) && (
                              <Button variant="outline" size="sm">
                                <Play className="h-4 w-4 mr-2" />
                                {lesson.isPreview
                                  ? "Preview Lesson"
                                  : "Start Lesson"}
                              </Button>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )) || (
                      <div className="text-center py-8 text-muted-foreground">
                        No lessons available yet.
                      </div>
                    )}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructor" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About the Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <img
                      src={
                        instructor?.avatar ||
                        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                      }
                      alt={instructor?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">
                        {instructor?.name}
                      </h3>
                      <p className="text-muted-foreground capitalize mb-4">
                        {instructor?.role}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            4.9
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Rating
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            1,234
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Reviews
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            5,678
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Students
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            12
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Courses
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Experienced instructor with over 10 years in the
                        industry. Passionate about teaching and helping students
                        achieve their goals.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      ({reviews} reviews)
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock reviews */}
                    {[1, 2, 3].map((review) => (
                      <div
                        key={review}
                        className="border-b pb-4 last:border-b-0"
                      >
                        <div className="flex items-start space-x-3">
                          <img
                            src={`https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop`}
                            alt="Reviewer"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">
                                Student {review}
                              </span>
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Excellent course! The instructor explains
                              everything clearly and the hands-on projects
                              really helped me understand the concepts.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enrollment Card */}
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                  <span className="text-3xl font-bold text-green-600">
                    ${course.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  One-time payment
                </p>
              </div>

              {userEnrollment && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Your Progress</span>
                    <span>{userEnrollment.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${userEnrollment.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {isEnrolled ? (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleStartLearning}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                ) : (
                  <Button className="w-full" size="lg" onClick={handleEnroll}>
                    Enroll Now
                  </Button>
                )}

                <Button variant="outline" className="w-full">
                  Add to Wishlist
                </Button>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Community support</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Related Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCourses
                  .filter(
                    (c) => c.category === course.category && c.id !== course.id
                  )
                  .slice(0, 3)
                  .map((relatedCourse) => (
                    <Link
                      key={relatedCourse.id}
                      href={`/dashboard/courses/${relatedCourse.id}`}
                      className="block"
                    >
                      <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <img
                          src={relatedCourse.thumbnail}
                          alt={relatedCourse.title}
                          className="w-12 h-8 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium line-clamp-2">
                            {relatedCourse.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm font-medium text-green-600">
                              ${relatedCourse.price}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-muted-foreground">
                                4.8
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
