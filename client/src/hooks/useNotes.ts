import { useState } from 'react';
import { extractTags, generateUniqueId } from '../utils/noteUtils';
import { NOTE_COLORS } from '../constants/colors';

export interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
  color: string;
  lastModified: number;
  tags: string[];
}

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "My First Note",
      content: "this is a paragraph written in the notes #personal #ideas",
      date: "May 22/2020",
      color: "bg-yellow-200",
      lastModified: new Date('2020-05-22').getTime(),
      tags: ["personal", "ideas"]
    },
    {
      id: 2,
      title: "Important Thoughts",
      content: "this is a paragraph written in the notes #work #meeting",
      date: "",
      color: "bg-orange-400",
      lastModified: new Date('2024-01-15').getTime(),
      tags: ["work", "meeting"]
    },
    {
      id: 3,
      title: "Daily Reflection",
      content: "this is a paragraph written in the notes #personal #journal",
      date: "",
      color: "bg-red-900",
      lastModified: new Date('2024-02-10').getTime(),
      tags: ["personal", "journal"]
    },
    {
      id: 4,
      title: "Meeting Notes",
      content: "this is a paragraph written in the notes #work #project",
      date: "",
      color: "bg-blue-300",
      lastModified: new Date('2024-03-05').getTime(),
      tags: ["work", "project"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<"notes" | "edit">("notes");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [isNewNote, setIsNewNote] = useState(false);

  const addNote = () => {
    const randomColor = NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
    const now = Date.now();
    const newNote: Note = {
      id: now,
      title: "Untitled Note",
      content: "Start writing your note here...",
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric' 
      }).replace(',', ''),
      color: randomColor,
      lastModified: now,
      tags: []
    };
    setIsNewNote(true);
    openNoteEditor(newNote);
  };

  const getAllTags = () => {
    const allTags = notes.flatMap(note => note.tags);
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.filter(tag => 
      tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
    );
  };

  const openNoteEditor = (note: Note) => {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setCurrentView("edit");
  };

  const saveNote = () => {
    if (!editingNote) return;
    
    const now = Date.now();
    const tags = extractTags(editContent);
    
    if (isNewNote) {
      const hasChanges = editTitle !== "Untitled Note" || editContent !== "Start writing your note here...";
      
      if (hasChanges) {
        const updatedNote = { 
          ...editingNote, 
          title: editTitle, 
          content: editContent, 
          lastModified: now, 
          tags 
        };
        setNotes([updatedNote, ...notes]);
      }
      setIsNewNote(false);
    } else {
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, title: editTitle, content: editContent, lastModified: now, tags }
          : note
      ).sort((a, b) => b.lastModified - a.lastModified));
    }
    
    setCurrentView("notes");
    setEditingNote(null);
    setEditTitle("");
    setEditContent("");
  };

  const goBackToNotes = () => {
    if (isNewNote) {
      setIsNewNote(false);
    }
    setCurrentView("notes");
    setEditingNote(null);
    setEditTitle("");
    setEditContent("");
  };

  const deleteNote = (noteId: number) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const filteredNotes = notes
    .filter(note => {
      const matchesSearch = note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === "" || note.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => b.lastModified - a.lastModified);

  return {
    notes,
    currentView,
    editingNote,
    searchTerm,
    selectedTag,
    tagSearchTerm,
    isNewNote,
    setSearchTerm,
    setSelectedTag,
    setTagSearchTerm,
    addNote,
    deleteNote,
    openNoteEditor,
    saveNote,
    goBackToNotes,
    editTitle,
    setEditTitle,
    editContent,
    setEditContent,
    filteredNotes,
    getAllTags
  };
};
