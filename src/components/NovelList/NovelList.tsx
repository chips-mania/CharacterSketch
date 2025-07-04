import React from 'react';
import { Novel } from '../../types/novel';

interface NovelListProps {
  novels: Novel[];
}

const NovelList: React.FC<NovelListProps> = ({ novels }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {novels.map((novel) => (
        <div
          key={novel.id}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 max-w-sm mx-auto"
        >
          {/* 커버 이미지 */}
          <div className="relative h-72 md:h-80 lg:h-88 xl:h-96 bg-gradient-to-br from-primary/20 to-primary/10">
            {novel.coverImage && (
              <img
                src={novel.coverImage}
                alt={novel.title}
                className="w-full h-full object-cover"
              />
            )}
            {/* 강화된 하단 음영 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg">{novel.title}</h3>
              <p className="text-white/90 text-sm drop-shadow-md">{novel.author}</p>
            </div>
          </div>

          {/* 소설 정보 */}
          <div className="p-6 flex flex-col h-24 md:h-32 lg:h-40 xl:h-48">
            <p className="text-text-secondary text-sm mb-4 line-clamp-2 md:line-clamp-3 lg:line-clamp-4 xl:line-clamp-5 flex-grow">
              {novel.description}
            </p>
            
            {/* 태그 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {novel.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 참여 버튼 */}
            <button className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-200 mt-auto">
              스케치 참여하기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NovelList; 