import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className='div-logo-header'>
        <img className='logo-header' src="./image/logo.jpeg" alt="" />
      </div>
      <nav>
        <Link to="/">Home</Link>
      
          <Link to="/settings">Settings</Link>
       
      </nav>
    </header>
  );
};

export default Header;