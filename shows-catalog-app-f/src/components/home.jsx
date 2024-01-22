import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Auth/LoginButton";
import LogoutButton from "./Auth/LogoutButton";
import "../src/assets/homepage/NavBar.css";


const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const [searchShowQuery, setSearchShowQuery] = useState('');
  const [searchMovieQuery,setsearchMovieQuery] =useState('')
  const navigate = useNavigate();

  const handleSearchQueryChange = (e) => {
    setSearchShowQuery(e.target.value);
    console.log(e.target.value)
  }; 

  const handleSearchMovieQueryChange = (e) => {
    setsearchMovieQuery(e.target.value);
    console.log(e.target.value)
  }

  const handleSearchShowSubmit = (e) => {
    e.preventDefault();
    navigate(`/shows/${searchShowQuery}`);
  };
  
  const handleMovieShowSubmit = (e) => {
    e.preventDefault();
    navigate(`/movies/${searchMovieQuery}`);
  };

  return (
    <div>
      <div className="nav-bar">
        <div className="logo">Search Seek</div>
        <div className="link-container">
          <form className="search-form" onSubmit={handleSearchShowSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Search TV shows"
              value={searchShowQuery}
              onChange={handleSearchQueryChange}
            />
            <button type="submit">Search Shows</button>
          </form>
          <form className="search-form" onSubmit={handleMovieShowSubmit}>
            <input
              type="text"
              className="search-input"
              placeholder="Search Movies"
              value={searchMovieQuery}
              onChange={handleSearchMovieQueryChange}

            />
            <button type="submit">Search Movies</button>
          </form>
          {isAuthenticated && user ? (
            <span>
              <Link to="/profile"  className="profile-link">Profile</Link> <LogoutButton />
            </span>
          ) : (
            <LoginButton />
          )}
          <Link to="/trending-shows" className="link">
            Trending Shows
          </Link>
          <Link to="/trending-movies" className="link1">
            Trending Movies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;




