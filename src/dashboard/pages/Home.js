import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ol>
        <li>
          <Link to='/proposal/1'>Trip Proposal 1</Link>
        </li>
        <li>
          <Link to='/proposal/2'>Trip Proposal 2</Link>
        </li>
        <li>
          <Link to='/profile'>User Profile</Link>
        </li>
        <li>
          <Link to='/logout'>Sign out</Link>
        </li>
      </ol>
    </div>
  );
};

export default Home;
