import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./docs/**/*.{md,mdx}",
    "./news/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        echo: {
          void: "#05070A",
          deep: "#080D12",
          panel: "#0B1118",
          cyan: "#36D9FF",
          blue: "#1177AA",
          green: "#46FFB0",
          amber: "#FFB84D",
          red: "#FF4D5E",
          muted: "#8EA4B8",
          text: "#EAF6FF"
        }
      },
      fontFamily: {
        display: ["Space Grotesk", "Rajdhani", "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "Geist", "IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 32px rgba(54, 217, 255, 0.16)",
        "glow-strong": "0 0 48px rgba(54, 217, 255, 0.24)"
      },
      backgroundImage: {
        "echo-grid":
          "linear-gradient(rgba(54,217,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(54,217,255,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
