import css from 'rollup-plugin-css-only';

export default {
  // ...
  plugins: [
    css({ output: 'public/build/bundle.css' }), 
    
  ],
};