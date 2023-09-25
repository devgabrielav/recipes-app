import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Login from './components/Login/Login';
import Header from './components/Header';
import { layoutContext } from './context/layout/layoutContext';
import initialValue from './context/layout/initialValue';

function App() {
  const [layout, setLayout] = useState(initialValue);
  return (
    <layoutContext.Provider value={ [layout, setLayout] }>
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
    </layoutContext.Provider>

  );
}

export default App;
