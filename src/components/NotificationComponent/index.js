import React, { useState, useEffect } from 'react';
import { subscribeToChannel } from '../../utils/pusher';
import {useDispatch, useSelector} from "react-redux";
import {
    Badge,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    ListItemText,
    ListItemIcon,
    Box,
    Skeleton
} from '@mui/material';
import BellIcon from '../../asset/icon/Notification.svg';
import colors from "../../constants/colors";
import {useTranslation} from "react-i18next";
import {getProfileState} from "../../redux/auth/auth.selectors";
import ToastNotificationComponent from "../App/ToastNotificationComponent";
import {updateNotificationStatusAction, updateNotificationStatusAllAction} from "../../redux/app/app.actions"
import { IoNotificationsOutline } from "react-icons/io5";
import {useNavigate} from "react-router-dom";

const NotificationComponent = ({ listAllNotification, onScrollBottom, loading }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [notifications, setNotifications] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const notificationsOpen = Boolean(anchorEl)
    const getProfile = useSelector(getProfileState)
    const [toastMessage, setToastMessage] = useState('')
    const [isShowToast, setIsShowToast] = useState(false)
    const [noMoreNotifications, setNoMoreNotifications] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setNotifications((prevNotifications) => {
            const existingNotificationIds = new Set(prevNotifications.map(notification => notification.id));
            const newNotifications = listAllNotification.filter(notification => !existingNotificationIds.has(notification.id));
            return [
                ...prevNotifications,
                ...newNotifications
            ];
        });
    }, [listAllNotification]);

    useEffect(() => {
        const channel = subscribeToChannel(getProfile.id);
        channel.bind('notification-event', function (data) {
            setNotifications((prevNotifications) => [data, ...prevNotifications]);
            setToastMessage(data);
            setIsShowToast(true);
        });

        return () => {
            channel.unbind('notification-event');
        };
    }, [getProfile]);

    const handleNotificationsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleScroll = (event) => {
        const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;

        if (bottom && !loading && !listAllNotification.length) {
            setNoMoreNotifications(true);
            return;
        }

        if (bottom && !loading && listAllNotification.length) {
            onScrollBottom(notifications.length);
        }
    };

    const resetToast = () => {
        setIsShowToast(false);
        setToastMessage('');
    };

    const handleNotificationClick = (notification) => {
        const { id, url } = notification;
        dispatch(updateNotificationStatusAction({ id }))
            .finally(() => {
                setNotifications((prevNotifications) =>
                    prevNotifications.map((notif) =>
                        notif.id === id
                            ? { ...notif, read_status: 1 }
                            : notif
                    )
                );
                if (url) {
                    navigate(url);
                }
                handleMenuClose()
            });
    };

    const markAllAsRead = () => {
        dispatch(updateNotificationStatusAllAction()).then(() => {
            setNotifications((prevNotifications) =>
                prevNotifications.map(notification => ({
                    ...notification,
                    read_status: 1
                }))
            );
        });
    };

    const unreadNotificationsCount = notifications.filter(notification => notification.read_status === 0).length;

    return (
        <>
            <IconButton
                size="large"
                color="inherit"
                sx={{ background: colors.lightSilverColor, marginRight: '15px' }}
                onClick={handleNotificationsClick}
            >
                <Badge badgeContent={unreadNotificationsCount} color="error">
                    {unreadNotificationsCount === 0 ? <IoNotificationsOutline style={{width: '22px', height:'22px'}} /> : <BellIcon />}
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={notificationsOpen}
                onClose={handleMenuClose}
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    style: {
                        width: '400px',
                        borderRadius:'5px',
                    }
                }}
            >
                <Box sx={{ borderBottom: '1px solid #AAAAAA',padding: '10px' }} height="40px" display="flex" justifyContent="space-between" width="100%">
                    <Typography sx={{fontSize:'14px', fontWeight:400}}>{t('notification')}</Typography>
                    <Typography  onClick={markAllAsRead} color="primary" sx={{ cursor: 'pointer', fontSize:'12px', fontWeight:400,textDecoration: 'underline'  }}>
                        {t('markAllRead')}
                    </Typography>
                </Box>
                <div onScroll={handleScroll} style={{ maxHeight: '350px', overflowY: 'auto',overflowX: 'hidden' }}>
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <MenuItem
                                key={index}
                                sx={{ borderBottom: '1px solid #AAAAAA',padding: '10px' }}
                                onClick={() => handleNotificationClick({url:notification.url, id:notification.id})}
                            >
                                <ListItemText
                                    primary={<Typography sx={{ fontSize:'12px', fontWeight:700}}>{notification.line_one}</Typography>}
                                    secondary={
                                        <>
                                            <Typography sx={{ fontSize:'12px', fontWeight:400}}>{notification.line_two}</Typography>
                                            <Typography sx={{ fontSize:'10px', fontWeight:400}}>{notification.line_three}</Typography>
                                        </>
                                    }
                                />
                                {notification.read_status === 0 && (
                                    <ListItemIcon>
                                        <Badge
                                            sx={{
                                                '& .MuiBadge-dot': {
                                                    backgroundColor: colors.blueColor,
                                                },
                                            }}
                                            variant="dot"
                                        />
                                    </ListItemIcon>
                                )}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem>
                            <ListItemText>
                                <Typography sx={{ fontSize:'14px', fontWeight:700}}>{t('noNotification')}</Typography>
                            </ListItemText>
                        </MenuItem>
                    )}
                    {loading && (
                        <MenuItem>
                            <Box style={{ width: '400px'}}>
                                <Skeleton variant="text" />
                                <Skeleton variant="text" animation="wave" />
                                <Skeleton variant="text" animation={false} />
                            </Box>
                        </MenuItem>
                    )}
                    {noMoreNotifications && (
                        <Box style={{ display: 'flex', justifyContent:'center'}}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>
                                {t('endOfNotice')}
                            </Typography>
                        </Box>
                    )}
                </div>
            </Menu>
            <ToastNotificationComponent
                message={toastMessage}
                isShowToast={isShowToast}
                resetToast={resetToast}
                handleToastClick={handleNotificationClick}
            />
        </>
    );
};

export default NotificationComponent;
