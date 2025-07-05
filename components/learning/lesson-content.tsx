"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  BookOpen,
  FileText,
  Code,
  Lightbulb,
  Target,
} from "lucide-react";

interface LessonContentProps {
  lesson: any;
  progress: number;
  onComplete: () => void;
  isCompleted: boolean;
}

export function LessonContent({
  lesson,
  progress,
  onComplete,
  isCompleted,
}: LessonContentProps) {
  const [readingProgress, setReadingProgress] = useState(0);

  if (!lesson) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Content Available</h3>
          <p className="text-muted-foreground">
            This lesson doesn&apos;t have any content yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleScrollProgress = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    setReadingProgress(Math.min(100, progress));
  };

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{lesson.title}</CardTitle>
              <p className="text-muted-foreground mt-1">{lesson.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{lesson.duration} minutes</span>
              </div>

              {isCompleted && (
                <Badge variant="default" className="bg-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>

          {/* Reading Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Reading Progress</span>
              <span>{Math.round(readingProgress)}%</span>
            </div>
            <Progress value={readingProgress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Learning Objectives</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">
                Understand the core concepts covered in this lesson
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">
                Apply the knowledge through practical examples
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">
                Prepare for the next lesson in the sequence
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Lesson Content</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-sm max-w-none max-h-96 overflow-y-auto"
            onScroll={handleScrollProgress}
          >
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />

            {/* Additional structured content */}
            <div className="mt-8 space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Key Insight
                    </h4>
                    <p className="text-blue-800 text-sm">
                      This concept is fundamental to understanding the broader
                      topic. Make sure you grasp this before moving forward.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Code className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Code Example
                    </h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                      {`// Example implementation
function exampleFunction() {
  console.log("This is a practical example");
  return "Understanding through code";
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">
                      Best Practice
                    </h4>
                    <p className="text-green-800 text-sm">
                      Always remember to follow industry standards and best
                      practices when implementing these concepts in real-world
                      scenarios.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lesson Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Complete this lesson to unlock the next one
            </div>

            <div className="flex space-x-3">
              {!isCompleted && readingProgress >= 80 && (
                <Button onClick={onComplete}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
              )}

              {isCompleted && (
                <Button variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Review Lesson
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
