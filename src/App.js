import { Box, ThemeProvider } from '@mui/material'
import AuthContextProvider from 'providers/AuthContextProvider'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import LoadingComponent from './components/App/LoadingComponent'
import ToastComponent from './components/App/ToastComponent'
import './contexts/i18n'
import { ThemeDispatchProvider, useThemeContext } from './contexts/theme'
import store from './redux/store'
import AppRoutes from './routes'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function App() {
  const [themeContext, themeDispatch] = useThemeContext()
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AuthContextProvider>
          <ThemeProvider theme={themeContext}>
            <ThemeDispatchProvider value={themeDispatch}>
              <Router>
                <Box className={`${themeContext.palette.mode} full-viewport`}>
                  <LoadingComponent />
                  <ToastComponent />
                  <Box flex={1} className="bg-light dark:bg-dark">
                    <AppRoutes />
                  </Box>
                </Box>
              </Router>
            </ThemeDispatchProvider>
          </ThemeProvider>
        </AuthContextProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default App
