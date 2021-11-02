import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue2';
import scss from 'rollup-plugin-scss'; // 提取css 
import { writeFileSync } from 'fs'; // 写文件
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';

module.exports = {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main, // 输出文件名称
            format: 'cjs', // 输出模块格式
            sourcemap: false, // 是否输出sourcemap
        },
        {
            file: pkg.module,
            format: 'esm',
            sourcemap: false,
        },
        {
            file: pkg.umd,
            format: 'umd',
            name: pkg.umdName, // umd模块名称，相当于一个命名空间，会自动挂载到window下面
            sourcemap: false,
            globals: {
                'vue': 'Vue', 
            }
        },
    ],
    plugins: [
        scss({
            output: function (styles, styleNodes) {
                writeFileSync(pkg.cssPath, styles)
            },
            outputStyle: 'compressed'
        }),
        vue(),
        terser(),
        resolve(),
        babel({
            exclude: ['node_modules/**']
        }),
        commonjs()
    ],
    external: [ // 不被打包的库
        'vue'
    ]
}

