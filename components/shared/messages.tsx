'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Plus,
  MoreVertical,
  Star,
  Archive,
  Trash2
} from 'lucide-react';

export function Messages() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock conversations data
  const conversations = [
    {
      id: 'conv-1',
      participants: [
        { id: 'user-2', name: 'Jane Smith', role: 'instructor', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
        { id: 'user-3', name: 'John Doe', role: 'learner', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
      ],
      lastMessage: {
        id: 'msg-1',
        senderId: 'user-2',
        content: 'Great question about React hooks! Let me explain...',
        timestamp: new Date('2024-01-20T10:30:00'),
        isRead: false,
      },
      subject: 'Question about React Hooks',
      courseId: 'course-1',
      courseName: 'React Fundamentals',
    },
    {
      id: 'conv-2',
      participants: [
        { id: 'user-1', name: 'Admin User', role: 'admin', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
        { id: 'user-3', name: 'John Doe', role: 'learner', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
      ],
      lastMessage: {
        id: 'msg-2',
        senderId: 'user-1',
        content: 'Your course completion certificate is ready for download.',
        timestamp: new Date('2024-01-19T15:45:00'),
        isRead: true,
      },
      subject: 'Certificate Ready',
      courseId: null,
      courseName: null,
    },
  ];

  // Mock messages for selected conversation
  const messages = [
    {
      id: 'msg-1',
      senderId: 'user-3',
      content: 'Hi! I have a question about React hooks. When should I use useEffect vs useLayoutEffect?',
      timestamp: new Date('2024-01-20T10:00:00'),
      isRead: true,
    },
    {
      id: 'msg-2',
      senderId: 'user-2',
      content: 'Great question about React hooks! Let me explain the difference:\n\nuseEffect runs after the DOM has been updated and painted, while useLayoutEffect runs synchronously after all DOM mutations but before the browser paints.\n\nUse useLayoutEffect when you need to make DOM measurements or mutations that the user should not see.',
      timestamp: new Date('2024-01-20T10:30:00'),
      isRead: true,
    },
    {
      id: 'msg-3',
      senderId: 'user-3',
      content: 'That makes sense! So useLayoutEffect is better for animations and DOM measurements?',
      timestamp: new Date('2024-01-20T10:35:00'),
      isRead: true,
    },
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const otherParticipant = selectedConv?.participants.find(p => p.id !== user?.id);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // TODO: Replace with actual backend call
    // Example: await messageService.sendMessage(selectedConversation, newMessage)
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground">
            Communicate with instructors, students, and administrators
          </p>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <Badge variant="secondary">{conversations.length}</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[480px]">
              <div className="space-y-1 p-4">
                {filteredConversations.map((conversation) => {
                  const otherUser = conversation.participants.find(p => p.id !== user?.id);
                  const isSelected = selectedConversation === conversation.id;
                  
                  return (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={otherUser?.avatar} alt={otherUser?.name} />
                          <AvatarFallback>
                            {otherUser?.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium truncate">
                              {otherUser?.name}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {conversation.lastMessage.timestamp.toLocaleDateString()}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.subject}
                          </p>
                          
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {conversation.lastMessage.content}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            {conversation.courseName && (
                              <Badge variant="outline" className="text-xs">
                                {conversation.courseName}
                              </Badge>
                            )}
                            
                            {!conversation.lastMessage.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2">
          {selectedConv ? (
            <>
              {/* Message Header */}
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={otherParticipant?.avatar} alt={otherParticipant?.name} />
                      <AvatarFallback>
                        {otherParticipant?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{otherParticipant?.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {otherParticipant?.role}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium">{selectedConv.subject}</h4>
                  {selectedConv.courseName && (
                    <Badge variant="outline" className="mt-1">
                      {selectedConv.courseName}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="p-0">
                <ScrollArea className="h-[360px] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const sender = selectedConv.participants.find(p => p.id === message.senderId);
                      const isCurrentUser = message.senderId === user?.id;
                      
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start space-x-2 max-w-[70%] ${
                            isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={sender?.avatar} alt={sender?.name} />
                              <AvatarFallback>
                                {sender?.name?.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className={`rounded-lg p-3 ${
                              isCurrentUser 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}>
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                isCurrentUser 
                                  ? 'text-primary-foreground/70' 
                                  : 'text-muted-foreground'
                              }`}>
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-end space-x-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[60px] max-h-[120px]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}