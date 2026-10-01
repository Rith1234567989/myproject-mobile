const { Colors } = require("./constants/Colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: Colors.primary.DEFAULT,
          dark: Colors.primary.dark,
        },
        secondary: {
          DEFAULT: Colors.secondary.DEFAULT,
          orange: Colors.secondary.orange,
        },
        neutral: {
          background: Colors.neutral.background,
          surface: Colors.neutral.surface,
          border: Colors.neutral.border,
        },
        danger: Colors.danger,
      },
      textColor: {
        "neutral-text": {
          main: Colors.text.primary,
          sub: Colors.text.sub,
          muted: Colors.text.muted,
          icon: Colors.text.icon,
        },
      },
    },
  },
  plugins: [],
};
