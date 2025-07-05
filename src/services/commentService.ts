import { supabase } from '../lib/supabase';

// 댓글 타입 정의
export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  avatar?: string;
}

// API 응답 타입
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// 현재는 Supabase를 사용하지만, 나중에 실제 API로 쉽게 교체 가능
class CommentService {
  // 댓글 목록 가져오기
  async getComments(imageId: string): Promise<Comment[]> {
    try {
      if (!supabase) {
        console.warn('Supabase client not available');
        return [];
      }

      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('image_id', imageId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Failed to get comments:', error);
        return [];
      }
      
      // Supabase 데이터를 Comment 타입으로 변환
      return (data || []).map((item: any) => ({
        id: item.id,
        author: item.author,
        content: item.content,
        timestamp: new Date(item.created_at),
        avatar: item.avatar
      }));
    } catch (error) {
      console.error('Failed to get comments:', error);
      return [];
    }
  }

  // 댓글 추가
  async addComment(imageId: string, comment: Omit<Comment, 'id'>): Promise<ApiResponse<Comment>> {
    try {
      if (!supabase) {
        console.warn('Supabase client not available');
        return {
          success: false,
          error: '댓글 기능이 비활성화되어 있습니다.'
        };
      }

      const { data, error } = await supabase
        .from('comments')
        .insert([{
          image_id: imageId,
          author: comment.author,
          content: comment.content
        }])
        .select()
        .single();

      if (error) {
        console.error('Failed to add comment:', error);
        return {
          success: false,
          error: error.message
        };
      }

      // Supabase 데이터를 Comment 타입으로 변환
      const newComment: Comment = {
        id: data.id,
        author: data.author,
        content: data.content,
        timestamp: new Date(data.created_at),
        avatar: data.avatar
      };

      return {
        success: true,
        data: newComment
      };
    } catch (error) {
      console.error('Failed to add comment:', error);
      return {
        success: false,
        error: '댓글 추가에 실패했습니다.'
      };
    }
  }

  // 댓글 삭제 (나중에 구현)
  async deleteComment(imageId: string, commentId: string): Promise<ApiResponse<boolean>> {
    try {
      if (!supabase) {
        console.warn('Supabase client not available');
        return {
          success: false,
          error: '댓글 기능이 비활성화되어 있습니다.'
        };
      }

      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('image_id', imageId);

      if (error) {
        console.error('Failed to delete comment:', error);
        return {
          success: false,
          error: error.message
        };
      }

      return {
        success: true,
        data: true
      };
    } catch (error) {
      console.error('Failed to delete comment:', error);
      return {
        success: false,
        error: '댓글 삭제에 실패했습니다.'
      };
    }
  }

  // 댓글 수정 (나중에 구현)
  async updateComment(imageId: string, commentId: string, content: string): Promise<ApiResponse<Comment>> {
    try {
      if (!supabase) {
        console.warn('Supabase client not available');
        return {
          success: false,
          error: '댓글 기능이 비활성화되어 있습니다.'
        };
      }

      const { data, error } = await supabase
        .from('comments')
        .update({ content })
        .eq('id', commentId)
        .eq('image_id', imageId)
        .select()
        .single();

      if (error) {
        console.error('Failed to update comment:', error);
        return {
          success: false,
          error: error.message
        };
      }

      // Supabase 데이터를 Comment 타입으로 변환
      const updatedComment: Comment = {
        id: data.id,
        author: data.author,
        content: data.content,
        timestamp: new Date(data.created_at),
        avatar: data.avatar
      };

      return {
        success: true,
        data: updatedComment
      };
    } catch (error) {
      console.error('Failed to update comment:', error);
      return {
        success: false,
        error: '댓글 수정에 실패했습니다.'
      };
    }
  }
}

export const commentService = new CommentService(); 