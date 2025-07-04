import React from 'react';
import CoverFlow from '../../components/CoverFlow/CoverFlow';
import NovelList from '../../components/NovelList/NovelList';
import { aiImages } from '../../data/ai-images';
import { novels } from '../../data/novels';

const HomePage = () => {
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
            <p className="text-text-secondary">최애 웹소설 속 캐릭터들을 감상해보세요!</p>
          </div>
          <CoverFlow images={aiImages} />
        </section>

        {/* 하단: 시각화 대기 웹소설 목록 */}
        <section>
          <div className="text-center mb-10 mt-24">
            <h2 className="text-3xl font-bold text-text mb-3">웹소설</h2>
            <p className="text-text-secondary">참여하고 싶은 웹소설을 선택해주세요</p>
          </div>
          <NovelList novels={novels} />
        </section>
      </div>
    </div>
  );
};

export default HomePage 