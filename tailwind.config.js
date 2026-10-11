/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: { 1: token("surface-1"), 2: token("surface-2"), 3: token("surface-3") },
        ink: token("ink"),
        muted: token("muted"),
        subtle: token("subtle"),
        accent: { DEFAULT: token("accent"), strong: token("accent-strong"), soft: token("accent-soft") },
        line: "rgb(255 255 255 / 0.08)",
        "line-strong": "rgb(255 255 255 / 0.14)",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ['"Geist Variable"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ['"Geist Mono Variable"', "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
      borderRadius: { card: "var(--radius-card)", panel: "var(--radius-panel)" },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
      transitionTimingFunction: { out: "var(--ease-out)" },
      transitionDuration: { fast: "160ms", base: "300ms", slow: "600ms" },
      maxWidth: { shell: "72rem" },
    },
  },
  plugins: [],
};
