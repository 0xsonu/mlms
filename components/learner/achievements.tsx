'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/auth-context';
import { mockEnrollments, mockCourses } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  Trophy, 
  Star, 
  Target, 
  Calendar,
  BookOpen,
  Clock,
  TrendingUp,
  Medal,
  Crown,
  Zap
} from 'lucide-react';

export function Achievements() {
  const { user } = useAuth();
  const userEnrollments = mockEnrollments.filter(enrollment => enrollment.userId === user?.id);
  const completedCourses = userEnrollments.filter(e => e.status === 'completed');
  
  // Mock achievements data
  const achievements = [
    {
      id: 'first-course',
      title: 'First Steps',
      description: 'Complete your first course',
      icon: BookOpen,
      earned: completedCourses.length > 0,
      earnedAt: completedCourses.length > 0 ? new Date('2024-01-15') : null,
      category: 'milestone',
      points: 100,
    },
    {
      id: 'speed-learner',
      title: 'Speed Learner',
      description: 'Complete a course in under 7 days',
      icon: Zap,
      earned: true,
      earnedAt: new Date('2024-01-20'),
      category: 'special',
      points: 200,
    },
    {
      id: 'dedicated-learner',
      title: 'Dedicated Learner',
      description: 'Study for 7 consecutive days',
      icon: Target,
      earned: true,
      earnedAt: new Date('2024-02-01'),
      category: 'streak',
      points: 150,
    },
    {
      id: 'course-master',
      title: 'Course Master',
      description: 'Complete 5 courses',
      icon: Crown,
      earned: completedCourses.length >= 5,
      earnedAt: completedCourses.length >= 5 ? new Date('2024-02-15') : null,
      category: 'milestone',
      points: 500,
    },
    {
      id: 'perfect-score',
      title: 'Perfect Score',
      description: 'Get 100% on a course assessment',
      icon: Star,
      earned: false,
      earnedAt: null,
      category: 'performance',
      points: 300,
    },
    {
      id: 'knowledge-seeker',
      title: 'Knowledge Seeker',
      description: 'Enroll in 10 different courses',
      icon: Trophy,
      earned: userEnrollments.length >= 10,
      earnedAt: userEnrollments.length >= 10 ? new Date('2024-03-01') : null,
      category: 'exploration',
      points: 400,
    },
  ];

  const certificates = [
    {
      id: 'cert-1',
      courseId: 'course-1',
      courseName: 'React Fundamentals',
      issuedAt: new Date('2024-02-15'),
      certificateUrl: '#',
    },
    {
      id: 'cert-2',
      courseId: 'course-2',
      courseName: 'Node.js Backend Development',
      issuedAt: new Date('2024-03-01'),
      certificateUrl: '#',
    },
  ];

  const earnedAchievements = achievements.filter(a => a.earned);
  const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0);
  const completionRate = Math.round((earnedAchievements.length / achievements.length) * 100);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'milestone': return Trophy;
      case 'special': return Star;
      case 'streak': return Target;
      case 'performance': return Medal;
      case 'exploration': return BookOpen;
      default: return Award;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'milestone': return 'bg-yellow-500';
      case 'special': return 'bg-purple-500';
      case 'streak': return 'bg-green-500';
      case 'performance': return 'bg-blue-500';
      case 'exploration': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Achievements</h1>
          <p className="text-muted-foreground">
            Track your learning milestones and celebrate your progress
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{earnedAchievements.length}</div>
            <div className="text-sm text-muted-foreground">Achievements Earned</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalPoints}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{certificates.length}</div>
            <div className="text-sm text-muted-foreground">Certificates</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{completionRate}%</div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Achievement Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Overall Progress</span>
              <span>{earnedAchievements.length} of {achievements.length} achievements</span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Achievements</TabsTrigger>
          <TabsTrigger value="earned">Earned ({earnedAchievements.length})</TabsTrigger>
          <TabsTrigger value="certificates">Certificates ({certificates.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              const CategoryIcon = getCategoryIcon(achievement.category);
              
              return (
                <Card 
                  key={achievement.id} 
                  className={`relative overflow-hidden transition-all duration-300 ${
                    achievement.earned 
                      ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-50/50 to-transparent' 
                      : 'opacity-60'
                  }`}
                >
                  {achievement.earned && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="default" className="bg-yellow-500">
                        <Award className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${getCategoryColor(achievement.category)}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {achievement.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground capitalize">
                              {achievement.category}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{achievement.points}</span>
                          </div>
                        </div>
                        
                        {achievement.earned && achievement.earnedAt && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>Earned on {achievement.earnedAt.toLocaleDateString()}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="earned" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earnedAchievements.map((achievement) => {
              const IconComponent = achievement.icon;
              
              return (
                <Card 
                  key={achievement.id} 
                  className="border-yellow-500/50 bg-gradient-to-br from-yellow-50/50 to-transparent"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${getCategoryColor(achievement.category)}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {achievement.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">{achievement.points} points</span>
                          </div>
                          
                          {achievement.earnedAt && (
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{achievement.earnedAt.toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="border-green-500/50 bg-gradient-to-br from-green-50/50 to-transparent">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-green-500">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">Certificate of Completion</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {certificate.courseName}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Issued on {certificate.issuedAt.toLocaleDateString()}</span>
                        </div>
                        
                        <a 
                          href={certificate.certificateUrl}
                          className="text-sm text-primary hover:underline"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}