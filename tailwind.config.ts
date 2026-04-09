import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary-fixed-variant": "#474746",
        "surface-container-highest": "#e2e2e2",
        tertiary: "#5c5c5c",
        "on-background": "#1a1c1c",
        "on-secondary-fixed-variant": "#474747",
        "inverse-on-surface": "#f0f1f1",
        "surface-container": "#eeeeee",
        "on-primary-container": "#fffbff",
        "on-error-container": "#93000a",
        "on-tertiary": "#ffffff",
        surface: "#f9f9f9",
        "on-surface": "#1a1c1c",
        outline: "#946e6d",
        "surface-dim": "#dadada",
        "on-secondary-container": "#646464",
        "on-tertiary-fixed": "#1b1c1c",
        "on-secondary-fixed": "#1b1b1b",
        "secondary-fixed-dim": "#c6c6c6",
        "on-surface-variant": "#5f3e3e",
        "primary-fixed-dim": "#ffb3b2",
        "outline-variant": "#e9bcba",
        "error-container": "#ffdad6",
        "on-primary-fixed": "#410008",
        error: "#ba1a1a",
        "on-secondary": "#ffffff",
        "tertiary-container": "#757474",
        background: "#f9f9f9",
        "primary-fixed": "#ffdad8",
        "inverse-primary": "#ffb3b2",
        "on-primary-fixed-variant": "#92001e",
        secondary: "#5e5e5e",
        "secondary-container": "#e2e2e2",
        "on-primary": "#ffffff",
        "on-tertiary-container": "#fffcfb",
        "inverse-surface": "#2f3131",
        "surface-variant": "#e2e2e2",
        "surface-bright": "#f9f9f9",
        "surface-container-lowest": "#ffffff",
        "primary-container": "#e90036",
        "secondary-fixed": "#e2e2e2",
        "surface-container-high": "#e8e8e8",
        "on-error": "#ffffff",
        "tertiary-fixed-dim": "#c8c6c5",
        "surface-tint": "#bf002a",
        primary: "#ba0029",
        "surface-container-low": "#f3f3f4",
        "tertiary-fixed": "#e4e2e1"
      },
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        sm: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "9999px"
      },
      fontFamily: {
        headline: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-manrope)", "Manrope", "sans-serif"],
        label: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        marquee: "marquee 25s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
