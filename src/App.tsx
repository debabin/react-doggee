import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { LoginPage, NotFoundPage, RegistrationPage } from '@pages';
import { deleteCookie, getCookie } from '@utils';

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
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const authCookie = getCookie('doggee-auth-token');
    const isNotMyDevice = getCookie('doggee-isNotMyDevice');

    const deviceExpire = isNotMyDevice && new Date().getTime() > new Date(+isNotMyDevice).getTime();
    if (authCookie && deviceExpire) {
      deleteCookie('doggee-auth-token');
      deleteCookie('doggee-isNotMyDevice');
    }

    if (authCookie && !deviceExpire) {
      setIsAuth(true);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>;
}

export default App;
