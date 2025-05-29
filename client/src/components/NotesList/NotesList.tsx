import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import NoteCard from './NoteCard';
import { Note } from '../../hooks/useFirebaseNotes';

interface NotesListProps {
  filteredNotes: Note[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (noteId: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({ 
  filteredNotes, 
  searchTerm, 
  setSearchTerm, 
  onEditNote, 
  onDeleteNote 
}) => {
  return (
    <div className="ml-64 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-white">My Notes</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredNotes.map(note => (
          <NoteCard 
            key={note.id}
            note={note}
            onEdit={onEditNote}
            onDelete={onDeleteNote}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <div className="text-center text-gray-400 mt-16">
          <p className="text-xl">No notes found</p>
          <p className="text-sm mt-2">Try adjusting your search or creating a new note</p>
        </div>
      )}
    </div>
  );
};

export default NotesList;
