import config from "../config";

export const getTrendingMovies = async () => {
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
};

export const getTrendingShows = async () => {
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
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, {
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
    console.error(error);
    throw error;
  }
};






