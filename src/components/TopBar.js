import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/cg-hub-logo.svg';
import search from '../assets/icons/search_w.svg';

const TopBar = () => (
  <main className="TopBar">
    <Link to="/" className="logo">
      <img src={logo} alt="cg-hub-logo" />
    </Link>
    <article>
      <ul>
        <li>
          <Link to="/systems">Systems</Link>
        </li>
        <li>
          <Link to="/motion">Motion</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
      <img width="20" src={search} alt="search" />
    </article>
  </main>
);

export default TopBar;
