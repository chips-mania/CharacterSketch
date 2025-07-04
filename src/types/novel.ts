export interface Novel {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  tags: string[];
  totalChapters: number;
  progress: number; // 시각화 진행률 (0-100)
  status: 'waiting' | 'in-progress' | 'completed';
} 