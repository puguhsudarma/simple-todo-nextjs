import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import rootReducer from './reducers';

const initialState = {};

export const newStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      const middlewares = [...getDefaultMiddleware()];

      if (process.env.NODE_ENV !== `production`) {
        middlewares.push(logger);
      }

      return middlewares;
    },
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
  });

  return store;
};

export const wrapper = createWrapper(newStore, { debug: process.env.NODE_ENV === `development` });
