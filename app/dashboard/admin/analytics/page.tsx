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
  AreaChart,
  Area,
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
  Globe,
  Server,
  Database,
  CheckCircle,
} from "lucide-react";

// Mock analytics data
const platformStats = {
  totalUsers: 15247,
  totalCourses: 342,
  totalRevenue: 456780,
  activeUsers: 8934,
  courseCompletions: 12456,
  avgSessionTime: 45,
  totalInstructors: 89,
  totalStudents: 15158,
};

const revenueData = [
  { month: "Jan", revenue: 32000, users: 450, courses: 25 },
  { month: "Feb", revenue: 41000, users: 520, courses: 28 },
  { month: "Mar", revenue: 38000, users: 480, courses: 32 },
  { month: "Apr", revenue: 52000, users: 670, courses: 35 },
  { month: "May", revenue: 48000, users: 610, courses: 38 },
  { month: "Jun", revenue: 61000, users: 780, courses: 42 },
  { month: "Jul", revenue: 59000, users: 750, courses: 45 },
  { month: "Aug", revenue: 72000, users: 890, courses: 48 },
  { month: "Sep", revenue: 68000, users: 850, courses: 52 },
  { month: "Oct", revenue: 81000, users: 980, courses: 55 },
  { month: "Nov", revenue: 75000, users: 920, courses: 58 },
  { month: "Dec", revenue: 89000, users: 1050, courses: 62 },
];

const userGrowthData = [
  { date: "2024-01", students: 8500, instructors: 45, admins: 5 },
  { date: "2024-02", students: 9200, instructors: 52, admins: 5 },
  { date: "2024-03", students: 10100, instructors: 58, admins: 6 },
  { date: "2024-04", students: 11300, instructors: 65, admins: 6 },
  { date: "2024-05", students: 12800, instructors: 72, admins: 7 },
  { date: "2024-06", students: 13900, instructors: 78, admins: 7 },
  { date: "2024-07", students: 14600, instructors: 83, admins: 8 },
  { date: "2024-08", students: 15158, instructors: 89, admins: 8 },
];

const courseCategories = [
  { name: "Web Development", value: 35, color: "#3b82f6" },
  { name: "Data Science", value: 25, color: "#10b981" },
  { name: "Mobile Development", value: 20, color: "#f59e0b" },
  { name: "Design", value: 12, color: "#ef4444" },
  { name: "Business", value: 8, color: "#8b5cf6" },
];

const systemMetrics = [
  { metric: "Server Uptime", value: "99.9%", status: "excellent" },
  { metric: "Response Time", value: "120ms", status: "good" },
  { metric: "Database Load", value: "45%", status: "good" },
  { metric: "Storage Used", value: "67%", status: "warning" },
  { metric: "Bandwidth", value: "2.3TB", status: "good" },
  { metric: "Active Sessions", value: "1,247", status: "excellent" },
];

const topCourses = [
  {
    id: 1,
    title: "Complete React Development",
    students: 2847,
    revenue: 142350,
    rating: 4.9,
  },
  {
    id: 2,
    title: "Python for Data Science",
    students: 2156,
    revenue: 107800,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    students: 1923,
    revenue: 96150,
    rating: 4.7,
  },
  {
    id: 4,
    title: "UI/UX Design Masterclass",
    students: 1654,
    revenue: 82700,
    rating: 4.8,
  },
  {
    id: 5,
    title: "Node.js Backend Development",
    students: 1432,
    revenue: 71600,
    rating: 4.6,
  },
];

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("12m");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600";
      case "good":
        return "text-blue-600";
      case "warning":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Platform Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Comprehensive platform performance and user analytics
          </p>
        </div>

        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platformStats.totalUsers.toLocaleString()}
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
              ${platformStats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platformStats.totalCourses}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Course Completions
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platformStats.courseCompletions.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "revenue"
                          ? `$${value.toLocaleString()}`
                          : value,
                        name.toString().charAt(0).toUpperCase() +
                          name.toString().slice(1),
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Course Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Course Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={courseCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {courseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">
                          #{index + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-sm text-gray-600">
                          {course.students} students
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${course.revenue.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Students"
                  />
                  <Line
                    type="monotone"
                    dataKey="instructors"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Instructors"
                  />
                  <Line
                    type="monotone"
                    dataKey="admins"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Admins"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Students</span>
                    <span className="font-bold">
                      {platformStats.totalStudents.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Instructors</span>
                    <span className="font-bold">
                      {platformStats.totalInstructors}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Users</span>
                    <span className="font-bold text-green-600">
                      {platformStats.activeUsers.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Avg Session Time</span>
                    <span className="font-bold">
                      {platformStats.avgSessionTime}m
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Daily Active Users</span>
                    <span className="font-bold">3,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Monthly Retention</span>
                    <span className="font-bold text-green-600">78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>New Signups Today</span>
                    <span className="font-bold text-blue-600">47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Course Enrollments</span>
                    <span className="font-bold">234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Completions Today</span>
                    <span className="font-bold text-green-600">89</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {systemMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.metric}
                  </CardTitle>
                  {metric.metric.includes("Server") && (
                    <Server className="h-4 w-4 text-muted-foreground" />
                  )}
                  {metric.metric.includes("Database") && (
                    <Database className="h-4 w-4 text-muted-foreground" />
                  )}
                  {metric.metric.includes("Response") && (
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  )}
                  {metric.metric.includes("Storage") && (
                    <Database className="h-4 w-4 text-muted-foreground" />
                  )}
                  {metric.metric.includes("Bandwidth") && (
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  )}
                  {metric.metric.includes("Sessions") && (
                    <Users className="h-4 w-4 text-muted-foreground" />
                  )}
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${getStatusColor(
                      metric.status
                    )}`}
                  >
                    {metric.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Status: {metric.status}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Health Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4 text-green-600">
                    System Status: Healthy
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      All services operational
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Database performance optimal
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      CDN delivery fast
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      Storage approaching 70% capacity
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Recent System Events</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="text-gray-600">
                      2 hours ago: Database backup completed
                    </li>
                    <li className="text-gray-600">
                      4 hours ago: Security scan passed
                    </li>
                    <li className="text-gray-600">
                      1 day ago: System update deployed
                    </li>
                    <li className="text-gray-600">
                      2 days ago: SSL certificates renewed
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
