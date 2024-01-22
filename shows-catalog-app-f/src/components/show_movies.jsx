import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams, Link } from 'react-router-dom';
import { searchMovies, saveFavorite } from '../utilities/movies-service';

const ShowMovies = () => {
  const { user, isAuthenticated } = useAuth0();
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [savedFavorites, setSavedFavorites] = useState([]); 
  const [isButtonSaved, setIsButtonSaved] = useState({}); 

  const handleSearchMovies = async () => {
    try {
      if (!query) {
        console.error('Query parameter is missing.');
        return;
      }

      const searchResultsData = await searchMovies(query);
      const results = searchResultsData?.results;
      setSearchResults(results);
      console.log('Search Results:', results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearchMovies();
  }, [query]);

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
        <Link to="/trending-movies">Trending Movies</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/trending-shows">Trending Shows</Link>
      </div>
      <h1 className ="header">Search results:</h1>
      <div className="card-container">
      {searchResults.map((movie) => (
        <div key={movie.id} className='card'>
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
        <div key={savedFavorite.id}>
          <h2>Saved Favorite</h2>
          <p>Name: {savedFavorite.name}</p>
          <p>Rating: {savedFavorite.rating}</p>
          <p>Description: {savedFavorite.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowMovies;


