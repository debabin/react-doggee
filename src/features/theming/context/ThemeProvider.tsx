import React from 'react';

import { COOKIE_NAMES } from '@utils/constants';
import { setCookie } from '@utils/helpers';

import type { Theme,ThemeContextProps } from './ThemeContext';
import { ThemeContext } from './ThemeContext';

import darkTheme from '../../../static/theme/dark/dark.module.css';
import lightTheme from '../../../static/theme/light/light.module.css';

interface IntlProviderProps extends Omit<ThemeContextProps, 'setTheme'> {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<IntlProviderProps> = ({ theme, children }) => {
  const [currentTheme, setCurrentTheme] = React.useState(theme);

  const setTheme = (theme: Theme) => {
    setCookie(COOKIE_NAMES.THEME, theme);
    setCurrentTheme(theme);
  };

  const value = React.useMemo(() => ({ theme: currentTheme, setTheme }), []);
  return (
    <ThemeContext.Provider value={value}>
      <button onClick={() => setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')}>
        change theme
      </button>
      <div className={currentTheme === 'dark' ? darkTheme.container : lightTheme.container}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
