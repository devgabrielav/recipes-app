import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
    </Routes>
  );
}

export default App;
