import { useEffect, useRef, useState } from 'react';

export function useBackgroundMusic(musicUrl: string, enabled: boolean = true) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!enabled || !musicUrl) return;

    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.15; // Set to 15% volume for subtle background music
    }

    const audio = audioRef.current;

    // Attempt to play
    const playAudio = async () => {
      try {
        await audio.play();
        console.log('Background music playing');
      } catch (error) {
        console.log('Autoplay blocked - music will play after user interaction');
        
        // If autoplay is blocked, play on first user interaction
        const playOnInteraction = async () => {
          try {
            await audio.play();
            console.log('Background music started after interaction');
            // Remove listener after first play
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
          } catch (err) {
            console.error('Failed to play music:', err);
          }
        };

        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('keydown', playOnInteraction, { once: true });
      }
    };

    playAudio();

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [enabled, musicUrl]);

  // Mute/unmute control
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return { isMuted, toggleMute };
}