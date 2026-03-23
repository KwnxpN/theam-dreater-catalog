import { Button } from "@/components/ui/button";
import sofaHero from "../../assets/images/sofa_hero.png";
import { useEffect, useRef } from 'react';
import { animate, createScope, splitText, stagger, type Scope } from 'animejs';

const Hero = () => {
  const root = useRef(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const scope = useRef<Scope | null>(null);

  useEffect(() => {
    if (!h1Ref.current) return;
    if (!pRef.current) return;
    const { words: h1Words } = splitText(h1Ref.current, {
      words: { wrap: 'clip' },
    });
    const { words: pWords } = splitText(pRef.current, {
      words: { wrap: 'clip' },
    });
    scope.current = createScope({ root }).add(() => {
      animate(h1Words, {
        y: [
          { to: ['100%', '-10%'] },
        ],
        duration: 1000,
        ease: 'out(3)',
        delay: stagger(80),
        loop: false,
      });
      animate(pWords, {
        y: [
          { to: ['100%', '-10%'] },
        ],
        duration: 1000,
        ease: 'out(3)',
        delay: stagger(80),
        loop: false,
      });
    });
    return () => scope.current?.revert();
  }, []);

  return (
    <div className="flex px-4 sm:px-8 lg:px-12" ref={root}>
      <div className="flex flex-col lg:flex-row mx-auto gap-8 lg:gap-0 lg:space-x-22 bg-secondary p-6 sm:p-8 rounded-3xl w-full">
        <div className="flex justify-center lg:justify-start">
          <img src={sofaHero} alt="Hero Image" className="w-full max-w-sm lg:max-w-none" />
        </div>
        <div className="flex flex-col gap-y-5 justify-center text-center lg:text-left">
          <span className="text-sm text-primary font-semibold">
            SUSTAINABLE LIVING
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold" ref={h1Ref}>
            Refined Living <br /> Through <br /> Nature'n <br /> Design{" "}
          </h1>
          <p className="text-gray-500 tracking-wide font-light text-base sm:text-lg" ref={pRef}>
            Discover our curated collection of premium home goods crafted
            with an earth-toned aesthetic. Timeless pieces for the
            modern, conscious home.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Button className="rounded-2xl p-6">Shop Collection</Button>
            <Button className="rounded-2xl p-6 border-2 border-primary" variant="secondary">View Lookbook</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero