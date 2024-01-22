import React, { useEffect, useState } from 'react';
import { trendingMovies } from '../utilities/movies-service';
import { saveFavorite } from '../utilities/movies-service';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import '../../dist/assets/index.css'; 

const TrendingMoviesPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [trendingMoviesData, setTrendingMoviesData] = useState([]);
  const [savedFavorites, setSavedFavorites] = useState([]); 
  const [isButtonSaved, setIsButtonSaved] = useState({}); 

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const trendingMoviesData = await trendingMovies();
        setTrendingMoviesData(trendingMoviesData.results);
        console.log(trendingMoviesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleSaveFavorite = async (movie) => {
    try {
      const favoriteData = {
        name: movie.title,
        genre: movie.genre,
        rating: movie.vote_average,
        description: movie.overview,
        type: "movie",
        release_date: movie.release_date,
        userId: user.sub.toString(),
      };
      console.log('User ID:', user.sub);

      const savedFavorite = await saveFavorite(favoriteData);
      console.log('Favorite saved:', savedFavorite);
      setSavedFavorites((prevFavorites) => [...prevFavorites, savedFavorite]);
      setIsButtonSaved((prevButtonStatus) => ({
        ...prevButtonStatus,
        [movie.id]: true, 
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/trending-shows">Trending Shows</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <h1 className = "header">Trending Movies:</h1>
      <div className="card-container">
        {trendingMoviesData.map((movie) => (
          <div key={movie.id} className="card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>Title: {movie.title}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>Description: {movie.overview}</p>
            <p>Release date: {movie.release_date}</p>
            {isAuthenticated && user && (
              <button onClick={() => handleSaveFavorite(movie)} disabled={isButtonSaved[movie.id]}>
                {isButtonSaved[movie.id] ? 'Saved to favorites' : 'Save to favorites'}
              </button>
            )}
          </div>
        ))}
      </div>

      {savedFavorites.map((savedFavorite) => (
        <div key={savedFavorite.id} className="card">
          <h2>Saved Favorite</h2>
          <p>Name: {savedFavorite.name}</p>
          <p>Rating: {savedFavorite.rating}</p>
          <p>Description: {savedFavorite.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TrendingMoviesPage;


