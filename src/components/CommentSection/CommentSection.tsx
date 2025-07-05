import React, { useState } from 'react';

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
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !commentAuthor.trim()) return;

    setIsSubmitting(true);
    
    // 실제 구현에서는 API 호출
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        author: commentAuthor.trim(),
        content: newComment.trim(),
        timestamp: new Date(),
        avatar: 'https://via.placeholder.com/32x32/EF4444/FFFFFF?text=나'
      };
      
      onAddComment(comment);
      setNewComment('');
      setCommentAuthor('');
      setIsSubmitting(false);
    }, 500);
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">댓글 ({comments.length})</h3>
            <img 
              src="/images/logo/댓글문구.png" 
              alt="댓글 안내" 
              className="h-6 md:h-8 w-auto"
            />
          </div>
          <button
            type="submit"
            disabled={!newComment.trim() || !commentAuthor.trim() || isSubmitting}
            className="bg-black text-white px-4 py-2 rounded-none text-sm font-medium hover:bg-[#16EF72] hover:text-black transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '작성 중...' : '댓글 작성'}
          </button>
        </div>
        
        {/* 댓글 작성 폼 */}
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="space-y-3">
            <input
              type="text"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              placeholder="아이디를 입력해주세요"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black hover:border-black transition-colors duration-200"
              disabled={isSubmitting}
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 작성해주세요..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-black hover:border-black transition-colors duration-200"
              rows={3}
              disabled={isSubmitting}
            />
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