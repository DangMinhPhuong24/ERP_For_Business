import React, {useEffect, useState} from "react";
import { Box, Toolbar } from "@mui/material";
import { colorConfigs } from "../configs";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarMobile from "../SideNav/Mobile";

const MainLayoutMobile = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    return (
        <Grid container>
            <SidebarMobile isOpen={sidebarOpen} closeSidebar={handleSidebarClose} />
            <Box
                component="main"
                sx={{
                    flexDirection: 'column',
                    flexGrow: 1,
                    minHeight: "100vh",
                    backgroundColor: colorConfigs.mainBg,
                    display: 'flex',
                    zIndex: 1,
                    position: 'relative',
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Grid>
    );
};

export default MainLayoutMobile;
