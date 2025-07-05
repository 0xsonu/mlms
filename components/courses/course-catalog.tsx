'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/lib/contexts/auth-context';
import { useTenant } from '@/lib/contexts/tenant-context';
import { mockCourses, mockEnrollments } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  Search, 
  Filter,
  Plus,
  Grid,
  List,
  Play,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';

export function CourseCatalog() {
  const { user } = useAuth();
  const { currentTenant } = useTenant();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  // Filter courses by tenant
  const tenantCourses = mockCourses.filter(course => course.tenantId === currentTenant?.id);
  
  // Get user enrollments
  const userEnrollments = mockEnrollments.filter(enrollment => enrollment.userId === user?.id);
  const enrolledCourseIds = userEnrollments.map(enrollment => enrollment.courseId);

  // Get unique categories and levels
  const categories = [...new Set(tenantCourses.map(course => course.category))];
  const levels = [...new Set(tenantCourses.map(course => course.level))];

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = tenantCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel && course.isPublished;
    });

    // Sort courses
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [tenantCourses, searchQuery, selectedCategory, selectedLevel, sortBy]);

  const handleEnroll = async (courseId: string) => {
    // TODO: Replace with actual backend call
    // Example: await courseService.enrollUser(courseId, user.id)
    console.log('Enrolling in course:', courseId);
    // Mock enrollment success
    alert('Successfully enrolled in course!');
  };

  const CourseCard = ({ course, isEnrolled }: { course: any; isEnrolled: boolean }) => {
    const enrollment = userEnrollments.find(e => e.courseId === course.id);
    
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-black/70 text-white">
              {course.category}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge variant={course.level === 'beginner' ? 'default' : course.level === 'intermediate' ? 'secondary' : 'destructive'}>
              {course.level}
            </Badge>
          </div>
          {isEnrolled && (
            <div className="absolute bottom-4 right-4">
              <Badge variant="default" className="bg-green-600">
                Enrolled
              </Badge>
            </div>
          )}
        </div>
        
        <CardHeader className="pb-3">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4" />
                <span>{course.lessons?.length || 0} lessons</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.8</span>
              </div>
            </div>
          </div>
          
          {enrollment && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{enrollment.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${enrollment.progress}%` }}
                />
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-lg font-bold text-green-600">
                ${course.price}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <Link href={`/dashboard/courses/${course.id}`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
              
              {isEnrolled ? (
                <Link href={`/dashboard/courses/${course.id}/learn`}>
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Continue
                  </Button>
                </Link>
              ) : (
                <Button size="sm" onClick={() => handleEnroll(course.id)}>
                  Enroll Now
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const CourseListItem = ({ course, isEnrolled }: { course: any; isEnrolled: boolean }) => {
    const enrollment = userEnrollments.find(e => e.courseId === course.id);
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-24 h-16 object-cover rounded-md flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold line-clamp-1 hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                    <Badge variant="outline">{course.category}</Badge>
                    <Badge variant={course.level === 'beginner' ? 'default' : course.level === 'intermediate' ? 'secondary' : 'destructive'}>
                      {course.level}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                  </div>
                  
                  {enrollment && (
                    <div className="mt-3 max-w-xs">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{enrollment.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-lg font-bold text-green-600">
                      ${course.price}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link href={`/dashboard/courses/${course.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    
                    {isEnrolled ? (
                      <Link href={`/dashboard/courses/${course.id}/learn`}>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Continue
                        </Button>
                      </Link>
                    ) : (
                      <Button size="sm" onClick={() => handleEnroll(course.id)}>
                        Enroll Now
                      </Button>
                    )}
                  </div>
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
          <h1 className="text-3xl font-bold text-foreground">Course Catalog</h1>
          <p className="text-muted-foreground">
            Discover and enroll in courses to advance your skills
          </p>
        </div>
        
        {(user?.role === 'admin' || user?.role === 'instructor') && (
          <Link href="/dashboard/courses/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </Link>
        )}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              
              {/* View Mode Toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Courses ({filteredCourses.length})</TabsTrigger>
          <TabsTrigger value="enrolled">
            My Courses ({filteredCourses.filter(course => enrolledCourseIds.includes(course.id)).length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({userEnrollments.filter(e => e.status === 'completed').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {filteredCourses.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or browse all available courses.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }>
              {filteredCourses.map(course => {
                const isEnrolled = enrolledCourseIds.includes(course.id);
                return viewMode === 'grid' ? (
                  <CourseCard key={course.id} course={course} isEnrolled={isEnrolled} />
                ) : (
                  <CourseListItem key={course.id} course={course} isEnrolled={isEnrolled} />
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="enrolled" className="space-y-6">
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredCourses
              .filter(course => enrolledCourseIds.includes(course.id))
              .map(course => {
                return viewMode === 'grid' ? (
                  <CourseCard key={course.id} course={course} isEnrolled={true} />
                ) : (
                  <CourseListItem key={course.id} course={course} isEnrolled={true} />
                );
              })}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredCourses
              .filter(course => {
                const enrollment = userEnrollments.find(e => e.courseId === course.id);
                return enrollment?.status === 'completed';
              })
              .map(course => {
                return viewMode === 'grid' ? (
                  <CourseCard key={course.id} course={course} isEnrolled={true} />
                ) : (
                  <CourseListItem key={course.id} course={course} isEnrolled={true} />
                );
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}