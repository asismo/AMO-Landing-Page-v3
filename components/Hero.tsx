import React from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface HeroProps {
    content: {
        title: string;
        cta: string;
        ctaLink: string;
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
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-display mb-6 font-display tracking-display">
                        {content.title}
                    </h1>
                    <div className="mt-6">
                        <a
                            href={content.ctaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-2 bg-[#ff1467] text-white font-semibold px-6 py-3 rounded-full text-lg hover:bg-[#e0125e] transition-colors shadow-lg"
                        >
                            {content.cta}
                            <ArrowRightIcon className="w-5 h-5 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>
                <div className="order-1 md:order-2 h-64 md:h-full min-h-[250px] rounded-2xl overflow-hidden">
                    <img 
                        src="https://www.asismartinoar.com/landing/main.jpg" 
                        alt="Abstract hero image representing technology and design" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;