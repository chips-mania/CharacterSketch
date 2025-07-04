import { Novel } from '../types/novel';

export const novels: Novel[] = [
  {
    id: '1',
    title: '무한의 마법사',
    author: '김치우',
    coverImage: '/images/covers/무한의 마법사.png',
    description: '빛의 속도로 질주하는 초신성의 폭발! 인간의 몸으로 무한을 꿈꾸다!',
    tags: ['마법사', '성장', '철학'],
    totalChapters: 200,
    progress: 30,
    status: 'waiting'
  },
  {
    id: '2',
    title: '사상 최강의 매니저',
    author: '글쟁이S',
    coverImage: '/images/covers/사상 최강의 매니저.png',
    description: '"요새 매니지먼트 없는 헌터가 어디 있어요?"',
    tags: ['헌터물', '현대판타지', '액션'],
    totalChapters: 150,
    progress: 75,
    status: 'in-progress'
  },
  {
    id: '3',
    title: '멸망한 세계의 사냥꾼',
    author: '글쟁이 S',
    coverImage: '/images/covers/멸망한 세계의 사냥꾼.png',
    description: '멸망 이후 이백여년이 지났고, 사냥꾼은 여전히 사냥감을 찾아 세계를 방랑한다.',
    tags: ['아포칼립스', '모험', '먼치킨'],
    totalChapters: 120,
    progress: 50,
    status: 'in-progress'
  },
  {
    id: '4',
    title: '리턴 서바이벌',
    author: '연우솔',
    coverImage: '/images/covers/리턴 서바이벌.png',
    description: '6개월 후 세상은 멸망하고, 오직 나만이 종말이 오는 것을 알고 있다.',
    tags: ['현대 판타지', '아포칼립스', '좀비물'],
    totalChapters: 80,
    progress: 90,
    status: 'completed'
  },
  {
    id: '5',
    title: '신의 마법사',
    author: '오늘도요',
    coverImage: '/images/covers/신의 마법사.png',
    description: '부서진 세계, 신을 만든 마법사의 이야기',
    tags: ['천재', '마법사', '아포칼립스'],
    totalChapters: 60,
    progress: 100,
    status: 'completed'
  },
  {
    id: '6',
    title: 'SSS급 죽어야 사는 헌터',
    author: '게임러버',
    coverImage: '/images/covers/SSS급 죽어야 사는 헌터.png',
    description: '나도 S급 스킬이 갖고 싶다! 죽고 싶을 정도로!',
    tags: ['레이드', '탑등반', '먼치킨'],
    totalChapters: 180,
    progress: 25,
    status: 'waiting'
  },
  {
    id: '7',
    title: '전지적 독자 시점',
    author: '싱숑',
    coverImage: '/images/covers/전지적 독자 시점.png',
    description: '[오직 나만이, 이 세계의 결말을 알고 있다.]',
    tags: ['현대 판타지', '성좌물', '아포칼립스'],
    totalChapters: 95,
    progress: 60,
    status: 'in-progress'
  },
  {
    id: '8',
    title: '튜토리얼이 너무 어렵다',
    author: '우주팬',
    coverImage: '/images/covers/튜토리얼이 너무 어렵다.png',
    description: '[튜토리얼 세계에 입장하시겠습니까?]',
    tags: ['탑등반', '성좌물', '이세계'],
    totalChapters: 140,
    progress: 40,
    status: 'waiting'
  }
]; 