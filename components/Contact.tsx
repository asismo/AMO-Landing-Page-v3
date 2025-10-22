import React from 'react';
import MediumIcon from './icons/MediumIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import GithubIcon from './icons/GithubIcon';

interface ContactProps {
    content: {
        mainTitle: string;
        description: string;
        cta: string;
        secondaryTitle: string;
        socials: {
            platform: string;
            description: string;
            url: string;
        }[];
    }
}

const SocialCard: React.FC<{ social: ContactProps['content']['socials'][0] }> = ({ social }) => {
    const iconMap: { [key: string]: React.ReactNode } = {
        Medium: <MediumIcon className="w-6 h-6 text-[#ff1467]" />,
        LinkedIn: <LinkedInIcon className="w-6 h-6 text-[#ff1467]" />,
        Github: <GithubIcon className="w-6 h-6 text-[#ff1467]" />,
    };

    return (
        <a 
            href={social.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block transition-transform duration-300 ease-in-out hover:scale-105 hover:-rotate-2"
        >
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
                <div className="flex-shrink-0">
                    {iconMap[social.platform]}
                </div>
                <div>
                    <p className="font-bold text-gray-900 dark:text-white">{social.platform}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{social.description}</p>
                </div>
            </div>
        </a>
    );
};


const Contact: React.FC<ContactProps> = ({ content }) => {
    return (
        <section id="contact">
            <div className="bg-gray-100 dark:bg-gray-900/50 p-8 md:p-12 rounded-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                    
                    {/* Left Column */}
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 font-display leading-snug tracking-display">{content.mainTitle}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto md:mx-0">{content.description}</p>
                        <a
                            href="https://calendly.com/asismartinoar/meetup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#ff1467] text-white font-semibold px-6 py-3 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg"
                        >
                            {content.cta}
                            <ExternalLinkIcon className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Right Column */}
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center md:text-left font-display tracking-display">{content.secondaryTitle}</h3>
                        <div className="space-y-4">
                            {content.socials.map((social) => (
                                <SocialCard key={social.platform} social={social} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;