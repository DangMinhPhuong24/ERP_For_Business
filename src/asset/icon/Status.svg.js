import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

const StatusIcon = () => {
    return (
        <SvgIcon sx={{width: '56px', height: '56px', margin: '8px 16px'}}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="28" fill="#F4F7FE"/>
                <path d="M33.371 35.827L36.211 33.031L35.585 32.404L33.371 34.587L32.416 33.612L31.789 34.244L33.371 35.827ZM22.77 24.731H33.232V23.731H22.769L22.77 24.731ZM34 38.116C32.886 38.116 31.941 37.7277 31.165 36.951C30.3883 36.175 30 35.23 30 34.116C30 33.002 30.3883 32.0567 31.165 31.28C31.9417 30.5033 32.8867 30.1153 34 30.116C35.1133 30.1167 36.0587 30.5047 36.836 31.28C37.6133 32.0553 38.0013 33.0007 38 34.116C38 35.2293 37.612 36.1743 36.836 36.951C36.0587 37.7277 35.1133 38.116 34 38.116ZM20 36.769V21.616C20 21.168 20.1573 20.7867 20.472 20.472C20.7867 20.1573 21.168 20 21.616 20H34.385C34.8317 20 35.2127 20.1573 35.528 20.472C35.8427 20.7867 36 21.168 36 21.616V27.56C35.4053 27.3647 34.796 27.2643 34.172 27.259C33.548 27.2537 32.933 27.334 32.327 27.5H22.769V28.5H30.081C29.5797 28.8473 29.1377 29.255 28.755 29.723C28.3723 30.191 28.057 30.7063 27.809 31.269H22.77V32.269H27.48C27.408 32.5383 27.352 32.81 27.312 33.084C27.272 33.358 27.2517 33.644 27.251 33.942C27.251 34.3987 27.2987 34.8517 27.394 35.301C27.4893 35.7503 27.6327 36.1833 27.824 36.6L27.79 36.634L26.655 35.808L25.309 36.769L23.963 35.808L22.617 36.769L21.27 35.808L20 36.769Z" fill="#4369C5"/>
            </svg>
        </SvgIcon>
    );
};

export default StatusIcon;
