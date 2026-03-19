import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: "#f7e6e6",
        petal: "#f4d8d0",
        rose: "#c77772",
        sage: "#97a38b",
        pine: "#37443c",
        cream: "#fffaf4",
        mist: "#f7f1eb",
      },
      boxShadow: {
        bloom: "0 20px 60px rgba(115, 74, 59, 0.12)",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(244, 216, 208, 0.9), transparent 45%), linear-gradient(135deg, rgba(255, 250, 244, 0.95), rgba(247, 241, 235, 0.92))",
      },
    },
  },
  plugins: [],
};

export default config;
