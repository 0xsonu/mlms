"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/auth-context";
import { mockCourses, mockEnrollments } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoPlayer } from "./video-player";
import { LessonContent } from "./lesson-content";
import { QuizInterface } from "./quiz-interface";
import { CourseNavigation } from "./course-navigation";
import { LearningNotes } from "./learning-notes";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  BookOpen,
  FileText,
  Award,
  Clock,
  CheckCircle,
  Lock,
  MessageSquare,
  Download,
  Share,
  Bookmark,
} from "lucide-react";

interface LearningInterfaceProps {
  courseId: string;
}

export function LearningInterface({ courseId }: LearningInterfaceProps) {
  const { user } = useAuth();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [lessonProgress, setLessonProgress] = useState(0);

  // Find course and enrollment
  const course = mockCourses.find((c) => c.id === courseId);
  const enrollment = mockEnrollments.find(
    (e) => e.courseId === courseId && e.userId === user?.id
  );

  const lessons = course?.lessons || [];
  const currentLesson = lessons[currentLessonIndex];

  useEffect(() => {
    if (enrollment) {
      setCompletedLessons(enrollment.completedLessons || []);
    }
  }, [enrollment]);

  const handleLessonComplete = async (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompletedLessons = [...completedLessons, lessonId];
      setCompletedLessons(newCompletedLessons);

      // TODO: Replace with actual backend call
      // Example: await progressService.markLessonComplete(courseId, lessonId)
      console.log("Marking lesson complete:", lessonId);

      // Auto-advance to next lesson
      if (currentLessonIndex < lessons.length - 1) {
        setTimeout(() => {
          setCurrentLessonIndex(currentLessonIndex + 1);
          setLessonProgress(0);
        }, 1500);
      }
    }
  };

  const handleQuizComplete = (score: number) => {
    console.log("Quiz completed with score:", score);
    setShowQuiz(false);

    if (score >= 70) {
      // Passing score
      handleLessonComplete(currentLesson.id);
    }
  };

  const navigateToLesson = (index: number) => {
    setCurrentLessonIndex(index);
    setLessonProgress(0);
    setShowQuiz(false);
  };

  const nextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      navigateToLesson(currentLessonIndex + 1);
    }
  };

  const previousLesson = () => {
    if (currentLessonIndex > 0) {
      navigateToLesson(currentLessonIndex - 1);
    }
  };

  const courseProgress = Math.round(
    (completedLessons.length / lessons.length) * 100
  );
  const isLessonCompleted =
    currentLesson && completedLessons.includes(currentLesson.id);
  const canAccessLesson =
    currentLessonIndex === 0 ||
    completedLessons.includes(lessons[currentLessonIndex - 1]?.id);

  if (!course) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
          <p className="text-muted-foreground">
            The course you&apos;re trying to access doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">
            You need to enroll in this course to access the content.
          </p>
          <Button className="mt-4">Enroll Now</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
          <p className="text-muted-foreground">
            Lesson {currentLessonIndex + 1} of {lessons.length}:{" "}
            {currentLesson?.title}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Course Progress</div>
            <div className="text-lg font-semibold">{courseProgress}%</div>
          </div>
          <div className="w-32">
            <Progress value={courseProgress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Course Navigation Sidebar */}
        <div className="lg:col-span-1">
          <CourseNavigation
            lessons={lessons}
            currentLessonIndex={currentLessonIndex}
            completedLessons={completedLessons}
            onLessonSelect={navigateToLesson}
          />
        </div>

        {/* Main Learning Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Lesson Access Check */}
          {!canAccessLesson ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Lesson Locked</h3>
                <p className="text-muted-foreground">
                  Complete the previous lesson to unlock this content.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Video Player */}
              {currentLesson?.videoUrl && (
                <VideoPlayer
                  videoUrl={currentLesson.videoUrl}
                  title={currentLesson.title}
                  onProgress={setLessonProgress}
                  onComplete={() => handleLessonComplete(currentLesson.id)}
                  isPlaying={isPlaying}
                  onPlayStateChange={setIsPlaying}
                />
              )}

              {/* Lesson Content Tabs */}
              <Tabs defaultValue="content" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-6">
                  <LessonContent
                    lesson={currentLesson}
                    progress={lessonProgress}
                    onComplete={() => handleLessonComplete(currentLesson.id)}
                    isCompleted={isLessonCompleted}
                  />
                </TabsContent>

                <TabsContent value="quiz" className="space-y-6">
                  <QuizInterface
                    lessonId={currentLesson?.id}
                    onComplete={handleQuizComplete}
                  />
                </TabsContent>

                <TabsContent value="notes" className="space-y-6">
                  <LearningNotes
                    courseId={courseId}
                    lessonId={currentLesson?.id}
                  />
                </TabsContent>

                <TabsContent value="resources" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Lesson Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <h4 className="font-medium">Lesson Slides</h4>
                              <p className="text-sm text-muted-foreground">
                                PDF • 2.4 MB
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-green-600" />
                            <div>
                              <h4 className="font-medium">Code Examples</h4>
                              <p className="text-sm text-muted-foreground">
                                ZIP • 1.8 MB
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <BookOpen className="h-5 w-5 text-purple-600" />
                            <div>
                              <h4 className="font-medium">
                                Additional Reading
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                External Link
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Share className="h-4 w-4 mr-2" />
                            Open
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Lesson Navigation */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={previousLesson}
                      disabled={currentLessonIndex === 0}
                    >
                      <SkipBack className="h-4 w-4 mr-2" />
                      Previous Lesson
                    </Button>

                    <div className="flex items-center space-x-4">
                      {isLessonCompleted && (
                        <Badge variant="default" className="bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}

                      <div className="text-sm text-muted-foreground">
                        {currentLessonIndex + 1} / {lessons.length}
                      </div>
                    </div>

                    <Button
                      onClick={nextLesson}
                      disabled={currentLessonIndex === lessons.length - 1}
                    >
                      Next Lesson
                      <SkipForward className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
