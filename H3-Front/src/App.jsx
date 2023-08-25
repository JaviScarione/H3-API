import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import HomePage from './pages/Home/HomePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
