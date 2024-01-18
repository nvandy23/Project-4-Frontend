import React from 'react';
import axios from 'axios';
import '../assets/Navbar.css';
import { trending, trendingShows,searchMovies,searchShows } from '../utilities/movies-service';
import {useState} from 'react'
import TrendingShows from './trending_shows';
import { Link } from 'react-router-dom';

const Home = () => {

const [show, setShow] =useState(null)
const [search_movie, set_search_movie] =useState(null)
const [search_show,set_search_show] =useState(null)


 const handleShowSearch = async (e) => {
    e.preventDefault();
    try {
      const searchShowData = await searchShows(search_show);
      set_search_show(searchShowData);
      console.log(searchShowData);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleMovieSearch = async (e) => {
    e.preventDefault();
    try {
      const searchMovieData = await searchMovies(search_movie);
      set_search_movie(searchMovieData);
      console.log(searchMovieData);
    } catch (error) {
      console.error(error);
    }
  };

  

  const handleShowsButtonClick = async () => {
    try {
     const trendingShow =  await trendingShows(show);
     setShow(trendingShow)
     console.log(trendingShow)
    } catch (error) {
      console.error(error);
    }
  };


//   const handlesearchMovieButtonClick = async () => {
//     try {
//      const searchMovie =  await searchShows(search_movie);
//      set_search_movie(searchMovie)
//      console.log(searchMovie)
//     } catch (error) {
//       console.error(error);
//     }
//   };

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
          <a href="/" className="link">Login</a>
          <Link to="/trending-shows" className="link">Shows</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
