import { Novel } from '../types/novel';

export const novels: Novel[] = [
  {
    id: '1',
    title: '사상 최강의 매니저',
    author: '글쟁이S',
    coverImage: '/images/covers/사최매.png',
    description: '"요새 매니지먼트 없는 헌터가 어디 있어요?"',
    tags: ['헌터터', '판타지', '액션'],
    totalChapters: 150,
    progress: 75,
    status: 'in-progress'
  },
  {
    id: '2',
    title: '무한의 마법사',
    author: '김치우',
    coverImage: '/images/covers/무한의 마법사.png',
    description: '빛의 속도로 질주하는 초신성의 폭발! 인간의 몸으로 무한을 꿈꾸다!',
    tags: ['판타지', '모험', '마법'],
    totalChapters: 200,
    progress: 30,
    status: 'waiting'
  }
]; 