import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: "#0A0A0A",       // Matte black
          ivory: "#FBF9F4",       // Warm ivory
          charcoal: "#1A1A1A",    // Dark charcoal
          gold: "#C5A880",        // Muted gold accent
          brown: "#2B1D12",       // Deep brown leather
          accent: "#D4AF37",      // Vibrant gold highlight
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cinzel", "serif"],
        sans: ["var(--font-sans)", "Inter", "Outfit", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
