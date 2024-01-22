import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams, Link } from 'react-router-dom';
import { searchShows, saveFavorite } from '../utilities/movies-service';

const ShowTVShows = () => {
  const { user, isAuthenticated } = useAuth0();
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [savedFavorites, setSavedFavorites] = useState([]);
  const [isButtonSaved, setIsButtonSaved] = useState({});

  const handleSearchShows = async () => {
    try {
      if (!query) {
        console.error('Query parameter is missing.');
        return;
      }
      const searchResultsData = await searchShows(query);
      const results = searchResultsData?.results;
      setSearchResults(results);
      console.log('Search Results:', results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearchShows();
  }, [query]);

  const handleSaveFavorite = async (show) => {
    try {
      const favoriteData = {
        name: show.name,
        genre: show.genre,
        rating: show.vote_average,
        description: show.overview,
        type: 'tvshow',
        userId: user.sub.toString(),
      };

      const savedFavorite = await saveFavorite(favoriteData);
      console.log('Favorite saved:', savedFavorite);
      setSavedFavorites((prevFavorites) => [...prevFavorites, savedFavorite]);
      setIsButtonSaved((prevButtonStatus) => ({
        ...prevButtonStatus,
        [show.id]: true,
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
        <Link to="/trending-shows">Trending shows</Link>
      </div>

      <h1>TV Show Route</h1>
      <div className="card-container">
        {searchResults.map((show) => (
          <div key={show.id} className="card">
            <h3>Show Details:</h3>
            {show.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={`${show.name} Poster`}
              />
            )}
            <p>Show Genre: {show.media_type}</p>
            <p>Show Name: {show.name}</p>
            <p>Show Rating: {show.vote_average}</p>
            <p>Show Description: {show.overview}</p>
            {isAuthenticated && user && (
              <button onClick={() => handleSaveFavorite(show)} disabled={isButtonSaved[show.id]}>
                {isButtonSaved[show.id] ? 'Saved' : 'Save'}
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

export default ShowTVShows;