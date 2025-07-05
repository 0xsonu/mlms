"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Award,
  Activity,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Mail,
  Phone,
} from "lucide-react";

interface StudentProgressCardProps {
  student: {
    id: number;
    name: string;
    email: string;
    avatar: string;
    course: string;
    progress: number;
    lastActive: string;
    completedLessons: number;
    totalLessons: number;
    timeSpent: number;
    quizScores: number[];
    status: "active" | "struggling" | "completed" | "inactive";
    engagementTrend: "up" | "down" | "stable";
    messagesCount: number;
    lastQuizScore?: number;
  };
  onContactStudent?: (studentId: number) => void;
  onViewDetails?: (studentId: number) => void;
}

export function StudentProgressCard({
  student,
  onContactStudent,
  onViewDetails,
}: StudentProgressCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "struggling":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getEngagementIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const averageQuizScore =
    student.quizScores.length > 0
      ? Math.round(
          student.quizScores.reduce((a, b) => a + b, 0) /
            student.quizScores.length
        )
      : 0;

  const progressColor =
    student.progress >= 80
      ? "bg-green-500"
      : student.progress >= 50
      ? "bg-blue-500"
      : student.progress >= 25
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className="text-lg font-semibold">
                {student.name}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {student.email}
              </p>
              <p className="text-xs text-gray-500 mt-1">{student.course}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusColor(student.status)}>
              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
            </Badge>
            <div className="flex items-center gap-1">
              {getEngagementIcon(student.engagementTrend)}
              <span className="text-xs text-gray-500">Engagement</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Course Progress</span>
            <span className="text-sm font-bold">{student.progress}%</span>
          </div>
          <Progress value={student.progress} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">
            {student.completedLessons} of {student.totalLessons} lessons
            completed
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <Clock className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Time Spent</p>
              <p className="text-sm font-semibold">{student.timeSpent}h</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <Award className="w-4 h-4 text-purple-500" />
            <div>
              <p className="text-xs text-gray-500">Avg Quiz Score</p>
              <p className="text-sm font-semibold">{averageQuizScore}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <Activity className="w-4 h-4 text-green-500" />
            <div>
              <p className="text-xs text-gray-500">Last Active</p>
              <p className="text-sm font-semibold">{student.lastActive}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <MessageSquare className="w-4 h-4 text-orange-500" />
            <div>
              <p className="text-xs text-gray-500">Messages</p>
              <p className="text-sm font-semibold">{student.messagesCount}</p>
            </div>
          </div>
        </div>

        {/* Recent Quiz Performance */}
        {student.lastQuizScore && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Latest Quiz Score</span>
              <Badge
                variant={student.lastQuizScore >= 80 ? "default" : "secondary"}
              >
                {student.lastQuizScore}%
              </Badge>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails?.(student.id)}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onContactStudent?.(student.id)}
          >
            <Mail className="w-4 h-4" />
          </Button>
        </div>

        {/* Alert for Struggling Students */}
        {student.status === "struggling" && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ This student may need additional support. Consider reaching
              out.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
