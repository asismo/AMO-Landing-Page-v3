import React, { useState, useRef } from 'react';

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
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);
    const dragDistance = useRef(0);
    const cards = content.cards;

    const handleCardClick = (index: number) => {
        // Only allow click if it wasn't a drag
        if (Math.abs(dragDistance.current) < 10) {
            setActiveIndex(index);
        }
    };

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        dragStartX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
        dragDistance.current = 0; // Reset distance on new drag
        // Prevent default browser behavior like image dragging
        if (e.target instanceof HTMLImageElement) {
            e.preventDefault();
        }
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        dragDistance.current = currentX - dragStartX.current;
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 50; // Minimum distance for a swipe

        if (dragDistance.current < -threshold) {
            // Swiped left
            setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
        } else if (dragDistance.current > threshold) {
            // Swiped right
            setActiveIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
        }

        // Reset distance for the next click check
        setTimeout(() => {
             dragDistance.current = 0;
        }, 0);
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
            <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 font-display tracking-display leading-display">{content.title}</h2>
            <div 
                className={`relative h-[40rem] md:h-[34rem] w-full max-w-4xl mx-auto flex items-center justify-center select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                onMouseMove={handleDragMove}
                onTouchMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchEnd={handleDragEnd}
            >
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="absolute w-4/5 md:w-3/5 h-full transition-all duration-300 ease-in-out"
                        style={getCardStyle(index)}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="w-full h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:-rotate-2 pointer-events-none">
                            <div className="flex flex-col w-full h-full rounded-2xl overflow-hidden shadow-2xl dark:shadow-black/40 bg-white dark:bg-gray-800">
                               <div className="h-1/2 w-full">
                                    <img src={card.imgSrc} alt={card.title} className="w-full h-full object-cover"/>
                               </div>
                                <div className="h-1/2 p-6 flex flex-col text-left">
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
            <div className="flex justify-center space-x-3 mt-8">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            activeIndex === index ? 'bg-gray-800 dark:bg-white' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default SkillsCarousel;