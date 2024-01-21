import * as movieApi from './movie_api';
import axios from 'axios';
import config from '../config';

export const trendingMovies = async () => {
  try {
    const movie = await movieApi.getTrendingMovies();
    return movie;
  } catch {
    console.log('not working');
  }
};

export const trendingShows = async () => {
  try {
    const show = await movieApi.getTrendingShows();
    return show;
  } catch {
    console.log('not working');
  }
};

export const searchMovies = async (query) => {
  try {
    const search_show = await movieApi.searchMovies(query );
    return search_show;
  } catch {
    console.log('not working');
  }
};

export const searchShows = async (query) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: config.TOKEN
        },
      });
  
      if (response.ok) {
        const showData = await response.json();
        return showData;
      } 
      
    } catch (error) {
      console.error("Didn't fetch");
    }
  };

export const saveFavorite = async ({ name, genre, rating, description, userId }) => {
  try {
    const response = await axios.post(
      `${config.API_URL}/favorites/save`,
      { name, genre, rating, description, userId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.TOKEN,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserFavorites = async (userId) => {
  try {
    const response = await axios.get(`${config.API_URL}/favorites/user/${userId}`, {
      headers: {
        Authorization: config.TOKEN,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFavorite = async (favoriteId) => {
  try {
    const response = await axios.delete(`${config.API_URL}/favorites/${favoriteId}`, {
      headers: {
        Authorization: config.TOKEN,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateFavorite = async (favoriteId, updatedData) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/favorites/update/${favoriteId}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: config.TOKEN,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };




  

