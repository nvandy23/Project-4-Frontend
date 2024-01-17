import React from 'react';
import axios from 'axios';
import '../assets/Navbar.css';
import trending from '../utilities/movies-service'
import {useState} from 'react'

const Home = () => {
const [movie, setMovie] =useState(null)
  const handleShowSearch = (e) => {
    e.preventDefault();
  };

  const handleMovieSearch = (e) => {
    e.preventDefault();
  };

  const handleMoviesButtonClick = async () => {
    try {
     const trendingMovies =  await trending(movie);
     setMovie(trendingMovies)
     console.log(trendingMovies)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="nav-bar">
        <div className="logo">Catalog</div>
        <div className="link-container">
          <form className="search-form" onSubmit={handleShowSearch}>
            <input type="text" className="search-input" placeholder="Search TV shows" />
            <button type="submit">Search Shows</button>
          </form>
          <form className="search-form" onSubmit={handleMovieSearch}>
            <input type="text" className="search-input" placeholder="Search Movies" />
            <button type="submit">Search Movies</button>
          </form>
          <a href="#" className="link">Login</a>
          <a href="/shows" className="link">Shows</a>
          <button onClick={handleMoviesButtonClick} className="link">Movies</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
