
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PodcastPlayer from './components/PodcastPlayer';
import Hero from './components/Hero';
import SkillsCarousel from './components/SkillsCarousel';
import BentoGrid from './components/BentoGrid';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { type Language, type Theme } from './types';
import { content } from './constants';

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('en');
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const currentContent = content[language];

    return (
        <div className="min-h-screen text-gray-800 dark:text-gray-200">
            <Header
                language={language}
                setLanguage={setLanguage}
                theme={theme}
                setTheme={setTheme}
                content={currentContent.header}
            />
            <PodcastPlayer language={language} content={currentContent.podcast} />
            <main className="container mx-auto px-4 md:px-8 pt-24 pb-12 space-y-24 md:space-y-32">
                <Hero content={currentContent.hero} />
                <SkillsCarousel content={currentContent.skills} />
                <BentoGrid content={currentContent.bento} />
                <Contact content={currentContent.contact} />
            </main>
            <Footer content={currentContent.footer} />
        </div>
    );
};

export default App;
