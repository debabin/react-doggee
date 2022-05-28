import React from 'react';

import { ApiClientContext } from './ApiClientContext';

export const useApiClient = () => React.useContext(ApiClientContext);
