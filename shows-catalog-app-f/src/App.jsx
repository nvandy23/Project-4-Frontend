import { Route, Routes } from 'react-router-dom';
import Home  from './components/home';
import TrendingShows  from './components/trending_shows';
import ShowTVShows from './components/show_shows';
import ShowMovies from './components/show_movies';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending-shows" element={<TrendingShows />} />
      <Route path="/shows" element={<ShowTVShows />} />
      <Route path="/movies" element={<ShowMovies />} />
    </Routes>
  </>
);

export default App;
