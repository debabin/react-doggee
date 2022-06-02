import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { IntlProvider, Theme, ThemeProvider } from '@features';
import { LoginPage, MainPage,NotFoundPage, RegistrationPage } from '@pages';
import { requestUser } from '@utils/api';
import { COOKIE_NAMES, ROUTES } from '@utils/constants';
import { useStore } from '@utils/contextes';
import { deleteCookie, getCookie, getLocale, getMessages } from '@utils/helpers';

import './App.css';

const AuthRoutes = () => (
  <Routes>
    <Route path={ROUTES.AUTH} element={<LoginPage />} />
    <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
    <Route path='*' element={<Navigate to={ROUTES.AUTH} />} />
  </Routes>
);

const MainRoutes = () => (
  <Routes>
    <Route path={ROUTES.MAIN} element={<MainPage />} />

    <Route path={ROUTES.AUTH} element={<Navigate to={ROUTES.MAIN} />} />
    <Route path={ROUTES.REGISTRATION} element={<Navigate to={ROUTES.MAIN} />} />
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);

const App = () => {
  const { service, setStore } = useStore();
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

    const preloads = [getMessages(locale)];
    if (authCookie && !deviceExpire) preloads.push(requestUser({ params: { id: '1' } }));
    Promise.all(preloads).then(([messages, userResponse]) => {
      setMessages(messages);
      if (userResponse) setStore({ user: userResponse.data, service: { isLogined: true } });
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return null;

  const theme = (getCookie(COOKIE_NAMES.THEME) as Theme) ?? 'light';

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={messages}>
        <BrowserRouter>{service.isLogined ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>
      </IntlProvider>
    </ThemeProvider>
  );
};

export default App;
