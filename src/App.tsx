import { Route, Routes } from 'react-router-dom';
import LayoutProvider from './context/layout/LayoutProvider';
import ScrollToTop from './components/Layout/ScrollToTop';
import Landing from './pages/Landing';
import Explore from './pages/Explore';
import RecipeDetails from './pages/RecipeDetails';
import InProgress from './pages/RecipeInProgress';
import InProgressRecipes from './pages/InProgressRecipes';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <LayoutProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={ <Landing /> } />
        <Route path="/meals" element={ <Explore /> } />
        <Route path="/drinks" element={ <Explore /> } />
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        <Route path="/meals/:id/in-progress" element={ <InProgress /> } />
        <Route path="/drinks/:id/in-progress" element={ <InProgress /> } />
        <Route path="/in-progress" element={ <InProgressRecipes /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </LayoutProvider>
  );
}

export default App;
