// src/components/LottieIcon.tsx
"use client";

import { Player } from '@lottiefiles/react-lottie-player';

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