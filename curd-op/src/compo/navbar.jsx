import React from 'react';
import "../style/navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='container'>
        <div className='logo' onClick={() => navigate('/')}>📚 BookStore</div>
        <div className='info'>
          <ul>
            <li onClick={() => navigate('/')}>HOME</li>
            <li onClick={() => navigate('/about')}>ABOUT</li>
            <li onClick={() => navigate('/contact')}>CONTACT</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
