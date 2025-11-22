import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        akatsuchi: {
          900: "#020617",
          800: "#030712",
          700: "#020617",
          accent: "#f97316"
        }
      }
    }
  },
  plugins: []
};

export default config;
