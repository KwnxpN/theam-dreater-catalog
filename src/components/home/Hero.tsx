import { Button } from "@/components/ui/button";
import sofaHero from "../../assets/images/sofa_hero.png";
import { useEffect, useRef } from 'react';
import { animate, splitText } from 'animejs';
import { NavLink } from "react-router-dom";

const Hero = () => {
  const root = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Cache split words so we only call splitText once
  const spanWords = useRef<Element[]>([]);
  const pWords = useRef<Element[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Split text only once on first observation
          if (!initialized.current) {
            const spanEl = rootEl.querySelector<HTMLElement>('.hero-span');
            const pEl = rootEl.querySelector<HTMLElement>('.hero-p');

            if (spanEl) {
              const { words } = splitText(spanEl, { words: { wrap: 'clip' } });
              spanWords.current = words;
            }
            if (pEl) {
              const { words } = splitText(pEl, { words: { wrap: 'clip' } });
              pWords.current = words;
            }
            initialized.current = true;
          }

          const h1El = rootEl.querySelector<HTMLElement>('.hero-h1');
          const btnEl = rootEl.querySelector<HTMLElement>('.hero-btn');

          if (entry.isIntersecting) {
            // ── Animate IN ──
            if (spanWords.current.length) {
              animate(spanWords.current, {
                y: ['100%', '0%'],
                opacity: [0, 1],
                duration: 800,
                ease: 'out(3)',
                delay: (_, i) => i * 80,
              });
            }
            if (h1El) {
              animate(h1El, {
                y: ['20px', '0px'],
                opacity: [0, 1],
                duration: 1000,
                ease: 'out(3)',
              });
            }
            if (pWords.current.length) {
              animate(pWords.current, {
                y: ['100%', '0%'],
                opacity: [0, 1],
                duration: 1000,
                ease: 'out(3)',
                delay: (_, i) => i * 80,
              });
            }
            if (btnEl) {
              animate(btnEl, {
                y: ['40px', '0px'],
                opacity: [0, 1],
                duration: 1200,
                ease: 'out(3)',
              });
            }
            if (imgRef.current) {
              animate(imgRef.current, {
                opacity: [0, 1],
                duration: 3000,
                ease: 'out(3)',
              });
            }
          } else {
            // ── Animate OUT (reverse back to hidden) ──
            if (spanWords.current.length) {
              animate(spanWords.current, {
                y: '100%',
                opacity: 0,
                duration: 600,
                ease: 'in(2)',
              });
            }
            if (h1El) {
              animate(h1El, {
                y: '20px',
                opacity: 0,
                duration: 600,
                ease: 'in(2)',
              });
            }
            if (pWords.current.length) {
              animate(pWords.current, {
                y: '100%',
                opacity: 0,
                duration: 600,
                ease: 'in(2)',
              });
            }
            if (btnEl) {
              animate(btnEl, {
                y: '40px',
                opacity: 0,
                duration: 600,
                ease: 'in(2)',
              });
            }
            if (imgRef.current) {
              animate(imgRef.current, {
                opacity: 0,
                duration: 800,
                ease: 'in(2)',
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(rootEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex px-4 sm:px-8 lg:px-12" ref={root}>
      <div className="flex flex-col lg:flex-row mx-auto gap-8 lg:gap-0 lg:space-x-22 bg-secondary p-6 sm:p-8 rounded-3xl w-full">
        <div className="flex justify-center lg:justify-start">
          <img
            ref={imgRef}
            src={sofaHero}
            alt="Hero Image"
            className="w-full max-w-sm lg:max-w-none"
            style={{ opacity: 0 }}
          />
        </div>
        <div className="flex flex-col gap-y-5 justify-center text-center lg:text-left">
          <span className="hero-span text-sm text-primary font-semibold">
            ABOUT OUR COMPANY
          </span>
          <h1 className="hero-h1 text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.15] pb-1" style={{ opacity: 0 }}>
            We Curate <br /> Meaningful <br /> Spaces <br /> Through Design{" "}
          </h1>
          <p className="hero-p text-gray-500 tracking-wide font-light text-base sm:text-lg">
            At Theam Dreater, we present thoughtfully selected furniture
            and home pieces with a nature-inspired direction. This website
            is a curated product catalog that highlights style, material,
            and design story.
          </p>
          <div className="hero-btn flex flex-wrap items-center justify-center lg:justify-start gap-4" style={{ opacity: 0 }}>
            <NavLink to="/catalog">
              <Button className="rounded-2xl p-6">
                Explore Catalog
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero