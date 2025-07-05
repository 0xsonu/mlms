"use client";

import { useState } from "react";
import { useAuth } from "@/lib/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  BookOpen,
  Award,
  MessageSquare,
  Calendar,
  DollarSign,
  Settings,
  Check,
  Trash2,
  Filter,
} from "lucide-react";

export function Notifications() {
  const { user } = useAuth();
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );

  // Mock notifications data
  const notifications = [
    {
      id: "notif-1",
      type: "course_completion",
      title: "Course Completed!",
      message:
        'Congratulations! You have successfully completed "React Fundamentals".',
      timestamp: new Date("2024-01-20T10:30:00"),
      isRead: false,
      icon: Award,
      color: "text-green-600",
      actionUrl: "/dashboard/achievements",
    },
    {
      id: "notif-2",
      type: "new_message",
      title: "New Message from Instructor",
      message: "Jane Smith replied to your question about React hooks.",
      timestamp: new Date("2024-01-20T09:15:00"),
      isRead: false,
      icon: MessageSquare,
      color: "text-blue-600",
      actionUrl: "/dashboard/messages",
    },
    {
      id: "notif-3",
      type: "course_enrollment",
      title: "Successfully Enrolled",
      message: 'You have been enrolled in "Node.js Backend Development".',
      timestamp: new Date("2024-01-19T16:45:00"),
      isRead: true,
      icon: BookOpen,
      color: "text-purple-600",
      actionUrl: "/dashboard/my-courses",
    },
    {
      id: "notif-4",
      type: "assignment_due",
      title: "Assignment Due Soon",
      message: 'Your assignment for "Full Stack JavaScript" is due in 2 days.',
      timestamp: new Date("2024-01-19T14:20:00"),
      isRead: true,
      icon: Calendar,
      color: "text-orange-600",
      actionUrl: "/dashboard/my-courses",
    },
    {
      id: "notif-5",
      type: "payment_success",
      title: "Payment Successful",
      message:
        'Your payment of $149.99 for "Node.js Backend Development" was processed successfully.',
      timestamp: new Date("2024-01-18T11:30:00"),
      isRead: true,
      icon: DollarSign,
      color: "text-green-600",
      actionUrl: "/dashboard/billing",
    },
    {
      id: "notif-6",
      type: "system_update",
      title: "Platform Update",
      message:
        "New features have been added to the learning platform. Check them out!",
      timestamp: new Date("2024-01-17T08:00:00"),
      isRead: true,
      icon: Settings,
      color: "text-gray-600",
      actionUrl: "/dashboard",
    },
  ];

  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const readNotifications = notifications.filter((n) => n.isRead);

  const handleMarkAsRead = (notificationIds: string[]) => {
    // TODO: Replace with actual backend call
    // Example: await notificationService.markAsRead(notificationIds)
    console.log("Marking as read:", notificationIds);
  };

  const handleMarkAllAsRead = () => {
    const unreadIds = unreadNotifications.map((n) => n.id);
    handleMarkAsRead(unreadIds);
  };

  const handleDeleteNotifications = (notificationIds: string[]) => {
    // TODO: Replace with actual backend call
    // Example: await notificationService.deleteNotifications(notificationIds)
    console.log("Deleting notifications:", notificationIds);
  };

  const toggleNotificationSelection = (notificationId: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId)
        ? prev.filter((id) => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const NotificationItem = ({ notification }: { notification: any }) => {
    const IconComponent = notification.icon;
    const isSelected = selectedNotifications.includes(notification.id);

    return (
      <Card
        className={`cursor-pointer transition-all duration-200 ${
          !notification.isRead ? "border-primary/50 bg-primary/5" : ""
        } ${isSelected ? "ring-2 ring-primary" : ""}`}
        onClick={() => toggleNotificationSelection(notification.id)}
      >
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-full bg-muted ${notification.color}`}>
              <IconComponent className="h-4 w-4" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {notification.timestamp.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <Badge variant="outline" className="text-xs">
                  {notification.type.replace("_", " ")}
                </Badge>

                <div className="flex space-x-2">
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead([notification.id]);
                      }}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Mark Read
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNotifications([notification.id]);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your learning progress and platform updates
          </p>
        </div>

        <div className="flex space-x-2">
          {selectedNotifications.length > 0 && (
            <>
              <Button
                variant="outline"
                onClick={() => handleMarkAsRead(selectedNotifications)}
              >
                <Check className="h-4 w-4 mr-2" />
                Mark Read ({selectedNotifications.length})
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteNotifications(selectedNotifications)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete ({selectedNotifications.length})
              </Button>
            </>
          )}

          {unreadNotifications.length > 0 && (
            <Button onClick={handleMarkAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Bell className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{notifications.length}</div>
            <div className="text-sm text-muted-foreground">
              Total Notifications
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Badge className="h-8 w-8 text-orange-500 mx-auto mb-2 rounded-full flex items-center justify-center">
              {unreadNotifications.length}
            </Badge>
            <div className="text-2xl font-bold">
              {unreadNotifications.length}
            </div>
            <div className="text-sm text-muted-foreground">Unread</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{readNotifications.length}</div>
            <div className="text-sm text-muted-foreground">Read</div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="read">
              Read ({readNotifications.length})
            </TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <TabsContent value="all" className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                <p className="text-muted-foreground">
                  You&apos;re all caught up! New notifications will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {unreadNotifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                <p className="text-muted-foreground">
                  You have no unread notifications.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {unreadNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="read" className="space-y-4">
          <div className="space-y-3">
            {readNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
