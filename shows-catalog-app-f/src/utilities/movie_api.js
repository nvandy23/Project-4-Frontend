// import axios from 'axios';
import config from "../config";


 export async function getTrendingMovies(){
    try {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
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
        console.error(error);
        throw error;
      }
 }

 export async function getTrendingShows() {
   try {
     const response = await fetch('https://api.themoviedb.org/3/trending/tv/week?language=en-US', {
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
     console.error(error);
     throw error;
   }
 }
 

 export async function searchMovies() {
    try {
      const response = await fetch('https://api.themoviedb.org/3/search/movie?query=Oppenheimer&include_adult=false&language=en-US&page=1', {
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
      console.error(error);
      throw error;
    }
  }
  

  export async function searchShows() {
    try {
      const response = await fetch('https://api.themoviedb.org/3/search/tv?query=breaking%20bad&include_adult=false&language=en-US&page=1', {
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
      console.error(error);
      throw error;
    }
  }





