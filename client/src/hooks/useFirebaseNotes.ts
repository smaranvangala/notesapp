import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { extractTags } from '../utils/noteUtils';

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  color: string;
  lastModified: number;
  tags: string[];
}

export const useFirebaseNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<"notes" | "edit">("notes");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const [isNewNote, setIsNewNote] = useState(false);

  const notesCollection = collection(db, 'notes');

  // Load notes from Firebase
  const loadNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const q = query(notesCollection, orderBy('lastModified', 'desc'));
      const querySnapshot = await getDocs(q);
      const loadedNotes: Note[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        loadedNotes.push({
          id: doc.id,
          title: data.title,
          content: data.content,
          date: data.date,
          color: data.color,
          lastModified: data.lastModified,
          tags: data.tags || []
        });
      });
      
      setNotes(loadedNotes);
    } catch (err) {
      console.error('Error loading notes:', err);
      setError('Failed to load notes. Please check your Firebase configuration.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const colors = [
    "bg-yellow-200",
    "bg-orange-400", 
    "bg-red-900",
    "bg-blue-300",
    "bg-green-300",
    "bg-purple-300",
    "bg-pink-300"
  ];

  const addNote = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const now = Date.now();
    const newNote: Note = {
      id: '', // Will be set by Firebase
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
    const uniqueTags = Array.from(new Set(allTags));
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

  const saveNote = async () => {
    if (!editingNote) return;
    
    try {
      const now = Date.now();
      const tags = extractTags(editContent);
      
      if (isNewNote) {
        const hasChanges = editTitle !== "Untitled Note" || editContent !== "Start writing your note here...";
        
        if (hasChanges) {
          const noteData = {
            title: editTitle,
            content: editContent,
            date: editingNote.date,
            color: editingNote.color,
            lastModified: now,
            tags
          };
          
          await addDoc(notesCollection, noteData);
          await loadNotes(); // Reload notes from Firebase
        }
        setIsNewNote(false);
      } else {
        // Update existing note
        const noteRef = doc(db, 'notes', editingNote.id);
        await updateDoc(noteRef, {
          title: editTitle,
          content: editContent,
          lastModified: now,
          tags
        });
        await loadNotes(); // Reload notes from Firebase
      }
      
      setCurrentView("notes");
      setEditingNote(null);
      setEditTitle("");
      setEditContent("");
    } catch (err) {
      console.error('Error saving note:', err);
      setError('Failed to save note. Please try again.');
    }
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

  const deleteNote = async (noteId: string) => {
    try {
      await deleteDoc(doc(db, 'notes', noteId));
      await loadNotes(); // Reload notes from Firebase
    } catch (err) {
      console.error('Error deleting note:', err);
      setError('Failed to delete note. Please try again.');
    }
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
    loading,
    error,
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