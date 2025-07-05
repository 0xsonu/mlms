'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle, 
  Lock, 
  Play,
  Clock,
  FileText,
  Award
} from 'lucide-react';

interface CourseNavigationProps {
  lessons: any[];
  currentLessonIndex: number;
  completedLessons: string[];
  onLessonSelect: (index: number) => void;
}

export function CourseNavigation({ 
  lessons, 
  currentLessonIndex, 
  completedLessons, 
  onLessonSelect 
}: CourseNavigationProps) {
  const totalDuration = lessons.reduce((sum, lesson) => sum + lesson.duration, 0);
  const completedDuration = lessons
    .filter(lesson => completedLessons.includes(lesson.id))
    .reduce((sum, lesson) => sum + lesson.duration, 0);
  
  const progressPercent = totalDuration > 0 ? (completedDuration / totalDuration) * 100 : 0;

  const canAccessLesson = (index: number) => {
    if (index === 0) return true;
    return completedLessons.includes(lessons[index - 1]?.id);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Course Progress</CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Completed</span>
            <span>{completedLessons.length} of {lessons.length}</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatDuration(completedDuration)}</span>
            <span>{formatDuration(totalDuration)} total</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="space-y-1 p-4">
            {lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isCurrent = index === currentLessonIndex;
              const canAccess = canAccessLesson(index);
              
              return (
                <Button
                  key={lesson.id}
                  variant={isCurrent ? 'secondary' : 'ghost'}
                  className={`w-full justify-start h-auto p-3 ${
                    !canAccess ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => canAccess && onLessonSelect(index)}
                  disabled={!canAccess}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <div className="flex-shrink-0 mt-1">
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : !canAccess ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : isCurrent ? (
                        <Play className="h-4 w-4 text-primary" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                      )}
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {index + 1}. {lesson.title}
                        </span>
                        {lesson.isPreview && (
                          <Badge variant="outline" className="text-xs">
                            Preview
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{lesson.duration}m</span>
                        </div>
                        
                        {lesson.videoUrl && (
                          <div className="flex items-center space-x-1">
                            <Play className="h-3 w-3" />
                            <span>Video</span>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-1">
                          <FileText className="h-3 w-3" />
                          <span>Content</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Award className="h-3 w-3" />
                          <span>Quiz</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}