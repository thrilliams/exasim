import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import minify  from 'rollup-plugin-babel-minify';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

export default [
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/exasim.js',
            format: 'esm',
            sourcemap: true
        },
        plugins: [
            resolve({
                extensions: [ '.js', '.ts' ],
                browser: true
            }),
            commonjs(),
            typescript(),
            replace({
                'process.env.NODE_ENV': JSON.stringify( 'production' )
            })
        ]
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/exasim.min.js',
            format: 'esm',
            sourcemap: true
        },
        plugins: [
            resolve({
                extensions: [ '.js', '.ts' ],
                browser: true
            }),
            commonjs(),
            typescript(),
            replace({
                'process.env.NODE_ENV': JSON.stringify( 'production' )
            }),
            minify({
                comments: false,
                mangle: {
                    keepClassName: true,
                }
            })
        ]
    }
]