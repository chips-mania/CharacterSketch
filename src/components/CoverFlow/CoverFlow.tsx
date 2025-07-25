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

        <div className="flex items-start justify-center relative h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] xl:min-h-[700px] pt-16">
          {images.map((image, index) => {
            // 현재 이미지를 기준으로 상대적 위치 계산
            let distance = index - currentIndex;
            
            // 순환 배열에서 최단 거리 계산
            if (distance > len / 2) {
              distance -= len;
            } else if (distance < -len / 2) {
              distance += len;
            }
            
            // 보이는 범위를 늘려서 더 자연스럽게 (-2, -1, 0, 1, 2)
            if (Math.abs(distance) > 2) {
              return null;
            }

            const isActive = distance === 0;
            const rotationY = distance * 20; // 회전 각도를 줄여서 더 자연스럽게
            const translateX = distance * 280; // 간격을 줄여서 더 자연스럽게
            const translateZ = isActive ? 0 : -80; // Z축 이동을 줄여서 더 자연스럽게
            const scale = isActive ? 1 : 0.85; // 스케일 차이를 줄여서 더 자연스럽게
            
            // 투명도 계산: 중앙이 가장 선명, 외각으로 갈수록 약간 투명해짐
            const opacity = isActive ? 1 : Math.abs(distance) === 1 ? 1 : 0.7;
            
            // z-index 계산: 중앙이 가장 앞, 외각으로 갈수록 뒤로
            // 애니메이션 중에는 새로 나타나는 이미지를 더 뒤로
            const zIndex = isActive ? 20 : Math.abs(distance) === 1 ? 15 : isTransitioning ? 5 : 10;

            return (
              <div
                key={image.id} // 이미지 ID로 고정된 key 사용
                className="absolute transition-all duration-700 ease-in-out cursor-pointer transform-gpu"
                style={{
                  transform: `perspective(1200px) rotateY(${rotationY}deg) translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex
                }}
                onClick={() => handleImageClick(image)}
              >
                <div className="relative group">
                  <img
                    src={image.imageUrl}
                    alt={image.characterName}
                    className="w-56 h-72 md:w-64 md:h-80 lg:w-72 lg:h-96 xl:w-80 xl:h-[28rem] object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                  />
                  
                  {/* 양옆 이미지용 오버레이 (중앙이 아닐 때만) */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/15 rounded-2xl" />
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
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-3">
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
                index === currentIndex ? 'bg-black shadow-lg' : 'bg-black/40 hover:bg-black/60'
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
