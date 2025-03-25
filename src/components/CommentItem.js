import React from 'react';

function CommentItem({ comment }) {
  return (
    <div className="comment-item">
      <div className="comment-header">
        <h4 className="comment-name">{comment.name}</h4>
        <span className="comment-email">{comment.email}</span>
      </div>
      <div className="comment-body">
        <p>{comment.body}</p>
      </div>
    </div>
  );
}

export default CommentItem;