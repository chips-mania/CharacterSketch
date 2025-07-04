import { Novel } from '../types/novel';

export const novels: Novel[] = [
  {
    id: '1',
    title: '사상 최강의 매니저',
    author: '글쟁이S',
    coverImage: '/images/covers/사최매.png',
    description: '"요새 매니지먼트 없는 헌터가 어디 있어요?"',
    tags: ['헌터', '판타지', '액션'],
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
  },
  {
    id: '3',
    title: '전설의 용사',
    author: '판타지마스터',
    coverImage: '/images/covers/무한의 마법사.png',
    description: '전설의 검을 들고 악마와 싸우는 용사의 이야기',
    tags: ['판타지', '액션', '모험'],
    totalChapters: 120,
    progress: 50,
    status: 'in-progress'
  },
  {
    id: '4',
    title: '학교의 비밀',
    author: '미스터리작가',
    coverImage: '/images/covers/사최매.png',
    description: '학교에 숨겨진 비밀을 파헤치는 학생들의 이야기',
    tags: ['미스터리', '스쿨', '추리'],
    totalChapters: 80,
    progress: 90,
    status: 'completed'
  },
  {
    id: '5',
    title: '로맨스의 계절',
    author: '사랑작가',
    coverImage: '/images/covers/무한의 마법사.png',
    description: '봄날의 설렘, 여름의 열정, 가을의 그리움, 겨울의 따뜻함',
    tags: ['로맨스', '일상', '감성'],
    totalChapters: 60,
    progress: 100,
    status: 'completed'
  },
  {
    id: '6',
    title: '게임 속 현실',
    author: '게임러버',
    coverImage: '/images/covers/사최매.png',
    description: '게임 속으로 들어간 주인공의 현실적인 모험',
    tags: ['게임', '판타지', '액션'],
    totalChapters: 180,
    progress: 25,
    status: 'waiting'
  },
  {
    id: '7',
    title: '요리사의 꿈',
    author: '맛있는작가',
    coverImage: '/images/covers/무한의 마법사.png',
    description: '세계 최고의 요리사가 되기 위한 열정적인 도전',
    tags: ['요리', '일상', '성장'],
    totalChapters: 95,
    progress: 60,
    status: 'in-progress'
  },
  {
    id: '8',
    title: '우주 탐험대',
    author: '우주팬',
    coverImage: '/images/covers/사최매.png',
    description: '미지의 우주를 탐험하는 용감한 탐험대의 이야기',
    tags: ['SF', '모험', '우주'],
    totalChapters: 140,
    progress: 40,
    status: 'waiting'
  }
]; 