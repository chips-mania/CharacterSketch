import React, { useState, useEffect } from 'react';
import { commentService, Comment } from '../../services/commentService';

interface CommentManagerProps {
  imageId: string;
  children: (comments: Comment[], onAddComment: (comment: Comment) => void) => React.ReactNode;
}

const CommentManager: React.FC<CommentManagerProps> = ({ imageId, children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // 댓글 목록 로드
  const loadComments = async () => {
    try {
      setLoading(true);
      const commentsData = await commentService.getComments(imageId);
      setComments(commentsData);
    } catch (error) {
      console.error('Failed to load comments:', error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 댓글 로드
  useEffect(() => {
    loadComments();
  }, [imageId]);

  const handleAddComment = async (comment: Omit<Comment, 'id'>) => {
    try {
      const response = await commentService.addComment(imageId, comment);
      if (response.success && response.data) {
        setComments(prev => [response.data!, ...prev]);
      } else {
        console.error('Failed to add comment:', response.error);
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  if (loading) {
    return (
      <>
        {children([], () => {})}
      </>
    );
  }

  return (
    <>
      {children(comments, handleAddComment)}
    </>
  );
};

export default CommentManager; 