import React from 'react';
import { Note } from '../../hooks/useNotes';

interface NoteEditorProps {
  editingNote: Note | null;
  editTitle: string;
  setEditTitle: (title: string) => void;
  editContent: string;
  setEditContent: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isNewNote: boolean;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ 
  editingNote, 
  editTitle, 
  setEditTitle, 
  editContent, 
  setEditContent, 
  onSave, 
  onCancel,
  isNewNote 
}) => {
  if (!editingNote) return null;

  return (
    <div className="ml-64 p-8 max-w-4xl">
      {/* Editable Title */}
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="text-4xl font-bold mb-8 bg-transparent border-none outline-none w-full text-white placeholder-gray-400 border-b border-gray-600 pb-2"
        placeholder="Enter note title..."
      />

      {/* Note Content Editor */}
      <div className="bg-slate-800 rounded-lg p-6">
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full h-96 bg-transparent border-none outline-none resize-none text-white placeholder-gray-400 text-lg leading-relaxed"
          placeholder="Start writing your note..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={onSave}
          className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium"
        >
          Save Note
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>

      {/* Note Info */}
      <div className="mt-8 text-gray-400 text-sm">
        {editingNote.date && (
          <p>Created: {editingNote.date}</p>
        )}
        <p>Last modified: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default NoteEditor;
