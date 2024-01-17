import * as movieApi from './movie_api'


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