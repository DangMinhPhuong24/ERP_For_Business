import React, { useState, useEffect, useMemo } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import IconButton from '@mui/material/IconButton'
import appRoutes from '../../../routes/appRoutes'
import SidebarItem from '../../../components/SideNavElement/SidebarItem'
import SidebarItemCollapse from '../../../components/SideNavElement/SidebarItemCollapse'
import Badge from '@mui/material/Badge'
import { colorConfigs } from '../../configs'
import assets from '../../../asset'
import LanguageSwitcher from '../../../components/Buttons/LanguageSwitcher'
import LogoutButton from '../../../components/Buttons/Logout'
import { useDispatch } from 'react-redux'
import colors from '../../../constants/colors'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import '../../../resource/style/CustomTextFieldStyle.css'
import BellIcon from '../../../asset/icon/Notification.svg'
import { IoMenu } from 'react-icons/io5'
import { IoClose } from 'react-icons/io5'
import PersonIcon from '@mui/icons-material/Person'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { logoutAction } from '../../../redux/auth/auth.actions'
import { useNavigate } from 'react-router-dom'
import { useUser } from 'contexts/AuthContext'

const drawerWidth = '100%'

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden',
  borderRight: '1px solid rgba(0, 0, 0, 0.05)'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `0px`,
  [theme.breakpoints.up('sm')]: {
    width: `0px`
  }
})

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  backgroundColor: colorConfigs.topbar.bg,
  color: colorConfigs.topbar.color,
  borderBottom: '1px solid #DDE1E5',
  boxShadow: 'none'
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  position: 'fixed',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

export default function SidebarMobile({ isOpen, closeSidebar }) {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useDispatch()
  const { userInfo } = useUser()

  const [open, setOpen] = useState(false)
  const branch = useMemo(() => userInfo.branch?.branch_name ?? '', [userInfo])
  const role = useMemo(() => userInfo.role?.role_name ?? '', [userInfo])
  const name = useMemo(() => userInfo.name ?? '', [userInfo])
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleSidebarClick = () => {
    if (!open) {
      handleDrawerOpen()
    }
  }
  useEffect(() => {
    if (!isOpen) {
      setOpen(false)
    }
  }, [isOpen])

  const handleProfileMenuOpen = (event) => {
    setProfileMenuOpen(true)
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setProfileMenuOpen(false)
  }

  const handleLogout = () => {
    dispatch(logoutAction())
    navigate('/login')
  }

  const filteredRoutes = useMemo(() => {
    return appRoutes.filter(route =>
        ['home', 'sale'].includes(route.state)
    );
  }, []);

  return (
    <Box
      sx={{ display: 'flex', height: '60px !important', minHeight: '60px !important', zIndex: 2, position: 'fixed' }}
    >
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ padding: '0px' }}>
          <IconButton
            color="inherit"
            aria-label={open ? 'close drawer' : 'open drawer'}
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            sx={{ color: open ? colors.blackColor : colors.lightroyalblueColor }}
          >
            {open ? <IoClose /> : <IoMenu />}
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1 }}>
            <Typography sx={{ fontSize: '12px', color: colors.blackColor, fontWeight: 400 }}>{t('branch')}</Typography>
            <Typography sx={{ fontSize: '14px', color: colors.blueColor, fontWeight: 700 }}>{branch}</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            color="inherit"
            sx={{ background: colors.lightSilverColor, marginRight: '15px', width: '42px', height: '42px' }}
          >
            <Badge badgeContent={10} color="error">
              <BellIcon />
            </Badge>
          </IconButton>
          <LanguageSwitcher />
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <PersonIcon sx={{ color: colors.lightroyalblueColor }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={profileMenuOpen}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <MenuItem>
              <img
                src={assets.images.profile}
                alt="Logo"
                style={{
                  width: '42px',
                  height: '42px',
                  marginRight: '10px'
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 600 }}>{name}</Typography>
                <Typography sx={{ fontSize: '10px', fontWeight: 400 }}>{role}</Typography>
              </Box>
            </MenuItem>
            <MenuItem sx={{ display: 'flex', justifyContent: 'center' }} onClick={handleLogout}>
              <LogoutButton />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box sx={{ marginTop: '50px' }}>
          <List onClick={handleSidebarClick}>
            {filteredRoutes.map((route, index) =>
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} isOpen={open} closeSidebar={handleDrawerClose} />
                ) : (
                  <SidebarItem item={route} key={index} closeSidebar={handleDrawerClose} />
                )
              ) : null
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}
