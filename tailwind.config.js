/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './public/**/*.html',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px'
      },
      fontFamily: {
        sans: ['"Inter", sans-serif'],
        serif: ['InterVariable, sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular']
      },
      boxShadow: {
        up: '0 2px 6px -1px'
      },
      fontSize: {
        sm: '0.75rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        '4xl': '2rem',
        '5xl': '2.25rem'
      },
      scale: {
        101: '1.01'
      }
    }
  },
  plugins: [require('flowbite/plugin')]
}
