import React from 'react';
import { type Theme } from '../../types';

interface LogoProps {
    theme: Theme;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ theme, className }) => {
    const logoSrc = theme === 'light'
        ? 'https://www.asismartinoar.com/landing/logo-asis-2025_black_lite.png'
        : 'https://www.asismartinoar.com/landing/logo-asis-2025_white_lite.png';

    return (
        <img
            src={logoSrc}
            alt="Asis Martin-Oar Logo"
            className={`h-7 sm:h-8 w-auto ${className || ''}`}
        />
    );
};

export default Logo;
