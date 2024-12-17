import React, {useEffect, useState} from 'react'
import {Box, Grid, Toolbar} from '@mui/material'
import {colorConfigs} from './configs'
import Sidebar from './SideNav/index'
import {Outlet} from 'react-router-dom'
import {useSelector} from "react-redux";
import {selectSidebarWidth, sideBarStatusState} from "../redux/app/app.selectors";

const MainLayout = () => {
  // const sidebarWidth = useSelector(selectSidebarWidth)
  const sidebarStatus = useSelector(sideBarStatusState)

  const [boxStyles, setBoxStyles] = useState({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: '100vh',
    backgroundColor: colorConfigs.mainBg,
  });

  useEffect(() => {
    const newStyles = {
      ...boxStyles,
      maxWidth: sidebarStatus ? `calc(100% - 246px)` : `calc(100% - 58px)`,
    };
    setBoxStyles(newStyles);
  }, [sidebarStatus]);

  return (
    <Grid container>
      <Sidebar isOpen={true} />
      <Box
        component="main"
        sx={boxStyles}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Grid>
  )
}

export default MainLayout
