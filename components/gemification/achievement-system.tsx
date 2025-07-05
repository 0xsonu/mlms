"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Award,
  Trophy,
  Star,
  Target,
  Zap,
  BookOpen,
  Users,
  Clock,
  TrendingUp,
  Medal,
  Crown,
  Flame,
  CheckCircle,
  Lock,
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: "learning" | "social" | "streak" | "milestone" | "special";
  rarity: "common" | "rare" | "epic" | "legendary";
  points: number;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
  requirements: string[];
}

interface AchievementSystemProps {
  userId: string;
  userRole: "student" | "instructor";
}

const achievements: Achievement[] = [
  {
    id: "first_course",
    title: "First Steps",
    description: "Complete your first course",
    icon: BookOpen,
    category: "learning",
    rarity: "common",
    points: 100,
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    unlockedAt: "2024-01-15",
    requirements: ["Complete 1 course"],
  },
  {
    id: "course_collector",
    title: "Course Collector",
    description: "Complete 5 courses",
    icon: Trophy,
    category: "learning",
    rarity: "rare",
    points: 500,
    progress: 3,
    maxProgress: 5,
    unlocked: false,
    requirements: ["Complete 5 courses"],
  },
  {
    id: "quiz_master",
    title: "Quiz Master",
    description: "Score 100% on 10 quizzes",
    icon: Target,
    category: "learning",
    rarity: "epic",
    points: 750,
    progress: 7,
    maxProgress: 10,
    unlocked: false,
    requirements: ["Score 100% on 10 quizzes"],
  },
  {
    id: "speed_learner",
    title: "Speed Learner",
    description: "Complete a course in under 24 hours",
    icon: Zap,
    category: "milestone",
    rarity: "rare",
    points: 300,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    requirements: ["Complete a course in under 24 hours"],
  },
  {
    id: "social_butterfly",
    title: "Social Butterfly",
    description: "Make 50 forum posts",
    icon: Users,
    category: "social",
    rarity: "common",
    points: 200,
    progress: 23,
    maxProgress: 50,
    unlocked: false,
    requirements: ["Make 50 forum posts"],
  },
  {
    id: "streak_warrior",
    title: "Streak Warrior",
    description: "Maintain a 30-day learning streak",
    icon: Flame,
    category: "streak",
    rarity: "epic",
    points: 1000,
    progress: 15,
    maxProgress: 30,
    unlocked: false,
    requirements: ["Learn for 30 consecutive days"],
  },
  {
    id: "knowledge_seeker",
    title: "Knowledge Seeker",
    description: "Spend 100 hours learning",
    icon: Clock,
    category: "milestone",
    rarity: "rare",
    points: 600,
    progress: 67,
    maxProgress: 100,
    unlocked: false,
    requirements: ["Spend 100 hours learning"],
  },
  {
    id: "perfectionist",
    title: "Perfectionist",
    description: "Complete 3 courses with 100% completion",
    icon: Star,
    category: "learning",
    rarity: "legendary",
    points: 1500,
    progress: 1,
    maxProgress: 3,
    unlocked: false,
    requirements: ["Complete 3 courses with 100% completion rate"],
  },
  {
    id: "early_bird",
    title: "Early Bird",
    description: "Complete lessons before 8 AM for 7 days",
    icon: Crown,
    category: "special",
    rarity: "epic",
    points: 800,
    progress: 3,
    maxProgress: 7,
    unlocked: false,
    requirements: ["Complete lessons before 8 AM for 7 consecutive days"],
  },
];

export function AchievementSystem({
  userId,
  userRole,
}: AchievementSystemProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "rare":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "epic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "legendary":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "learning":
        return BookOpen;
      case "social":
        return Users;
      case "streak":
        return Flame;
      case "milestone":
        return Target;
      case "special":
        return Crown;
      default:
        return Award;
    }
  };

  const filteredAchievements = achievements.filter((achievement) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "unlocked") return achievement.unlocked;
    if (selectedCategory === "locked") return !achievement.unlocked;
    return achievement.category === selectedCategory;
  });

  const totalPoints = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {totalPoints.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Achievement points earned
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {unlockedCount}/{achievements.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Achievements unlocked
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((unlockedCount / achievements.length) * 100)}%
            </div>
            <Progress
              value={(unlockedCount / achievements.length) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: "All", icon: Award },
          { key: "unlocked", label: "Unlocked", icon: CheckCircle },
          { key: "locked", label: "Locked", icon: Lock },
          { key: "learning", label: "Learning", icon: BookOpen },
          { key: "social", label: "Social", icon: Users },
          { key: "streak", label: "Streak", icon: Flame },
          { key: "milestone", label: "Milestone", icon: Target },
          { key: "special", label: "Special", icon: Crown },
        ].map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={selectedCategory === key ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(key)}
            className="flex items-center gap-2"
          >
            <Icon className="w-4 h-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => {
          const Icon = achievement.icon;
          const isLocked = !achievement.unlocked;

          return (
            <Dialog key={achievement.id}>
              <DialogTrigger asChild>
                <Card
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isLocked ? "opacity-60" : ""
                  } ${
                    achievement.unlocked
                      ? "ring-2 ring-yellow-200 dark:ring-yellow-800"
                      : ""
                  }`}
                  onClick={() => setSelectedAchievement(achievement)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`p-3 rounded-full ${
                          isLocked
                            ? "bg-gray-100 dark:bg-gray-800"
                            : "bg-gradient-to-br from-yellow-400 to-orange-500"
                        }`}
                      >
                        {isLocked ? (
                          <Lock className="w-6 h-6 text-gray-500" />
                        ) : (
                          <Icon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">
                      {achievement.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>

                    {!achievement.unlocked && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <Progress
                          value={
                            (achievement.progress / achievement.maxProgress) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">
                          {achievement.points} pts
                        </span>
                      </div>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="text-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-full ${
                        isLocked
                          ? "bg-gray-100 dark:bg-gray-800"
                          : "bg-gradient-to-br from-yellow-400 to-orange-500"
                      }`}
                    >
                      {isLocked ? (
                        <Lock className="w-6 h-6 text-gray-500" />
                      ) : (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{achievement.title}</h3>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    {achievement.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-medium">Reward Points</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold">{achievement.points}</span>
                    </div>
                  </div>

                  {achievement.unlocked && achievement.unlockedAt && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800 dark:text-green-200">
                          Unlocked on {achievement.unlockedAt}
                        </span>
                      </div>
                    </div>
                  )}

                  {!achievement.unlocked && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Progress</span>
                        <span>
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <Progress
                        value={
                          (achievement.progress / achievement.maxProgress) * 100
                        }
                        className="h-3"
                      />
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {achievement.requirements.map((req, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
              No achievements found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try selecting a different category or start learning to unlock
              achievements!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
