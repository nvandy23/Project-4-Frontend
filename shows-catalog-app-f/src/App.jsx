import { Route, Routes } from 'react-router-dom';
import Home  from './components/home';
import TrendingShows  from './components/trending_shows';
import ShowTVShows from './components/show_shows';
import ShowMovies from './components/show_movies';
import Profile from "./components/Profile/pages/Profile";
import TrendingMoviesPage from "./components/trending_movies";


const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending-shows" element={<TrendingShows />} />
      <Route path="/shows/:query" element={<ShowTVShows />} />
      <Route path="/movies" element={<ShowMovies />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/trending-movies" element={<TrendingMoviesPage/>} />
    </Routes>
  </>
);

export default App;
