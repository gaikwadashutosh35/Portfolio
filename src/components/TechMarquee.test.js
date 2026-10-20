import { render, waitFor } from "@testing-library/react";
import TechMarquee from "./TechMarquee";

test("marquee keeps moving when the OS asks for reduced motion", async () => {
  window.matchMedia = (query) => ({
    matches: query.includes("reduce"),
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  });
  // Report every observed element as on screen so the rows start.
  window.IntersectionObserver = class {
    constructor(cb) {
      this.cb = cb;
    }
    observe(target) {
      this.cb([{ isIntersecting: true, intersectionRatio: 1, target }]);
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };

  render(<TechMarquee />);
  const track = document.querySelector(".marquee-mask > div");
  const start = track.style.transform;
  await waitFor(() => expect(track.style.transform).not.toBe(start));
});
