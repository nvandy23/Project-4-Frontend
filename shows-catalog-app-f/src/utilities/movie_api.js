// import axios from 'axios';
import config from "../config";


// const getTrendingMovies = async () => {
//   try {
//     const options = {
//       method: 'GET',
//       url: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
//       headers: {
//         accept: 'application/json',
//         Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
//       },
//     };

//     const response = await axios.request(options);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export default getTrendingMovies;


 export default async function getTrendingMovies(){
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