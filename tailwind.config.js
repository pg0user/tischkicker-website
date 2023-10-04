module.exports = {
  content:[
    "./*.css",
    "./src/main.css",
    "./*.php",
    "./**/*.php",
    "./**/**/*.php",
    "./**/**/**/*.php",

  ],
  layers: ["components", "utilities"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {

    },
   /* container: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1170px',
      }
    },*/

    extend: {
      spacing: {

      },
      boxShadow: {

      },
      colors:{

      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    fontFamily: false,
  },
  plugins: [

  ],
}