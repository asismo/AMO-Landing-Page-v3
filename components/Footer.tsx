
import React from 'react';

interface FooterProps {
    content: {
        copyright: string;
    }
}

const Footer: React.FC<FooterProps> = ({ content }) => {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <p>{content.copyright}</p>
                <a href="mailto:asismartinoar@gmail.com" className="hover:text-gray-800 dark:hover:text-white transition-colors mt-2 sm:mt-0">
                    asismartinoar@gmail.com
                </a>
            </div>
        </footer>
    );
};

export default Footer;
