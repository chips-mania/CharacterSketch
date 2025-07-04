# CharacterSketch - 웹소설 캐릭터 시각화 서비스

## 📖 프로젝트 개요

웹소설 속 등장인물을 웹툰화 이전에 시각화하여 독자의 괴리감을 줄이는 서비스입니다. 사용자는 시각화에 참여하고 의견을 나누며, 최종적으로 생성된 AI 이미지(캐릭터 외형)를 확인할 수 있습니다.

## 🎯 서비스 목표

- 웹소설 속 등장인물의 시각적 표현 제공
- 독자 참여형 캐릭터 시각화 플랫폼 구축
- 웹툰화 전 독자의 괴리감 최소화

## 🚀 MVP 1단계 - AI 이미지 Cover Flow + 웹소설 목록

### 사용자 플로우
```
[사이트 접속] 
   ↓
[상단: 완성된 AI 이미지 Cover Flow] → [AI 이미지 클릭] → [웹소설 상세 페이지]
   ↓
[하단: 시각화 대기 웹소설 카드 목록] → [카드 클릭] → [시각화 참여 페이지]
```

### 구현할 화면과 기능

#### A. 메인 페이지 (AI 이미지 Cover Flow + 웹소설 목록)

**목적**: 완성된 AI 이미지를 감상하고, 시각화에 참여할 웹소설을 선택할 수 있는 메인 페이지

**상단 - AI 이미지 Cover Flow**:
- Cover Flow UI 구성 (중앙에 강조된 AI 이미지, 좌우로 흐릿한 AI 이미지들)
- 각 이미지: 시각화 완료된 캐릭터 AI 이미지
- AI 이미지 클릭 → 해당 웹소설 상세 페이지로 라우팅 (`/novel/:id`)

**하단 - 웹소설 목록**:
- 카드 형태로 시각화 대기 중인 웹소설 목록 표시
- 각 카드: 웹소설 표지, 제목, 설명, 시각화 진행률 등
- 카드 클릭 → 시각화 참여 페이지로 라우팅 (`/visualize/:id`)

## 🛠 기술 스택

### Frontend
- **React 18** - 사용자 인터페이스 구축
- **TypeScript** - 타입 안정성 확보
- **Vite** - 빠른 개발 환경 및 빌드 도구
- **React Router** - 클라이언트 사이드 라우팅
- **react-coverflow** - Cover Flow UI 구현
- **Tailwind CSS** - 스타일링

### Development Tools
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Husky** - Git hooks 관리

## 📁 프로젝트 구조

```
CharacterSketch/
├── public/
│   ├── images/
│   │   ├── ai-images/       # 완성된 AI 이미지들
│   │   ├── covers/          # 웹소설 커버 이미지들
│   │   └── characters/      # 캐릭터 관련 이미지들
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CoverFlow/       # AI 이미지 Cover Flow 컴포넌트
│   │   ├── NovelCard/       # 웹소설 카드 컴포넌트
│   │   ├── NovelList/       # 웹소설 목록 컴포넌트
│   │   └── Layout/          # 레이아웃 컴포넌트
│   ├── pages/
│   │   ├── HomePage/        # 메인 페이지 (Cover Flow + 목록)
│   │   ├── NovelDetailPage/ # 웹소설 상세 페이지
│   │   └── VisualizePage/   # 시각화 참여 페이지
│   ├── types/
│   │   ├── novel.ts         # 웹소설 관련 타입 정의
│   │   └── ai-image.ts      # AI 이미지 관련 타입 정의
│   ├── data/
│   │   ├── novels.ts        # 웹소설 데이터 (임시)
│   │   └── ai-images.ts     # AI 이미지 데이터 (임시)
│   ├── hooks/
│   │   ├── useNovels.ts     # 웹소설 데이터 관리 훅
│   │   └── useAIImages.ts   # AI 이미지 데이터 관리 훅
│   ├── utils/
│   │   └── constants.ts     # 상수 정의
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone [repository-url]
   cd CharacterSketch
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```

4. **브라우저에서 확인**
   ```
   http://localhost:5173
   ```

### 빌드

```bash
npm run build
```

### 코드 품질 검사

```bash
npm run lint
npm run type-check
```

## 📋 구현 계획

### Phase 1: 기본 설정 및 구조
- [x] 프로젝트 초기화 및 README 작성
- [ ] React + TypeScript + Vite 프로젝트 설정
- [ ] Tailwind CSS 설정
- [ ] 기본 라우팅 구조 설정

### Phase 2: AI 이미지 Cover Flow UI 구현
- [ ] react-coverflow 라이브러리 설치 및 설정
- [ ] CoverFlow 컴포넌트 구현 (AI 이미지용)
- [ ] AI 이미지 데이터 구조 정의
- [ ] 반응형 디자인 적용

### Phase 3: 웹소설 목록 및 라우팅 구현
- [ ] NovelList 컴포넌트 구현 (카드 형태)
- [ ] NovelCard 컴포넌트 구현
- [ ] 웹소설 데이터 구조 정의
- [ ] 임시 데이터 생성
- [ ] 상세 페이지 및 시각화 페이지 라우팅 구현
- [ ] 데이터 관리 훅 구현

### Phase 4: 스타일링 및 최적화
- [ ] UI/UX 개선
- [ ] 애니메이션 효과 추가
- [ ] 성능 최적화
- [ ] 접근성 개선

## 🎨 디자인 가이드라인

### 색상 팔레트
- **Primary**: #2DB400 (Naver Green)
- **Secondary**: #000000 (Black)
- **Accent**: #2DB400 (Naver Green)
- **Background**: #FFFFFF (White)
- **Text**: #000000 (Black)
- **Text Secondary**: #666666 (Gray)

### 타이포그래피
- **Heading**: Inter, sans-serif
- **Body**: Inter, sans-serif

### 반응형 브레이크포인트
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px 이상

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

프로젝트 링크: [https://github.com/your-username/CharacterSketch](https://github.com/your-username/CharacterSketch) 