import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF9F7",
        foreground: "#1A1A1A",
        muted: "#6B6B6B",
        border: "#E8E4DF",
        card: "#FFFFFF",
        primary: {
          DEFAULT: "#C9806A",
          hover: "#B56D58",
          light: "#F5EBE8",
        },
        accent: {
          sage: "#8FAF8F",
          blush: "#F2D7CC",
          stone: "#9E8E82",
        },
        success: "#5A8F6A",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["DM Sans", "Inter", "sans-serif"],
      },
      fontSize: {
        "display": ["56px", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "heading-xl": ["40px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-lg": ["32px", { lineHeight: "1.25" }],
        "heading-md": ["24px", { lineHeight: "1.3" }],
        "heading-sm": ["20px", { lineHeight: "1.4" }],
      },
      borderRadius: {
        card: "12px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.06)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.12)",
        modal: "0 24px 64px rgba(0,0,0,0.15)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        shimmer: "shimmer 2s infinite linear",
      },
    },
  },
  plugins: [],
};

export default config;
