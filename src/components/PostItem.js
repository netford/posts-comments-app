import React, { useState } from 'react';
import CommentList from './CommentList';
import UserInfo from './UserInfo';

function PostItem({ post, user, comments, isExpanded, onClick }) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleClick = () => {
    setIsAnimating(true);
    onClick();
  };

  return (
    <div 
      className={`post-item ${isExpanded ? 'expanded' : ''} ${isAnimating ? 'animating' : ''}`} 
      onClick={handleClick}
      onAnimationEnd={() => setIsAnimating(false)}
    >
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        {user && <UserInfo user={user} />}
      </div>
      <div className="post-body">
        <p>{post.body}</p>
      </div>
      
      <div className={`post-comments ${isExpanded ? 'show' : ''}`}>
        {isExpanded && (
          <>
            <h3>Комментарии ({comments.length})</h3>
            <CommentList comments={comments} />
          </>
        )}
      </div>
      
      {!isExpanded && comments.length > 0 && (
        <div className="comments-indicator">
          <span className="comments-count">{comments.length}</span> 
          <span className="comments-text">комментариев (нажмите, чтобы показать)</span>
        </div>
      )}
    </div>
  );
}

export default PostItem;