import React, { useState } from 'react';
import { AIImage } from '../../types/ai-image';
import CommentSection from '../CommentSection/CommentSection';

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
  // 이미지별로 댓글을 관리하기 위한 상태
  const [commentsByImage, setCommentsByImage] = useState<Record<string, Comment[]>>({
    '1': [
      {
        id: '1',
        author: '캐릭터팬1',
        content: '정말 멋진 캐릭터네요! AI가 그린 그림이 너무 예뻐요.',
        timestamp: new Date('2024-01-15T10:30:00'),
        avatar: 'https://via.placeholder.com/32x32/4F46E5/FFFFFF?text=1'
      },
      {
        id: '2',
        author: '웹소설러버',
        content: '이 캐릭터가 웹소설에서 어떤 역할을 하는지 궁금해요.',
        timestamp: new Date('2024-01-15T11:15:00'),
        avatar: 'https://via.placeholder.com/32x32/10B981/FFFFFF?text=2'
      },
      {
        id: '3',
        author: 'AI아트팬',
        content: 'AI가 그린 그림이 원작과 정말 잘 맞네요!',
        timestamp: new Date('2024-01-15T12:00:00'),
        avatar: 'https://via.placeholder.com/32x32/F59E0B/FFFFFF?text=3'
      }
    ],
    '2': [
      {
        id: '4',
        author: '미케아팬',
        content: '미케아 가올드 캐릭터가 정말 매력적이네요!',
        timestamp: new Date('2024-01-15T13:00:00'),
        avatar: 'https://via.placeholder.com/32x32/4F46E5/FFFFFF?text=4'
      },
      {
        id: '5',
        author: '마법사팬',
        content: '전 회장이라는 설정이 정말 멋져요.',
        timestamp: new Date('2024-01-15T14:00:00'),
        avatar: 'https://via.placeholder.com/32x32/10B981/FFFFFF?text=5'
      }
    ],
    '3': [
      {
        id: '6',
        author: '아호아팬',
        content: '아호아 강난 캐릭터가 정말 예뻐요!',
        timestamp: new Date('2024-01-15T15:00:00'),
        avatar: 'https://via.placeholder.com/32x32/4F46E5/FFFFFF?text=6'
      },
      {
        id: '7',
        author: '비서실장팬',
        content: '비서실장이라는 포지션이 정말 멋져요.',
        timestamp: new Date('2024-01-15T16:00:00'),
        avatar: 'https://via.placeholder.com/32x32/10B981/FFFFFF?text=7'
      }
    ]
  });

  const handleAddComment = (comment: Comment) => {
    if (!image) return;
    
    setCommentsByImage(prev => ({
      ...prev,
      [image.id]: [comment, ...(prev[image.id] || [])]
    }));
  };

  // 현재 이미지의 댓글 가져오기
  const currentComments = image ? (commentsByImage[image.id] || []) : [];

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
              
              {/* 웹소설 제목 */}
              <div className="mb-6">
                <p className="text-lg text-primary font-semibold mb-2">
                  웹소설
                </p>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-gray-700">
                    {image.novelTitle}
                  </h3>
                  <button className="bg-black text-white text-sm px-3 py-1 rounded-md hover:bg-gray-800 transition-colors duration-200">
                    웹소설 보기
                  </button>
                </div>
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

            {/* 댓글 섹션 */}
            <CommentSection 
              comments={currentComments}
              onAddComment={handleAddComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
