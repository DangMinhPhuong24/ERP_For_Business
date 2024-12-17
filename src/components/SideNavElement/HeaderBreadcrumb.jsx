import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';
import appRoutes from '../../routes/appRoutes';
import {useTranslation} from "react-i18next";
import colors from "../../constants/colors";

export default function HeaderBreadcrumb() {
    const { t } = useTranslation();
    const location = useLocation();
    const currentRoute = appRoutes.find(route => location.pathname.startsWith(route.path));

    if (!currentRoute || !currentRoute.sidebarProps) {
        return null;
    }

    const breadcrumbRoutes = [];
    let parentRoute = currentRoute;
    while (parentRoute) {
        breadcrumbRoutes.unshift(parentRoute);
        parentRoute = appRoutes.find(route => route.path === parentRoute.parent);
    }

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbRoutes.map((route, index) => (
                <Link
                    key={index}
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', marginLeft:'-10px', fontSize:'18px', fontWeight:600, color:colors.lightroyalblueColor }}
                    href={route.path}
                >
                    <span style={{ marginRight: '20px', color: colors.lightroyalblueColor, width: '24px', height: '24px' }}>
                        {React.cloneElement(route.sidebarProps.icon, {
                            style: {
                                fill: colors.lightroyalblueColor
                            }
                        })}
                    </span>
                    {t(route.sidebarProps.displayText)}
                </Link>
            ))}
        </Breadcrumbs>
    );
}
