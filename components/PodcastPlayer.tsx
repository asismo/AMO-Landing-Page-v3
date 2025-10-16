import React, { useState, useRef, useEffect } from 'react';
import { type Language } from '../types';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import CloseIcon from './icons/CloseIcon';

interface PodcastPlayerProps {
    language: Language;
    content: {
        title: string;
        subtitle: string;
        audioSrc: string;
    }
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ language, content }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // This effect syncs our React state with the audio element's actual state.
    // This is robust against playback being controlled from outside React (e.g., browser media controls).
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const syncPlayState = () => setIsPlaying(!audio.paused);
            
            audio.addEventListener('play', syncPlayState);
            audio.addEventListener('pause', syncPlayState);
            audio.addEventListener('ended', syncPlayState);

            // Initial sync
            syncPlayState();

            return () => {
                audio.removeEventListener('play', syncPlayState);
                audio.removeEventListener('pause', syncPlayState);
                audio.removeEventListener('ended', syncPlayState);
            };
        }
    }, []);

    // This effect handles changes in the audio source when the language is switched.
    useEffect(() => {
        if (audioRef.current) {
            // When the src changes, we want to stop the old audio.
            // The new audio will be loaded by React setting the `src` prop.
            audioRef.current.pause();
            setCurrentTime(0);
        }
    }, [language, content.audioSrc]);

    const togglePlayPause = () => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(error => {
                console.error("Audio playback failed:", error);
                // The 'pause' event listener will correctly update the state if play fails.
            });
        }
    };
    
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio || !isFinite(audio.duration)) return;
    
        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const percentage = offsetX / rect.width;
        const newTime = percentage * audio.duration;
        
        audio.currentTime = newTime;
        setCurrentTime(newTime); // Manually update for immediate UI feedback
    };

    const formatTime = (time: number) => {
        if (isNaN(time) || !isFinite(time)) {
            return '0:00';
        }
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    
    const playerContent = (
         <div className="relative flex items-center space-x-4 p-4 w-full max-w-xs bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md">
            <button onClick={() => setIsExpanded(false)} className="absolute top-2 right-2 p-1 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white md:hidden z-10">
                <CloseIcon />
            </button>
            <button onClick={togglePlayPause} className="w-12 h-12 flex-shrink-0 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <div className="flex-grow overflow-hidden pr-6">
                <h4 className="font-bold text-base truncate font-display tracking-display">{content.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{content.subtitle}</p>
                <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                    <div
                        className="h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mt-1 cursor-pointer"
                        onClick={handleSeek}
                    >
                        <div className="h-full bg-gray-800 dark:bg-white rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed top-4 right-4 z-50">
            <audio
                ref={audioRef}
                src={content.audioSrc}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                preload="metadata"
            />
            {/* Mobile view: Collapsible */}
            <div className="md:hidden">
                {isExpanded ? (
                    playerContent
                ) : (
                    <button onClick={() => setIsExpanded(true)} className="w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shadow-md text-gray-800 dark:text-white">
                        <PlayIcon />
                    </button>
                )}
            </div>
            {/* Desktop view: Always visible */}
            <div className="hidden md:block">
                 {playerContent}
            </div>
        </div>
    );
};

export default PodcastPlayer;