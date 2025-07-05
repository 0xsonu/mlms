'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/contexts/auth-context';
import { useTenant } from '@/lib/contexts/tenant-context';
import { mockCourses } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Save, 
  Eye, 
  Plus, 
  Trash2, 
  GripVertical, 
  Upload,
  FileText,
  Video,
  Image as ImageIcon,
  Settings,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CourseBuilderProps {
  courseId?: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number;
  order: number;
  isPreview: boolean;
}

interface CourseData {
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  currency: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  isPublished: boolean;
  lessons: Lesson[];
}

export function CourseBuilder({ courseId }: CourseBuilderProps) {
  const { user } = useAuth();
  const { currentTenant } = useTenant();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setSaving] = useState(false);
  const [courseData, setCourseData] = useState<CourseData>({
    title: '',
    description: '',
    price: 0,
    currency: 'USD',
    category: '',
    level: 'beginner',
    isPublished: false,
    lessons: [],
  });

  const isEditing = !!courseId;

  useEffect(() => {
    if (courseId) {
      // Load existing course data
      const existingCourse = mockCourses.find(c => c.id === courseId);
      if (existingCourse) {
        setCourseData({
          title: existingCourse.title,
          description: existingCourse.description,
          thumbnail: existingCourse.thumbnail,
          price: existingCourse.price,
          currency: existingCourse.currency,
          category: existingCourse.category,
          level: existingCourse.level,
          isPublished: existingCourse.isPublished,
          lessons: existingCourse.lessons || [],
        });
      }
    }
  }, [courseId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: Replace with actual backend call
      // Example: await courseService.saveCourse(courseData)
      console.log('Saving course:', courseData);
      
      // Mock save delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(isEditing ? 'Course updated successfully!' : 'Course created successfully!');
      
      if (!isEditing) {
        router.push('/dashboard/courses');
      }
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Error saving course. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    // Open preview in new tab
    window.open(`/dashboard/courses/${courseId || 'preview'}`, '_blank');
  };

  const addLesson = () => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: 'New Lesson',
      description: '',
      content: '',
      duration: 0,
      order: courseData.lessons.length + 1,
      isPreview: false,
    };
    
    setCourseData(prev => ({
      ...prev,
      lessons: [...prev.lessons, newLesson],
    }));
  };

  const updateLesson = (lessonId: string, updates: Partial<Lesson>) => {
    setCourseData(prev => ({
      ...prev,
      lessons: prev.lessons.map(lesson =>
        lesson.id === lessonId ? { ...lesson, ...updates } : lesson
      ),
    }));
  };

  const deleteLesson = (lessonId: string) => {
    setCourseData(prev => ({
      ...prev,
      lessons: prev.lessons.filter(lesson => lesson.id !== lessonId),
    }));
  };

  const moveLesson = (lessonId: string, direction: 'up' | 'down') => {
    const lessons = [...courseData.lessons];
    const index = lessons.findIndex(l => l.id === lessonId);
    
    if (direction === 'up' && index > 0) {
      [lessons[index], lessons[index - 1]] = [lessons[index - 1], lessons[index]];
    } else if (direction === 'down' && index < lessons.length - 1) {
      [lessons[index], lessons[index + 1]] = [lessons[index + 1], lessons[index]];
    }
    
    // Update order numbers
    lessons.forEach((lesson, idx) => {
      lesson.order = idx + 1;
    });
    
    setCourseData(prev => ({ ...prev, lessons }));
  };

  const categories = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'Design',
    'Business',
    'Marketing',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? 'Edit Course' : 'Create New Course'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? 'Update your course content and settings' : 'Build an engaging learning experience'}
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handlePreview} disabled={!courseData.title}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={isSaving || !courseData.title}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Course'}
          </Button>
        </div>
      </div>

      {/* Course Builder Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Course Title *</Label>
                    <Input
                      id="title"
                      value={courseData.title}
                      onChange={(e) => setCourseData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter course title"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      value={courseData.category} 
                      onValueChange={(value) => setCourseData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="level">Difficulty Level *</Label>
                    <Select 
                      value={courseData.level} 
                      onValueChange={(value: any) => setCourseData(prev => ({ ...prev, level: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="thumbnail">Course Thumbnail</Label>
                  <div className="mt-1 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    {courseData.thumbnail ? (
                      <img
                        src={courseData.thumbnail}
                        alt="Course thumbnail"
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                    ) : (
                      <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    )}
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended: 1280x720px, JPG or PNG
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Course Description *</Label>
                <Textarea
                  id="description"
                  value={courseData.description}
                  onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what students will learn in this course..."
                  rows={4}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Curriculum */}
        <TabsContent value="curriculum" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Course Curriculum</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {courseData.lessons.length} lessons • {courseData.lessons.reduce((total, lesson) => total + lesson.duration, 0)} minutes total
                  </p>
                </div>
                <Button onClick={addLesson}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lesson
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {courseData.lessons.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No lessons yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start building your course by adding your first lesson.
                  </p>
                  <Button onClick={addLesson}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Lesson
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {courseData.lessons
                    .sort((a, b) => a.order - b.order)
                    .map((lesson, index) => (
                      <Card key={lesson.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex flex-col items-center space-y-2">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                {lesson.order}
                              </div>
                              <div className="flex flex-col space-y-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => moveLesson(lesson.id, 'up')}
                                  disabled={index === 0}
                                  className="h-6 w-6 p-0"
                                >
                                  ↑
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => moveLesson(lesson.id, 'down')}
                                  disabled={index === courseData.lessons.length - 1}
                                  className="h-6 w-6 p-0"
                                >
                                  ↓
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex-1 space-y-3">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                  <Label>Lesson Title</Label>
                                  <Input
                                    value={lesson.title}
                                    onChange={(e) => updateLesson(lesson.id, { title: e.target.value })}
                                    placeholder="Enter lesson title"
                                  />
                                </div>
                                <div>
                                  <Label>Duration (minutes)</Label>
                                  <Input
                                    type="number"
                                    value={lesson.duration}
                                    onChange={(e) => updateLesson(lesson.id, { duration: parseInt(e.target.value) || 0 })}
                                    placeholder="0"
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <Label>Description</Label>
                                <Textarea
                                  value={lesson.description}
                                  onChange={(e) => updateLesson(lesson.id, { description: e.target.value })}
                                  placeholder="Describe what this lesson covers..."
                                  rows={2}
                                />
                              </div>
                              
                              <div>
                                <Label>Video URL (optional)</Label>
                                <Input
                                  value={lesson.videoUrl || ''}
                                  onChange={(e) => updateLesson(lesson.id, { videoUrl: e.target.value })}
                                  placeholder="https://..."
                                />
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    checked={lesson.isPreview}
                                    onCheckedChange={(checked) => updateLesson(lesson.id, { isPreview: checked })}
                                  />
                                  <Label>Free preview</Label>
                                </div>
                                
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteLesson(lesson.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing */}
        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      value={courseData.price}
                      onChange={(e) => setCourseData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                      placeholder="0.00"
                      className="pl-10"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    value={courseData.currency} 
                    onValueChange={(value) => setCourseData(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Pricing Guidelines</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Consider your target audience and market rates</li>
                  <li>• Factor in the course length and depth of content</li>
                  <li>• You can always adjust pricing later</li>
                  <li>• Free courses can help build your audience</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Publish Course</Label>
                  <p className="text-sm text-muted-foreground">
                    Make this course visible to students
                  </p>
                </div>
                <Switch
                  checked={courseData.isPublished}
                  onCheckedChange={(checked) => setCourseData(prev => ({ ...prev, isPublished: checked }))}
                />
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Publishing Checklist</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    {courseData.title ? (
                      <Badge variant="default" className="bg-green-600">✓</Badge>
                    ) : (
                      <Badge variant="destructive">✗</Badge>
                    )}
                    <span>Course title added</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {courseData.description ? (
                      <Badge variant="default" className="bg-green-600">✓</Badge>
                    ) : (
                      <Badge variant="destructive">✗</Badge>
                    )}
                    <span>Course description added</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {courseData.lessons.length > 0 ? (
                      <Badge variant="default" className="bg-green-600">✓</Badge>
                    ) : (
                      <Badge variant="destructive">✗</Badge>
                    )}
                    <span>At least one lesson added</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {courseData.price >= 0 ? (
                      <Badge variant="default" className="bg-green-600">✓</Badge>
                    ) : (
                      <Badge variant="destructive">✗</Badge>
                    )}
                    <span>Pricing set</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}