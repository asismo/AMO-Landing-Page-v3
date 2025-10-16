import React from 'react';

interface IconProps {
    className?: string;
}

const MediumIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.46 12c0 3.77-1.57 6.82-3.52 6.82-1.95 0-3.52-3.05-3.52-6.82s1.57-6.82 3.52-6.82c1.95 0 3.52 3.05 3.52 6.82zM24 12c0 3.77-1.12 6.82-2.5 6.82S19 15.77 19 12s1.12-6.82 2.5-6.82S24 8.23 24 12z"></path>
    </svg>
);

export default MediumIcon;