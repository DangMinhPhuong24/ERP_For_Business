import { ListItemButton, ListItemIcon } from '@mui/material'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { getCookie } from 'utils'
import { isMobile } from '../../common/common'
import colors from '../../constants/colors'
import { colorConfigs } from '../../layout/configs'
import { appState } from '../../redux/app/app.selectors'
import { setAppState } from '../../redux/app/app.slice'

const SidebarItem = ({ item, closeSidebar }) => {
  const { t } = useTranslation()
  const app = useSelector(appState)
  const location = useLocation()
  const dispatch = useDispatch()
  const token = getCookie('token')

  useEffect(() => {
    if (app !== null) {
      return
    } else {
      const itemPath = '/' + item.state.split('.').join('/')
      if (location.pathname.startsWith(itemPath) || location.pathname.includes(itemPath)) {
        dispatch(setAppState(item.state))
      }
    }
  }, [location.pathname, app])

  const shouldDisplayMobile = () => {
    return isMobile && (item.state === 'sale.information' || item.state === 'home')
  }

  const handleItemClick = () => {
    if (item.state === 'KPIsettings' && token) {
      window.open(`${process.env.REACT_APP_KPI_URL}`, '_blank')
    }

    if (item && item.path && item.path.includes('/sale/order')) {
      localStorage.removeItem("formState");
    }

    if (closeSidebar && isMobile) {
      closeSidebar()
    }
  }
  if (!item.sidebarProps || !item.sidebarProps.displayText) {
    return null
  }

  if (isMobile && !shouldDisplayMobile()) {
    return null
  }

  return item.sidebarProps && item.path ? (
    <ListItemButton
      component={Link}
      to={item.path}
      onClick={handleItemClick}
      sx={{
        '&:hover': {
          backgroundColor: colorConfigs.sidebar.hoverBg
        },
        padding: '10px',
        marginX: '7px',
        borderRadius: '10px',
        fontWeight: app === item.state ? 600 : 400,
        fontSize: '14px',
        color: app === item.state ? colorConfigs.sidebar.coolBlueColor : 'unset'
      }}
    >
      <ListItemIcon
        sx={{
          marginRight: -2
        }}
      >
        {item.sidebarProps.icon &&
          React.cloneElement(item.sidebarProps.icon, {
            style: {
              fill: app === item.state ? colors.lightroyalblueColor : colors.lavenderGrayColor
            }
          })}
      </ListItemIcon>
      {t(item.sidebarProps.displayText)}
    </ListItemButton>
  ) : null
}

export default SidebarItem
