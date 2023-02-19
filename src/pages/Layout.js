import React, {useState} from 'react';
import {Outlet, Link} from "react-router-dom";

function Layout({ username }) {
  return (
    <div>
      <header>
        <h1>{username}</h1>
      </header>

      <Outlet />

      <nav>
        <ul>
          <li>
            <Link to="/">Pantry</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Layout;