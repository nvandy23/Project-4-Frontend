// import axios from 'axios';
import config from "../config";


 export async function getTrendingMovies(){
    console.log(config)
    const response =await fetch ('https://api.themoviedb.org/3/trending/movie/day?language=en-US',{
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: config.TOKEN
 }})

    if (response.ok){
        const movieData = await response.json()
        return movieData
    }

    else {
        console.log("bad request")
    }
 }

 export async function getTrendingShows(){
    console.log(config)
    const response =await fetch ('https://api.themoviedb.org/3/trending/tv/day?language=en-US',{
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: config.TOKEN
 }})

    if (response.ok){
        const movieData = await response.json()
        return movieData
    }

    else {
        console.log("bad request")
    }
 }

 export async function searchMovies() {
    try {
      const response = await fetch('https://api.themoviedb.org/3/search/tv?query=oppenheimer&include_adult=false&language=en-US&page=1', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: config.TOKEN
        },
      });
  
      if (response.ok) {
        const showData = await response.json();
        return showData;
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        throw new Error('Failed to fetch TV shows');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  