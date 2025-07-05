"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Reply,
  MoreHorizontal,
  Pin,
  Flag,
  Edit,
  Trash2,
  Search,
  Plus,
  Users,
  Clock,
  TrendingUp,
  Star,
  BookOpen,
  Filter,
  Eye,
  Heart,
  Share2,
} from "lucide-react";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: "student" | "instructor" | "admin";
    reputation: number;
  };
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  likes: number;
  dislikes: number;
  replies: number;
  views: number;
  isPinned: boolean;
  isSolved: boolean;
  isLocked: boolean;
  userVote?: "like" | "dislike" | null;
}

interface ForumReply {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: "student" | "instructor" | "admin";
    reputation: number;
  };
  createdAt: string;
  updatedAt?: string;
  likes: number;
  dislikes: number;
  userVote?: "like" | "dislike" | null;
  isAccepted?: boolean;
}

const mockPosts: ForumPost[] = [
  {
    id: "1",
    title: "How to handle async/await in React components?",
    content:
      "I'm having trouble understanding how to properly use async/await in React components. Can someone explain the best practices?",
    author: {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg",
      role: "student",
      reputation: 245,
    },
    category: "React",
    tags: ["react", "javascript", "async"],
    createdAt: "2024-01-15T10:30:00Z",
    likes: 12,
    dislikes: 1,
    replies: 8,
    views: 156,
    isPinned: false,
    isSolved: true,
    isLocked: false,
    userVote: null,
  },
  {
    id: "2",
    title: "Best practices for state management in large React apps",
    content:
      "What are the recommended approaches for managing state in large React applications? Redux, Context API, or something else?",
    author: {
      id: "2",
      name: "Michael Chen",
      avatar: "/avatars/michael.jpg",
      role: "student",
      reputation: 189,
    },
    category: "React",
    tags: ["react", "state-management", "redux"],
    createdAt: "2024-01-14T15:45:00Z",
    likes: 25,
    dislikes: 2,
    replies: 15,
    views: 342,
    isPinned: true,
    isSolved: false,
    isLocked: false,
    userVote: "like",
  },
];

const mockReplies: ForumReply[] = [
  {
    id: "1",
    postId: "1",
    content:
      "You should use useEffect with async functions inside it, not make the useEffect callback itself async. Here's an example...",
    author: {
      id: "3",
      name: "Dr. Michael Chen",
      avatar: "/avatars/instructor.jpg",
      role: "instructor",
      reputation: 1250,
    },
    createdAt: "2024-01-15T11:00:00Z",
    likes: 8,
    dislikes: 0,
    userVote: null,
    isAccepted: true,
  },
];

export function DiscussionForum() {
  const [posts, setPosts] = useState<ForumPost[]>(mockPosts);
  const [replies, setReplies] = useState<ForumReply[]>(mockReplies);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "instructor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "student":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const handleVote = (postId: string, voteType: "like" | "dislike") => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const currentVote = post.userVote;
          let newLikes = post.likes;
          let newDislikes = post.dislikes;
          let newUserVote: "like" | "dislike" | null = voteType;

          // Remove previous vote
          if (currentVote === "like") newLikes--;
          if (currentVote === "dislike") newDislikes--;

          // Add new vote or remove if same
          if (currentVote === voteType) {
            newUserVote = null;
          } else {
            if (voteType === "like") newLikes++;
            if (voteType === "dislike") newDislikes++;
          }

          return {
            ...post,
            likes: newLikes,
            dislikes: newDislikes,
            userVote: newUserVote,
          };
        }
        return post;
      })
    );
  };

  const handleCreatePost = () => {
    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        id: "current-user",
        name: "Current User",
        avatar: "/avatars/current.jpg",
        role: "student",
        reputation: 100,
      },
      category: newPost.category,
      tags: newPost.tags.split(",").map((tag) => tag.trim()),
      createdAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      replies: 0,
      views: 0,
      isPinned: false,
      isSolved: false,
      isLocked: false,
      userVote: null,
    };

    setPosts((prev) => [post, ...prev]);
    setNewPost({ title: "", content: "", category: "", tags: "" });
    setIsCreatePostOpen(false);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - b.dislikes - (a.likes - a.dislikes);
      case "replies":
        return b.replies - a.replies;
      case "views":
        return b.views - a.views;
      default: // recent
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  const categories = ["React", "JavaScript", "Node.js", "CSS", "General"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Discussion Forum</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Ask questions, share knowledge, and connect with the community
          </p>
        </div>

        <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
              <DialogDescription>
                Ask a question or start a discussion
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="What's your question or topic?"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={newPost.category}
                  onValueChange={(value) =>
                    setNewPost((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Tags</label>
                <Input
                  placeholder="react, javascript, help (comma separated)"
                  value={newPost.tags}
                  onChange={(e) =>
                    setNewPost((prev) => ({ ...prev, tags: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  placeholder="Describe your question or topic in detail..."
                  rows={6}
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost((prev) => ({ ...prev, content: e.target.value }))
                  }
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreatePostOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreatePost}
                  disabled={!newPost.title || !newPost.content}
                >
                  Create Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="text-xl font-bold">{posts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-xl font-bold">247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Solved</p>
                <p className="text-xl font-bold">
                  {posts.filter((p) => p.isSolved).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="replies">Most Replies</SelectItem>
                <SelectItem value="views">Most Views</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Avatar */}
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={post.author.avatar}
                    alt={post.author.name}
                  />
                  <AvatarFallback>
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {post.isPinned && (
                          <Pin className="w-4 h-4 text-blue-500" />
                        )}
                        <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer">
                          {post.title}
                        </h3>
                        {post.isSolved && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            <Star className="w-3 h-3 mr-1" />
                            Solved
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{post.author.name}</span>
                        <Badge className={getRoleColor(post.author.role)}>
                          {post.author.role}
                        </Badge>
                        <span>•</span>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </span>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Flag className="mr-2 h-4 w-4" />
                          Report
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Content Preview */}
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                    {post.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{post.category}</Badge>
                    {post.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(post.id, "like")}
                          className={
                            post.userVote === "like" ? "text-blue-600" : ""
                          }
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVote(post.id, "dislike")}
                          className={
                            post.userVote === "dislike" ? "text-red-600" : ""
                          }
                        >
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          {post.dislikes}
                        </Button>
                      </div>

                      <Button variant="ghost" size="sm">
                        <Reply className="w-4 h-4 mr-1" />
                        {post.replies} Replies
                      </Button>
                    </div>

                    <Button variant="outline" size="sm">
                      View Discussion
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedPosts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
              No posts found
            </h3>
            <p className="text-gray-500 dark:text-gray-500 mb-4">
              Try adjusting your search or filters, or create a new post
            </p>
            <Button onClick={() => setIsCreatePostOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Post
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
