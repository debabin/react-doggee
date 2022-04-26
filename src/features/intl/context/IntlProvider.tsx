import React from 'react';

import type { IntlContextProps } from './IntlContext';
import { IntlContext } from './IntlContext';

type IntlProviderProps = IntlContextProps;

export const IntlProvider: React.FC<IntlProviderProps> = ({ locale, messages, children }) => {
  const value = React.useMemo(() => ({ locale, messages }), []);
  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
};
