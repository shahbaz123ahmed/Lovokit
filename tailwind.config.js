/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lovokit: {
          yellow: "#FFC400",
          yellowHover: "#E6B000",
          yellowGlow: "rgba(255, 196, 0, 0.35)",
          dark: "#08090C",
          surface: "#0D0F15",
          card: "#12151D",
          border: "rgba(255, 255, 255, 0.08)",
          textMuted: "#9CA3AF",
        },
      },
      boxShadow: {
        glow: "0 0 25px rgba(255, 196, 0, 0.35)",
        "glow-lg": "0 0 50px rgba(255, 196, 0, 0.25)",
        "halo": "0 0 60px 15px rgba(255, 255, 255, 0.15)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
