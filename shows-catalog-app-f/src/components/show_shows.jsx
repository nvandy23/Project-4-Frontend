import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { searchShows, saveFavorite } from '../utilities/movies-service';

const ShowTVShows = () => {
  const { user,isAuthenticated } = useAuth0();
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [savedFavorite, setSavedFavorite] = useState(null);

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
        type: "tvshow",
        userId: user.sub.toString(),
      };

      const savedFavorite = await saveFavorite(favoriteData);
      console.log('Favorite saved:', savedFavorite);
      setSavedFavorite(savedFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>TV Show Route</h1>
      {searchResults.map((show) => (
        <div key={show.id}>
          <h3>Show Details:</h3>
          <p>Show Genre: {show.media_type}</p>
          <p>Show Name: {show.name}</p>
          <p>Show Rating: {show.vote_average}</p>
          <p>Show Description: {show.overview}</p>
          {isAuthenticated && user && (
            <button onClick={() => handleSaveFavorite(show)}>Save</button>
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

export default ShowTVShows;






  