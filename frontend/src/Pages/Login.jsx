import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-split-wrapper">
        
        {/* Left Side Visual Array */}
        <div className="auth-left-section">
          <div className="auth-left-content">
            <h1>Discover.<br/>Connect.<br/>Inspire.</h1>
            <p>Join the most exclusive community of creators and professionals. Elevate your journey with 3W Socials today.</p>
          </div>
          <div className="auth-glass-shape"></div>
        </div>
        
        {/* Right Side Form */}
        <div className="auth-right-section">
          <div className="auth-container">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Log in to your 3W Socials account.</p>
            
            {error && <p className="error">{error}</p>}
            
            <form onSubmit={handleSubmit} className="auth-form">
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
                Log In <ArrowRight size={18} />
              </button>
            </form>
            
            <div className="auth-links">
              <p>Don't have an account? <Link to="/signup">Sign up now</Link></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
