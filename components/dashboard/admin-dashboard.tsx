"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockAnalytics, mockUsers, mockCourses } from "@/lib/mock-data";
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  UserCheck,
  Activity,
} from "lucide-react";

export function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: mockAnalytics.totalUsers,
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Active Courses",
      value: mockAnalytics.totalCourses,
      icon: BookOpen,
      change: "+3",
      changeType: "positive" as const,
    },
    {
      title: "Total Enrollments",
      value: mockAnalytics.totalEnrollments,
      icon: UserCheck,
      change: "+18%",
      changeType: "positive" as const,
    },
    {
      title: "Revenue",
      value: `$${mockAnalytics.revenue.toLocaleString()}`,
      icon: DollarSign,
      change: "+25%",
      changeType: "positive" as const,
    },
  ];

  const recentUsers = mockUsers.slice(0, 5);
  const topCourses = mockCourses.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your platform.
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/10">
          <Activity className="mr-1 h-3 w-3" />
          Live
        </Badge>
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
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    stat.changeType === "positive" ? "default" : "destructive"
                  }
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Recent Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {user.role}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Top Performing Courses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCourses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {course.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {course.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        ${course.price}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 50) + 10} enrolled
                      </p>
                    </div>
                  </div>
                  <Progress
                    value={Math.floor(Math.random() * 100)}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Enrollment Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Enrollments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2">
            {mockAnalytics.enrollmentsByMonth.map((month) => (
              <div
                key={month.month}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className="w-full bg-primary rounded-t-md transition-all duration-300 hover:bg-primary/80"
                  style={{ height: `${(month.count / 20) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground mt-2">
                  {month.month}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
