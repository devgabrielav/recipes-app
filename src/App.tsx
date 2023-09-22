import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Header from './components/Header';
import LayoutProvider from './context/layout/LayoutProvider';

function App() {
  return (
    <LayoutProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Header title="Meals" /> } />
        <Route path="/drinks" element={ <Header title="Drinks" /> } />
        <Route
          path="/favorite-recipes"
          element={ <Header title="Favorite Recipes" disableSearch /> }
        />

        <Route
          path="/profile"
          element={ <Header title="Profile" disableSearch /> }
        />
        <Route
          path="/done-recipes"
          element={ <Header title="Done Recipes" disableSearch /> }
        />
      </Routes>
    </LayoutProvider>
  );
}

export default App;
