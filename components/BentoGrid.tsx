import React from 'react';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface BentoGridProps {
    content: {
        portfolio: {
            title: string;
            highlights: { name: string; logo: string; link: string; }[];
            description: string;
            cta: string;
            ctaLink: string;
        };
        stat: {
            value: string;
            title: string;
        };
        ai: {
            title: string;
            description: string;
            cta: string;
            ctaLink: string;
            imageUrl: string;
        };
    };
}

const BentoCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-subtle dark:shadow-subtle-dark border border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out hover:scale-105 hover:-rotate-2 ${className}`}>
        {children}
    </div>
);

const BentoGrid: React.FC<BentoGridProps> = ({ content }) => {
    return (
        <section id="bento-grid">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <BentoCard className="md:col-span-2">
                    <h3 className="text-3xl font-bold mb-4">{content.portfolio.title}</h3>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        {content.portfolio.highlights.map(item => (
                            <a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gray-100 dark:bg-gray-800 p-3 rounded-xl flex items-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                <img src={item.logo} alt={`${item.name} logo`} className="h-8 w-8 object-contain" />
                                <span className="font-semibold text-sm">{item.name}</span>
                            </a>
                        ))}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{content.portfolio.description}</p>
                    <a href={content.portfolio.ctaLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-[#ff1467] dark:text-[#ff5c8a]">
                        {content.portfolio.cta}
                        <ArrowRightIcon className="w-4 h-4" />
                    </a>
                </BentoCard>

                <BentoCard className="flex flex-col justify-center items-center text-center">
                    <span className="text-5xl font-extrabold text-[#ff1467]">{content.stat.value}</span>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 capitalize">{content.stat.title}</p>
                </BentoCard>
                
                <BentoCard className="md:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div>
                            <h3 className="text-3xl font-bold mb-2">{content.ai.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">{content.ai.description}</p>
                             <a href={content.ai.ctaLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-[#ff1467] dark:text-[#ff5c8a]">
                                {content.ai.cta}
                                <ArrowRightIcon className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="h-48 md:h-full w-full bg-gray-100 dark:bg-gray-800 rounded-2xl">
                             <img src={content.ai.imageUrl} alt="AI Experiments" className="w-full h-full object-cover rounded-2xl" />
                        </div>
                    </div>
                </BentoCard>

            </div>
        </section>
    );
};

export default BentoGrid;