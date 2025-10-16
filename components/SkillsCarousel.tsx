
import React, { useState } from 'react';

interface SkillsCarouselProps {
    content: {
        title: string;
        cards: {
            title: string;
            description: string[];
            imgSrc: string;
        }[];
    }
}

const SkillsCarousel: React.FC<SkillsCarouselProps> = ({ content }) => {
    const [activeIndex, setActiveIndex] = useState(1);
    const cards = content.cards;

    const handleCardClick = (index: number) => {
        setActiveIndex(index);
    };

    const getCardStyle = (index: number) => {
        const offset = (index - activeIndex + cards.length) % cards.length;

        if (offset === 0) { // Active card
            return {
                transform: 'translateX(0) scale(1)',
                opacity: 1,
                zIndex: 20,
            };
        }
        if (offset === 1) { // Card to the right
            return {
                transform: 'translateX(50%) scale(0.8)',
                opacity: 0.7,
                zIndex: 10,
            };
        }
        if (offset === cards.length - 1) { // Card to the left
            return {
                transform: 'translateX(-50%) scale(0.8)',
                opacity: 0.7,
                zIndex: 10,
            };
        }
        // Other cards (hidden)
        return {
            transform: `translateX(${offset > cards.length / 2 ? '-100%' : '100%'}) scale(0.6)`,
            opacity: 0,
            zIndex: 0,
        };
    };

    return (
        <section id="skills" className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 font-display tracking-display">{content.title}</h2>
            <div className="relative h-[34rem] w-full max-w-4xl mx-auto flex items-center justify-center">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="absolute w-4/5 md:w-3/5 h-full transition-all duration-300 ease-in-out cursor-pointer"
                        style={getCardStyle(index)}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="w-full h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:-rotate-2">
                            <div className="flex flex-col w-full h-full rounded-2xl overflow-hidden shadow-2xl dark:shadow-black/40 bg-white dark:bg-gray-800">
                               <div className="h-1/2 w-full">
                                    <img src={card.imgSrc} alt={card.title} className="w-full h-full object-cover"/>
                               </div>
                                <div className="h-1/2 p-6 flex flex-col text-left overflow-y-auto">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 font-display tracking-display">{card.title}</h3>
                                    <ul className="space-y-2 list-disc list-inside">
                                        {card.description.map((point, i) => (
                                            <li key={i} className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkillsCarousel;