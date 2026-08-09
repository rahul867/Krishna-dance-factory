/** Tailwind config for the homepage.
 *
 * Mirrors the inline `tailwind.config` that used to sit next to the CDN
 * script tag in index.html. Rebuild the stylesheet with:
 *
 *   npx tailwindcss@3 -c tailwind.config.js -i tailwind.input.css -o tailwind.css --minify
 */
module.exports = {
  content: [
    './index.html',
    './private-classes/index.html',
    './salsa-bachata/index.html',
  ],
  theme: {
    extend: {
      colors: {
        ink:    '#0b0708',
        panel:  '#141011',
        coal:   '#1c1617',
        blood:  '#e01a2b',
        ember:  '#ff3b4e',
        bone:   '#f3eeee',
        ash:    '#9b9192',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        cond:    ['"Bebas Neue"', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { widest2: '0.35em' },
      keyframes: {
        floaty:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        fadeUp:   { '0%': { opacity: 0, transform: 'translateY(28px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        marquee:  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        floaty:  'floaty 7s ease-in-out infinite',
        fadeUp:  'fadeUp .8s cubic-bezier(.22,1,.36,1) forwards',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
};
