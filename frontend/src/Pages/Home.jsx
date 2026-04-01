import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search, Moon } from 'lucide-react';
import CreatePost from '../Components/CreatePost';
import PostCard from '../Components/PostCard';

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const url = searchQuery.trim() 
        ? `/fetch-posts?search=${encodeURIComponent(searchQuery)}&page=${currentPage}&limit=5` 
        : `/fetch-posts?page=${currentPage}&limit=5`;

    axios.get(url).then((res) => {
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages || 1);
    }).catch(err => {
      if (err.response?.status === 401) {
        navigate('/login');
      }
    });
  }, [navigate, user, searchQuery, currentPage]);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = async (id) => {
    try {
      const res = await axios.post(`/like-post/${id}`);
      setPosts(posts.map(post => 
        post._id === id ? { ...post, likes: res.data.likes } : post
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (id, text) => {
    try {
        const res = await axios.post(`/comment-post/${id}`, { text });
        setPosts(posts.map(post => 
            post._id === id ? { ...post, comments: res.data.comments } : post
        ));
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div className="feed-container">
      <div className="search-header-area">
        <div className="search-bar-wrap">
          <input 
            type="text" 
            placeholder="Search promotions, users, posts..." 
            className="search-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn"><Search size={18} color="#fff" /></button>
        </div>
      </div>

      <CreatePost onPostCreated={handlePostCreated} />

      <div className="filter-pills-scroll">
          <button className="filter-pill active">All Post</button>
      </div>

      <div className="posts-list">
        {posts.map((post) => (
          <PostCard 
            key={post._id} 
            post={post} 
            currentUserId={user?._id}
            onLike={handleLike}
            onComment={handleComment}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="page-btn"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i + 1} 
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="page-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
