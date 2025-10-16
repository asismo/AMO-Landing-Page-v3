import React from 'react';

interface HeroProps {
    content: {
        title: string;
        cta: string;
    }
}

const Hero: React.FC<HeroProps> = ({ content }) => {
    return (
        <section
            id="hero"
            className="p-8 md:p-12 bg-white dark:bg-gray-900 rounded-3xl shadow-subtle dark:shadow-subtle-dark border border-gray-200 dark:border-gray-800"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tighter mb-6">
                        {content.title}
                    </h1>
                    <a
                        href="https://www.figma.com/deck/SXaKdBwH5gTEfG8RXrXTOv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-[#ff5c8a] to-[#ff1467] text-white font-semibold px-8 py-3 rounded-full text-lg hover:scale-105 transition-transform shadow-lg"
                    >
                        {content.cta}
                    </a>
                </div>
                <div className="order-1 md:order-2 h-64 md:h-full min-h-[250px] rounded-2xl bg-gradient-to-br from-red-200 via-pink-200 to-rose-300 dark:from-red-800 dark:via-pink-800 dark:to-rose-900">
                </div>
            </div>
        </section>
    );
};

export default Hero;