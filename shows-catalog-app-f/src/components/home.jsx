import React from 'react';
import axios from 'axios';
import '../assets/Navbar.css';
import { trendingMovies, trendingShows,searchMovies,searchShows } from '../utilities/movies-service';
import {useState} from 'react'
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Auth/LoginButton";
import LogoutButton from "./Auth/LogoutButton";

const Home = () => {
const { user, isAuthenticated, isLoading } = useAuth0();
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
  console.log(user,'is working')
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
console.log(isLoading)
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
          { (
          isAuthenticated ? (
            <span>
              <Link to="/profile">Profile</Link> || <LogoutButton />
            </span>
          ) : (
            <LoginButton />
          )
        )}
          <Link to="/trending-shows" className="link">Trending Shows</Link>
          <Link to ="/trending-movies" className="link1">Trending Movies</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
