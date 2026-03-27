import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Crosshair from "@/components/Crosshair";
import { Balloon } from "@/components/Balloon";
import champ01 from "../assets/images/champ01.jpg";
import champ02 from "../assets/images/champ02.jpg";
import champ03 from "../assets/images/champ03.jpg";
import kawin01 from "../assets/images/kawin01.jpg";
import kawin02 from "../assets/images/kawin02.jpg";
import kawin03 from "../assets/images/kawin03.jpg";
import tae01 from "../assets/images/tae01.jpg";
import tae02 from "../assets/images/tae02.jpg";
import tae03 from "../assets/images/tae03.jpg";

interface BalloonData {
  id: string;
  x: number;
  imageUrl: string;
}

const IMAGES = [
  champ01,
  tae02,
  champ03,
  kawin01,
  champ02,
  tae03,
  kawin03,
  tae01,
  kawin02
];

const OurStory = () => {
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<BalloonData[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0 && score > 20) {
      navigate('/about-us');
    }
  }, [timeLeft, score, navigate]);

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
              {timeLeft === 0 ? 'Try Again!' : 'Pop the balloons above 20 to get real Our story!'}
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