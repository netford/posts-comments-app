import React, { useState } from 'react';
import PostItem from './PostItem';

function PostList({ posts, users, comments }) {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handlePostClick = (postId) => {
    setSelectedPostId(postId === selectedPostId ? null : postId);
  };

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem 
          key={post.id} 
          post={post} 
          user={users.find(user => user.id === post.userId)}
          comments={comments.filter(comment => comment.postId === post.id)} 
          isExpanded={post.id === selectedPostId}
          onClick={() => handlePostClick(post.id)}
        />
      ))}
    </div>
  );
}

export default PostList;