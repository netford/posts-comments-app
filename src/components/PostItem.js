import React from 'react';
import CommentList from './CommentList';
import UserInfo from './UserInfo';

function PostItem({ post, user, comments, isExpanded, onClick }) {
  return (
    <div className={`post-item ${isExpanded ? 'expanded' : ''}`} onClick={onClick}>
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        {user && <UserInfo user={user} />}
      </div>
      <div className="post-body">
        <p>{post.body}</p>
      </div>
      
      {isExpanded && (
        <div className="post-comments">
          <h3>Комментарии ({comments.length})</h3>
          <CommentList comments={comments} />
        </div>
      )}
      
      {!isExpanded && comments.length > 0 && (
        <div className="comments-indicator">
          Комментарии: {comments.length} (нажмите, чтобы показать)
        </div>
      )}
    </div>
  );
}

export default PostItem;