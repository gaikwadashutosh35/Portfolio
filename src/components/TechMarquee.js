import React, { useEffect, useRef } from "react";
import {
  motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion,
  useScroll, useSpring, useTransform, useVelocity,
} from "framer-motion";
import { skillGroups } from "../data/portfolio";
import skillIcons from "./skillIcons";
import { EASE } from "./ui";

// Scroll-velocity marquee of skill logos (the idea behind React Bits'
// "ScrollVelocity"; written from scratch). Drifts, speeds up and follows your
// scroll direction, leans into fast scrolls, spotlights the logo at the centre
// and eases to a stop under the pointer. Purely decorative: the same skills are
// listed by name in #skills.
const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};
const smoothstep = (t) => t * t * (3 - 2 * t);

const skills = skillGroups.flatMap((g) => g.items).filter((s) => skillIcons[s]);

const Row = ({ items, baseVelocity }) => {
  const ref = useRef(null);
  const track = useRef(null);
  const tiles = useRef([]);
  const geometry = useRef({ width: 0, track: 0, centers: [] });
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(1);
  const hovered = useRef(false);
  const speed = useRef(1);

  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [12, -12]);
  // The track holds two identical copies, so wrapping at -50% is seamless.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  // Measure once (and on resize) so the per-frame spotlight is pure arithmetic, no layout reads.
  useEffect(() => {
    const measure = () => {
      geometry.current = {
        width: ref.current.offsetWidth,
        track: track.current.offsetWidth,
        // Measure the <li>: its float animation makes it the tile's offsetParent.
        centers: tiles.current.map((t) => (t ? t.parentElement.offsetLeft + t.parentElement.offsetWidth / 2 : 0)),
      };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    // Ease toward a stop while hovered, back to full speed when the pointer leaves.
    speed.current += ((hovered.current ? 0 : 1) - speed.current) * Math.min(1, delta / 160);
    const f = velocityFactor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy * speed.current);

    // Spotlight: tiles near the horizontal centre grow and brighten.
    const { width, track: trackWidth, centers } = geometry.current;
    const offset = (wrap(-50, 0, baseX.get()) / 100) * trackWidth - width / 2;
    const reach = width * 0.38;
    for (let i = 0; i < tiles.current.length; i++) {
      const tile = tiles.current[i];
      if (!tile) continue;
      const t = smoothstep(Math.max(0, 1 - Math.abs(centers[i] + offset) / reach));
      tile.style.transform = `scale(${1 + 0.22 * t})`;
      tile.style.opacity = 0.5 + 0.5 * t;
    }
  });

  return (
    <motion.div
      ref={ref}
      className="marquee-mask overflow-hidden py-4"
      initial={{ opacity: 0, x: baseVelocity < 0 ? 160 : -160 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.2, ease: EASE }}
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <motion.div ref={track} style={{ x, skewX: reduce ? 0 : skewX }} className="relative flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-x-4 pr-4 sm:gap-x-6 sm:pr-6">
            {items.map((s, i) => {
              const Icon = skillIcons[s];
              const n = copy * items.length + i;
              return (
                <li
                  key={s}
                  className="tile-float"
                  // Index-based negative delays turn per-tile loops into waves that travel along the row.
                  style={{ "--d": `${-((i * 0.18) % 7)}s`, animationDelay: `${-((i * 0.53) % 4)}s` }}
                >
                  <span ref={(el) => (tiles.current[n] = el)} title={s} className="logo-tile group/tile block">
                    <Icon
                      className={`logo-icon text-[1.75rem] transition-colors duration-base group-hover/tile:text-accent-soft sm:text-[2.1rem] ${
                        i % 4 === 1 ? "text-accent" : "text-ink/80"
                      }`}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        ))}
      </motion.div>
    </motion.div>
  );
};

const TechMarquee = () => (
  <div aria-hidden="true" className="relative space-y-1 overflow-hidden border-y border-line py-8 sm:space-y-3 sm:py-12">
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-strong/20 blur-3xl" />
    <Row items={skills} baseVelocity={-1.4} />
    <Row items={[...skills].reverse()} baseVelocity={1.4} />
  </div>
);

export default TechMarquee;
