import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { trendingShows, saveFavorite } from '../utilities/movies-service';
import '../CSS/index.css'; 

const TrendingShowsPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [trendingShowsData, setTrendingShowsData] = useState([]);
  const [savedFavorites, setSavedFavorites] = useState([]);
  const [isButtonSaved, setIsButtonSaved] = useState({});

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
        rating: show.vote_average,
        description: show.overview,
        type: "tvshow",
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
      </div>
      <h1 className ="header">Trending Shows:</h1>
      <div className="card-container">
        {trendingShowsData.map((show) => (
          <div key={show.id} className="card">
            <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} />
            <p>Name: {show.name}</p>
            <p>Rating: {show.vote_average}</p>
            <p>Description: {show.overview}</p>
            {isAuthenticated && user && (
              <button onClick={() => handleSaveFavorite(show)} disabled={isButtonSaved[show.id]}>
                {isButtonSaved[show.id] ? 'Saved to favorites' : 'Save to favorites'}
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

export default TrendingShowsPage;








