'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Search,
  BookOpen,
  Calendar,
  Tag
} from 'lucide-react';

interface LearningNotesProps {
  courseId: string;
  lessonId?: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  lessonId: string;
  lessonTitle: string;
  timestamp: Date;
  tags: string[];
}

export function LearningNotes({ courseId, lessonId }: LearningNotesProps) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 'note-1',
      title: 'React Hooks Overview',
      content: 'useState allows functional components to have state. useEffect handles side effects and lifecycle events. Remember to include dependencies in the dependency array.',
      lessonId: 'lesson-1',
      lessonTitle: 'Introduction to React',
      timestamp: new Date('2024-01-20T10:30:00'),
      tags: ['hooks', 'state', 'lifecycle'],
    },
    {
      id: 'note-2',
      title: 'Component Best Practices',
      content: 'Keep components small and focused. Use props for data flow. Avoid deep nesting. Consider using composition over inheritance.',
      lessonId: 'lesson-2',
      lessonTitle: 'Components and Props',
      timestamp: new Date('2024-01-20T11:15:00'),
      tags: ['components', 'best-practices', 'props'],
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: '',
  });

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: `note-${Date.now()}`,
      title: newNote.title,
      content: newNote.content,
      lessonId: lessonId || 'general',
      lessonTitle: 'Current Lesson',
      timestamp: new Date(),
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    setNotes(prev => [note, ...prev]);
    setNewNote({ title: '', content: '', tags: '' });
    setIsCreating(false);

    // TODO: Replace with actual backend call
    // Example: await notesService.createNote(courseId, note)
    console.log('Creating note:', note);
  };

  const handleUpdateNote = (noteId: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note =>
      note.id === noteId ? { ...note, ...updates } : note
    ));
    setEditingNote(null);

    // TODO: Replace with actual backend call
    // Example: await notesService.updateNote(noteId, updates)
    console.log('Updating note:', noteId, updates);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));

    // TODO: Replace with actual backend call
    // Example: await notesService.deleteNote(noteId)
    console.log('Deleting note:', noteId);
  };

  const NoteCard = ({ note }: { note: Note }) => {
    const isEditing = editingNote === note.id;
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content);
    const [editTags, setEditTags] = useState(note.tags.join(', '));

    const handleSave = () => {
      handleUpdateNote(note.id, {
        title: editTitle,
        content: editContent,
        tags: editTags.split(',').map(tag => tag.trim()).filter(Boolean),
      });
    };

    const handleCancel = () => {
      setEditTitle(note.title);
      setEditContent(note.content);
      setEditTags(note.tags.join(', '));
      setEditingNote(null);
    };

    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Note title"
              />
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Note content"
                rows={4}
              />
              <Input
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                placeholder="Tags (comma separated)"
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-3 w-3 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">{note.title}</h4>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingNote(note.id)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap">
                {note.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {note.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="h-2 w-2 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {note.timestamp.toLocaleDateString()}
                </div>
              </div>
              
              <div className="mt-2 text-xs text-muted-foreground">
                <span>From: {note.lessonTitle}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Learning Notes</span>
            </CardTitle>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Create Note Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Note title"
              value={newNote.title}
              onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              placeholder="Write your note here..."
              value={newNote.content}
              onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
            />
            <Input
              placeholder="Tags (comma separated)"
              value={newNote.tags}
              onChange={(e) => setNewNote(prev => ({ ...prev, tags: e.target.value }))}
            />
            <div className="flex space-x-2">
              <Button onClick={handleCreateNote}>
                <Save className="h-4 w-4 mr-2" />
                Save Note
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes List */}
      <div>
        {filteredNotes.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
              <p className="text-muted-foreground mb-4">
                Start taking notes to remember important concepts and insights.
              </p>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Note
              </Button>
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredNotes.map(note => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}