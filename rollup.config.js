import resolve    from '@rollup/plugin-node-resolve'
import commonjs   from '@rollup/plugin-commonjs'
import urlResolve from 'rollup-plugin-url-resolve'

export default {
    plugins: [
        urlResolve(),
        resolve(),
        commonjs()
    ]
}
