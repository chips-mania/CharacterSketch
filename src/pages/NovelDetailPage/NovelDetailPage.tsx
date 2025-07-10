import { useState } from 'react';
import { aiImages } from '../../data/ai-images';
import { AIImage } from '../../types/ai-image';
import ImageModal from '../../components/ImageModal/ImageModal';

const AI_PROMPTING_CONTENT = `
## AI 프롬프팅 과정 개요
- 웹소설 속 캐릭터를 웹툰 스타일로 시각화하기 위해, Midjourney를 활용한 이미지 프롬프팅 과정을 수행했습니다.
- 웹툰화를 목표로 하는 서비스 특성을 고려해, 웹툰 특유의 화풍과 캐릭터 성격을 효과적으로 반영하는 것을 목표로 했습니다.

<br/><br/><br/>

## 요구사항 정의

### 1. 웹툰 스타일 그림체
웹툰화를 염두에 두고있으므로 웹툰에 적합한 그림체 설정합니다.
- 실사 이미지 제외

### 2. 성격이 드러나는 이미지
웹소설 속 캐릭터의 성격을 드러내는 표정과 분위기를 연출합니다.

### 3. 통일성 있는 비주얼
같은 웹소설의 캐릭터 간 그림체가 너무 다르면 몰입감이 깨질 수 있습니다.

<br/><br/><br/>

## 이미지 생성 과정

### 1. 키워드 수집
독자 댓글을 수집해 키워드를 추출하거나, 웹소설 원문 묘사를 직접 활용합니다.

### 2. 프롬프트 작성
성별 → 외모 → 의상 및 소품 순으로 명확하게 프롬프트 작성합니다.

### 3. 1차 이미지 생성
핵심 외형 및 스타일 중심으로 1차 이미지를 생성합니다.

### 4. 보정 및 디테일 추가
Midjourney의 Edit 기능을 활용해 디테일을 추가하고 이미지 비율을 조정합니다.

<br/><br/><br/>

## 시행착오

### 1. 복잡한 프롬프트의 한계
프롬프트에 너무 많은 키워드를 넣은 경우 의도한 결과가 나오지 않았습니다.
- 핵심 키워드 위주로 간결하게 작성 후 디테일 추가 방식으로 변경

### 2. 과도한 키워드 영향력
특정 키워드(fantasy, anime 등)가 전체 스타일을 과도하게 좌우했습니다.
- 해당 키워드를 배제하거나 가중치를 활용하여 조정

<br/><br/><br/>

## 개선점

### 1. 프롬프트 템플릿 제공
일관된 화풍 유지를 위한 Personalize 기능을 고려할 수 있습니다.

### 2. 키워드 별 가중치 확인
미드저니 Discord 채널에서 키워드 별 가중치를 미리 확인하여 프롬프팅 계획을 세울 수 있습니다.
`;

const NovelDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState<AIImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const convertMarkdownToHtml = (markdown: string) => {
    return markdown
      // 제목 변환
      .replace(/^# (.*$)/gm, '<h1 style="padding: 0.4em 1em 0.4em 0.5em; margin: 0.5em 0em; color: #2DB400; border-left: 10px solid #2DB400; border-bottom: 2px #2DB400 solid; font-weight: bold; font-size: 1.875rem;"><span style="font-family: \'Noto Sans Demilight\', \'Noto Sans KR\';">$1</span></h1>')
      .replace(/^## (.*$)/gm, '<h2 style="padding: 0.4em 1em 0.4em 0.5em; margin: 0.5em 0em; color: #2DB400; border-left: 10px solid #2DB400; border-bottom: 2px #2DB400 solid; font-weight: bold; font-size: 1.5rem;"><span style="font-family: \'Noto Sans Demilight\', \'Noto Sans KR\';">$1</span></h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium text-black mb-3 mt-6">$1</h3>')
      // 강조 텍스트 변환
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // 리스트 변환
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-2 text-gray-600">$1</li>')
      // 줄바꿈 처리
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-600">')
      .replace(/^(?!<[h|p|li])/gm, '<p class="mb-4 text-gray-600">')
      .replace(/(?<!>)$/gm, '</p>')
      // 빈 태그 정리
      .replace(/<p class="mb-4"><\/p>/g, '')
      .replace(/<p class="mb-4"><\/p>/g, '')
      // 리스트 래핑
      .replace(/(<li.*?<\/li>)/gs, '<ul class="list-disc ml-6 mb-4">$1</ul>')
      .replace(/<\/ul>\s*<ul class="list-disc ml-6 mb-4">/g, '');
  };

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
            AI 프롬프팅
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            AI 이미지 예시
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



        {/* AI 프롬프팅 과정 개요 */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: convertMarkdownToHtml(AI_PROMPTING_CONTENT)
            }}
          />
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