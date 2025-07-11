import React, { useCallback } from 'react';
import { AIImage } from '../../types/ai-image';
import CommentSection from '../CommentSection/CommentSection';
import CommentManager from '../CommentManager/CommentManager';
import CharacterInfo from '../CharacterInfo/CharacterInfo';

interface ImageModalProps {
  image: AIImage | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onClose }) => {
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // 웹소설 보기 버튼 클릭 핸들러
  const handleNovelView = useCallback(() => {
    if (image?.novelTitle === '무한의 마법사') {
      window.open('https://series.naver.com/novel/detail.series?productNo=2362844', '_blank');
    }
  }, [image?.novelTitle]);

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown as any);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // 이미지 로드 핸들러 메모화
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Image failed to load:', image?.imageUrl);
    console.error('Error event:', e);
  }, [image?.imageUrl]);

  const handleImageLoad = useCallback(() => {
    console.log('Image loaded successfully:', image?.imageUrl);
  }, [image?.imageUrl]);

  if (!isOpen || !image) return null;

  console.log('Modal rendering with:', { isOpen, image });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-2 md:p-4 pt-4 md:pt-4"
      onClick={handleBackdropClick}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* 모달 컨테이너 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-7xl w-full h-[90vh] md:h-[90vh] flex flex-col">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-2 md:top-4 right-2 md:right-4 z-10 bg-white/90 hover:bg-white p-1.5 md:p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
          aria-label="닫기"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 컨텐츠 레이아웃 */}
        <div className="flex flex-col lg:flex-row h-full">
          {/* 왼쪽: 이미지 섹션 */}
          <div className="h-48 md:h-64 lg:h-auto lg:w-1/2 relative">
            <img
              src={image.imageUrl}
              alt={image.characterName}
              className="w-full h-full object-cover"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            
            {/* 이미지 하단 그라데이션 오버레이 */}
            <div className="absolute bottom-0 left-0 right-0 h-16 md:h-32 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* 오른쪽: 정보+댓글 전체 스크롤 영역 - 최적화된 스크롤 */}
          <div className="flex-1 lg:w-1/2 h-full overflow-y-auto overscroll-contain will-change-scroll" 
               style={{ 
                 scrollBehavior: 'auto',
                 transform: 'translateZ(0)', // 하드웨어 가속 활성화
                 WebkitOverflowScrolling: 'touch' // iOS 최적화
               }}>
            {/* 상단 정보 */}
            <div className="p-3 md:p-4 lg:p-8">
              {/* 웹소설 제목 */}
              <div className="mb-4 md:mb-6">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                  <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-700">
                    {image.novelTitle}
                  </h3>
                  <button 
                    onClick={handleNovelView}
                    className="bg-black text-[#00DC64] text-xs md:text-sm px-2 md:px-3 py-1 rounded-md hover:bg-gray-800 transition-colors duration-200 self-start md:self-auto"
                  >
                    웹소설 보기
                  </button>
                </div>
              </div>

              {/* 캐릭터 이름과 소개 */}
              <div className="mb-4 md:mb-6">
                <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 mb-2 md:mb-4">
                  <h2 className="text-lg md:text-xl lg:text-3xl font-bold text-gray-800">
                    {image.characterName}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base mt-1 md:mt-2">
                    {image.description}
                  </p>
                </div>
              </div>

              {/* 캐릭터 상세 정보 */}
              <div className="mt-8 md:mt-16">
                <CharacterInfo image={image} />
              </div>
            </div>

            {/* 댓글 섹션 - 고정 위치 최적화 */}
            <div className="relative" style={{ transform: 'translateZ(0)' }}>
              <CommentManager imageId={image.id}>
                {(comments, onAddComment) => (
                  <CommentSection 
                    comments={comments}
                    onAddComment={onAddComment}
                    imageId={image.id}
                  />
                )}
              </CommentManager>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;

