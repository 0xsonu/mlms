"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Clock,
  Target,
  Eye,
  Download,
} from "lucide-react";

interface CoursePerformanceChartProps {
  course: {
    id: number;
    title: string;
    students: number;
    revenue: number;
    rating: number;
    completionRate: number;
    watchTime: number;
    enrollments: number;
    refunds: number;
    weeklyData?: Array<{
      week: string;
      enrollments: number;
      completions: number;
      revenue: number;
    }>;
  };
  onViewDetails?: (courseId: number) => void;
}

const defaultWeeklyData = [
  { week: "Week 1", enrollments: 45, completions: 12, revenue: 1800 },
  { week: "Week 2", enrollments: 52, completions: 18, revenue: 2080 },
  { week: "Week 3", enrollments: 38, completions: 25, revenue: 1520 },
  { week: "Week 4", enrollments: 61, completions: 31, revenue: 2440 },
];

export function CoursePerformanceChart({
  course,
  onViewDetails,
}: CoursePerformanceChartProps) {
  const weeklyData = course.weeklyData || defaultWeeklyData;
  const refundRate = Math.round((course.refunds / course.enrollments) * 100);

  const metrics = [
    {
      label: "Total Students",
      value: course.students.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Revenue",
      value: `$${course.revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      label: "Watch Time",
      value: `${course.watchTime}h`,
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      label: "Completion Rate",
      value: `${course.completionRate}%`,
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                {course.rating}
              </Badge>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {course.enrollments} total enrollments
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {refundRate}% refund rate
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View Course
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(course.id)}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className={`p-4 rounded-lg ${metric.bgColor}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {metric.label}
                  </span>
                </div>
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Weekly Performance Chart */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Weekly Performance</h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => [
                  name === "revenue" ? `$${value}` : value,
                  name.toString().charAt(0).toUpperCase() +
                    name.toString().slice(1),
                ]}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="enrollments"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
                name="enrollments"
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="completions"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
                name="completions"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#f59e0b"
                strokeWidth={2}
                name="revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h5 className="font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Strengths
            </h5>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• High completion rate ({course.completionRate}%)</li>
              <li>• Excellent student rating ({course.rating}/5)</li>
              <li>• Strong engagement ({course.watchTime}h total)</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h5 className="font-semibold mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-orange-500" />
              Opportunities
            </h5>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Reduce refund rate ({refundRate}% current)</li>
              <li>• Increase student engagement</li>
              <li>• Optimize lesson pacing</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
