import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : {};

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand"><Link to="/">3W Socials</Link></div>
      <div className="nav-right" style={{position: 'relative'}}>
        <div className="nav-avatar" onClick={() => setShowProfileMenu(!showProfileMenu)} style={{cursor: 'pointer'}}>
          <img src={`https://ui-avatars.com/api/?name=${user.username || 'User'}&background=orange&color=fff`} alt="avatar" />
        </div>
        
        {showProfileMenu && (
          <div className="profile-dropdown">
            <div className="pd-user-info">
              <span className="pd-name">{user.username || 'Guest'}</span>
              <span className="pd-email">{user.email || 'No email'}</span>
            </div>
            <div className="pd-divider"></div>
            <button className="pd-logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
