// import * as movieApi from './movie_api'
import getTrendingMovies from './movie_api'
export default async function trending () {
    try {
     const movie =await getTrendingMovies()
     return movie 
    }
    catch{
  console.log('not working')
    }
}

