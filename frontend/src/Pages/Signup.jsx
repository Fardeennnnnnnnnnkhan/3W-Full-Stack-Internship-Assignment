import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', { username, email, password });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split-wrapper">
        
        {/* Left Side Visual Array */}
        <div className="auth-left-section">
          <div className="auth-left-content">
            <h1>Start.<br/>Build.<br/>Grow.</h1>
            <p>Create your profile, share your portfolio, and network with leading industry professionals instantly.</p>
          </div>
          <div className="auth-glass-shape"></div>
        </div>
        
        {/* Right Side Form */}
        <div className="auth-right-section">
          <div className="auth-container">
            <h2>Create Account</h2>
            <p className="auth-subtitle">Join 3W Socials absolutely free.</p>
            
            {error && <p className="error">{error}</p>}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-input-group">
                <User className="auth-icon" size={20} />
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>
              <div className="auth-input-group">
                <Mail className="auth-icon" size={20} />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="auth-input-group">
                <Lock className="auth-icon" size={20} />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              
              <button type="submit" className="auth-submit-btn">
                Create Account <ArrowRight size={18} />
              </button>
            </form>
            
            <div className="auth-links">
              <p>Already have an account? <Link to="/login">Log in here</Link></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
