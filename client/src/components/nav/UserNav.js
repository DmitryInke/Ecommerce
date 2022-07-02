import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user/history" className="navbar-brand ml-3">
          History
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="navbar-brand ml-3">
          Password
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/wishlist" className="navbar-brand ml-3">
          Wishlist
        </Link>
      </li>
    </ul>
  </nav>
);
export default UserNav;
