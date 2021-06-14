import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const EXTERNAL = ['three'];

const config = {
  input: 'src/index.js',
  external: id => new RegExp(EXTERNAL.join('|')).test(id),
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [babel({ ...pkg.babel, babelHelpers: 'bundled' }), terser()],
};

export default config;
