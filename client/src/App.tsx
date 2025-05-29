import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import NoteEditor from './components/NoteEditor/NoteEditor';
import NotesList from './components/NotesList/NotesList';
import { useFirebaseNotes } from './hooks/useFirebaseNotes';

const App = () => {
  const {
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
  } = useFirebaseNotes();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading your notes...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Connection Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <p className="text-sm text-gray-400">
            Please check your Firebase configuration and ensure you have the correct API keys set up.
          </p>
        </div>
      </div>
    );
  }

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
