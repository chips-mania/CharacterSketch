import React from 'react';
import { Novel } from '../../types/novel';

interface NovelListProps {
  novels: Novel[];
}

const NovelList: React.FC<NovelListProps> = ({ novels }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
      {novels.map((novel) => (
        <div
          key={novel.id}
          className="bg-white rounded-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 max-w-sm mx-auto flex flex-col"
        >
          {/* 커버 이미지 */}
          <div className="relative h-48 md:h-64 lg:h-72 xl:h-80 bg-gradient-to-br from-primary/20 to-primary/10">
            {novel.coverImage && (
              <img
                src={novel.coverImage}
                alt={novel.title}
                className="w-full h-full object-cover"
              />
            )}
            {/* 강화된 하단 음영 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 lg:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <h3 className="text-white font-bold text-sm md:text-base lg:text-lg mb-1 drop-shadow-lg">{novel.title}</h3>
              <p className="text-white/90 text-xs md:text-sm drop-shadow-md">{novel.author}</p>
            </div>
          </div>

          {/* 소설 정보 */}
          <div className="p-3 md:p-4 lg:p-6 flex flex-col h-full">
            <p className="text-text-secondary text-xs md:text-sm mb-2 md:mb-3 lg:mb-4 line-clamp-3 md:line-clamp-4 lg:line-clamp-5 xl:line-clamp-6 flex-grow">
              {novel.description}
            </p>
            
            {/* 하단 고정 영역 */}
            <div className="mt-auto">
              {/* 태그 */}
              <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3 lg:mb-4">
                {novel.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-1.5 md:px-2 py-0.5 md:py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 참여 버튼 */}
              <button className="w-full bg-black text-white py-2 md:py-2.5 lg:py-3 px-3 md:px-4 rounded-none text-xs md:text-sm lg:text-base font-semibold hover:bg-[#16EF72] hover:text-black transition-colors duration-200">
                스케치하기
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NovelList; 