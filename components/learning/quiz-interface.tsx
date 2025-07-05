'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Award,
  RotateCcw,
  Play,
  AlertCircle
} from 'lucide-react';

interface QuizInterfaceProps {
  lessonId?: string;
  onComplete: (score: number) => void;
}

interface Question {
  id: string;
  type: 'multiple-choice' | 'multiple-select' | 'true-false';
  question: string;
  options: string[];
  correctAnswers: number[];
  explanation: string;
  points: number;
}

export function QuizInterface({ lessonId, onComplete }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [showExplanation, setShowExplanation] = useState(false);

  // Mock quiz data
  const quiz: Question[] = [
    {
      id: 'q1',
      type: 'multiple-choice',
      question: 'What is the primary purpose of React hooks?',
      options: [
        'To replace class components entirely',
        'To allow state and lifecycle features in functional components',
        'To improve performance of React applications',
        'To handle routing in React applications'
      ],
      correctAnswers: [1],
      explanation: 'React hooks allow you to use state and other React features in functional components, making them more powerful and eliminating the need for class components in many cases.',
      points: 10,
    },
    {
      id: 'q2',
      type: 'multiple-select',
      question: 'Which of the following are built-in React hooks? (Select all that apply)',
      options: [
        'useState',
        'useEffect',
        'useRouter',
        'useCallback',
        'useQuery'
      ],
      correctAnswers: [0, 1, 3],
      explanation: 'useState, useEffect, and useCallback are all built-in React hooks. useRouter is from Next.js and useQuery is from libraries like React Query.',
      points: 15,
    },
    {
      id: 'q3',
      type: 'true-false',
      question: 'useEffect runs after every render by default.',
      options: ['True', 'False'],
      correctAnswers: [0],
      explanation: 'True. useEffect runs after every completed render by default, unless you provide a dependency array to control when it runs.',
      points: 5,
    },
  ];

  const currentQuestion = quiz[currentQuestionIndex];
  const totalQuestions = quiz.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerChange = (questionId: string, answerIndex: number, checked?: boolean) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      
      if (currentQuestion.type === 'multiple-select') {
        if (checked) {
          return { ...prev, [questionId]: [...currentAnswers, answerIndex] };
        } else {
          return { ...prev, [questionId]: currentAnswers.filter(a => a !== answerIndex) };
        }
      } else {
        return { ...prev, [questionId]: [answerIndex] };
      }
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const finishQuiz = () => {
    const score = calculateScore();
    setShowResults(true);
    onComplete(score);
  };

  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.forEach(question => {
      totalPoints += question.points;
      const userAnswers = answers[question.id] || [];
      const correctAnswers = question.correctAnswers;
      
      if (arraysEqual(userAnswers.sort(), correctAnswers.sort())) {
        earnedPoints += question.points;
      }
    });

    return Math.round((earnedPoints / totalPoints) * 100);
  };

  const arraysEqual = (a: number[], b: number[]) => {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setQuizStarted(false);
    setTimeRemaining(600);
    setShowExplanation(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Lesson Quiz</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Test Your Knowledge</h3>
              <p className="text-muted-foreground">
                Complete this quiz to demonstrate your understanding of the lesson content.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">10</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">70%</div>
                <div className="text-sm text-muted-foreground">Pass Score</div>
              </div>
            </div>
            
            <Button onClick={() => setQuizStarted(true)} size="lg">
              <Play className="h-4 w-4 mr-2" />
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const passed = score >= 70;
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {passed ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <span>Quiz Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-6xl font-bold mb-4 ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {score}%
            </div>
            
            <Badge variant={passed ? 'default' : 'destructive'} className="mb-4">
              {passed ? 'Passed' : 'Failed'}
            </Badge>
            
            <p className="text-muted-foreground mb-6">
              {passed 
                ? 'Congratulations! You have successfully completed the quiz.'
                : 'You need at least 70% to pass. Review the lesson and try again.'
              }
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{quiz.filter(q => {
                  const userAnswers = answers[q.id] || [];
                  return arraysEqual(userAnswers.sort(), q.correctAnswers.sort());
                }).length}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{quiz.filter(q => {
                  const userAnswers = answers[q.id] || [];
                  return !arraysEqual(userAnswers.sort(), q.correctAnswers.sort());
                }).length}</div>
                <div className="text-sm text-muted-foreground">Incorrect</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={restartQuiz}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
              {passed && (
                <Button onClick={() => onComplete(score)}>
                  Continue to Next Lesson
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
            <Badge variant="outline">
              {currentQuestion.points} points
            </Badge>
          </div>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
          
          {currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false' ? (
            <RadioGroup
              value={answers[currentQuestion.id]?.[0]?.toString()}
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, parseInt(value))}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`option-${index}`}
                    checked={answers[currentQuestion.id]?.includes(index) || false}
                    onCheckedChange={(checked) => 
                      handleAnswerChange(currentQuestion.id, index, checked as boolean)
                    }
                  />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {showExplanation && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
                <p className="text-blue-800 text-sm">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {!showExplanation && answers[currentQuestion.id] && (
              <Button
                variant="outline"
                onClick={() => setShowExplanation(true)}
              >
                Show Explanation
              </Button>
            )}
            
            <Button
              onClick={nextQuestion}
              disabled={!answers[currentQuestion.id]}
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}