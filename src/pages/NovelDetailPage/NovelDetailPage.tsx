const AI_PROMPTING_CONTENT = `
# AI 프롬프팅 기술

## 🤖 AI 프롬프팅 개요
CharacterSketch에서 사용하는 AI 프롬프팅 기술은 웹소설 캐릭터의 특성을 정확히 파악하고 
시각화하기 위한 핵심 기술입니다. OpenAI GPT API를 활용하여 
자연어 처리를 통해 캐릭터 키워드를 자동으로 추출합니다.

## 🔧 기술 구현

### 1. 키워드 추출 시스템
- **입력**: 사용자 댓글 텍스트
- **처리**: OpenAI GPT-3.5-turbo 모델 활용
- **출력**: 카테고리별 키워드 (외모, 성격, 의상, 액세서리, 배경, 스타일)

### 2. 프롬프트 엔지니어링
시스템 프롬프트:
"당신은 웹소설 캐릭터의 AI 이미지 생성을 위한 키워드 추출 전문가입니다.
댓글 내용을 분석하여 다음 카테고리별로 키워드를 추출해주세요:
1. appearance: 외모 관련
2. personality: 성격/표정 관련  
3. clothing: 의상/복장 관련
4. accessories: 액세서리/소품
5. background: 배경/환경
6. style: 전체적인 스타일/분위기"

### 3. 배치 처리 시스템
- **5개 단위 배치**: 댓글을 5개씩 묶어서 처리
- **효율성**: API 호출 횟수 최적화
- **정확성**: 여러 댓글을 종합하여 더 정확한 키워드 추출

## 📊 처리 과정

### 1단계: 댓글 수집
- 사용자가 작성한 댓글을 Supabase 데이터베이스에 저장
- 이미지별로 댓글을 그룹화

### 2단계: 배치 처리 조건 확인
- 댓글 개수가 5의 배수인지 확인
- 조건 만족 시 배치 처리 시작

### 3단계: 키워드 추출
- OpenAI API 호출
- 댓글 내용을 분석하여 키워드 추출
- JSON 형태로 구조화된 결과 반환

### 4단계: 결과 저장
- 추출된 키워드를 Supabase에 저장
- 각 댓글별로 동일한 키워드 적용

## 🎯 키워드 카테고리

### 외모 (Appearance)
- 얼굴 특징: 눈, 코, 입, 헤어스타일
- 체형: 키, 몸매, 체격
- 피부: 색상, 질감, 특징

### 성격 (Personality)
- 표정: 웃는, 차분한, 화난, 진지한
- 분위기: 친근한, 위압적인, 신비로운
- 감정: 기쁨, 슬픔, 분노, 평온

### 의상 (Clothing)
- 상의: 셔츠, 재킷, 드레스
- 하의: 바지, 치마, 반바지
- 신발: 구두, 운동화, 부츠
- 모자: 캡, 중절모, 베레모

### 액세서리 (Accessories)
- 안경: 뿔테, 원형, 선글라스
- 장신구: 목걸이, 반지, 팔찌
- 소품: 지팡이, 가방, 무기

### 배경 (Background)
- 환경: 숲, 도시, 방, 하늘
- 분위기: 어두운, 밝은, 신비로운
- 계절: 봄, 여름, 가을, 겨울

### 스타일 (Style)
- 시대: 고전적, 현대적, 미래적
- 장르: 판타지, SF, 로맨스, 액션
- 분위기: 우아한, 거친, 귀여운, 강렬한

## 🔍 품질 관리

### 정확도 향상
- **프롬프트 최적화**: 지속적인 프롬프트 개선
- **카테고리 세분화**: 더 구체적인 키워드 추출
- **사용자 피드백**: 추출 결과에 대한 피드백 수집

### 에러 처리
- **API 오류**: 네트워크 오류 시 재시도 로직
- **빈 결과**: 키워드가 추출되지 않을 때 기본값 제공
- **잘못된 형식**: JSON 파싱 오류 시 예외 처리

## 🚀 성능 최적화

### 처리 속도
- **배치 처리**: 5개씩 묶어서 처리하여 API 호출 최소화
- **비동기 처리**: 백그라운드에서 키워드 추출 실행
- **캐싱**: 동일한 댓글에 대한 중복 처리 방지

### 비용 효율성
- **토큰 최적화**: 프롬프트 길이 최적화
- **배치 크기**: 5개 단위로 처리하여 비용 대비 효율 극대화
- **사용량 모니터링**: API 사용량 추적 및 제한

## 🔮 향후 발전 방향

### 단기 개선
- 키워드 추출 정확도 향상
- 더 많은 카테고리 추가
- 사용자 피드백 시스템 구축

### 장기 발전
- AI 이미지 생성 기능 추가
- 실시간 키워드 추출
- 개인화된 추천 시스템

## 💡 기술적 특징

### 서버리스 아키텍처
- Supabase Edge Functions 활용
- 확장성과 비용 효율성 극대화
- 자동 스케일링

### 실시간 처리
- 댓글 작성 즉시 키워드 추출
- 배치 처리로 효율성 확보
- 사용자 경험 최적화

이 AI 프롬프팅 기술은 웹소설 캐릭터의 특성을 
정확히 파악하고 시각화하는 핵심 기술로, 
지속적인 개선을 통해 더욱 정확하고 유용한 서비스를 제공합니다.
`;

const NovelDetailPage = () => {
  const convertMarkdownToHtml = (markdown: string) => {
    return markdown
      // 제목 변환
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-gray-800 mb-6">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold text-gray-700 mb-4 mt-8">$1</h2>')
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: convertMarkdownToHtml(AI_PROMPTING_CONTENT)
          }}
        />
      </div>
    </div>
  );
};

export default NovelDetailPage; 