import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { Note } from '../../hooks/useNotes';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (noteId: number) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
    }
  };

  const handleEdit = () => {
    onEdit(note);
  };

  const getTextColor = (bgColor: string) => {
    const darkBackgrounds = ['bg-red-900'];
    return darkBackgrounds.includes(bgColor) ? 'text-white' : 'text-gray-800';
  };

  const getTagColor = (bgColor: string) => {
    const darkBackgrounds = ['bg-red-900'];
    return darkBackgrounds.includes(bgColor) 
      ? 'bg-white text-gray-800' 
      : 'bg-gray-800 text-white';
  };

  const getButtonColor = (bgColor: string) => {
    const darkBackgrounds = ['bg-red-900'];
    return darkBackgrounds.includes(bgColor) 
      ? 'hover:bg-red-800' 
      : 'hover:bg-gray-200';
  };

  const textColor = getTextColor(note.color);
  const tagColor = getTagColor(note.color);
  const buttonColor = getButtonColor(note.color);

  return (
    <div 
      className={`${note.color} rounded-lg p-4 cursor-pointer transform hover:scale-105 transition-all duration-200 relative group min-h-[200px] flex flex-col`}
      onClick={handleEdit}
    >
      {/* Action Buttons */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button
          onClick={handleEdit}
          className={`w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center ${buttonColor} transition-all`}
        >
          <Edit3 size={14} className={textColor} />
        </button>
        <button
          onClick={handleDelete}
          className={`w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center ${buttonColor} transition-all`}
        >
          <Trash2 size={14} className="text-red-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className={`font-semibold ${textColor} mb-2 line-clamp-2`}>{note.title}</h3>
        <p className={`${textColor} text-sm flex-1 line-clamp-4 mb-3`}>{note.content}</p>
        
        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {note.tags.slice(0, 3).map(tag => (
              <span 
                key={tag}
                className={`text-xs ${tagColor} px-2 py-1 rounded-full`}
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className={`text-xs ${tagColor} px-2 py-1 rounded-full`}>
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Date */}
        <div className={`text-xs ${textColor} opacity-80`}>
          {note.date || new Date(note.lastModified).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
