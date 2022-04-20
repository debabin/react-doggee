import React from 'react';

import { setCookie } from '@utils';
import type { ThemeContextProps, Theme } from './ThemeContext';
import { ThemeContext } from './ThemeContext';
import darkTheme from '../../../static/theme/dark/dark.module.css';
import lightTheme from '../../../static/theme/light/light.module.css';

type IntlProviderProps = Omit<ThemeContextProps, 'setTheme'>;

export const ThemeProvider: React.FC<IntlProviderProps> = ({ theme, children }) => {
  const [currentTheme, setCurrentTheme] = React.useState(theme);

  const setTheme = (theme: Theme) => {
    setCookie('doggee-theme', theme);
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      <div className={currentTheme === 'dark' ? darkTheme.container : lightTheme.container}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
