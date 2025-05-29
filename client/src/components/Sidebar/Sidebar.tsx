import React from 'react';
import { Search, Plus, ArrowLeft } from 'lucide-react';
import TagsList from './TagsList';

interface SidebarProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  tagSearchTerm: string;
  setTagSearchTerm: (term: string) => void;
  getAllTags: () => string[];
  showBackButton?: boolean;
  onBack?: () => void;
  onAddNote: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedTag, 
  setSelectedTag, 
  tagSearchTerm, 
  setTagSearchTerm, 
  getAllTags,
  showBackButton = false,
  onBack,
  onAddNote 
}) => {
  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-slate-800 flex flex-col py-6 px-4">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4 p-2">
          <img 
            src="@assets/logo.png" 
            alt="Notes App Logo"
            className="w-full h-full object-contain"
          />
        </div>
        
        {showBackButton ? (
          <button 
            onClick={onBack}
            className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center hover:bg-slate-500 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        ) : (
          <button 
            onClick={onAddNote}
            className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center hover:bg-slate-500 hover:scale-110 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl"
          >
            <Plus size={24} />
          </button>
        )}
      </div>

      {/* Tags Section */}
      <div className="flex-1 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Tags</h3>
          <div className="relative">
            <Search 
              size={16} 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              placeholder="Search tags..."
              value={tagSearchTerm}
              onChange={(e) => setTagSearchTerm(e.target.value)}
              className="w-32 bg-slate-700 border-none outline-none pl-7 pr-2 py-1 text-xs text-white placeholder-gray-400 rounded"
            />
          </div>
        </div>
        
        <TagsList 
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          getAllTags={getAllTags}
        />
      </div>
    </div>
  );
};

export default Sidebar;
