const SERVICE_PLANNING_CONTENT = `
## 서비스 개요
웹소설 독자들의 상상 속 캐릭터를 시각화하는 독자 참여형 AI 콘텐츠 서비스입니다.

<br/><br/><br/>

## 기획 배경

### 웹툰화 과정에서의 독자 괴리감 문제
웹툰화 과정에서는 독자들은 종종 원작과 다른 캐릭터 외형이나 분위기로 괴리감을 느낍니다.
<br/>
**한국출판문화산업진흥원 2022년 웹소설 분야 산업 현황 실태조사 결과:**

**웹소설 원작 콘텐츠 만족 이유:**
- 웹소설 원작에서 상상했던 등장인물의 외모/캐릭터와 잘 맞아서 (36.9%)

**웹소설 원작 콘텐츠 불만족 이유:**
- 웹소설 원작에서 표현한 연출이 제대로 구현되지 않아서 (48.5%)
- 웹소설 원작에서 상상했던 등장인물의 외모/캐릭터와 괴리감이 들어서 (36.4%)

<br/>
이에 웹툰화되기 전, 미리 웹소설 속 캐릭터를 시각화해봄으로써 독자들이 겪는 괴리감을 줄이고자 CharacterSketch라는 서비스를 기획하게 되었습니다.

<br/><br/><br/>

## 기대효과

### 1. 웹툰화 괴리감 감소
- 웹소설을 미리 시각화함으로써 웹툰화 시 겪을 수 있는 괴리감을 줄일 수 있습니다.

### 2. 독자 반응 사전 모니터링
- 캐릭터 시각화에 대한 독자의 반응을 미리 모니터링할 수 있습니다.

### 3. 웹툰화 참고 자료 확보
- 특정 캐릭터에 대한 묘사를 수집함으로써 웹툰화 시 참고 자료로 활용할 수 있습니다.

### 4. 독자 애착도 향상
- 직접 독자가 시각화에 참여함으로써 작품 및 캐릭터에 대한 애착도를 높일 수 있습니다.

<br/><br/><br/>

## 서비스 주요 흐름

### 1단계: 독자 참여
- 독자가 캐릭터에 대한 정보를 댓글로 작성합니다.

### 2단계: AI 키워드 추출
- OpenAI API로 댓글에서 키워드를 추출합니다.

### 3단계: 이미지 생성
- 관리자가 키워드를 기반으로 미드저니 이미지를 생성합니다.

### 4단계: 공유 및 고도화
- 생성된 이미지를 독자와 공유하고 추가 의견을 반영해 고도화할 수 있습니다.

<br/><br/><br/>

## 한계 및 개선점

### 1. 독자 참여도가 낮을 가능성:
댓글 외 참여가 없고, 의견 반영 절차가 단조로우며 즉각적인 상호작용을 얻을 수 있는 구조가 아님

- 댓글 외 선택형 질문 (키워드 카드 고르기 , 고양이상vs강아지상 등)
- IF질문 추가 (만약 점이 있다면 어디에 있을까? 등)

### 2. 참여 독자 층이 한정적임:
웹소설을 읽지 않은 독자들은 참여할 수 없음


- 만들어진 이미지로 투표기능 추가
- 이상형 월드컵 기능 추가
- 리워드 시스템 추가

### 3. AI 키워드 추출 보완:
AI가 추출한 키워드는 뉘앙스까지 반영하기 어려움
- 추출한 키워드를 독자가 다시 수정할 수 있도록 구성
- 키워드 카드 고르기 기능 추가

### 4. 이미지 생성의 일관성 부족:
프롬프트 만으로 일관된 캐릭터를 반복생성하기 어렵고 독창적인 외모는 구현에 어려움이 있음


- 여러 이미지 중 독자 투표를 통해 최종 이미지를 결정

### 5. 작가 참여 시스템
**추가 기획:**
- 작가가 참여해, '작가피셜'이나 코멘트를 남기는 등 서비스 신뢰도를 제고할 수 있을 것입니다.



`;

const VisualizePage = () => {
  const convertMarkdownToHtml = (markdown: string) => {
    return markdown
      // 제목 변환
      .replace(/^# (.*$)/gm, '<h1 style="padding: 0.4em 1em 0.4em 0.5em; margin: 0.5em 0em; color: #0F766E; border-left: 10px solid #0F766E; border-bottom: 2px #0F766E solid; font-weight: bold; font-size: 1.875rem;"><span style="font-family: \'Noto Sans Demilight\', \'Noto Sans KR\';">$1</span></h1>')
      .replace(/^## (.*$)/gm, '<h2 style="padding: 0.4em 1em 0.4em 0.5em; margin: 0.5em 0em; color: #0F766E; border-left: 10px solid #0F766E; border-bottom: 2px #0F766E solid; font-weight: bold; font-size: 1.5rem;"><span style="font-family: \'Noto Sans Demilight\', \'Noto Sans KR\';">$1</span></h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium text-gray-600 mb-3 mt-6">$1</h3>')
      // 강조 텍스트 변환
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // 리스트 변환
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-2">$1</li>')
      // 줄바꿈 처리
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[h|p|li])/gm, '<p class="mb-4">')
      .replace(/(?<!>)$/gm, '</p>')
      // 빈 태그 정리
      .replace(/<p class="mb-4"><\/p>/g, '')
      .replace(/<p class="mb-4"><\/p>/g, '')
      // 리스트 래핑
      .replace(/(<li.*?<\/li>)/gs, '<ul class="list-disc ml-6 mb-4">$1</ul>')
      .replace(/<\/ul>\s*<ul class="list-disc ml-6 mb-4">/g, '');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 상단 그라데이션 배경 */}
      <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(52, 251, 134, 0.2) 0%, rgba(52, 251, 134, 0.1) 50%, transparent 100%)'
      }}></div>
      
      <div className="max-w-4xl mx-auto p-6 relative">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: convertMarkdownToHtml(SERVICE_PLANNING_CONTENT)
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VisualizePage; 