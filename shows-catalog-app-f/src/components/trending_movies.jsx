import React, { useEffect, useState } from 'react';
import { trendingMovies } from '../utilities/movies-service';
import { saveFavorite } from '../utilities/movies-service';
import { useAuth0 } from "@auth0/auth0-react";

const TrendingMoviesPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [trendingMoviesData, setTrendingMoviesData] = useState([]); 
  const [savedFavorite, setSavedFavorite] = useState(null);

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
      setSavedFavorite(savedFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Trending Movies</h2>
      {trendingMoviesData.map((movie) => (
        <div key={movie.id}>
          <h3>Movie Details:</h3>
          <p>Movie Title: {movie.title}</p>
          <p>Movie Rating: {movie.vote_average}</p>
          <p>Movie Description: {movie.overview}</p>
          <p>Movie release date: {movie.release_date}</p>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          {isAuthenticated && user && (
            <button onClick={() => handleSaveFavorite(movie)}>Save</button>
          )}
        </div>
      ))}

      {savedFavorite && (
        <div>
          <h2>Saved Favorite</h2>
          <p>Name: {savedFavorite.name}</p>
          <p>Genre: {savedFavorite.genre}</p>
          <p>Rating: {savedFavorite.rating}</p>
          <p>Description: {savedFavorite.description}</p>
        </div>
      )}
    </div>
  );
};

export default TrendingMoviesPage;

