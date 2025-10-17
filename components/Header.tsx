import React from 'react';
import { type Language, type Theme } from '../types';
import Logo from './icons/Logo';
import MoonIcon from './icons/MoonIcon';
import SunIcon from './icons/SunIcon';

interface HeaderProps {
    language: Language;
    setLanguage: (language: Language) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    content: {
        langToggle: string;
        cta: string;
    };
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, theme, setTheme, content }) => {
    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'es' : 'en');
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="fixed top-4 left-0 right-0 z-40 flex justify-center">
             <div className="w-max px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg shadow-sm">
                <Logo theme={theme} />
                <nav className="flex items-center space-x-1 sm:space-x-2">
                    <button onClick={toggleLanguage} className="text-sm font-medium px-3 py-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        {content.langToggle}
                    </button>
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                    </button>
                    <a href="https://calendly.com/asismartinoar/meetup" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold bg-[#ff1467] text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity hidden sm:block">
                        {content.cta}
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;