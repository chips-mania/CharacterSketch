import { supabase } from '../lib/supabase';

export interface Keywords {
  appearance: string[];
  personality: string[];
  clothing: string[];
  accessories: string[];
  background: string[];
  style: string[];
}

export interface ExtractKeywordsResponse {
  success: boolean;
  keywords: Keywords;
  confidence: number;
  error?: string;
}

export const keywordService = {
  async extractAndSaveKeywords(
    commentText: string, 
    imageId: string, 
    commentId: string
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      if (!supabase) {
        throw new Error('Supabase client not available');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/extract-keywords`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            commentText, 
            imageId, 
            commentId 
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to extract and save keywords:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // 키워드를 하나의 배열로 합치는 유틸리티 함수
  flattenKeywords(keywords: Keywords): string[] {
    return [
      ...keywords.appearance,
      ...keywords.personality,
      ...keywords.clothing,
      ...keywords.accessories,
      ...keywords.background,
      ...keywords.style
    ];
  },

  // 키워드를 카테고리별로 그룹화하는 유틸리티 함수
  groupKeywordsByCategory(keywords: Keywords): { category: string; keywords: string[] }[] {
    return [
      { category: '외모', keywords: keywords.appearance },
      { category: '성격', keywords: keywords.personality },
      { category: '의상', keywords: keywords.clothing },
      { category: '액세서리', keywords: keywords.accessories },
      { category: '배경', keywords: keywords.background },
      { category: '스타일', keywords: keywords.style }
    ].filter(group => group.keywords.length > 0);
  }
}; 