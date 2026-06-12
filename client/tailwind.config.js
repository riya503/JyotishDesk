/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0B0B0B',    // Main dark layout background
          secondary: '#121212',  // Containers, tables, and sidebars
          card: '#1A1A1A',       // Focus elements, modals, cards
        },
        border: {
          subtle: '#2A2A2A',     // Clean thin dividing borders
          focus: '#444444',      // Interactive focus borders
        },
        brand: {
          accent: '#8B5CF6',     // Violet-500 accent for focus & primary buttons
          muted: '#9CA3AF',      // Muted cool text labels
          text: '#FFFFFF',       // Absolute white for emphasis text
        },
        feedback: {
          success: '#22C55E',    // Positive operations
          warning: '#F59E0B',    // Action required
          danger: '#EF4444',     // Critical issues
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Professional sans font
      },
      boxShadow: {
        premium: '0 4px 30px rgba(0, 0, 0, 0.5)', // Clean elevated shadow
      }
    },
  },
  plugins: [],
}
