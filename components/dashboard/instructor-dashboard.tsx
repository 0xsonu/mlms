'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockCourses, mockEnrollments } from '@/lib/mock-data';
import { useAuth } from '@/lib/contexts/auth-context';
import { BookOpen, Users, Star, DollarSign, Plus, TrendingUp } from 'lucide-react';

export function InstructorDashboard() {
  const { user } = useAuth();
  const instructorCourses = mockCourses.filter(course => course.instructorId === user?.id);
  const totalStudents = mockEnrollments.length;
  const totalRevenue = instructorCourses.reduce((sum, course) => sum + course.price, 0);

  const stats = [
    {
      title: 'My Courses',
      value: instructorCourses.length,
      icon: BookOpen,
      change: '+2',
      changeType: 'positive' as const,
    },
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+18%',
      changeType: 'positive' as const,
    },
    {
      title: 'Avg Rating',
      value: '4.8',
      icon: Star,
      change: '+0.3',
      changeType: 'positive' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Instructor Dashboard</h1>
          <p className="text-muted-foreground">Manage your courses and track student progress.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Course
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
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Course Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {instructorCourses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{course.title}</p>
                      <p className="text-xs text-muted-foreground">{course.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {Math.floor(Math.random() * 50) + 10} students
                      </p>
                      <p className="text-xs text-muted-foreground">${course.price}</p>
                    </div>
                  </div>
                  <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">New enrollment</p>
                  <p className="text-xs text-muted-foreground">John Doe enrolled in React Fundamentals</p>
                </div>
                <span className="text-xs text-muted-foreground">2m ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Star className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Course review</p>
                  <p className="text-xs text-muted-foreground">Sarah left a 5-star review</p>
                </div>
                <span className="text-xs text-muted-foreground">1h ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Course completed</p>
                  <p className="text-xs text-muted-foreground">Mike completed Node.js Backend</p>
                </div>
                <span className="text-xs text-muted-foreground">3h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}