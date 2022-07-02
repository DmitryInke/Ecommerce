import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="navbar-brand ml-3">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/product" className="navbar-brand ml-3">
          Product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="navbar-brand ml-3">
          Products
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/category" className="navbar-brand ml-3">
          Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub" className="navbar-brand ml-3">
          Sub Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/coupon" className="navbar-brand ml-3">
          Coupon
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="navbar-brand ml-3">
          Password
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
