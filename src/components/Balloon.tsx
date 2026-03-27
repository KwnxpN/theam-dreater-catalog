import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export interface BalloonProps {
  id: string;
  x: number;
  imageUrl: string;
  onClick: (id: string) => void;
  onDestroy: (id: string) => void;
}

export const Balloon: React.FC<BalloonProps> = ({ id, x, imageUrl, onClick, onDestroy }) => {
  const balloonRef = useRef<HTMLDivElement>(null);
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    const el = balloonRef.current;
    if (!el || popped) return;

    const duration = (5 + Math.random() * 5) / 5; // 5x faster (1 to 2 seconds)
    const swayAmount = 30 + Math.random() * 40;
    const direction = Math.random() > 0.5 ? 1 : -1;
    
    // Upward floating animation
    const floatTween = gsap.to(el, {
      y: -window.innerHeight - 300,
      duration: duration,
      ease: 'none',
      onComplete: () => {
        if (!popped) {
          onDestroy(id);
        }
      }
    });

    // Horizontal swaying animation
    const swayTween = gsap.to(el, {
      x: `+=${swayAmount * direction}`,
      duration: (1.5 + Math.random() * 1.5) / 5, // 5x faster
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    return () => {
      floatTween.kill();
      swayTween.kill();
    };
  }, [id, onDestroy, popped]);

  const handleClick = () => {
    if (popped) return;
    setPopped(true);
    onClick(id);

    if (balloonRef.current) {
      gsap.killTweensOf(balloonRef.current);
      // Give a snappy pop effect
      gsap.to(balloonRef.current, {
        scale: 1.4,
        opacity: 0,
        duration: 0.15,
        ease: "power2.out",
        onComplete: () => {
          onDestroy(id);
        }
      });
    }
  };

  return (
    <div
      ref={balloonRef}
      onPointerDown={handleClick}
      className="absolute cursor-pointer flex flex-col items-center group touch-none z-0"
      style={{
        left: x,
        bottom: -200,
        width: 120,
        height: 150,
      }}
    >
      {/* Balloon Base Body */}
      <div 
        className="w-full h-full relative shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
        style={{
          borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
          boxShadow: 'inset -8px -8px 20px rgba(0,0,0,0.3)',
          backgroundColor: '#ddd' // fallback color
        }}
      >
        <img 
          src={imageUrl} 
          alt="balloon content" 
          className="w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
        />
        {/* Shine highlight to make it look smooth and balloon-like */}
        <div className="absolute top-2 left-3 w-8 h-12 bg-white/40 rounded-full rotate-[-30deg] blur-[2px] pointer-events-none" />
        <div className="absolute top-[40%] right-3 w-4 h-16 bg-black/10 rounded-full rotate-15 blur-md pointer-events-none hidden md:block" />
      </div>
      
      {/* Balloon Knot */}
      <div 
        className="w-0 h-0 absolute -bottom-2 text-gray-500 drop-shadow-sm z-[-1]"
        style={{
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderBottom: '12px solid currentColor',
        }}
      />
      
      {/* Balloon String */}
      <div className="w-[1.5px] h-37.5 bg-foreground/20 absolute top-37.5 z-[-2] origin-top opacity-70" />
    </div>
  );
};
