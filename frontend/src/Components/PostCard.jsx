import React, { useState } from 'react';
import { Heart, MessageSquare, Share2 } from 'lucide-react';

const PostCard = ({ post, currentUserId, onLike, onComment }) => {
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const isLiked = post.likes?.includes(currentUserId);
  const likesCount = post.likes?.length || 0;
  const commentsCount = post.comments?.length || 0;

  const formatDate = (dateString) => {
    const options = {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    };
    return new Date(dateString).toLocaleDateString('en-US', options).replace(/,/g, '');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onComment(post._id, commentInput);
    setCommentInput('');
  };

  return (
    <div className="social-post-card">
      <div className="sp-header">
        <img
          src={`https://ui-avatars.com/api/?name=${post.user?.username || 'U'}&background=random`}
          alt="user"
          className="sp-avatar"
        />
        <div className="sp-user-info">
          <div className="sp-name-row">
            <span className="sp-name">{post.user?.username || 'Unknown User'}</span>
            <span className="sp-handle">@{post.user?.username?.toLowerCase().replace(/\s/g, '') || 'user'}</span>
          </div>
          <div className="sp-date">{formatDate(post.createdAt || Date.now())}</div>
        </div>
      </div>

      <div className="sp-body">
        {post.caption && <p>{post.caption}</p>}
        {post.image && <img src={post.image} alt="post media" className="sp-media" />}
      </div>

      <div className="sp-footer">
        <button
          className={isLiked ? "sp-action-btn liked" : "sp-action-btn"}
          onClick={() => onLike(post._id)}
        >
          <Heart size={20} fill={isLiked ? "#ff4d4d" : "transparent"} color={isLiked ? "#ff4d4d" : "#666"} />
          <span>{likesCount}</span>
        </button>
        <button className="sp-action-btn" onClick={() => setIsCommentsExpanded(!isCommentsExpanded)}>
          <MessageSquare size={20} color="#666" />
          <span>{commentsCount}</span>
        </button>
      </div>

      {isCommentsExpanded && (
        <div className="post-comments">
          <div className="comments-list">
            {post.comments?.length > 0 ? (
              post.comments.map((c, i) => (
                <div key={i} className="comment-item">
                  <img src={`https://ui-avatars.com/api/?name=${c.user?.username || 'U'}&background=random`} alt="user" className="comment-avatar" />
                  <div className="comment-content">
                    <span className="comment-username">{c.user?.username || 'Unknown User'}</span>
                    <span className="comment-text">{c.text}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-comments">No comments yet. Be the first to comment!</div>
            )}
          </div>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <img src={`https://ui-avatars.com/api/?name=U&background=random`} alt="you" className="comment-avatar-small" />
            <div className="comment-input-wrapper">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <button type="submit" disabled={!commentInput.trim()}>Post</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;
