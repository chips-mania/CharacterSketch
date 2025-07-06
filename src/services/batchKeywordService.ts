import { supabase } from '../lib/supabase';

export interface BatchExtractResponse {
  success: boolean;
  message: string;
  processedComments: number;
  error?: string;
}

export const batchKeywordService = {
  async extractBatchKeywords(imageId: string): Promise<BatchExtractResponse> {
    try {
      if (!supabase) {
        throw new Error('Supabase client not available');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/batch-extract-keywords`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageId })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to extract batch keywords:', error);
      return {
        success: false,
        message: 'Failed to extract batch keywords',
        processedComments: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // 댓글 개수를 확인하는 함수
  async getCommentCount(imageId: string): Promise<number> {
    try {
      if (!supabase) {
        return 0;
      }

      const { count, error } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('image_id', imageId);

      if (error) {
        console.error('Failed to get comment count:', error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('Failed to get comment count:', error);
      return 0;
    }
  },

  // 5개 단위로 배치 처리가 가능한지 확인
  async shouldProcessBatch(imageId: string): Promise<boolean> {
    const commentCount = await this.getCommentCount(imageId);
    return commentCount >= 5 && commentCount % 5 === 0;
  }
}; 