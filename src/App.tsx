import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { LoginPage, NotFoundPage, RegistrationPage } from '@pages';

import './App.css';

const AuthRoutes = () => (
  <Routes>
    <Route path='/auth' element={<LoginPage />} />
    <Route path='/registration' element={<RegistrationPage />} />
    <Route path='*' element={<Navigate to='/auth' />} />
  </Routes>
);

const MainRoutes = () => (
  <Routes>
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);

function App() {
  const [isAuth, setIsAuth] = React.useState(false);

  return <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>;
}

export default App;
