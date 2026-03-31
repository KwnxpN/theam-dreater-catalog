import { useEffect, useRef } from "react";
import champ01 from "../assets/images/champ01.jpg";
import kawin01 from "../assets/images/kawin01.jpg";
import tae01 from "../assets/images/tae01.jpg";

interface Member {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const MEMBERS: Member[] = [
  {
    name: "Champ",
    role: "Co-Founder & Creative Director",
    image: champ01,
    bio: "The visionary behind Theam Dreater's signature aesthetic. Champ curates every piece with an eye for timeless design and modern living.",
  },
  {
    name: "Kawin",
    role: "Co-Founder & Operations Lead",
    image: kawin01,
    bio: "The backbone of our catalog experience. Kawin ensures every product meets our quality standards — from sourcing to your doorstep.",
  },
  {
    name: "Tae",
    role: "Co-Founder & Tech Lead",
    image: tae01,
    bio: "The builder who brought Theam Dreater to life online. Tae crafts the digital experience that makes discovering furniture effortless.",
  },
];

interface OurStoryContentProps {
  onPlayAgain: () => void;
}

export const OurStoryContent = ({ onPlayAgain }: OurStoryContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Fade/slide in on mount
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });

    // Stagger member cards
    const cards = el.querySelectorAll<HTMLElement>(".member-card");
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      setTimeout(() => {
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 400 + i * 180);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-30 w-full min-h-screen flex flex-col items-center justify-start py-20 px-4 overflow-y-auto bg-background"
    >
      {/* Hero Section */}
      <div className="max-w-3xl w-full text-center mb-16">
        <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
          🎉 You unlocked our story!
        </p>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          We are{" "}
          <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Theam Dreater
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Born from a shared love of beautiful spaces and thoughtful craft,
          Theam Dreater is more than a furniture catalog — it's a curated world
          where every piece has a story. We started as three friends with one
          simple belief: your home should feel like you.
        </p>
      </div>

      {/* Mission Block */}
      <div className="max-w-3xl w-full mb-16 p-8 rounded-3xl border bg-card/60 backdrop-blur-md shadow-lg">
        <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          To connect people with furniture that marries form and function —
          objects that spark joy, invite rest, and endure time. We handpick
          every item in our catalog so you don't have to sift through the noise.
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-5xl w-full mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Meet the Founders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MEMBERS.map((member) => (
            <div
              key={member.name}
              className="member-card flex flex-col items-center text-center p-6 rounded-3xl border bg-card/70 backdrop-blur-sm shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary/40 mb-5 shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-3">
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Play Again */}
      <button
        onClick={onPlayAgain}
        className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
      >
        Play Again
      </button>
    </div>
  );
};
