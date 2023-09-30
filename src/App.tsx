import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutProvider from './context/layout/LayoutProvider';
import Login from './components/Login/Login';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import InProgress from './pages/InProgress';
import DoneRecipes from './components/DoneRecipes';
import Profile from './pages/Profile';
import Header from './components/Header';

function App() {
  return (
    <LayoutProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Home /> } />
        <Route path="/drinks" element={ <Home /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/favorite-recipes" element={ <Header /> } />
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        <Route path="/meals/:id/in-progress" element={ <InProgress /> } />
        <Route path="/drinks/:id/in-progress" element={ <InProgress /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
      </Routes>
    </LayoutProvider>
  );
}

export default App;
