import { useState } from 'react';
import CoverFlow from '../../components/CoverFlow/CoverFlow';
import NovelList from '../../components/NovelList/NovelList';
import SearchBar from '../../components/SearchBar/SearchBar';
import { aiImages } from '../../data/ai-images';
import { novels } from '../../data/novels';
import { Novel } from '../../types/novel';

const HomePage = () => {
  const [filteredNovels, setFilteredNovels] = useState<Novel[]>(novels);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchResults = (results: Novel[], hasSearched?: boolean) => {
    setFilteredNovels(results);
    setHasSearched(hasSearched ?? true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 상단 그라데이션 배경 */}
      <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(52, 251, 134, 0.2) 0%, rgba(52, 251, 134, 0.1) 50%, transparent 100%)'
      }}></div>
      
      <div className="max-w-7xl mx-auto px-6 py-8 relative">
        {/* 상단 문구 */}
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2">
            웹소설 속 캐릭터를 설명해주세요!
          </h1>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            AI가 그려드립니다!
          </h1>
        </div>
        
        {/* 상단: AI 이미지 Cover Flow */}
        <section className="mb-16 mt-24">
          <div className="text-center">
            <p className="text-text-secondary text-lg md:text-xl lg:text-2xl font-medium">최애 웹소설 속 캐릭터들을 감상해보세요!</p>
          </div>
          <CoverFlow images={aiImages} />
        </section>

        {/* 하단: 시각화 대기 웹소설 목록 */}
        <section>
          <div className="text-center mb-10 mt-24">
            <h2 className="text-3xl font-bold text-text mb-3">웹소설</h2>
          </div>
          
          {/* 검색바 추가 */}
          <SearchBar novels={novels} onSearchResults={handleSearchResults} />
          
          {/* 검색 결과 표시 */}
          {hasSearched && filteredNovels.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
                검색 결과가 없습니다
              </div>
              <p className="text-gray-400">다른 검색어를 시도해보세요</p>
            </div>
          ) : (
            <NovelList novels={filteredNovels} />
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage 