/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
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
      },
    },
  },
  plugins: [],
};