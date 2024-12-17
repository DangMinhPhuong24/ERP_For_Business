import { createContext, useContext, useReducer } from 'react';
import { createTheme, responsiveFontSizes } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const responsiveLightTheme = responsiveFontSizes(lightTheme);

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const responsiveDarkTheme = responsiveFontSizes(darkTheme);

export const THEME_STORAGE_KEY = 'react-app-theme';

export const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
};

function init(defaultMode) {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) || defaultMode;
  return storedTheme === THEME_MODE.LIGHT ? responsiveLightTheme : responsiveDarkTheme;
}

function reducer(state, action) {
  switch (action.type) {
    case 'change':
      return action.payload === THEME_MODE.LIGHT ? responsiveLightTheme : responsiveDarkTheme;
    case 'reset':
      return init(action.payload);
    default:
      throw new Error('Theme Context: no action was found');
  }
}

const ThemeDispatchContext = createContext();

export const ThemeDispatchProvider = ThemeDispatchContext.Provider;

export const useThemeDispatch = () => useContext(ThemeDispatchContext);

export const useThemeContext = () => useReducer(reducer, THEME_MODE.LIGHT, init);

export const saveTheme = (mode) => localStorage.setItem(THEME_STORAGE_KEY, mode);
