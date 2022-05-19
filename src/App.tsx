import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { LoginPage, NotFoundPage, RegistrationPage } from '@pages';
import { deleteCookie, getCookie, getLocale, getMessages } from '@utils/helpers';
import { IntlProvider, Theme, ThemeProvider } from '@features';
import { COOKIE_NAMES } from '@utils/constants';
import { StoreProvider } from '@utils/contextes';

import './App.css';
import { ApiClientProvider } from '@features/api';

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

const App = () => {
  const [isAuth, setIsAuth] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [messages, setMessages] = React.useState({});
  const locale = getLocale();

  React.useEffect(() => {
    const authCookie = getCookie(COOKIE_NAMES.AUTH_TOKEN);
    const isNotMyDevice = getCookie(COOKIE_NAMES.IS_NOT_MY_DEVICE);

    const deviceExpire = isNotMyDevice && new Date().getTime() > new Date(+isNotMyDevice).getTime();
    if (authCookie && deviceExpire) {
      deleteCookie(COOKIE_NAMES.AUTH_TOKEN);
      deleteCookie(COOKIE_NAMES.IS_NOT_MY_DEVICE);
    }

    if (authCookie && !deviceExpire) {
      setIsAuth(true);
    }

    getMessages(locale).then((messages) => {
      setMessages(messages);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return null;

  const theme = (getCookie(COOKIE_NAMES.THEME) as Theme) ?? 'light';

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={messages}>
        <ApiClientProvider>
          <StoreProvider>
            <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>
          </StoreProvider>
        </ApiClientProvider>
      </IntlProvider>
    </ThemeProvider>
  );
};

export default App;
