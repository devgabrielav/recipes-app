import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LayoutProvider from './context/layout/LayoutProvider';
import Login from './components/Login/Login';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <LayoutProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route
          path="/meals"
          element={
            <>
              <Home />
              <Footer />
            </>
         }
        />
        <Route
          path="/drinks"
          element={
            <>
              <Home />
              <Footer />
            </>
         }
        />
        <Route
          path="/profile"
          element={
            <>
              <Home />
              <Footer />
            </>
         }
        />
        <Route path="/done-recipes" element={ <Home /> } />
        <Route path="/favorite-recipes" element={ <Home /> } />
      </Routes>
    </LayoutProvider>
  );
}

export default App;
