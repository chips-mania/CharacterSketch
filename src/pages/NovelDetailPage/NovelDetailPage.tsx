import React, { useState } from 'react';
import { aiImages } from '../../data/ai-images';
import { AIImage } from '../../types/ai-image';
import ImageModal from '../../components/ImageModal/ImageModal';

const NovelDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState<AIImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image: AIImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 상단 그라데이션 배경 */}
      <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(52, 251, 134, 0.2) 0%, rgba(52, 251, 134, 0.1) 50%, transparent 100%)'
      }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* 페이지 제목 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            AI 생성 캐릭터 갤러리
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            웹소설 속 캐릭터들이 AI로 재탄생했습니다
          </p>
        </div>

        {/* 이미지 갤러리 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {aiImages.map((image) => (
            <div 
              key={image.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg bg-white">
                <img
                  src={image.imageUrl}
                  alt={image.characterName}
                  className="w-full h-96 md:h-[28rem] lg:h-[32rem] object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold mb-1">{image.characterName}</h3>
                  <p className="text-sm opacity-90">{image.novelTitle}</p>
                  <p className="text-xs opacity-75 mt-1">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 이미지 개수 표시 */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            총 <span className="font-semibold text-black">{aiImages.length}</span>개의 AI 생성 캐릭터
          </p>
        </div>
      </div>

      {/* 이미지 모달 */}
      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default NovelDetailPage; 