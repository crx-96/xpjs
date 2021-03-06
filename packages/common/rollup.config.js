import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import clear from 'rollup-plugin-clear';
import { terser } from 'rollup-plugin-terser';
import { DEFAULT_EXTENSIONS } from '@babel/core';

const commonConfig = {
  input: 'index.ts',
  external: [/@babel\/runtime/],
  plugins: [
    clear({
      targets: ['bundle'],
    }),
    resolve(),
    commonjs(),
  ],
};

export default [
  {
    ...commonConfig,
    input: './esm5/index.js',
    plugins: [
      ...commonConfig.plugins,
      babel({
        // 编译库使用
        babelHelpers: 'runtime',
        // 只转换源代码，不转换外部依赖
        exclude: 'node_modules/**',
        // babel 默认不支持 ts 需要手动添加
        extensions: [...DEFAULT_EXTENSIONS],
      }),
    ],
    output: [
      {
        name: 'XPCommon',
        file: 'bundle/common5.umd.js',
        format: 'umd',
        sourcemap: false,
        exports: 'named',
      },
      {
        name: 'XPCommon',
        file: 'bundle/common5.umd.min.js',
        format: 'umd',
        sourcemap: false,
        exports: 'named',
        plugins: [terser()],
      },
    ],
  },
  {
    ...commonConfig,
    input: './esm2015/index.js',
    plugins: [
      ...commonConfig.plugins,
      babel({
        // 编译库使用
        babelHelpers: 'runtime',
        // 只转换源代码，不转换外部依赖
        exclude: 'node_modules/**',
        // babel 默认不支持 ts 需要手动添加
        extensions: [...DEFAULT_EXTENSIONS],
      }),
    ],
    output: [
      {
        name: 'XPCommon',
        file: 'bundle/common2015.umd.js',
        format: 'umd',
        sourcemap: false,
        exports: 'named',
      },
      {
        name: 'XPCommon',
        file: 'bundle/common2015.umd.min.js',
        format: 'umd',
        sourcemap: false,
        exports: 'named',
        plugins: [terser()],
      },
    ],
  },
];
