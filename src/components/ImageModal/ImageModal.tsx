import React from 'react';
import { AIImage } from '../../types/ai-image';

interface ImageModalProps {
  image: AIImage | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onClose }) => {
  if (!isOpen || !image) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown as any);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* 모달 컨테이너 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
          aria-label="닫기"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 컨텐츠 레이아웃 */}
        <div className="flex flex-col lg:flex-row h-full">
          {/* 왼쪽: 이미지 섹션 */}
          <div className="lg:w-1/2 relative">
            <img
              src={image.imageUrl}
              alt={image.characterName}
              className="w-full h-full object-cover"
            />
            
            {/* 이미지 하단 그라데이션 오버레이 */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* 오른쪽: 정보 섹션 */}
          <div className="lg:w-1/2 p-8 flex flex-col justify-center">
            <div className="mb-8">
              {/* 캐릭터 이름 */}
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {image.characterName}
              </h2>
              
              {/* 웹소설 제목 */}
              <div className="mb-6">
                <p className="text-lg text-primary font-semibold mb-2">
                  출처 웹소설
                </p>
                <h3 className="text-2xl font-bold text-gray-700">
                  {image.novelTitle}
                </h3>
              </div>
              
              {/* 캐릭터 설명 */}
              <div className="mb-8">
                <p className="text-lg text-gray-600 font-medium mb-3">
                  캐릭터 소개
                </p>
                <p className="text-gray-700 leading-relaxed text-base">
                  {image.description}
                </p>
              </div>

              {/* 추가 정보 (더미 데이터) */}
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1">캐릭터 성격</p>
                  <p className="text-gray-700">열정적이고 정의감이 강한 성격으로, 어려운 상황에서도 포기하지 않는 끈기를 가지고 있습니다.</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">특별한 능력</p>
                  <p className="text-gray-700">마법과 검술을 모두 구사할 수 있는 하이브리드 전사로, 상황에 따라 다양한 전투 스타일을 구사합니다.</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">스토리에서의 역할</p>
                  <p className="text-gray-700">주인공의 가장 신뢰할 수 있는 동료이자 전략가로서, 팀의 핵심 멤버 역할을 담당합니다.</p>
                </div>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="space-y-3">
              <button className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 text-lg">
                캐릭터 스케치 참여하기
              </button>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                웹소설 보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
