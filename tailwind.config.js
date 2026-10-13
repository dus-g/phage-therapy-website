/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F7F8F7',
        card: '#FFFFFF',
        ink: '#141A18',
        line: '#E1E5E2',
        muted: '#68716D',
        accent: '#2B57C9',
        accentDeep: '#16225C',
        accentSoft: '#EAF0FB',
        graySoft: '#E9E9E9',
        navBar: '#2E74D6',
      },
      fontFamily: {
        serif: [
          'var(--font-pt-serif)', 'Georgia', 'serif',
        ],
        sans: [
          'var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica',
          'Arial', 'sans-serif',
        ],
        mono: [
          '"SF Mono"', '"IBM Plex Mono"', 'ui-monospace', 'Menlo', 'monospace',
        ],
      },
      maxWidth: {
        form: '560px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
