import React, { useEffect, useRef } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';

const ToastNotificationComponent = ({ message, isShowToast, resetToast, handleToastClick }) => {
    const notificationSoundNewRef = useRef(null);
    const notificationSoundWarningRef = useRef(null);

    const playSound = (soundRef) => {
        if (soundRef.current) {
            soundRef.current.play().catch(error => {
                console.log("Play failed:", error);
            });
        }
    };

    useEffect(() => {
        if (isShowToast) {
            if (message.notification_status === 1) {
                playSound(notificationSoundNewRef);
                toast.success(message.line_one, {
                    onClose: () => resetToast(),
                });
            } else if (message.notification_status === 0) {
                playSound(notificationSoundWarningRef);
                toast.error(message.line_one, {
                    onClose: () => resetToast(),
                });
            } else if (message.notification_status === 2) {
                playSound(notificationSoundWarningRef);
                toast.warn(message.line_one, {
                    onClose: () => resetToast(),
                });
            }
        }
    }, [isShowToast, message, resetToast]);

    return (
        <>
            <audio ref={notificationSoundNewRef} src="/system-notification-199277.mp3" />
            <audio ref={notificationSoundWarningRef} src="/error-3-125761.mp3" />
            <Box onClick={() => handleToastClick({url:message.url, id:message.id})}>
                <ToastContainer
                    containerId="notification"
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </Box>
        </>
    );
}

export default ToastNotificationComponent;
