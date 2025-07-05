"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Users,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

// Mock billing data
const billingStats = {
  totalRevenue: 456780,
  monthlyRevenue: 38900,
  pendingPayouts: 12450,
  platformFees: 22839,
  refunds: 3420,
  activeSubscriptions: 1247,
};

const revenueData = [
  { month: "Jan", revenue: 32000, fees: 1600, refunds: 800 },
  { month: "Feb", revenue: 41000, fees: 2050, refunds: 1200 },
  { month: "Mar", revenue: 38000, fees: 1900, refunds: 950 },
  { month: "Apr", revenue: 52000, fees: 2600, refunds: 1100 },
  { month: "May", revenue: 48000, fees: 2400, refunds: 1300 },
  { month: "Jun", revenue: 61000, fees: 3050, refunds: 1500 },
  { month: "Jul", revenue: 59000, fees: 2950, refunds: 1200 },
  { month: "Aug", revenue: 72000, fees: 3600, refunds: 1800 },
  { month: "Sep", revenue: 68000, fees: 3400, refunds: 1600 },
  { month: "Oct", revenue: 81000, fees: 4050, refunds: 2100 },
  { month: "Nov", revenue: 75000, fees: 3750, refunds: 1900 },
  { month: "Dec", revenue: 89000, fees: 4450, refunds: 2200 },
];

const paymentMethods = [
  { name: "Credit Card", value: 65, color: "#3b82f6" },
  { name: "PayPal", value: 25, color: "#10b981" },
  { name: "Bank Transfer", value: 8, color: "#f59e0b" },
  { name: "Other", value: 2, color: "#ef4444" },
];

const transactions = [
  {
    id: "TXN-001",
    type: "course_purchase",
    amount: 99.99,
    fee: 4.99,
    status: "completed",
    date: "2024-01-15",
    user: "Sarah Johnson",
    course: "React Masterclass 2024",
    paymentMethod: "Credit Card",
  },
  {
    id: "TXN-002",
    type: "instructor_payout",
    amount: -850.0,
    fee: 0,
    status: "pending",
    date: "2024-01-14",
    user: "Dr. Michael Chen",
    course: "Multiple Courses",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TXN-003",
    type: "refund",
    amount: -49.99,
    fee: -2.49,
    status: "completed",
    date: "2024-01-13",
    user: "Emily Rodriguez",
    course: "JavaScript Fundamentals",
    paymentMethod: "Credit Card",
  },
  {
    id: "TXN-004",
    type: "course_purchase",
    amount: 149.99,
    fee: 7.49,
    status: "completed",
    date: "2024-01-12",
    user: "David Kim",
    course: "Full Stack Development",
    paymentMethod: "PayPal",
  },
  {
    id: "TXN-005",
    type: "subscription",
    amount: 29.99,
    fee: 1.49,
    status: "completed",
    date: "2024-01-11",
    user: "Lisa Wang",
    course: "Premium Subscription",
    paymentMethod: "Credit Card",
  },
];

const payouts = [
  {
    id: "PO-001",
    instructor: "Dr. Michael Chen",
    amount: 2450.0,
    courses: 4,
    status: "completed",
    date: "2024-01-10",
    method: "Bank Transfer",
  },
  {
    id: "PO-002",
    instructor: "Sarah Williams",
    amount: 1890.5,
    courses: 3,
    status: "pending",
    date: "2024-01-08",
    method: "PayPal",
  },
  {
    id: "PO-003",
    instructor: "James Rodriguez",
    amount: 3200.75,
    courses: 5,
    status: "processing",
    date: "2024-01-05",
    method: "Bank Transfer",
  },
];

export default function AdminBilling() {
  const [timeRange, setTimeRange] = useState("12m");
  const [transactionFilter, setTransactionFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <RefreshCw className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case "course_purchase":
        return "text-green-600";
      case "subscription":
        return "text-blue-600";
      case "refund":
        return "text-red-600";
      case "instructor_payout":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (transactionFilter === "all") return true;
    return transaction.type === transactionFilter;
  });

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Billing & Revenue
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor platform revenue, transactions, and payouts
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

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${billingStats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1 text-green-600" />
              <span className="text-green-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${billingStats.monthlyRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1 text-green-600" />
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${billingStats.platformFees.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1 text-green-600" />
              <span className="text-green-600">+15%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payouts
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${billingStats.pendingPayouts.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <Clock className="w-3 h-3 mr-1 text-yellow-600" />
              <span className="text-yellow-600">3 pending</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        `$${value.toLocaleString()}`,
                        name.toString().charAt(0).toUpperCase() +
                          name.toString().slice(1),
                      ]}
                    />
                    <Bar dataKey="revenue" fill="#3b82f6" name="revenue" />
                    <Bar dataKey="fees" fill="#10b981" name="fees" />
                    <Bar dataKey="refunds" fill="#ef4444" name="refunds" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentMethods}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Course Sales</span>
                    <span className="font-bold">$342,560</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subscriptions</span>
                    <span className="font-bold">$89,420</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fees</span>
                    <span className="font-bold text-green-600">$22,839</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold">
                      ${billingStats.totalRevenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Month</span>
                    <span className="font-bold">1,089</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth</span>
                    <span className="font-bold text-green-600">+14.5%</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">Avg per Day</span>
                    <span className="font-bold">42</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Refund Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Refunds</span>
                    <span className="font-bold text-red-600">$3,420</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Refund Rate</span>
                    <span className="font-bold">2.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Refund</span>
                    <span className="font-bold">$68.40</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold">vs Industry</span>
                    <span className="font-bold text-green-600">-1.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            <Select
              value={transactionFilter}
              onValueChange={setTransactionFilter}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="course_purchase">
                  Course Purchases
                </SelectItem>
                <SelectItem value="subscription">Subscriptions</SelectItem>
                <SelectItem value="refund">Refunds</SelectItem>
                <SelectItem value="instructor_payout">
                  Instructor Payouts
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Course/Item</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-sm">
                        {transaction.id}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getTransactionTypeColor(transaction.type)}
                        >
                          {transaction.type.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.user}</TableCell>
                      <TableCell className="max-w-48 truncate">
                        {transaction.course}
                      </TableCell>
                      <TableCell
                        className={
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        ${Math.abs(transaction.fee).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(transaction.status)}
                            {transaction.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payouts Tab */}
        <TabsContent value="payouts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Instructor Payouts</h3>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Process Payouts
            </Button>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payout ID</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell className="font-mono text-sm">
                        {payout.id}
                      </TableCell>
                      <TableCell>{payout.instructor}</TableCell>
                      <TableCell className="font-bold text-green-600">
                        ${payout.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{payout.courses} courses</TableCell>
                      <TableCell>{payout.method}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payout.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(payout.status)}
                            {payout.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>{payout.date}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      `$${value.toLocaleString()}`,
                      name.toString().charAt(0).toUpperCase() +
                        name.toString().slice(1),
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="fees"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="fees"
                  />
                  <Line
                    type="monotone"
                    dataKey="refunds"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="refunds"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
