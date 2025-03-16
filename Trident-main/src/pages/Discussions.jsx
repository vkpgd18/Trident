import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000/api/discussions";

const Discussions = () => {
  // State declarations
  const [discussions, setDiscussions] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const navigate = useNavigate();

  // Auth header configuration
  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  // Fetch discussions on mount
  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const response = await axios.get(API_URL, getAuthHeader());
      setDiscussions(response.data);
    } catch (error) {
      if (error.response?.status === 401) navigate("/login");
    }
  };

  const handleUpvote = async (discussionId) => {
    try {
      await axios.post(
        `${API_URL}/${discussionId}/upvote`,
        {},
        getAuthHeader()
      );
      const updated = discussions.map(d => 
        d.id === discussionId ? 
        { ...d, upvotes_count: d.has_upvoted ? d.upvotes_count - 1 : d.upvotes_count + 1, 
          has_upvoted: !d.has_upvoted } 
        : d
      );
      setDiscussions(updated);
    } catch (error) {
      if (error.response?.status === 401) navigate("/login");
    }
  };

  const handleCreateDiscussion = async () => {
    if (!newPost.title || !newPost.content) return;
    try {
      const response = await axios.post(
        API_URL,
        newPost,
        getAuthHeader()
      );
      setDiscussions([response.data, ...discussions]);
      setNewPost({ title: "", content: "" });
    } catch (error) {
      if (error.response?.status === 401) navigate("/login");
    }
  };

  const fetchComments = async (discussionId) => {
    try {
      const response = await axios.get(
        `${API_URL}/${discussionId}/comments`,
        getAuthHeader()
      );
      setComments(response.data);
      setSelectedDiscussion(discussionId);
    } catch (error) {
      if (error.response?.status === 401) navigate("/login");
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await axios.post(
        `${API_URL}/${selectedDiscussion}/comments`,
        { content: newComment, parent_comment_id: replyingTo },
        getAuthHeader()
      );
      setComments([...comments, response.data]);
      setNewComment("");
      setReplyingTo(null);
      await fetchDiscussions();
    } catch (error) {
      if (error.response?.status === 401) navigate("/login");
    } finally {
      setSelectedDiscussion(null); // Always close modal
    }
  };

  const renderComments = (comments, depth = 0) => {
    return comments.map((comment) => (
      <div 
        key={comment.id} 
        className={`comment ${depth > 0 ? 'nested-comment' : ''}`}
        style={{ marginLeft: `${depth * 32}px` }}
      >
        <div className="comment-content">
          <div className="comment-header">
            <span className="comment-author">{comment.user.username}</span>
            <span className="comment-time">
              {new Date(comment.timestamp).toLocaleString()}
            </span>
          </div>
          <p className="comment-text">{comment.content}</p>
          <button 
            className="reply-button"
            onClick={() => setReplyingTo(comment.id)}
          >
            Reply
          </button>
        </div>
        {comment.replies && renderComments(comment.replies, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="discussions-container">
      <style>{`
        .discussions-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .create-discussion-card {
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .section-title {
          margin: 0 0 20px 0;
          color: #333;
          font-size: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        .form-input, .form-textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        .primary-button {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .primary-button:hover {
          background: #0056b3;
        }
        
        .discussions-list {
          display: grid;
          gap: 20px;
        }
        
        .discussion-card {
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .discussion-header {
          margin-bottom: 15px;
        }
        
        .discussion-title {
          margin: 0 0 5px 0;
          color: #222;
          font-size: 1.2rem;
        }
        
        .discussion-meta {
          display: flex;
          gap: 10px;
          align-items: center;
          font-size: 0.9rem;
        }
        
        .discussion-author {
          color: #666;
        }
        
        .discussion-timestamp {
          color: #666;
        }
        
        .discussion-content {
          color: #444;
          line-height: 1.6;
          margin-bottom: 15px;
        }
        
        .discussion-footer {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        
        .upvote-button {
          background: #f0f0f0;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .upvote-button.upvoted {
          background: #007bff;
          color: white;
        }
        
        .comments-button {
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .comments-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .comments-container {
          background: white;
          border-radius: 8px;
          padding: 20px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }
        
        .comments-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }
        
        .comment {
          padding: 15px;
          margin-bottom: 15px;
          background: #f8f9fa;
          border-radius: 4px;
        }
        
        .nested-comment {
          border-left: 3px solid #007bff;
        }
        
        .comment-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 0.9rem;
        }
        
        .comment-author {
          color: #007bff;
          font-weight: 500;
        }
        
        .comment-time {
          color: #666;
        }
        
        .reply-button {
          background: none;
          border: none;
          color: #007bff;
          cursor: pointer;
          padding: 0;
          font-size: 0.9rem;
        }
        
        .comment-form {
          margin-top: 20px;
        }
        
        .comment-textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        
        .form-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        
        .secondary-button {
          background: #6c757d;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .no-comments {
          color: #666;
          text-align: center;
          padding: 20px;
        }
      `}</style>

      {/* Create Discussion Form */}
      <div className="create-discussion-card">
        <h2 className="section-title">Start a New Discussion</h2>
        <div className="form-group">
          <input
            className="form-input"
            name="title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Discussion Title"
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-textarea"
            name="content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="Write your thoughts here..."
            rows={4}
          />
        </div>
        <button 
          className="primary-button"
          onClick={handleCreateDiscussion}
        >
          Post Discussion
        </button>
      </div>

      {/* Discussions List */}
      <div className="discussions-list">
        {discussions.map((discussion) => (
          <div key={discussion.id} className="discussion-card">
            <div className="discussion-header">
              <h3 className="discussion-title">{discussion.title}</h3>
              <div className="discussion-meta">
                <span className="discussion-author">by {discussion.user.username}</span>
                <span className="discussion-timestamp">
                  {new Date(discussion.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
            <p className="discussion-content">{discussion.content}</p>
            <div className="discussion-footer">
              <button 
                className={`upvote-button ${discussion.has_upvoted ? 'upvoted' : ''}`}
                onClick={() => handleUpvote(discussion.id)}
              >
                ▲ {discussion.upvotes_count}
              </button>
              <button 
                className="comments-button"
                onClick={() => fetchComments(discussion.id)}
              >
                💬 {discussion.comments_count}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comments Modal */}
      {selectedDiscussion && (
        <div className="comments-modal">
          <div className="comments-container">
            <div className="comments-header">
              <h3>Comments</h3>
              <button 
                className="close-button"
                onClick={() => setSelectedDiscussion(null)}
              >
                &times;
              </button>
            </div>
            <div className="comments-list">
              {comments.length > 0 ? renderComments(comments) : (
                <p className="no-comments">No comments yet. Be the first to comment!</p>
              )}
            </div>
            <div className="comment-form">
              <textarea
                className="comment-textarea"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={replyingTo ? "Write a reply..." : "Write a comment..."}
                rows={3}
              />
              <div className="form-actions">
                {replyingTo && (
                  <button 
                    className="secondary-button"
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancel Reply
                  </button>
                )}
                <button 
                  className="primary-button"
                  onClick={handleCommentSubmit}
                >
                  {replyingTo ? "Post Reply" : "Post Comment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussions;