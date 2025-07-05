import React from 'react';
import { Novel } from '../../types/novel';

interface SearchBarProps {
  novels: Novel[];
  onSearchResults: (results: Novel[], hasSearched?: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ novels, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBy, setSearchBy] = React.useState<'title' | 'author' | 'tags'>('title');

  const handleSearch = () => {
    const filteredNovels = novels.filter((novel) => {
      const term = searchTerm.toLowerCase().trim();
      
      if (!term) return true;

      switch (searchBy) {
        case 'title':
          return novel.title.toLowerCase().includes(term);
        case 'author':
          return novel.author.toLowerCase().includes(term);
        case 'tags':
          return novel.tags.some(tag => tag.toLowerCase().includes(term));
        default:
          return novel.title.toLowerCase().includes(term) ||
                 novel.author.toLowerCase().includes(term) ||
                 novel.tags.some(tag => tag.toLowerCase().includes(term));
      }
    });

    onSearchResults(filteredNovels, true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };



  return (
    <div className="mb-6 md:mb-8">
      <div className="max-w-lg md:max-w-2xl mx-auto px-4 md:px-0">
        <div className="relative">
          {/* 검색 입력창과 버튼 */}
          <div className="flex">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="웹소설을 검색해보세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 pl-10 md:pl-12 pr-3 md:pr-4 text-sm md:text-base lg:text-lg border-2 border-gray-200 rounded-none focus:border-black focus:outline-none transition-colors duration-200 bg-white shadow-sm"
              />
              <svg
                className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            {/* 검색 버튼 */}
            <button
              onClick={handleSearch}
              className="px-3 md:px-4 lg:px-6 py-2.5 md:py-3 bg-black text-white font-semibold rounded-none hover:bg-[#16EF72] hover:text-black transition-colors duration-200 shadow-sm flex items-center gap-1 md:gap-2 border-l-0 text-xs md:text-sm lg:text-base"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">검색</span>
            </button>
            

          </div>

          {/* 검색 옵션 */}
          <div className="flex justify-center mt-3 md:mt-4 space-x-2 md:space-x-4">
            <label className="flex items-center space-x-1 md:space-x-2 cursor-pointer">
              <input
                type="radio"
                name="searchBy"
                value="title"
                checked={searchBy === 'title'}
                onChange={(e) => setSearchBy(e.target.value as 'title' | 'author' | 'tags')}
                className="text-primary focus:ring-primary"
              />
              <span className="text-xs md:text-sm text-gray-600">제목</span>
            </label>
            
            <label className="flex items-center space-x-1 md:space-x-2 cursor-pointer">
              <input
                type="radio"
                name="searchBy"
                value="author"
                checked={searchBy === 'author'}
                onChange={(e) => setSearchBy(e.target.value as 'title' | 'author' | 'tags')}
                className="text-primary focus:ring-primary"
              />
              <span className="text-xs md:text-sm text-gray-600">작가</span>
            </label>
            
            <label className="flex items-center space-x-1 md:space-x-2 cursor-pointer">
              <input
                type="radio"
                name="searchBy"
                value="tags"
                checked={searchBy === 'tags'}
                onChange={(e) => setSearchBy(e.target.value as 'title' | 'author' | 'tags')}
                className="text-primary focus:ring-primary"
              />
              <span className="text-xs md:text-sm text-gray-600">태그</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 