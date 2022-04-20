import React from 'react';

import { ThemeContext } from '../context/ThemeContext';

export const useTheme = () => React.useContext(ThemeContext);
