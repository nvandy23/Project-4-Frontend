import React, { useEffect, useState } from 'react';
import { trendingShows } from '../utilities/movies-service';
import { saveFavorite } from '../utilities/movies-service';
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom'; 

const TrendingShowsPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [trendingShowsData, setTrendingShowsData] = useState([]);
  const [savedFavorite, setSavedFavorite] = useState(null);
  const [isButtonSaved, setIsButtonSaved] = useState(false);

  useEffect(() => {
    const fetchTrendingShows = async () => {
      try {
        const trendingShowsData = await trendingShows();
        setTrendingShowsData(trendingShowsData.results);
        console.log(trendingShowsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendingShows();
  }, []);

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
      console.log('User ID:', user.sub);
      console.log('Show Details:', show);

      const savedFavorite = await saveFavorite(favoriteData);
      console.log('Favorite saved:', savedFavorite);
      setIsButtonSaved(true);


      setSavedFavorite(savedFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <div>
        <Link to="/">Home</Link>
        <Link to="/trending-movies">Trending Movies</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <h2>Trending Shows</h2>
      {trendingShowsData.map((show) => (
        <div key={show.id}>
          <h3>Show Details:</h3>
          <p> Show Genre: {show.media_type}</p>
          <p>Show Name: {show.name}</p>
          <p>Show Rating: {show.vote_average}</p>
          <p> Show Description: {show.overview}</p>
          <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
          {isAuthenticated && user && (
           <button onClick={() => handleSaveFavorite(show)} disabled={isButtonSaved}>
           {isButtonSaved ? 'Saved' : 'Save'}
         </button>
          )}
        </div>
      ))}

      {savedFavorite && (
        <div>
          <h2>Saved Favorite</h2>
          <p>Name: {savedFavorite.name}</p>
          <p>Rating: {savedFavorite.rating}</p>
          <p>Description: {savedFavorite.description}</p>
        </div>
      )}
    </div>
  );
};

export default TrendingShowsPage;




