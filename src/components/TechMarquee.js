import React, { useRef } from "react";
import {
  motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion,
  useScroll, useSpring, useTransform, useVelocity,
} from "framer-motion";
import { skillGroups } from "../data/portfolio";
import skillIcons from "./skillIcons";

// Scroll-velocity marquee of skill logos (the idea behind React Bits'
// "ScrollVelocity"; written from scratch). Drifts slowly, speeds up, follows
// your scroll direction and leans into fast scrolls. Purely decorative: the
// same skills are listed by name in #skills.
const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const skills = skillGroups.flatMap((g) => g.items).filter((s) => skillIcons[s]);

const Row = ({ items, baseVelocity }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(1);

  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [12, -12]);
  // The track holds two identical copies, so wrapping at -50% is seamless.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    const f = velocityFactor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={ref} className="marquee-mask overflow-hidden py-3">
      <motion.div style={{ x, skewX: reduce ? 0 : skewX }} className="flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-x-4 pr-4 sm:gap-x-6 sm:pr-6">
            {items.map((s, i) => {
              const Icon = skillIcons[s];
              return (
                <li
                  key={s}
                  className="tile-float"
                  // Negative delays desync the float so the row ripples instead of bouncing in unison.
                  style={{ animationDelay: `${-((i * 0.53) % 4)}s` }}
                >
                  <span className="grid h-16 w-16 place-items-center rounded-2xl border border-line bg-gradient-to-b from-white/[0.07] to-white/[0.01] shadow-card sm:h-20 sm:w-20">
                    <Icon className={`text-[1.75rem] sm:text-[2.1rem] ${i % 4 === 1 ? "text-accent" : "text-ink/75"}`} />
                  </span>
                </li>
              );
            })}
          </ul>
        ))}
      </motion.div>
    </div>
  );
};

const TechMarquee = () => (
  <div aria-hidden="true" className="relative space-y-2 overflow-hidden border-y border-line py-8 sm:space-y-4 sm:py-12">
    <div className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-accent-strong/10 blur-3xl" />
    <Row items={skills} baseVelocity={-1.4} />
    <Row items={[...skills].reverse()} baseVelocity={1.4} />
  </div>
);

export default TechMarquee;
