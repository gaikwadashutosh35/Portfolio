import React, { useRef } from "react";
import {
  motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion,
  useScroll, useSpring, useTransform, useVelocity,
} from "framer-motion";
import { skillGroups } from "../data/portfolio";

// Scroll-velocity marquee (the idea behind React Bits' "ScrollVelocity";
// written from scratch). Drifts slowly, speeds up and follows the direction
// you scroll. Purely decorative: the same skills are listed in #skills.
const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const skills = skillGroups.flatMap((g) => g.items);

const Row = ({ items, baseVelocity }) => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(1);

  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
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
    <div ref={ref} className="marquee-mask overflow-hidden">
      <motion.div style={{ x }} className="flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center gap-x-8 pr-8 sm:gap-x-12 sm:pr-12">
            {items.map((s, i) => (
              <li key={s} className="flex items-center gap-x-8 sm:gap-x-12">
                <span className={`font-display text-4xl leading-none sm:text-6xl ${i % 3 === 1 ? "italic text-accent-soft/80" : "text-ink/85"}`}>
                  {s}
                </span>
                <span className="text-lg text-accent/60">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  );
};

const TechMarquee = () => (
  <div aria-hidden="true" className="relative space-y-4 overflow-hidden border-y border-line py-10 sm:space-y-6 sm:py-14">
    <Row items={skills} baseVelocity={-1.2} />
    <Row items={[...skills].reverse()} baseVelocity={1.2} />
  </div>
);

export default TechMarquee;
