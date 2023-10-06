/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        gradient: {
          12: "var(--12)",
          3: "var(--3)",
          dawn: "var(--dawn)",
          "dawn-2": "var(--dawn-2)",
        },
        "ui-elements": {
          light: "var(--ui-elements--light)",
          gray: "var(--ui-elements--gray)",
          dark: "var(--ui-elements--dark)",
          white: "var(--ui-elements--white)",
          black: "var(--ui-elements--black)",
        },
        background: {
          light: "var(--background--light)",
          darker: "var(--background--darker)",
          dark: "var(--background--dark)",
          beige: "var(--background--beige)",
          white: "var(--background--white)",
          black: "var(--background--black)",
          "black-2": "var(--background--black-2)",
          DEFAULT: "hsl(var(--background))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        error: {
          focus: "var(--error--error-focus)",
          pressed: "var(--error--error-pressed)",
          hover: "var(--error--error-hover)",
          DEFAULT: "var(--error--error-default)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          disabled: "var(--accent--accent-disabled)",
          link: "var(--accent--accent-link)",
          focus: "var(--accent--accent-focus)",
          pressed: "var(--accent--accent-pressed)",
          hover: "var(--accent--accent-hover)",
          foreground: "hsl(var(--accent-foreground))",
          DEFAULT: "var(--accent--accent-default)",
        },
        primary: {
          disabled: "var(--primary--primary-disabled)",
          link: "var(--primary--primary-link)",
          light: "var(--primary--primary-light)",
          focus: "var(--primary--primary-focus)",
          pressed: "var(--primary--primary-pressed)",
          hover: "var(--primary--primary-hover)",
          DEFAULT: "var(--primary--primary-default)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          disabled: "var(--secondary--secondary-disabled)",
          dark: "var(--secondary--secondary-dark)",
          focus: "var(--secondary--secondary-focus)",
          pressed: "var(--secondary--secondary-pressed)",
          hover: "var(--secondary--secondary-hover)",
          DEFAULT: "var(--secondary--secondary-default)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        text: {
          error: "var(--text--text-error)",
          disabled: "var(--text--text-disabled)",
          dark: "var(--text--text-dark)",
          gray: "var(--text--text-gray)",
          primary: "var(--text--text-primary)",
          black: "var(--text--text-black)",
          white: "var(--text--text-white)",
          link: "var(--text--text-link)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "spin-counter": {
          to: {
            transform: "rotate(-360deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-counter": "spin-counter 1s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};
