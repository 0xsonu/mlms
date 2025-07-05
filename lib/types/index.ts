// Core types for the LMS system
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'instructor' | 'learner';
  avatar?: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  theme: 'dark' | 'corporate' | 'edu-bright';
  settings: {
    allowSelfRegistration: boolean;
    requireEmailVerification: boolean;
    defaultUserRole: 'instructor' | 'learner';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  currency: string;
  instructorId: string;
  tenantId: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  isPublished: boolean;
  lessons: Lesson[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number; // in minutes
  order: number;
  isPreview: boolean;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: 'active' | 'completed' | 'cancelled';
  progress: number; // 0-100
  enrolledAt: Date;
  completedAt?: Date;
  completedLessons: string[]; // lesson IDs
}

export interface Progress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: Date;
  timeSpent: number; // in seconds
}

export interface Analytics {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  revenue: number;
  enrollmentsByMonth: { month: string; count: number }[];
  courseCompletionRates: { courseId: string; completionRate: number }[];
  topCourses: { courseId: string; enrollments: number }[];
}

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
  };
  fonts: {
    sans: string;
    heading: string;
  };
}