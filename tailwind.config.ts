import type { Config } from "tailwindcss";

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/(auth)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        bgdark: '#9F9F9F',
        textdark:'rgb(18, 18, 18)',
        primary:'#54A3A0'
      }
    },
  },
  plugins: [
    //require('@tailwindcss/')
  ],
});
export default config;
