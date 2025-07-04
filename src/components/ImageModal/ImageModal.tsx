import React, { useState } from 'react';
import { AIImage } from '../../types/ai-image';
import CommentSection from '../CommentSection/CommentSection';
import CommentManager from '../CommentManager/CommentManager';
import CharacterInfo from '../CharacterInfo/CharacterInfo';

interface ImageModalProps {
  image: AIImage | null;
  isOpen: boolean;
  onClose: () => void;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  avatar?: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, isOpen, onClose }) => {
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

  if (!isOpen || !image) return null;

  console.log('Modal rendering with:', { isOpen, image });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* 모달 컨테이너 */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-7xl w-full h-[95vh] flex flex-col">
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
              onError={(e) => {
                console.error('Image failed to load:', image.imageUrl);
                console.error('Error event:', e);
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', image.imageUrl);
              }}
            />
            
            {/* 이미지 하단 그라데이션 오버레이 */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* 오른쪽: 정보 섹션 */}
          <div className="lg:w-1/2 flex flex-col overflow-y-auto">
            {/* 상단 정보 */}
            <div className="p-8 flex-shrink-0">
              {/* 웹소설 제목 */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-4xl font-bold text-gray-700">
                    {image.novelTitle}
                  </h3>
                  <button className="bg-black text-[#00DC64] text-sm px-3 py-1 rounded-md hover:bg-gray-800 transition-colors duration-200">
                    웹소설 보기
                  </button>
                </div>
              </div>

              {/* 캐릭터 이름과 소개 */}
              <div className="mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {image.characterName}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-base mt-2">
                    {image.description}
                  </p>
                </div>
              </div>

              {/* 캐릭터 상세 정보 */}
              <div className="mt-16">
                <CharacterInfo image={image} />
              </div>
            </div>

            {/* 댓글 섹션 */}
            <CommentManager imageId={image.id}>
              {(comments, onAddComment) => (
                <CommentSection 
                  comments={comments}
                  onAddComment={onAddComment}
                />
              )}
            </CommentManager>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
