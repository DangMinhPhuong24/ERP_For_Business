import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useUser } from 'contexts/AuthContext'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import colors from '../../constants/colors'
import { colorConfigs } from '../../layout/configs'
import appRoutes from '../../routes/appRoutes'
import SidebarItem from './SidebarItem'

const SidebarItemCollapse = ({ item, isOpen, closeSidebar }) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const { userInfo } = useUser()
  const userRole = useMemo(() => userInfo.role?.name ?? '', [userInfo])
  const location = useLocation()
  const currentRoute = appRoutes.find((route) => location.pathname.startsWith(route.path))

  const breadcrumbRoutes = []
  let parentRoute = currentRoute
  while (parentRoute) {
    breadcrumbRoutes.unshift(parentRoute)
    parentRoute = appRoutes.find((route) => route.path === parentRoute.parent)
  }

  useEffect(() => {
    if (!isOpen) {
      setOpen(isOpen)
    }
  }, [isOpen])

  const isSelected = breadcrumbRoutes.some((route) => route.state === item.state)

  useEffect(() => {
    if (isOpen) {
      setOpen(isSelected)
    }
  }, [location.pathname])

  if (!item.sidebarProps || !item.sidebarProps.displayText) {
    return null
  }

  return item.sidebarProps ? (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          '&:hover': {
            backgroundColor: colorConfigs.sidebar.hoverBg,
            borderRadius: '10px'
          },
          color: isSelected ? colors.lightroyalblueColor : colorConfigs.sidebar.color,
          backgroundColor: isSelected ? colorConfigs.sidebar.hoverBg : 'none',
          borderRadius: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
          marginX: '7px'
        }}
      >
        <ListItemIcon
          sx={{
            color: isSelected ? colors.lightroyalblueColor : colorConfigs.sidebar.color,
            marginRight: -2,
            width: '24px',
            height: '24px',
            borderRadius: '10px'
          }}
        >
          {item.sidebarProps.icon &&
            React.cloneElement(item.sidebarProps.icon, {
              style: {
                fill: isSelected ? colors.lightroyalblueColor : colors.lavenderGrayColor
              }
            })}
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography sx={{ fontWeight: 400, fontSize: '14px' }}>{t(item.sidebarProps.displayText)}</Typography>
          }
        />
        {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List>
          {item.child?.map((route, index) =>
            route.sidebarProps ? (
              route.child ? (
                <SidebarItemCollapse item={route} key={index} isOpen={open} closeSidebar={undefined} />
              ) : (
                <SidebarItem item={route} key={index} closeSidebar={closeSidebar} />
              )
            ) : null
          )}
        </List>
      </Collapse>
    </>
  ) : null
}

export default SidebarItemCollapse
