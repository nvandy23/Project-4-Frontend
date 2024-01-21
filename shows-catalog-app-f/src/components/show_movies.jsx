import React, { useEffect, useState } from 'react';
import { searchMovies, saveFavorite } from '../utilities/movies-service';
import { useAuth0 } from "@auth0/auth0-react";

const ShowMovies = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [searchResults, setSearchResults] = useState([]);
  const [savedFavorite, setSavedFavorite] = useState(null);

  useEffect(() => {
    const handleSearchMovies = async () => {
      try {
        const searchResultsData = await searchMovies();
        setSearchResults(searchResultsData.results);
        console.log('Search Results:', searchResultsData);
      } catch (error) {
        console.error(error);
      }
    };

    handleSearchMovies();
  }, []); 

  const handleSaveFavorite = async (movie) => {
    try {
      const favoriteData = {
        name: movie.title,
        genre: movie.genre,  
        rating: movie.vote_average,
        description: movie.overview,
        type: "movie",
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
      <h1>Movie Show Route</h1>
      {searchResults.map((movie) => (
        <div key={movie.id}>
        <h3>Movie Details:</h3>
          <p>Movie Title: {movie.title}</p>
          <p>Movie Rating: {movie.vote_average}</p>
          <p>Movie Description: {movie.overview}</p>
          <p>Movie release date: {movie.release_date}</p>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <button onClick={() => handleSaveFavorite(movie)}>Save</button>
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

export default ShowMovies;
