import { useEffect, useState } from 'react';
import logoImage from 'figma:asset/888272e7dbcaca274271687ecaf61e5fe576f84e.png';

interface NetflixLoaderProps {
  onLoadComplete: () => void;
}

export function NetflixLoader({ onLoadComplete }: NetflixLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [logoScale, setLogoScale] = useState(0.8);
  const [audioReady, setAudioReady] = useState(false);
  const [showTapPrompt, setShowTapPrompt] = useState(true);
  const audioRef = useState(() => {
    const audio = new Audio('https://sumanthsamala.com/static/media/netflix-sound.a13a4aedfb5da5a27f04.mp3');
    audio.volume = 0.5;
    audio.preload = 'auto';
    return audio;
  })[0];

  const handleStart = async () => {
    if (audioReady) return;
    
    setShowTapPrompt(false);
    setAudioReady(true);
    
    // Play the sound
    try {
      await audioRef.play();
      console.log('Netflix sound playing');
    } catch (error) {
      console.log('Sound play error:', error);
    }
  };

  useEffect(() => {
    if (!audioReady) return;

    // Logo scale animation
    const scaleTimer = setTimeout(() => {
      setLogoScale(1);
    }, 100);

    // Fade out and complete
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadComplete, 300);
    }, 2800);

    return () => {
      clearTimeout(scaleTimer);
      clearTimeout(fadeTimer);
    };
  }, [audioReady, onLoadComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 cursor-pointer"
      style={{ opacity: isVisible ? 1 : 0 }}
      onClick={handleStart}
    >
      <div className="relative flex flex-col items-center gap-6">
        <img 
          src={logoImage}
          alt="Muneez Ahmed"
          className="w-[250px] md:w-[400px] lg:w-[500px] h-auto transition-all duration-700 ease-out"
          style={{
            transform: `scale(${logoScale})`,
            opacity: isVisible ? 1 : 0,
          }}
        />
        
        {showTapPrompt && (
          <div className="flex flex-col items-center gap-2 animate-pulse">
            <p className="text-white text-sm md:text-base">Tap to begin</p>
            <svg 
              className="w-6 h-6 text-white opacity-60" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" 
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}