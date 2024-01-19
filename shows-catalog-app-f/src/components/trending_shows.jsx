import React, { useEffect, useState } from 'react';
import { trendingShows } from '../utilities/movies-service';
import { saveFavorite } from '../utilities/movies-service';
import { useAuth0 } from "@auth0/auth0-react";
const TrendingShowsPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [trendingShowsData, setTrendingShowsData] = useState([]); 

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
        rating: show.rating,
        description: show.description,
        type: "tvshow",
        userId:user.sub.toString()
      };
      console.log('User ID:', user.sub);

      const savedFavorite = await saveFavorite(favoriteData);
      console.log('Favorite saved:', savedFavorite);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2>Trending Shows</h2>
      {trendingShowsData.map((show) => (
        <div key={show.id}>
          <h3>Show Details:</h3>
          <p>Show Name: {show.name}</p>
          <p>Show Rating: {show.rating}</p>
          <button onClick={() => handleSaveFavorite(show)}>Save</button>
        </div>
      ))}
    </div>
  );
};

export default TrendingShowsPage;



