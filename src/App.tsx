import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Login from './components/Login';
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
      </Routes>
    </layoutContext.Provider>

  );
}

export default App;
