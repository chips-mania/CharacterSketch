import React, { useState } from 'react';
import { batchKeywordService } from '../../services/batchKeywordService';
import { supabase } from '../../lib/supabase';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  avatar?: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
  imageId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment, imageId }) => {
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !commentAuthor.trim()) return;

    setIsSubmitting(true);
    
    try {
      // 댓글 추가
      const comment: Comment = {
        id: Date.now().toString(),
        author: commentAuthor.trim(),
        content: newComment.trim(),
        timestamp: new Date(),
        avatar: 'https://via.placeholder.com/32x32/EF4444/FFFFFF?text=나'
      };
      
      onAddComment(comment);
      
      // Supabase에 댓글 저장
      if (supabase) {
        const { error } = await supabase
          .from('comments')
          .insert({
            id: comment.id,
            image_id: imageId,
            author: comment.author,
            content: comment.content,
            created_at: comment.timestamp.toISOString()
          });
        
        if (error) {
          console.error('Failed to save comment to database:', error);
        }
      }
      
      // 댓글 개수 확인 후 배치 처리
      const shouldProcessBatch = await batchKeywordService.shouldProcessBatch(imageId);
      if (shouldProcessBatch) {
        // 배치 키워드 추출 실행
        batchKeywordService.extractBatchKeywords(imageId).catch(error => {
          console.error('Failed to extract batch keywords:', error);
        });
      }
      
      setNewComment('');
      setCommentAuthor('');
    } catch (error) {
      console.error('Failed to process comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
  };

  return (
    <div className="flex-1 border-t border-gray-200 p-4 md:p-8">
      <div className="mb-4 md:mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800">댓글 ({comments.length})</h3>
          <img 
            src="/images/logo/댓글문구.png" 
            alt="댓글 안내" 
            className="h-3.5 md:h-5 lg:h-6 w-auto"
          />
        </div>
        
        {/* 댓글 작성 폼 */}
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="space-y-3">
            <input
              type="text"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              placeholder="아이디를 입력해주세요"
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black hover:border-black transition-colors duration-200 text-xs md:text-sm"
              disabled={isSubmitting}
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 작성해주세요"
              className="w-full p-2 md:p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-black hover:border-black transition-colors duration-200 text-xs md:text-sm"
              rows={3}
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={!newComment.trim() || !commentAuthor.trim() || isSubmitting}
              className="bg-black text-white px-3 md:px-4 py-1.5 md:py-2 rounded-none text-xs md:text-sm font-medium hover:bg-[#16EF72] hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '작성 중...' : '댓글 작성'}
            </button>
          </div>
        </form>



        {/* 댓글 목록 */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-800">{comment.author}</span>
                <span className="text-xs text-gray-500">{formatTime(comment.timestamp)}</span>
              </div>
              <p className="text-gray-700 text-sm">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSection; 