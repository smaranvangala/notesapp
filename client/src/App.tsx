import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import NoteEditor from './components/NoteEditor/NoteEditor';
import NotesList from './components/NotesList/NotesList';
import { useNotes } from './hooks/useNotes';

const App = () => {
  const {
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
  } = useNotes();

  if (currentView === "edit" && editingNote) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <Sidebar 
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          tagSearchTerm={tagSearchTerm}
          setTagSearchTerm={setTagSearchTerm}
          getAllTags={getAllTags}
          showBackButton={true}
          onBack={goBackToNotes}
          onAddNote={addNote}
        />
        <NoteEditor 
          editingNote={editingNote}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editContent={editContent}
          setEditContent={setEditContent}
          onSave={saveNote}
          onCancel={goBackToNotes}
          isNewNote={isNewNote}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Sidebar 
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        tagSearchTerm={tagSearchTerm}
        setTagSearchTerm={setTagSearchTerm}
        getAllTags={getAllTags}
        showBackButton={false}
        onAddNote={addNote}
      />
      <NotesList 
        filteredNotes={filteredNotes}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onEditNote={openNoteEditor}
        onDeleteNote={deleteNote}
      />
    </div>
  );
};

export default App;
