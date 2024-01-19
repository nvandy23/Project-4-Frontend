import * as movieApi from './movie_api'
import axios from 'axios';
import config from '../config';

export  async function trending () {
    try {
     const movie =await movieApi.getTrendingMovies()
     return movie 
    }
    catch{
  console.log('not working')
    }
}

export async function trendingShows () {
    try {
        const show =await movieApi.getTrendingShows()
        return show
       }
       catch{
     console.log('not working')
       }
   }


export async function searchMovies () {
    try {
        const search_show =await movieApi.searchMovies()
        return search_show
    }
    catch {
        console.log('not working')
    }
}

export async function searchShows () {
    try {
        const search_show =await movieApi.searchShows()
        return search_show
    }
    catch {
        console.log('not working')
    }
}


export async function saveFavorite({ name, genre, rating, description, userId }) {
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
}




export async function getUserFavorites(userId) {
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
}


  

