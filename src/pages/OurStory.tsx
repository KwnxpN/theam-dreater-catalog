import { useState, useCallback, useEffect } from "react";
import Crosshair from "@/components/Crosshair";
import { Balloon } from "@/components/Balloon";

interface BalloonData {
  id: string;
  x: number;
  imageUrl: string;
}

const IMAGES = [
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1557672815-592bb8f4cbab?w=500&auto=format&fit=crop&q=60"
];

const OurStory = () => {
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<BalloonData[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  // Auto-spawn balloons while playing
  useEffect(() => {
    let spawner: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      const spawnLoop = () => {
        spawnBalloon();
        // spawn rate between 150ms and 500ms
        spawner = setTimeout(spawnLoop, 150 + Math.random() * 350);
      };
      spawner = setTimeout(spawnLoop, 200);
    }
    return () => clearTimeout(spawner);
  }, [isPlaying, timeLeft]);

  const spawnBalloon = () => {
    const margin = 120; // prevent spawning too close to edge
    const maxX = typeof window !== 'undefined' ? window.innerWidth - margin * 2 : 1000;
    const randomX = margin + Math.random() * maxX;
    const randomImg = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    
    const newBalloon: BalloonData = {
      id: Math.random().toString(36).substring(2, 11),
      x: randomX,
      imageUrl: randomImg,
    };
    
    setBalloons(prev => [...prev, newBalloon]);
  };

  const handleBalloonClick = useCallback(() => {
    // Increase score
    setScore(prev => prev + 1);
  }, []);

  const handleBalloonDestroy = useCallback((id: string) => {
    // Remove the balloon from DOM once it flies off screen or finishes pop animation
    setBalloons(prev => prev.filter(b => b.id !== id));
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setBalloons([]);
    setIsPlaying(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <Crosshair />
      
      {/* Score Header */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 select-none pointer-events-none flex flex-col items-center gap-2">
        <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-md">Score: {score}</h1>
        {(isPlaying || timeLeft === 0) && (
          <h2 className={`text-4xl font-bold drop-shadow-sm ${timeLeft <= 5 ? 'text-red-500 animate-bounce' : 'text-foreground'}`}>
            Time: {timeLeft}s
          </h2>
        )}
      </div>

      {/* Center Action */}
      {!isPlaying && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
           <div className="pointer-events-auto flex flex-col items-center gap-6 p-10 bg-background/80 backdrop-blur-md rounded-3xl border shadow-2xl">
             <h2 className="text-4xl font-bold text-center">
               {timeLeft === 0 ? 'Game Over!' : 'Pop the balloons!'}
             </h2>
             {timeLeft === 0 && <p className="text-2xl text-muted-foreground font-medium mb-2">Final Score: {score}</p>}
             <button 
               onClick={startGame}
               className="px-10 py-5 bg-primary text-primary-foreground text-2xl font-bold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
             >
               {timeLeft === 0 ? 'Play Again' : 'Start Game'}
             </button>
           </div>
        </div>
      )}

      {/* Balloons Layer */}
      {balloons.map(balloon => (
        <Balloon
          key={balloon.id}
          id={balloon.id}
          x={balloon.x}
          imageUrl={balloon.imageUrl}
          onClick={handleBalloonClick}
          onDestroy={handleBalloonDestroy}
        />
      ))}
    </div>
  )
}

export default OurStory