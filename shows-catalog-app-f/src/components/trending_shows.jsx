import React, { useEffect, useState } from 'react';
import { trendingShows } from '../utilities/movies-service';

const TrendingShowsPage = () => {
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

  return (
    <div>
      <h2>Trending Shows</h2>
      {trendingShowsData.map((show) => (
        <div key={show.id}>
          <h3>Show Details:</h3>
          <p>Show Name: {show.name}</p>
          <p>Show Rating: {show.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default TrendingShowsPage;



