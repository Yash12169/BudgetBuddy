"use client";

import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect } from 'react';

interface LottieIconProps {
  src: string;
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  hover?: boolean;
  className?: string;
}

export function LottieIcon({ 
  src, 
  size = 24, 
  loop = true, 
  autoplay = true,
  hover = true,
  className = "" 
}: LottieIconProps) {
  useEffect(() => {
    // Debug logging
    console.log('LottieIcon attempting to load:', {
      src,
      size,
      loop,
      autoplay: !hover && autoplay,
      hover
    });

    // Verify the file exists
    fetch(src)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(`Successfully found file at ${src}`);
        return response.json();
      })
      .then(data => {
        console.log(`File at ${src} is valid JSON:`, data);
      })
      .catch(error => {
        console.error(`Failed to load file at ${src}:`, error);
      });
  }, [src, size, loop, autoplay, hover]);

  return (
    <div className="relative group">
      <Player
        src={src}
        autoplay={!hover && autoplay}
        loop={loop}
        style={{ width: size, height: size }}
        className={`transition-all duration-300 ${className} ${
          hover ? 'group-hover:scale-110' : ''
        }`}
        hover={hover}
      />
    </div>
  );
} 