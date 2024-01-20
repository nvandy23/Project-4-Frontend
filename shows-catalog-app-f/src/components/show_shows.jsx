import React, { useState, useEffect } from 'react';
import { searchShows, saveFavorite } from '../utilities/movies-service';
import { useAuth0 } from '@auth0/auth0-react';

const ShowTVShows = () => {
  const { user } = useAuth0();
  const [searchResults, setSearchResults] = useState([]);
  const [savedFavorite, setSavedFavorite] = useState(null);

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

  useEffect(() => {
    const handleSearchShows = async () => {
      try {
        const searchResultsData = await searchShows();
        setSearchResults(searchResultsData.results);
        console.log('Search Results:', searchResultsData);
      } catch (error) {
        console.error(error);
      }
    };

    handleSearchShows();
  }, []); 

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
          <button onClick={() => handleSaveFavorite(show)}>Save</button>
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


  