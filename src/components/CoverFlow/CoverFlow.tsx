import React, { useState } from 'react';
import { AIImage } from '../../types/ai-image';
import ImageModal from '../ImageModal/ImageModal';

interface CoverFlowProps {
  images: AIImage[];
}

const CoverFlow: React.FC<CoverFlowProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedImage, setSelectedImage] = useState<AIImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const len = images.length;

  const handleImageClick = (image: AIImage) => {
    console.log('Image clicked:', image);
    setSelectedImage(image);
    setIsModalOpen(true);
    console.log('Modal state set to open');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + len) % len);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % len);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  if (len === 0) {
    return (
      <div className="coverflow-container flex items-center justify-center bg-gray-100 rounded-lg">
        <span className="text-gray-400">AI 이미지가 없습니다</span>
      </div>
    );
  }

  return (
    <>
      <div className="coverflow-container relative overflow-hidden min-h-[60vh]">
        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="이전"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-start justify-center relative h-full min-h-[550px] md:min-h-[650px] lg:min-h-[750px] xl:min-h-[850px] pt-16">
          {images.map((image, index) => {
            // 현재 이미지를 기준으로 상대적 위치 계산
            let distance = index - currentIndex;
            
            // 순환 배열에서 최단 거리 계산
            if (distance > len / 2) {
              distance -= len;
            } else if (distance < -len / 2) {
              distance += len;
            }
            
            // 보이는 범위(-1, 0, 1)가 아닌 이미지는 숨김
            if (Math.abs(distance) > 1) {
              return null;
            }

            const isActive = distance === 0;
            const rotationY = distance * 25;
            const translateX = distance * 420;
            const translateZ = isActive ? 0 : -100;
            const scale = isActive ? 1 : 0.8;
            const opacity = isActive ? 1 : 0.7;

            return (
              <div
                key={image.id} // 이미지 ID로 고정된 key 사용
                className="absolute transition-all duration-700 ease-in-out cursor-pointer transform-gpu"
                style={{
                  transform: `perspective(1200px) rotateY(${rotationY}deg) translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
                  opacity: opacity,
                  zIndex: isActive ? 20 : 10
                }}
                onClick={() => handleImageClick(image)}
              >
                <div className="relative group">
                  <img
                    src={image.imageUrl}
                    alt={image.characterName}
                    className="w-72 h-96 md:w-80 md:h-[28rem] lg:w-88 lg:h-[32rem] xl:w-[26rem] xl:h-[36rem] object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                  />
                  
                  {/* 양옆 이미지용 오버레이 (중앙이 아닐 때만) */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/20 rounded-2xl" />
                  )}
                  
                  {/* 호버 효과 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* 중앙 이미지 정보 표시 */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-6 rounded-b-2xl">
                      <h3 className="font-bold text-xl mb-1">{image.characterName}</h3>
                      <p className="text-sm opacity-90 font-medium">{image.novelTitle}</p>
                      <p className="text-xs opacity-75 mt-1">{image.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="다음"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* 인디케이터 */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 700);
                }
              }}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 disabled:cursor-not-allowed ${
                index === currentIndex ? 'bg-primary shadow-lg' : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={index === currentIndex ? '현재' : `카드 ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 이미지 모달 */}
      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default CoverFlow;
