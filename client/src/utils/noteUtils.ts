export const extractTags = (content: string): string[] => {
  const tagRegex = /#(\w+)/g;
  const matches = content.match(tagRegex);
  return matches ? matches.map(tag => tag.substring(1)) : [];
};

export const generateUniqueId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', { 
    month: 'short', 
    day: '2-digit', 
    year: 'numeric' 
  }).replace(',', '');
};

export const truncateText = (text: string, maxLength: number = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
