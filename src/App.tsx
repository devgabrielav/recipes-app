import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LayoutProvider from './context/layout/LayoutProvider';
import Login from './components/Login/Login';
import Home from './pages/Home';

function App() {
  return (
    <LayoutProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Home /> } />
        <Route path="/drinks" element={ <Home /> } />
        <Route path="/profile" element={ <Home /> } />
        <Route path="/done-recipes" element={ <Home /> } />
        <Route path="/favorite-recipes" element={ <Home /> } />
      </Routes>
    </LayoutProvider>
  );
}

export default App;
