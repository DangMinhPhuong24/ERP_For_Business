import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

const TimeIcon = () => {
    return (
        <SvgIcon sx={{width: '56px', height: '56px', margin: '8px 16px'}}>
            <svg margin width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="28" fill="#F4F7FE"/>
                <path d="M28 14.6667C35.364 14.6667 41.3333 20.6361 41.3333 28.0001C41.3333 35.3641 35.364 41.3334 28 41.3334C20.636 41.3334 14.6666 35.3641 14.6666 28.0001C14.6666 20.6361 20.636 14.6667 28 14.6667ZM28 20.0001C27.6463 20.0001 27.3072 20.1406 27.0571 20.3906C26.8071 20.6407 26.6666 20.9798 26.6666 21.3334V28.0001C26.6667 28.3537 26.8072 28.6928 27.0573 28.9427L31.0573 32.9427C31.3088 33.1856 31.6456 33.32 31.9952 33.317C32.3448 33.3139 32.6792 33.1737 32.9264 32.9265C33.1736 32.6793 33.3138 32.3449 33.3169 31.9953C33.3199 31.6457 33.1855 31.3089 32.9426 31.0574L29.3333 27.4481V21.3334C29.3333 20.9798 29.1928 20.6407 28.9428 20.3906C28.6927 20.1406 28.3536 20.0001 28 20.0001Z" fill="#4369C5"/>
            </svg>
        </SvgIcon>
    );
};

export default TimeIcon;