import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Image as ImageIcon, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ onPostCreated }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!caption && !image) return;

    const formData = new FormData();
    if (caption) formData.append('caption', caption);
    if (image) formData.append('image', image);

    try {
      const res = await axios.post('/create-post', formData);
      
      // If used inside the Feed (Home.jsx), run the optimistic update callback
      if (onPostCreated) {
        onPostCreated(res.data.post);
      } else {
        // If used as a standalone page via /create-post route, just navigate home
        navigate('/');
      }
      
      setCaption('');
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error(err);
      alert('Failed to post');
    }
  };

  return (
    <div className="create-post-box">
      <div className="cp-header">
        <h3>Create Post</h3>
        <div className="cp-tags">
          <span className="cp-tag active">All Posts</span>
        </div>
      </div>
      <div className="cp-input-area">
        <textarea
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        {image && <div className="image-preview">Image selected: {image.name}</div>}
      </div>
      <div className="cp-divider"></div>
      <div className="cp-actions">
        <div className="cp-icons">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: 'none' }}
          />
          <button type="button" onClick={() => fileInputRef.current.click()}>
            <ImageIcon size={20} color="#0095f6" />
          </button>
        </div>
        <button
          className={caption || image ? "cp-submit active" : "cp-submit"}
          onClick={handleCreatePost}
        >
          <Send size={16} /> Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
