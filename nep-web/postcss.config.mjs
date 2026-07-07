/**
 * PostCSS configuration for Tailwind CSS v4.
 * v4 ships its own PostCSS plugin (with autoprefixer built in), so this is the
 * only plugin needed. Used by the non-Turbopack build/tooling path.
 * @type {import('postcss-load-config').Config}
 */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
