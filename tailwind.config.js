/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'wii': ['Nunito', 'Arial Rounded MT Bold', 'Arial', 'sans-serif'],
        'business': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'wii-blue': '#0099CC',
        'wii-blue-dark': '#006699',
        'wii-blue-light': '#33BBEE',
        'wii-orange': '#FF6600',
        'wii-orange-light': '#FF8833',
        'lane-wood': '#C8922A',
        'lane-wood-dark': '#A0722A',
        'pin-white': '#F5F5F5',
        'ball-blue': '#1B6FD6',
        'ball-red': '#CC2222',
        'ball-purple': '#7B2FBE',
        'ball-green': '#1A8A3A',
        'ball-black': '#1A1A1A',
        'ball-gold': '#D4A017',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'roll': 'roll 1s ease-in forwards',
        'pin-fall': 'pinFall 0.5s ease-in forwards',
        'strike-flash': 'strikeFlash 0.3s ease-in-out 3',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        roll: {
          '0%': { transform: 'translateX(-200px) rotate(0deg)', opacity: '0' },
          '100%': { transform: 'translateX(0) rotate(720deg)', opacity: '1' },
        },
        pinFall: {
          '0%': { transform: 'rotate(0deg)', opacity: '1' },
          '100%': { transform: 'rotate(45deg) translateY(20px)', opacity: '0' },
        },
        strikeFlash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      backgroundImage: {
        'lane-gradient': 'linear-gradient(180deg, #87CEEB 0%, #B8D4E8 30%, #C8922A 60%, #A0722A 100%)',
        'business-gradient': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        'wii-button': 'linear-gradient(180deg, #33BBEE 0%, #0099CC 50%, #006699 100%)',
        'wii-button-orange': 'linear-gradient(180deg, #FF8833 0%, #FF6600 50%, #CC4400 100%)',
        'scoreboard': 'linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)',
      },
      boxShadow: {
        'wii': '0 4px 0 rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
        'wii-hover': '0 6px 0 rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
        'wii-active': '0 1px 0 rgba(0,0,0,0.3)',
        'pin': '2px 4px 8px rgba(0,0,0,0.4)',
        'ball': 'inset -6px -6px 12px rgba(0,0,0,0.4), inset 4px 4px 8px rgba(255,255,255,0.2)',
        'glass': '0 8px 32px rgba(31,38,135,0.15)',
        'card-business': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        'card-business-hover': '0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}
