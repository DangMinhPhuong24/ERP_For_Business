import React, { useCallback } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { useTranslation } from 'react-i18next'
import { Link, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ThemeSwitcher from '../Buttons/ThemeSwitcher'
import LanguageSwitcher from '../Buttons/LanguageSwitcher'
import { authUserSelector } from '../../redux/auth/auth.selectors'
import { logoutAction } from '../../redux/auth/auth.actions'

const pages = [
  { label: 'homepage', path: '/' },
  { label: 'about', path: '/about' }
]
const settings = [
  { label: 'profile', path: '/profile' },
  { label: 'dashboard', path: '/dashboard' }
]

function NavBar() {
  const { t } = useTranslation()
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const authUser = useSelector(authUserSelector)
  const dispatch = useDispatch()
  const isMatchLogin = useMatch('/login')

  const handleOpenNavMenu = useCallback(
    (event) => {
      setAnchorElNav(event.currentTarget)
    },
    [setAnchorElNav]
  )
  const handleOpenUserMenu = useCallback(
    (event) => {
      setAnchorElUser(event.currentTarget)
    },
    [setAnchorElUser]
  )

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null)
  }, [setAnchorElNav])

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null)
  }, [setAnchorElUser])

  const handleLogout = useCallback(() => {
    handleCloseUserMenu()
    dispatch(logoutAction())
  }, [dispatch, handleCloseUserMenu])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label}>
                  <Link to={{ pathname: page.path }}>
                    <Typography textAlign="center">{t(page.label)}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page.label} sx={{ my: 2, color: 'white', display: 'block' }}>
                <Link to={{ pathname: page.path }}>{t(page.label)}</Link>
              </Button>
            ))}
          </Box>
          <Box mr={2}>
            <LanguageSwitcher />
          </Box>
          <Box mr={2}>
            <ThemeSwitcher />
          </Box>
          {authUser ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  <Typography ml={1} className="text-white">
                    {authUser.name}
                  </Typography>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.label}>
                    <Link to={{ pathname: setting.path }} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{t(setting.label)}</Typography>
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem key="logout" onClick={handleLogout}>
                  <Typography textAlign="center">{t('logout')}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            !isMatchLogin && (
              <Box>
                <Button variant="text" href="/login">
                  <Typography className="text-white">{t('login')}</Typography>
                </Button>
              </Box>
            )
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
