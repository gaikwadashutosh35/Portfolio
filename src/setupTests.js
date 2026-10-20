import "@testing-library/jest-dom";

// jsdom has no IntersectionObserver / ResizeObserver / matchMedia; the header,
// Motion's viewport animations and Lenis need them.
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
window.IntersectionObserver = IO;
window.ResizeObserver = IO;
window.matchMedia =
  window.matchMedia ||
  ((query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }));
