import React from 'react';
import {Outlet, Link} from "react-router-dom";

function Pantry() {
  return (
    <div>
      <Outlet />

      <nav>
        <ul>
          <li>
            <Link to="/">Pantry</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pantry;