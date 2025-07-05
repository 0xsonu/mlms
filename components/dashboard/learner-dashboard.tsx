'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockCourses, mockEnrollments } from '@/lib/mock-data';
import { useAuth } from '@/lib/contexts/auth-context';
import { BookOpen, Award, Clock, TrendingUp, Play, Star } from 'lucide-react';

export function LearnerDashboard() {
  const { user } = useAuth();
  const userEnrollments = mockEnrollments.filter(enrollment => enrollment.userId === user?.id);
  const enrolledCourses = mockCourses.filter(course => 
    userEnrollments.some(enrollment => enrollment.courseId === course.id)
  );

  const stats = [
    {
      title: 'Enrolled Courses',
      value: enrolledCourses.length,
      icon: BookOpen,
      change: '+1',
      changeType: 'positive' as const,
    },
    {
      title: 'Completed',
      value: userEnrollments.filter(e => e.status === 'completed').length,
      icon: Award,
      change: '+2',
      changeType: 'positive' as const,
    },
    {
      title: 'Learning Hours',
      value: '24.5',
      icon: Clock,
      change: '+8h',
      changeType: 'positive' as const,
    },
    {
      title: 'Avg Progress',
      value: '67%',
      icon: TrendingUp,
      change: '+15%',
      changeType: 'positive' as const,
    },
  ];

  const recommendedCourses = mockCourses.filter(course => 
    !enrolledCourses.some(enrolled => enrolled.id === course.id)
  ).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Learning</h1>
          <p className="text-muted-foreground">Continue your learning journey and explore new courses.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <BookOpen className="mr-2 h-4 w-4" />
          Browse Courses
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={stat.changeType === 'positive' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground">this week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Continue Learning</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userEnrollments.map((enrollment) => {
                const course = mockCourses.find(c => c.id === enrollment.courseId);
                if (!course) return null;
                
                return (
                  <div key={enrollment.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{course.title}</p>
                        <p className="text-xs text-muted-foreground">{course.category}</p>
                      </div>
                      <Badge variant={enrollment.status === 'completed' ? 'default' : 'secondary'}>
                        {enrollment.status}
                      </Badge>
                    </div>
                    <Progress value={enrollment.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{enrollment.progress}% complete</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Recommended for You</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{course.title}</p>
                    <p className="text-xs text-muted-foreground">{course.category}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {course.level}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {Math.floor(course.duration / 60)}h {course.duration % 60}m
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">${course.price}</p>
                    <Button size="sm" variant="outline" className="mt-1">
                      Enroll
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}