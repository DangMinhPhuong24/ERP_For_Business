import React, { useState, useEffect, useMemo } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { useLocation } from 'react-router-dom'
import appRoutes from '../../routes/appRoutes'
import SidebarItem from '../../components/SideNavElement/SidebarItem'
import SidebarItemCollapse from '../../components/SideNavElement/SidebarItemCollapse'
import { colorConfigs } from '../configs'
import assets from '../../asset'
import HeaderBreadcrumb from '../../components/SideNavElement/HeaderBreadcrumb'
import LanguageSwitcher from '../../components/Buttons/LanguageSwitcher'
import LogoutButton from '../../components/Buttons/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { setSidebarWidth, setSideBarStatus } from '../../redux/app/app.slice'
import colors from '../../constants/colors'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ThreeDashesIcon from '../../asset/icon/ThreeDashes.svg'
import '../../resource/style/CustomTextFieldStyle.css'
import FrameIcon from '../../asset/icon/Frame.svg'
import { useUser } from 'contexts/AuthContext'
import NotificationComponent from '../../components/NotificationComponent'
import { listAllNotificationState } from '../../redux/app/app.selectors'
import { getAllNotificationAction } from '../../redux/app/app.actions'
import { getProfileState } from '../../redux/auth/auth.selectors'
import roles from '../../constants/titleRole'
import rolesType from '../../constants/titleRoleType'
import { permissionActions } from '../../constants/titlePermissions'

const drawerWidth = 246
const closedDrawerWidth = 58

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
  width: `${closedDrawerWidth}px`,
  [theme.breakpoints.up('sm')]: {
    width: `${closedDrawerWidth}px`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

export default function Sidebar({ isOpen, closeSidebar }) {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useDispatch()
  const location = useLocation()
  const { userInfo } = useUser()
  const [open, setOpen] = useState(localStorage.getItem('sidebarOpen') !== 'false')
  const [activeCollapse, setActiveCollapse] = useState(null)
  const getProfile = useSelector(getProfileState)
  const branch = useMemo(() => userInfo.branch?.branch_name ?? '', [userInfo])
  const role = useMemo(() => userInfo.role?.display_name ?? '', [userInfo])
  const name = useMemo(() => userInfo.name ?? '', [userInfo])
  const listAllNotification = useSelector(listAllNotificationState)
  const [loading, setLoading] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
    localStorage.setItem('sidebarOpen', 'true')
    dispatch(setSidebarWidth(drawerWidth))
    dispatch(setSideBarStatus(true))
  }

  const fetchMoreNotifications = (offset) => {
    if (offset) {
      setLoading(true)
      dispatch(getAllNotificationAction({ offset })).finally(() => {
        setLoading(false)
      })
    }
  }

  const handleDrawerClose = () => {
    setOpen(false)
    localStorage.setItem('sidebarOpen', 'false')
    dispatch(setSidebarWidth(closedDrawerWidth))
    dispatch(setSideBarStatus(false))
  }

  const handleSidebarClick = () => {
    if (!open) {
      handleDrawerOpen()
    }
  }

  useEffect(() => {
    const currentPath = location.pathname
    const collapseItem = appRoutes.find(
      (route) => route.child && route.child.some((child) => child.path === currentPath)
    )
    if (collapseItem) {
      setActiveCollapse(collapseItem.name)
    }
  }, [location.pathname])

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const filterRoutesByPermission = (routes, permissions, roleType) => {
    return routes.reduce((acc, route) => {
      const roles = Array.isArray(route.role) ? route.role : []
      const hasRole = roles.some((role) => permissions.includes(role))
      const isDashboardRole = permissionActions.DASHBOARD_CUSTOMER
      const isRoleValid = route.role === '' || (permissions.includes(route.role) && route.role !== isDashboardRole)
      const isGroupValid = !route.role && (route.group === '' || permissions.includes(route.group))
      const isRoleTypeValid =
        (roleType === rolesType.STAFF &&
          permissions.includes(isDashboardRole) &&
          route.state === 'sale.dashboardSale') ||
        (roleType === rolesType.MANAGEMENT &&
          permissions.includes(isDashboardRole) &&
          route.state === 'sale.dashboardAdmin')

      if (isRoleValid || isGroupValid || isRoleTypeValid || hasRole) {
        const filteredChildren = route.child ? filterRoutesByPermission(route.child, permissions, roleType) : null

        acc.push({
          ...route,
          child: filteredChildren
        })
      }

      return acc
    }, [])
  }

  const permissions = useMemo(() => {
    if (getProfile && getProfile.role && Array.isArray(getProfile.role.permission)) {
      return getProfile.role.permission.flatMap((permission) => [permission.name, permission.group])
    }
    return []
  }, [getProfile])

  const filteredRoutes = useMemo(() => {
    if (getProfile.role?.name === roles.SUPER_ADMIN || getProfile.role?.name === roles.ADMIN) {
      return appRoutes
        .map((route) => {
          if (route.child) {
            return {
              ...route,
              child: route.child
                .filter((childRoute) => childRoute.state !== 'sale.dashboardSale')
                .map((childRoute) => ({
                  ...childRoute
                }))
            }
          }
          return route
        })
        .filter((route) => route.state !== 'sale.dashboardSale')
    } else {
      const roleType = getProfile.role?.type?.name
      return filterRoutesByPermission(appRoutes, permissions, roleType)
    }
  }, [permissions, getProfile])

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: colorConfigs.topbar.bg,
          color: colorConfigs.topbar.color,
          borderBottom: '1px solid #DDE1E5',
          boxShadow: 'none'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              borderRadius: '10px',
              marginRight: 5,
              ...(open && { display: 'none' })
            }}
          >
            <FrameIcon />
          </IconButton>
          <HeaderBreadcrumb />
          <Box sx={{ flexGrow: 1 }} />
          <NotificationComponent
            listAllNotification={listAllNotification}
            onScrollBottom={(offset) => {
              fetchMoreNotifications(offset)
            }}
            loading={loading}
          />
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
          <LanguageSwitcher />
          <LogoutButton />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box sx={{ position: 'sticky', zIndex: 1, top: 0, backgroundColor: 'white' }}>
          <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                borderRadius: '10px',
                marginLeft: '0px',
                ...(open && { display: 'none' })
              }}
            >
              <FrameIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', ...(!open && { display: 'none' }) }}>
              <img
                src={assets.images.logo}
                alt="Logo"
                style={{
                  width: '40px',
                  height: '40px'
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1 }}>
                <Typography sx={{ fontSize: '12px', color: colors.blackColor, fontWeight: 400 }}>
                  {t('branch')}
                </Typography>
                <Typography sx={{ fontSize: '14px', color: colors.blueColor, fontWeight: 700 }}>{branch}</Typography>
              </Box>
            </Box>
            <IconButton
              sx={{
                borderRadius: '10px'
              }}
              onClick={handleDrawerClose}
            >
              {theme.direction === 'rtl' ? <ThreeDashesIcon /> : <ThreeDashesIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
        </Box>
        <List onClick={handleSidebarClick}>
          {filteredRoutes.map((route, index) =>
            route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse item={route} key={index} isOpen={open} active={activeCollapse === route.name} />
              ) : (
                <SidebarItem item={route} key={index} />
              )
            ) : null
          )}
        </List>
      </Drawer>
    </Box>
  )
}
