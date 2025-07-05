'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/contexts/auth-context';
import { useTenant } from '@/lib/contexts/tenant-context';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  BookOpen,
  BarChart3,
  Users,
  Settings,
  GraduationCap,
  Home,
  ChevronLeft,
  ChevronRight,
  User,
  Bell,
  MessageSquare,
  Award,
  Calendar,
  CreditCard,
  FileText,
  Target,
  Plus,
  Search,
  UserCheck,
  TrendingUp,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const { currentTenant } = useTenant();

  const getNavigationItems = () => {
    const baseItems = [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Home,
        roles: ['admin', 'instructor', 'learner'],
      },
    ];

    const roleSpecificItems = {
      admin: [
        { title: 'Users', href: '/dashboard/users', icon: Users },
        { title: 'Courses', href: '/dashboard/courses', icon: BookOpen },
        { title: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
        { title: 'Settings', href: '/dashboard/settings', icon: Settings },
        { title: 'Billing', href: '/dashboard/billing', icon: CreditCard },
        { title: 'Reports', href: '/dashboard/reports', icon: FileText },
      ],
      instructor: [
        { title: 'Create Course', href: '/dashboard/courses/create', icon: Plus },
        { title: 'My Courses', href: '/dashboard/my-courses', icon: BookOpen },
        { title: 'Students', href: '/dashboard/students', icon: UserCheck },
        { title: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp },
        { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
        { title: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
        { title: 'Earnings', href: '/dashboard/earnings', icon: Target },
      ],
      learner: [
        { title: 'My Courses', href: '/dashboard/my-courses', icon: BookOpen },
        { title: 'Browse Courses', href: '/dashboard/browse', icon: Search },
        { title: 'Achievements', href: '/dashboard/achievements', icon: Award },
        { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
        { title: 'Notifications', href: '/dashboard/notifications', icon: Bell },
        { title: 'Profile', href: '/dashboard/profile', icon: User },
      ],
    };

    return [
      ...baseItems,
      ...(user?.role ? roleSpecificItems[user.role] || [] : []),
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <div
      className={cn(
        'flex h-screen flex-col border-r bg-card transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary" />
            <span className="font-semibold text-foreground">
              {currentTenant?.name || 'LMS'}
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    collapsed && 'justify-center px-2',
                    isActive && 'bg-secondary text-secondary-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="ml-2">{item.title}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Info */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {user?.role || 'Role'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}