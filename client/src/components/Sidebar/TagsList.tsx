import React from 'react';

interface TagsListProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  getAllTags: () => string[];
}

const TagsList: React.FC<TagsListProps> = ({ selectedTag, setSelectedTag, getAllTags }) => {
  return (
    <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
      <button
        onClick={() => setSelectedTag("")}
        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
          selectedTag === "" 
            ? "bg-cyan-500 text-white" 
            : "text-gray-300 hover:bg-slate-700"
        }`}
      >
        All Notes
      </button>
      {getAllTags().map(tag => (
        <button
          key={tag}
          onClick={() => setSelectedTag(tag)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
            selectedTag === tag 
              ? "bg-cyan-500 text-white" 
              : "text-gray-300 hover:bg-slate-700"
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};

export default TagsList;
