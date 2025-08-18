import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
                   keyframes: {
               spinSlow: { to: { transform: "rotate(360deg)" } },
               bounce: {
                 "0%, 100%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)" },
                 "50%": { transform: "translateY(0)", animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" },
               },
               pulse: {
                 "0%, 100%": { opacity: "1" },
                 "50%": { opacity: "0.5" },
               },
                               fadeInUp: {
                  "0%": { opacity: "0", transform: "translateY(30px)" },
                  "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeInLeft: {
                  "0%": { opacity: "0", transform: "translateX(-30px)" },
                  "100%": { opacity: "1", transform: "translateX(0)" },
                },
                fadeInRight: {
                  "0%": { opacity: "0", transform: "translateX(30px)" },
                  "100%": { opacity: "1", transform: "translateX(0)" },
                },
                scaleIn: {
                  "0%": { opacity: "0", transform: "scale(0.9)" },
                  "100%": { opacity: "1", transform: "scale(1)" },
                },
                slideInUp: {
                  "0%": { opacity: "0", transform: "translateY(50px)" },
                  "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideInDown: {
                  "0%": { opacity: "0", transform: "translateY(-50px)" },
                  "100%": { opacity: "1", transform: "translateY(0)" },
                },
                zoomIn: {
                  "0%": { opacity: "0", transform: "scale(0.8)" },
                  "100%": { opacity: "1", transform: "scale(1)" },
                },
                bounceIn: {
                  "0%": { opacity: "0", transform: "scale(0.3)" },
                  "50%": { opacity: "1", transform: "scale(1.05)" },
                  "70%": { transform: "scale(0.9)" },
                  "100%": { opacity: "1", transform: "scale(1)" },
                },
             },
                   animation: {
               "spin-slow": "spinSlow 14s linear infinite",
               "bounce": "bounce 2s infinite",
               "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
               "fade-in-up": "fadeInUp 0.6s ease-out",
               "fade-in-left": "fadeInLeft 0.6s ease-out",
               "fade-in-right": "fadeInRight 0.6s ease-out",
               "scale-in": "scaleIn 0.6s ease-out",
               "slide-in-up": "slideInUp 0.8s ease-out",
               "slide-in-down": "slideInDown 0.8s ease-out",
               "zoom-in": "zoomIn 0.7s ease-out",
               "bounce-in": "bounceIn 1s ease-out",
             },
    },
  },
  plugins: [],
};

export default config;
